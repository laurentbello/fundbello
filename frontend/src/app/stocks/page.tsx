import type { Metadata } from "next";
import Link from "next/link";
import { aggregateStocks, LATEST_QUARTER } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Holdings",
  description:
    "The most widely held securities across the world's legendary investors, ranked by combined position value.",
};

export default function StocksPage() {
  const stocks = aggregateStocks();

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
          Every security held by tracked managers, ranked by combined position
          value as of {LATEST_QUARTER}. Click through to see who owns it — and
          who&apos;s buying or selling.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-7 py-4 font-medium">#</th>
                  <th scope="col" className="px-4 py-4 font-medium">
                    Security
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    Holders
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    Combined value
                  </th>
                  <th scope="col" className="px-7 py-4 text-right font-medium">
                    Quarter flow
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {stocks.map((s, i) => (
                  <tr
                    key={s.ticker}
                    className="group border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-7 py-4 text-fg-faint">{i + 1}</td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/stocks/${s.tickerSlug}`}
                        className="flex items-center gap-2"
                      >
                        <span className="flex flex-col">
                          <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                            {s.ticker}
                          </span>
                          <span className="text-xs text-fg-faint">
                            {s.company}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-fg-faint opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-right text-fg-soft">
                      {s.holders.length}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-fg">
                      {formatMoney(s.totalValue)}
                    </td>
                    <td className="px-7 py-4 text-right">
                      <span className="inline-flex items-center gap-2 text-xs">
                        {s.buys > 0 && (
                          <span className="text-gain">
                            {s.buys} buy{s.buys > 1 ? "s" : ""}
                          </span>
                        )}
                        {s.buys > 0 && s.sells > 0 && (
                          <span className="text-fg-faint">·</span>
                        )}
                        {s.sells > 0 && (
                          <span className="text-loss">
                            {s.sells} sell{s.sells > 1 ? "s" : ""}
                          </span>
                        )}
                        {s.buys === 0 && s.sells === 0 && (
                          <span className="text-fg-faint">unchanged</span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
