import rawHoldings from "@/data/holdings.json";

/** One row of the synced Google Sheet (see scripts/sync-data.mjs). */
interface SheetRow {
  ticker: string;
  company: string;
  valueMM: number | null;
  weightPct: number | null;
  shares: number | null;
  sharesChange: number | null;
  sharesChangePct: number | null;
  pctOutstanding: number | null;
  holdingsDate: string;
  filingType: string;
  fund: string;
  snapshot: string; // ISO date of the quarterly snapshot
}

export type HoldingAction = "new" | "add" | "trim" | "hold" | "exit";

export interface Holding {
  ticker: string;
  tickerSlug: string;
  company: string;
  weight: number; // % of portfolio
  value: number; // USD
  shares: number;
  action: HoldingAction;
  changePct: number | null; // share count change vs prior quarter
}

export interface Activity {
  ticker: string;
  tickerSlug: string;
  company: string;
  action: HoldingAction;
  detail: string;
}

export interface Investor {
  slug: string;
  name: string; // fund display name
  manager: string | null;
  aum: number; // USD, latest snapshot
  qoqChange: number | null; // portfolio value change vs previous snapshot, %
  holdingsCount: number;
  concentration: number; // top-10 weight %
  asOf: string; // ISO snapshot date
  quarterLabel: string;
  trend: number[]; // portfolio value per snapshot, oldest first
  holdings: Holding[];
  activity: Activity[];
}

/** Display metadata for funds we know; anything new in the sheet still works. */
const FUND_META: Record<
  string,
  { slug: string; display: string; manager: string | null }
> = {
  "Akre Capital Management, LLC": { slug: "akre-capital", display: "Akre Capital Management", manager: "John Neff" },
  "AltaRock Partners LP": { slug: "altarock-partners", display: "AltaRock Partners", manager: "Mark Massey" },
  "Altimeter Capital Management, LP": { slug: "altimeter-capital", display: "Altimeter Capital", manager: "Brad Gerstner" },
  "Atreides Management, LP": { slug: "atreides-management", display: "Atreides Management", manager: "Gavin Baker" },
  "Blue Box Wealth Management SA": { slug: "blue-box", display: "Blue Box Wealth Management", manager: "William de Gale" },
  "Blue Whale Capital LLP": { slug: "blue-whale", display: "Blue Whale Capital", manager: "Stephen Yiu" },
  "Coatue Management, L.L.C.": { slug: "coatue", display: "Coatue Management", manager: "Philippe Laffont" },
  "Crake Asset Management LLP": { slug: "crake", display: "Crake Asset Management", manager: null },
  "Edgewood Management LLC": { slug: "edgewood", display: "Edgewood Management", manager: "Alan Breed" },
  "Egerton Capital (UK) LLP": { slug: "egerton", display: "Egerton Capital", manager: "John Armitage" },
  "Fundsmith Investment Services Ltd.": { slug: "fundsmith-investment-services", display: "Fundsmith Investment Services", manager: "Terry Smith" },
  "Fundsmith LLP": { slug: "fundsmith", display: "Fundsmith", manager: "Terry Smith" },
  "Harvard Management Company, Inc.": { slug: "harvard-management", display: "Harvard Management Company", manager: null },
  "I.G.Y. Ltd": { slug: "igy", display: "I.G.Y.", manager: "Nick Sleep" },
  "Lakehouse Capital Pty Ltd.": { slug: "lakehouse", display: "Lakehouse Capital", manager: null },
  "Lone Pine Capital, L.L.C.": { slug: "lone-pine", display: "Lone Pine Capital", manager: "Stephen Mandel" },
  "Oakcliff Capital Management LLC": { slug: "oakcliff", display: "Oakcliff Capital", manager: "Bryan Lawrence" },
  "Octahedron Capital Management LP": { slug: "octahedron", display: "Octahedron Capital", manager: "Ram Parameswaran" },
  "Pershing Square Capital Management, L.P.": { slug: "pershing-square", display: "Pershing Square", manager: "Bill Ackman" },
  "Punch Card Management, LP": { slug: "punch-card", display: "Punch Card Management", manager: "Norbert Lou" },
  "Rivulet Capital, LLC": { slug: "rivulet", display: "Rivulet Capital", manager: "Joshua Kuntz & Barry Lebovits" },
  "Ruane, Cunniff & Goldfarb L.P.": { slug: "ruane-cunniff", display: "Ruane, Cunniff & Goldfarb", manager: null },
  "RV Capital AG": { slug: "rv-capital", display: "RV Capital", manager: "Rob Vinall" },
  "Skye Global Management LP": { slug: "skye-global", display: "Skye Global Management", manager: "Jamie Sterne" },
  "Soroban Capital Partners LP": { slug: "soroban", display: "Soroban Capital", manager: "Eric Mandelblatt" },
  "Surgocap Partners LP": { slug: "surgocap", display: "Surgocap Partners", manager: "Mala Gaonkar" },
  "TCI Fund Management Limited": { slug: "tci", display: "TCI Fund Management", manager: "Sir Christopher Hohn" },
  "The WindAcre Partnership LLC": { slug: "windacre", display: "The WindAcre Partnership", manager: "Snehal Amin" },
  "Triple Frond Partners LLC": { slug: "triple-frond", display: "Triple Frond Partners", manager: null },
  "Valley Forge Capital Management, LP": { slug: "valley-forge", display: "Valley Forge Capital", manager: "Dev Kantesaria" },
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tickerSlug(ticker: string): string {
  return slugify(ticker);
}

export function quarterLabel(isoDate: string): string {
  const [y, m] = isoDate.split("-").map(Number);
  return `Q${Math.ceil(m / 3)} ${y}`;
}

function formatChangeShares(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(abs / 1e3).toFixed(0)}K`;
  return abs.toLocaleString("en-US");
}

function actionFor(row: SheetRow): HoldingAction {
  if (row.sharesChangePct === 100) return "new";
  if (row.sharesChangePct != null && row.sharesChangePct > 0) return "add";
  if (row.sharesChangePct != null && row.sharesChangePct < 0) return "trim";
  return "hold";
}

/**
 * The site displays the most recent quarter only: funds without a filing in
 * the globally-latest snapshot (stale or removed from the universe) are
 * dropped. Older snapshots still feed QoQ change and the trend sparkline.
 */
function buildInvestors(rows: SheetRow[]): Investor[] {
  const globalLatest = rows.reduce(
    (max, r) => (r.snapshot > max ? r.snapshot : max),
    "",
  );

  const byFund = new Map<string, SheetRow[]>();
  for (const r of rows) {
    const list = byFund.get(r.fund) ?? [];
    list.push(r);
    byFund.set(r.fund, list);
  }

  const result: Investor[] = [];
  for (const [fund, fundRows] of byFund) {
    const snapshots = [...new Set(fundRows.map((r) => r.snapshot))].sort();
    const latest = snapshots[snapshots.length - 1];
    if (latest !== globalLatest) continue;
    const previous = snapshots[snapshots.length - 2];

    const totalFor = (snap: string) =>
      fundRows
        .filter((r) => r.snapshot === snap)
        .reduce((sum, r) => sum + (r.valueMM ?? 0), 0) * 1e6;

    // Merge the rare duplicate ticker rows (e.g. 13F + aggregated MF data).
    const merged = new Map<string, SheetRow>();
    for (const r of fundRows.filter((r) => r.snapshot === latest)) {
      const existing = merged.get(r.ticker);
      if (!existing) {
        merged.set(r.ticker, { ...r });
      } else {
        existing.valueMM = (existing.valueMM ?? 0) + (r.valueMM ?? 0);
        existing.weightPct = (existing.weightPct ?? 0) + (r.weightPct ?? 0);
        existing.shares = (existing.shares ?? 0) + (r.shares ?? 0);
      }
    }
    const latestRows = [...merged.values()].sort(
      (a, b) => (b.weightPct ?? 0) - (a.weightPct ?? 0),
    );

    const holdings: Holding[] = latestRows.map((r) => ({
      ticker: r.ticker,
      tickerSlug: tickerSlug(r.ticker),
      company: r.company,
      weight: r.weightPct ?? 0,
      value: (r.valueMM ?? 0) * 1e6,
      shares: r.shares ?? 0,
      action: actionFor(r),
      changePct: r.sharesChangePct,
    }));

    const activity: Activity[] = [];
    for (const r of latestRows) {
      const action = actionFor(r);
      if (action === "hold") continue;
      const delta = r.sharesChange == null ? "" : formatChangeShares(r.sharesChange);
      activity.push({
        ticker: r.ticker,
        tickerSlug: tickerSlug(r.ticker),
        company: r.company,
        action,
        detail:
          action === "new"
            ? `New position of ${formatChangeShares(r.shares ?? 0)} shares`
            : action === "add"
              ? `Added ${delta} shares, +${(r.sharesChangePct ?? 0).toFixed(1)}%`
              : `Sold ${delta} shares, ${(r.sharesChangePct ?? 0).toFixed(1)}%`,
      });
    }
    if (previous) {
      const latestTickers = new Set(latestRows.map((r) => r.ticker));
      const exited = new Set<string>();
      for (const r of fundRows.filter((r) => r.snapshot === previous)) {
        if (!latestTickers.has(r.ticker) && !exited.has(r.ticker)) {
          exited.add(r.ticker);
          activity.push({
            ticker: r.ticker,
            tickerSlug: tickerSlug(r.ticker),
            company: r.company,
            action: "exit",
            detail: "Closed position",
          });
        }
      }
    }

    const aum = totalFor(latest);
    const prevTotal = previous ? totalFor(previous) : null;
    const meta = FUND_META[fund] ?? {
      slug: slugify(fund),
      display: fund,
      manager: null,
    };

    result.push({
      slug: meta.slug,
      name: meta.display,
      manager: meta.manager,
      aum,
      qoqChange:
        prevTotal && prevTotal > 0 ? ((aum - prevTotal) / prevTotal) * 100 : null,
      holdingsCount: latestRows.length,
      concentration: latestRows
        .slice(0, 10)
        .reduce((sum, r) => sum + (r.weightPct ?? 0), 0),
      asOf: latest,
      quarterLabel: quarterLabel(latest),
      trend: snapshots.map(totalFor),
      holdings,
      activity,
    });
  }

  return result.sort((a, b) => b.aum - a.aum);
}

export const investors: Investor[] = buildInvestors(rawHoldings as SheetRow[]);

export const LATEST_QUARTER = quarterLabel(
  investors.map((i) => i.asOf).sort().at(-1) ?? "2026-03-30",
);

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((i) => i.slug === slug);
}

export interface StockAggregate {
  ticker: string;
  tickerSlug: string;
  company: string;
  holders: {
    investor: Investor;
    holding: Holding;
  }[];
  totalValue: number;
  buys: number;
  sells: number;
}

export function aggregateStocks(): StockAggregate[] {
  const map = new Map<string, StockAggregate>();
  for (const inv of investors) {
    for (const h of inv.holdings) {
      let agg = map.get(h.tickerSlug);
      if (!agg) {
        agg = {
          ticker: h.ticker,
          tickerSlug: h.tickerSlug,
          company: h.company,
          holders: [],
          totalValue: 0,
          buys: 0,
          sells: 0,
        };
        map.set(h.tickerSlug, agg);
      }
      agg.holders.push({ investor: inv, holding: h });
      agg.totalValue += h.value;
      if (h.action === "new" || h.action === "add") agg.buys += 1;
      if (h.action === "trim" || h.action === "exit") agg.sells += 1;
    }
  }
  return [...map.values()].sort((a, b) => b.totalValue - a.totalValue);
}

export function getStock(slug: string): StockAggregate | undefined {
  const target = slug.toLowerCase();
  return aggregateStocks().find((s) => s.tickerSlug === target);
}

export const platformStats = {
  investorsTracked: investors.length,
  assetsTracked: investors.reduce((sum, i) => sum + i.aum, 0),
};
