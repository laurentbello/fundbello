import type { Metadata } from "next";
import { aggregateStocks, LATEST_QUARTER } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ConsensusTable from "@/components/ConsensusTable";

export const metadata: Metadata = {
  title: "Top Holdings",
  description:
    "Every security held by tracked managers — sortable by number of holders, average portfolio weight, or quarter-on-quarter conviction, with custom sector filters.",
};

export default function StocksPage() {
  const rows = aggregateStocks().map((s) => ({
    ticker: s.ticker,
    tickerSlug: s.tickerSlug,
    company: s.company,
    sector: s.sector,
    holders: s.holders.length,
    totalValue: s.totalValue,
    avgWeight: s.avgWeight,
    avgWeightChange: s.avgWeightChange,
    buys: s.buys,
    sells: s.sells,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">
          Consensus Holdings
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Where the smart money sits
        </h1>
        <p className="mt-4 leading-relaxed text-fg-soft">
          Every security held by tracked managers as of {LATEST_QUARTER}. Sort
          by how many hold it, how much of the book they give it, or whether
          that weight grew or shrank this quarter. Sectors are our own map, not
          GICS — Visa is a payment network here, not a bank.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <ConsensusTable rows={rows} showRank />
        </div>
      </Reveal>
    </div>
  );
}
