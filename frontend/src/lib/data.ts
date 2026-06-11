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
  company: string;
  weight: number; // % of portfolio
  value: number; // USD
  shares: number;
  action: HoldingAction;
  changePct: number | null; // share count change vs prior quarter
}

export interface Activity {
  ticker: string;
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
const FUND_META: Record<string, { slug: string; display: string; manager: string | null }> = {
  "Akre Capital Management, LLC": {
    slug: "akre-capital",
    display: "Akre Capital Management",
    manager: "John Neff",
  },
  "AltaRock Partners LP": {
    slug: "altarock-partners",
    display: "AltaRock Partners",
    manager: "Mark Massey",
  },
  "Altimeter Capital Management, LP": {
    slug: "altimeter-capital",
    display: "Altimeter Capital Management",
    manager: "Brad Gerstner",
  },
  "Atreides Management, LP": {
    slug: "atreides-management",
    display: "Atreides Management",
    manager: "Gavin Baker",
  },
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function buildInvestors(rows: SheetRow[]): Investor[] {
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
    const previous = snapshots[snapshots.length - 2];

    const totalFor = (snap: string) =>
      fundRows
        .filter((r) => r.snapshot === snap)
        .reduce((sum, r) => sum + (r.valueMM ?? 0), 0) * 1e6;

    const latestRows = fundRows
      .filter((r) => r.snapshot === latest)
      .sort((a, b) => (b.weightPct ?? 0) - (a.weightPct ?? 0));

    const holdings: Holding[] = latestRows.map((r) => ({
      ticker: r.ticker,
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
      for (const r of fundRows.filter((r) => r.snapshot === previous)) {
        if (!latestTickers.has(r.ticker)) {
          activity.push({
            ticker: r.ticker,
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
  investors.map((i) => i.asOf).sort().at(-1) ?? "2025-12-30",
);

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((i) => i.slug === slug);
}

export interface StockAggregate {
  ticker: string;
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
      let agg = map.get(h.ticker);
      if (!agg) {
        agg = { ticker: h.ticker, company: h.company, holders: [], totalValue: 0, buys: 0, sells: 0 };
        map.set(h.ticker, agg);
      }
      agg.holders.push({ investor: inv, holding: h });
      agg.totalValue += h.value;
      if (h.action === "new" || h.action === "add") agg.buys += 1;
      if (h.action === "trim" || h.action === "exit") agg.sells += 1;
    }
  }
  return [...map.values()].sort((a, b) => b.totalValue - a.totalValue);
}

export function getStock(ticker: string): StockAggregate | undefined {
  return aggregateStocks().find(
    (s) => s.ticker.toLowerCase() === ticker.toLowerCase(),
  );
}

export const platformStats = {
  investorsTracked: investors.length,
  assetsTracked: investors.reduce((sum, i) => sum + i.aum, 0),
};
