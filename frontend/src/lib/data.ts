import rawHoldings from "@/data/holdings.json";
import rawSectors from "@/data/sectors.json";
import rawModels from "@/data/models.json";

/** Custom sector map (not GICS) — see src/data/sectors.json. */
const SECTORS: Record<string, string> = rawSectors as Record<string, string>;
export const UNCLASSIFIED = "Unclassified";
export function sectorOf(ticker: string): string {
  return SECTORS[ticker] ?? UNCLASSIFIED;
}

/** Business-model layer above the granular sectors — see src/data/models.json. */
const MODELS: Record<string, string> = rawModels as Record<string, string>;
export const OTHER_MODEL = "Cyclical & other";
export function modelOf(sector: string): string {
  return MODELS[sector] ?? OTHER_MODEL;
}

/** Roll granular sector slices up into business-model slices. */
export function rollUpModels(sectors: SectorSlice[]): SectorSlice[] {
  const map = new Map<string, SectorSlice>();
  for (const s of sectors) {
    const m = modelOf(s.sector);
    const slice = map.get(m) ?? { sector: m, weight: 0, count: 0 };
    slice.weight += s.weight;
    slice.count += s.count;
    map.set(m, slice);
  }
  return [...map.values()].sort((a, b) => b.weight - a.weight);
}

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
  prevWeight: number | null; // % of portfolio in the prior snapshot, null if new
  sector: string;
  model: string;
}

export type Tier = "clone" | "read-only" | "trader";

export interface SectorSlice {
  sector: string;
  weight: number; // % of portfolio
  count: number;
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
  isLatest: boolean; // has filed for the newest quarter in the sheet
  offCycle: boolean; // filing date is not the quarter-end most managers use
  trend: number[]; // portfolio value per snapshot, oldest first
  holdings: Holding[];
  activity: Activity[];
  sectors: SectorSlice[]; // custom-sector breakdown, largest first
  tier: Tier | null; // editorial tier, see FUND_META
  note: string | null; // editorial caveat shown on the manager page
  ranking: Ranking;
}

/**
 * How a manager scores on the filing record alone. Every component is
 * 0-100 and reproducible from the sheet; performance is deliberately
 * excluded because 13Fs cannot measure it.
 */
export interface Ranking {
  score: number; // weighted composite, 0-100
  continuity: number; // share of the earliest top-10 still held today
  concentration: number; // top-10 weight, capped at 60% = 100
  stability: number; // 100 minus trailing-4-quarter name turnover
  conviction: number; // adds outnumber trims among positions >= 2%
  quarters: number; // how many snapshots the record rests on
}

/** Display metadata for funds we know; anything new in the sheet still works. */
const FUND_META: Record<
  string,
  {
    slug: string;
    display: string;
    manager: string | null;
    tier?: Tier;
    note?: string;
  }
> = {
  "Akre Capital Management, LLC": { slug: "akre-capital", display: "Akre Capital Management", manager: "John Neff", tier: "read-only" },
  "AltaRock Partners LP": { slug: "altarock-partners", display: "AltaRock Partners", manager: "Mark Massey", tier: "clone" },
  "Altimeter Capital Management, LP": { slug: "altimeter-capital", display: "Altimeter Capital", manager: "Brad Gerstner", tier: "read-only" },
  "Atreides Management, LP": { slug: "atreides-management", display: "Atreides Management", manager: "Gavin Baker", tier: "trader", note: "Long/short book with index hedges; the 13F shows roughly half the exposure and turns over most names each quarter." },
  "Blue Box Wealth Management SA": { slug: "blue-box", display: "Blue Box Wealth Management", manager: "William de Gale" },
  "Blue Whale Capital LLP": { slug: "blue-whale", display: "Blue Whale Capital", manager: "Stephen Yiu", tier: "read-only" },
  "Coatue Management, L.L.C.": { slug: "coatue", display: "Coatue Management", manager: "Philippe Laffont", tier: "read-only" },
  "Crake Asset Management LLP": { slug: "crake", display: "Crake Asset Management", manager: null },
  "Edgewood Management LLC": { slug: "edgewood", display: "Edgewood Management", manager: "Alan Breed", tier: "read-only" },
  "Egerton Capital (UK) LLP": { slug: "egerton", display: "Egerton Capital", manager: "John Armitage" },
  "Fundsmith Investment Services Ltd.": { slug: "fundsmith-investment-services", display: "Fundsmith Investment Services", manager: "Terry Smith", tier: "clone" },
  "Fundsmith LLP": { slug: "fundsmith", display: "Fundsmith", manager: "Terry Smith", tier: "clone" },
  "Harvard Management Company, Inc.": { slug: "harvard-management", display: "Harvard Management Company", manager: null },
  "I.G.Y. Ltd": { slug: "igy", display: "I.G.Y.", manager: "Nick Sleep" },
  "Lakehouse Capital Pty Ltd.": { slug: "lakehouse", display: "Lakehouse Capital", manager: null, tier: "read-only" },
  "Lone Pine Capital, L.L.C.": { slug: "lone-pine", display: "Lone Pine Capital", manager: "Stephen Mandel", tier: "read-only" },
  "Miller Value Partners Appreciation ETF": { slug: "miller-value", display: "Miller Value Partners", manager: "Bill Miller IV" },
  "Oakcliff Capital Management LLC": { slug: "oakcliff", display: "Oakcliff Capital", manager: "Bryan Lawrence" },
  "Octahedron Capital Management LP": { slug: "octahedron", display: "Octahedron Capital", manager: "Ram Parameswaran" },
  "Pershing Square Capital Management, L.P.": { slug: "pershing-square", display: "Pershing Square", manager: "Bill Ackman", tier: "read-only" },
  "Punch Card Management, LP": { slug: "punch-card", display: "Punch Card Management", manager: "Norbert Lou" },
  "Rivulet Capital, LLC": { slug: "rivulet", display: "Rivulet Capital", manager: "Joshua Kuntz & Barry Lebovits" },
  "Ruane, Cunniff & Goldfarb L.P.": { slug: "ruane-cunniff", display: "Ruane, Cunniff & Goldfarb", manager: null },
  "RV Capital AG": { slug: "rv-capital", display: "RV Capital", manager: "Rob Vinall", tier: "clone" },
  "Skye Global Management LP": { slug: "skye-global", display: "Skye Global Management", manager: "Jamie Sterne" },
  "Soroban Capital Partners LP": { slug: "soroban", display: "Soroban Capital", manager: "Eric Mandelblatt", tier: "read-only", note: "Reports call options at full notional, so the headline portfolio value overstates equity exposure." },
  "Stenham Growth": { slug: "stenham-growth", display: "Stenham Growth", manager: null },
  "Surgocap Partners LP": { slug: "surgocap", display: "Surgocap Partners", manager: "Mala Gaonkar" },
  "TCI Fund Management Limited": { slug: "tci", display: "TCI Fund Management", manager: "Sir Christopher Hohn", tier: "clone" },
  "The WindAcre Partnership LLC": { slug: "windacre", display: "The WindAcre Partnership", manager: "Snehal Amin" },
  "Triple Frond Partners LLC": { slug: "triple-frond", display: "Triple Frond Partners", manager: null },
  "Valley Forge Capital Management, LP": { slug: "valley-forge", display: "Valley Forge Capital", manager: "Dev Kantesaria", tier: "clone" },
};

export const TIER_LABEL: Record<Tier, string> = {
  clone: "Clone",
  "read-only": "Read-only",
  trader: "Trader",
};
export const TIER_BLURB: Record<Tier, string> = {
  clone: "Long-hold, valuation-disciplined books whose positions are worth studying as candidates.",
  "read-only": "Good signal on what quality managers own, but the book is shaped by something other than moat-and-price.",
  trader: "Macro, event-driven or activist books; the 13F is a trading snapshot, not a list of things to own.",
};


/**
 * The sheet labels the same manager differently across quarters (a renamed
 * Dataroma heading). Aliases fold those labels together so one manager keeps
 * one page and one continuous history.
 */
const FUND_ALIASES: Record<string, string> = {
  "Crake Asset Management": "Crake Asset Management LLP",
};

function canonicalFund(fund: string): string {
  return FUND_ALIASES[fund] ?? fund;
}

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

/** "2026-04-29" -> "2026-2": the calendar quarter the filing falls in. */
function quarterKey(isoDate: string): string {
  const [y, m] = isoDate.split("-").map(Number);
  return `${y}-${Math.ceil(m / 3)}`;
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
 * Every manager in the sheet gets a page, shown at its own most recent
 * filing. Managers that have not yet filed for the newest quarter in the
 * sheet are marked `isLatest: false` rather than dropped from the site.
 * Older snapshots feed QoQ change, the trend sparkline and position history.
 */
function buildInvestors(rows: SheetRow[]): Investor[] {
  const globalLatest = rows.reduce(
    (max, r) => (r.snapshot > max ? r.snapshot : max),
    "",
  );

  // Not every manager reports on the same day: 13F filers use the calendar
  // quarter-end, while funds disclosing as "Aggregate MFs" file off-cycle.
  // Staleness is therefore judged by quarter, and the date is surfaced for
  // any manager filing away from the day most of them use.
  const datesPerQuarter = new Map<string, Map<string, number>>();
  for (const r of rows) {
    const q = quarterKey(r.snapshot);
    const counts = datesPerQuarter.get(q) ?? new Map<string, number>();
    counts.set(r.snapshot, (counts.get(r.snapshot) ?? 0) + 1);
    datesPerQuarter.set(q, counts);
  }
  const usualDate = new Map<string, string>();
  for (const [q, counts] of datesPerQuarter) {
    usualDate.set(
      q,
      [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0],
    );
  }

  const byFund = new Map<string, SheetRow[]>();
  for (const r of rows) {
    const fund = canonicalFund(r.fund);
    const list = byFund.get(fund) ?? [];
    list.push(r);
    byFund.set(fund, list);
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

    const prevWeights = new Map<string, number>();
    if (previous) {
      for (const r of fundRows.filter((r) => r.snapshot === previous)) {
        prevWeights.set(
          r.ticker,
          (prevWeights.get(r.ticker) ?? 0) + (r.weightPct ?? 0),
        );
      }
    }

    const holdings: Holding[] = latestRows.map((r) => ({
      ticker: r.ticker,
      tickerSlug: tickerSlug(r.ticker),
      company: r.company,
      weight: r.weightPct ?? 0,
      value: (r.valueMM ?? 0) * 1e6,
      shares: r.shares ?? 0,
      action: actionFor(r),
      changePct: r.sharesChangePct,
      prevWeight: previous ? (prevWeights.get(r.ticker) ?? null) : null,
      sector: sectorOf(r.ticker),
      model: modelOf(sectorOf(r.ticker)),
    }));

    const sectorMap = new Map<string, SectorSlice>();
    for (const h of holdings) {
      const slice = sectorMap.get(h.sector) ?? {
        sector: h.sector,
        weight: 0,
        count: 0,
      };
      slice.weight += h.weight;
      slice.count += 1;
      sectorMap.set(h.sector, slice);
    }
    const sectors = [...sectorMap.values()].sort((a, b) => b.weight - a.weight);

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
      isLatest: quarterKey(latest) === quarterKey(globalLatest),
      offCycle: usualDate.get(quarterKey(latest)) !== latest,
      trend: snapshots.map(totalFor),
      holdings,
      activity,
      sectors,
      tier: meta.tier ?? null,
      note: meta.note ?? null,
      ranking: rankFund(fundRows, snapshots, latestRows),
    });
  }

  return result.sort((a, b) => b.aum - a.aum);
}

/* ------------------------------------------------------------------ */
/* Ranking                                                             */
/* ------------------------------------------------------------------ */

const clamp = (n: number) => Math.max(0, Math.min(100, n));

function tickersAt(rows: SheetRow[], snap: string): Set<string> {
  return new Set(rows.filter((r) => r.snapshot === snap).map((r) => r.ticker));
}

function rankFund(
  fundRows: SheetRow[],
  snapshots: string[],
  latestRows: SheetRow[],
): Ranking {
  const latest = snapshots[snapshots.length - 1];
  const nowSet = tickersAt(fundRows, latest);

  // Continuity: of the ten largest positions in the earliest snapshot we
  // have, how many are still in the book today.
  const earliest = snapshots[0];
  const earliestTop = fundRows
    .filter((r) => r.snapshot === earliest)
    .sort((a, b) => (b.weightPct ?? 0) - (a.weightPct ?? 0))
    .slice(0, 10)
    .map((r) => r.ticker);
  const continuity =
    earliestTop.length && snapshots.length > 1
      ? (earliestTop.filter((t) => nowSet.has(t)).length / earliestTop.length) *
        100
      : 50;

  // Concentration: top-10 weight; 60% or more scores full marks.
  const top10 = latestRows
    .slice(0, 10)
    .reduce((sum, r) => sum + (r.weightPct ?? 0), 0);
  const concentration = clamp((top10 / 60) * 100);

  // Stability: names added + dropped per quarter over the trailing four
  // quarters, as a share of the average book size, inverted.
  const window = snapshots.slice(-5);
  let churn = 0;
  let books = 0;
  for (let i = 1; i < window.length; i++) {
    const prev = tickersAt(fundRows, window[i - 1]);
    const cur = tickersAt(fundRows, window[i]);
    let added = 0;
    let dropped = 0;
    for (const t of cur) if (!prev.has(t)) added++;
    for (const t of prev) if (!cur.has(t)) dropped++;
    const avgBook = (prev.size + cur.size) / 2 || 1;
    churn += (added + dropped) / avgBook;
    books++;
  }
  const stability = books ? clamp(100 - (churn / books) * 100) : 50;

  // Conviction: among meaningful positions (>= 2%), do adds outnumber trims?
  const meaningful = latestRows.filter((r) => (r.weightPct ?? 0) >= 2);
  const adds = meaningful.filter(
    (r) => r.sharesChangePct != null && r.sharesChangePct > 0 && r.sharesChangePct < 100,
  ).length;
  const trims = meaningful.filter(
    (r) => r.sharesChangePct != null && r.sharesChangePct < 0,
  ).length;
  const conviction =
    adds + trims === 0 ? 50 : clamp((adds / (adds + trims)) * 100);

  const score =
    0.35 * continuity + 0.25 * stability + 0.25 * concentration + 0.15 * conviction;

  return {
    score: Math.round(score),
    continuity: Math.round(continuity),
    concentration: Math.round(concentration),
    stability: Math.round(stability),
    conviction: Math.round(conviction),
    quarters: snapshots.length,
  };
}

/** Managers ordered by composite score, best first. */
export function rankedInvestors(): Investor[] {
  return [...investors].sort((a, b) => b.ranking.score - a.ranking.score);
}

/** Aggregate custom-sector exposure across all tracked managers, equal-weighted. */
export function aggregateSectors(): SectorSlice[] {
  const map = new Map<string, SectorSlice>();
  const n = investors.length || 1;
  for (const inv of investors) {
    for (const s of inv.sectors) {
      const slice = map.get(s.sector) ?? { sector: s.sector, weight: 0, count: 0 };
      slice.weight += s.weight / n;
      slice.count += s.count;
      map.set(s.sector, slice);
    }
  }
  return [...map.values()].sort((a, b) => b.weight - a.weight);
}

export const investors: Investor[] = buildInvestors(rawHoldings as SheetRow[]);

/** Newest snapshot anywhere in the sheet — the quarter the site headlines. */
export const LATEST_SNAPSHOT =
  (rawHoldings as SheetRow[])
    .map((r) => r.snapshot)
    .sort()
    .at(-1) ?? "2026-03-30";

export const LATEST_QUARTER = quarterLabel(LATEST_SNAPSHOT);

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
  avgWeight: number; // mean portfolio weight across holders, %
  avgWeightChange: number | null; // mean change in weight vs prior quarter, pp
  sector: string;
  model: string;
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
          avgWeight: 0,
          avgWeightChange: null,
          sector: h.sector,
          model: h.model,
        };
        map.set(h.tickerSlug, agg);
      }
      agg.holders.push({ investor: inv, holding: h });
      agg.totalValue += h.value;
      if (h.action === "new" || h.action === "add") agg.buys += 1;
      if (h.action === "trim" || h.action === "exit") agg.sells += 1;
    }
  }
  for (const agg of map.values()) {
    const n = agg.holders.length;
    agg.avgWeight = agg.holders.reduce((s, x) => s + x.holding.weight, 0) / n;
    const withPrev = agg.holders.filter((x) => x.holding.prevWeight != null);
    agg.avgWeightChange = withPrev.length
      ? withPrev.reduce(
          (s, x) => s + (x.holding.weight - (x.holding.prevWeight as number)),
          0,
        ) / withPrev.length
      : null;
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

/* ------------------------------------------------------------------ */
/* Position history                                                    */
/* ------------------------------------------------------------------ */

/** One quarter of a single manager's position in a single security. */
export interface PositionQuarter {
  snapshot: string;
  quarterLabel: string;
  held: boolean; // false = the position is gone as of this filing
  shares: number | null;
  sharesChange: number | null;
  changePct: number | null;
  value: number | null; // USD
  weight: number | null; // % of portfolio
  filingType: string;
  action: HoldingAction;
}

export interface PositionHistory {
  investor: Investor;
  ticker: string;
  tickerSlug: string;
  company: string;
  /** Newest quarter first. */
  quarters: PositionQuarter[];
  /** The position as of the manager's most recent filing, if still held. */
  current: PositionQuarter | null;
}

/** Merge the rare duplicate ticker rows (e.g. 13F + aggregated MF data). */
function mergeRows(rows: SheetRow[]): SheetRow {
  const merged = { ...rows[0] };
  for (const r of rows.slice(1)) {
    merged.valueMM = (merged.valueMM ?? 0) + (r.valueMM ?? 0);
    merged.weightPct = (merged.weightPct ?? 0) + (r.weightPct ?? 0);
    merged.shares = (merged.shares ?? 0) + (r.shares ?? 0);
  }
  return merged;
}

function buildHistories(rows: SheetRow[]): Map<string, PositionHistory> {
  const byFund = new Map<string, SheetRow[]>();
  for (const r of rows) {
    const fund = canonicalFund(r.fund);
    const list = byFund.get(fund) ?? [];
    list.push(r);
    byFund.set(fund, list);
  }

  const out = new Map<string, PositionHistory>();
  for (const [fund, fundRows] of byFund) {
    const meta = FUND_META[fund];
    const slug = meta ? meta.slug : slugify(fund);
    const investor = investors.find((i) => i.slug === slug);
    if (!investor) continue;

    const snapshots = [...new Set(fundRows.map((r) => r.snapshot))].sort();

    // ticker -> snapshot -> merged row
    const byTicker = new Map<string, Map<string, SheetRow>>();
    for (const r of fundRows) {
      const perSnapshot = byTicker.get(r.ticker) ?? new Map<string, SheetRow>();
      const existing = perSnapshot.get(r.snapshot);
      perSnapshot.set(
        r.snapshot,
        existing ? mergeRows([existing, r]) : { ...r },
      );
      byTicker.set(r.ticker, perSnapshot);
    }

    for (const [ticker, perSnapshot] of byTicker) {
      const quarters: PositionQuarter[] = [];
      let heldLast = false;
      let company = "";
      for (const [i, snap] of snapshots.entries()) {
        const row = perSnapshot.get(snap);
        if (row) {
          if (row.company) company = row.company;
          const changePct = row.sharesChangePct;
          // A position is "new" only when the manager reported an earlier
          // quarter without it. At the very first quarter we have for a
          // manager the sheet's own change column is the only evidence.
          const isNew =
            i > 0 ? !heldLast : changePct === 100 || row.sharesChange == null;
          const action: HoldingAction = isNew
            ? "new"
            : changePct != null && changePct > 0
              ? "add"
              : changePct != null && changePct < 0
                ? "trim"
                : "hold";
          quarters.push({
            snapshot: snap,
            quarterLabel: quarterLabel(snap),
            held: true,
            shares: row.shares,
            sharesChange: row.sharesChange,
            changePct,
            value: row.valueMM == null ? null : row.valueMM * 1e6,
            weight: row.weightPct,
            filingType: row.filingType,
            action,
          });
          heldLast = true;
        } else if (heldLast) {
          quarters.push({
            snapshot: snap,
            quarterLabel: quarterLabel(snap),
            held: false,
            shares: 0,
            sharesChange: null,
            changePct: null,
            value: null,
            weight: null,
            filingType: "",
            action: "exit",
          });
          heldLast = false;
        }
      }
      if (quarters.length === 0) continue;
      quarters.reverse();
      const newest = quarters[0];
      out.set(`${slug}/${tickerSlug(ticker)}`, {
        investor,
        ticker,
        tickerSlug: tickerSlug(ticker),
        company,
        quarters,
        current:
          newest.held && newest.snapshot === investor.asOf ? newest : null,
      });
    }
  }
  return out;
}

const histories = buildHistories(rawHoldings as SheetRow[]);

/** Every (manager, security) pair the sheet has ever reported. */
export function positionHistoryParams(): { slug: string; ticker: string }[] {
  return [...histories.keys()].map((key) => {
    const [slug, ticker] = key.split("/");
    return { slug, ticker };
  });
}

export function getPositionHistory(
  slug: string,
  ticker: string,
): PositionHistory | undefined {
  return histories.get(`${slug}/${ticker.toLowerCase()}`);
}
