import type { Metadata } from "next";
import Link from "next/link";
import rawSectors from "@/data/sectors.json";
import { aggregateStocks, modelOf, OTHER_MODEL } from "@/lib/data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Classification",
  description:
    "How Dataroma Global classifies businesses — ten business-model buckets above a custom industry map, deliberately not GICS.",
};

/** The ten buckets, in display order, each with the question it answers. */
const BUCKETS: { name: string; blurb: string }[] = [
  {
    name: "Repeat-purchase consumer",
    blurb:
      "Small-ticket products bought again and again out of habit or brand loyalty. Revenue is a stream of many low-stakes decisions, which makes it unusually predictable.",
  },
  {
    name: "Tollbooths & networks",
    blurb:
      "Businesses that sit in the middle of a flow — payments, trades, ratings, data feeds, towers — and take a small slice of every transaction. Visa lives here, not in financials: it carries no credit risk.",
  },
  {
    name: "Mission-critical software",
    blurb:
      "Software embedded in a customer's daily operations, priced far below the cost of replacing it. Switching is painful, so pricing power and retention are structural.",
  },
  {
    name: "Healthcare consumables & tools",
    blurb:
      "Instruments, implants, diagnostics and pharma whose demand is driven by patients and procedures rather than the economic cycle, often with a razor-and-blade consumables tail.",
  },
  {
    name: "Aftermarket industrials",
    blurb:
      "Equipment makers and distributors whose profit comes from the installed base — spares, service, gases, rentals — rather than the original sale.",
  },
  {
    name: "Infrastructure & concessions",
    blurb:
      "Physical assets that cannot be replicated: rails, toll roads, airports, quarries, grids. Growth is mostly price, and the moat is location or licence.",
  },
  {
    name: "Internet platforms & media",
    blurb:
      "Ad-funded and marketplace platforms with network effects. High returns, but the customer is often the product and regulatory and disruption risk run higher than the rest of the list.",
  },
  {
    name: "AI capex chain",
    blurb:
      "Chips, tools, optics, networking and data-centre capacity that all monetise the same hyperscaler capex budget. Grouped together because they move together.",
  },
  {
    name: "Financials proper",
    blurb:
      "Banks, insurers, asset managers and lenders — businesses that take balance-sheet or credit risk. Kept separate so leverage is visible.",
  },
  {
    name: OTHER_MODEL,
    blurb:
      "Commodity, capital-intensive or one-off businesses whose earnings follow the cycle: mining, energy, autos, homebuilders, airlines, E&C.",
  },
];

export default function ClassificationPage() {
  const sectorMap = rawSectors as Record<string, string>;
  const stocks = aggregateStocks();
  const nameOf = new Map(stocks.map((s) => [s.ticker, s]));

  // bucket -> industry -> tickers (tracked names first, others after)
  const tree = new Map<string, Map<string, string[]>>();
  for (const [ticker, industry] of Object.entries(sectorMap)) {
    if (ticker.startsWith("_")) continue;
    const bucket = modelOf(industry);
    const byIndustry = tree.get(bucket) ?? new Map<string, string[]>();
    byIndustry.set(industry, [...(byIndustry.get(industry) ?? []), ticker]);
    tree.set(bucket, byIndustry);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-medium tracking-widest text-gold uppercase">Method</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          How businesses are classified
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-soft">
          This site does not use GICS. Standard sector codes group companies by what they
          are called, not by how they make money — which is how a payment network ends up
          next to a bank. Instead every holding is tagged twice: a granular{" "}
          <span className="text-fg">industry</span> label, and above it one of ten{" "}
          <span className="text-fg">business-model</span> buckets that answer the questions
          a long-term owner actually asks — what is sold, how often, and why the customer
          keeps paying.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-fg-faint">
          The map is hand-maintained and opinionated. Names not yet mapped show as
          Unclassified and roll into &ldquo;{OTHER_MODEL}&rdquo;.
        </p>
      </Reveal>

      <div className="mt-12 space-y-6">
        {BUCKETS.map((b, i) => {
          const industries = tree.get(b.name);
          const count = industries
            ? [...industries.values()].reduce((s, t) => s + t.length, 0)
            : 0;
          return (
            <Reveal key={b.name} delay={40 * i}>
              <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
                  <h2 className="font-display text-xl font-semibold text-fg">{b.name}</h2>
                  <span className="text-xs text-fg-faint">
                    {count} {count === 1 ? "name" : "names"}
                  </span>
                </div>
                <div className="px-6 py-5">
                  <p className="max-w-3xl text-sm leading-relaxed text-fg-soft">{b.blurb}</p>
                  {industries && (
                    <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[...industries.entries()]
                        .sort((x, y) => y[1].length - x[1].length)
                        .map(([industry, tickers]) => (
                          <div key={industry}>
                            <dt className="text-[11px] tracking-widest text-fg-faint uppercase">
                              {industry}
                            </dt>
                            <dd className="mt-1 flex flex-wrap gap-1.5">
                              {tickers.sort().map((t) => {
                                const s = nameOf.get(t);
                                return s ? (
                                  <Link
                                    key={t}
                                    href={`/stocks/${s.tickerSlug}`}
                                    title={s.company}
                                    className="rounded-md border border-line px-1.5 py-0.5 text-xs text-fg transition-colors hover:border-gold/40 hover:text-gold-soft"
                                  >
                                    {t}
                                  </Link>
                                ) : (
                                  <span
                                    key={t}
                                    className="rounded-md border border-line/60 px-1.5 py-0.5 text-xs text-fg-faint"
                                  >
                                    {t}
                                  </span>
                                );
                              })}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  )}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
