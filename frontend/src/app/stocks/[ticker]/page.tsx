import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aggregateStocks, getStock, LATEST_QUARTER } from "@/lib/data";
import { formatMoney, formatPct, formatShares } from "@/lib/format";
import Reveal from "@/components/Reveal";
import ActionBadge from "@/components/ActionBadge";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return aggregateStocks().map((s) => ({ ticker: s.tickerSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getStock(decodeURIComponent(ticker));
  if (!stock) return {};
  return {
    title: `${stock.ticker} — Who owns ${stock.company}`,
    description: `See which legendary investors hold ${stock.company} (${stock.ticker}), their position sizes, and ${LATEST_QUARTER} buying and selling activity.`,
  };
}

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const stock = getStock(decodeURIComponent(ticker));
  if (!stock) notFound();

  const holders = [...stock.holders].sort(
    (a, b) => b.holding.value - a.holding.value,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <Link
          href="/stocks"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-soft transition-colors hover:text-gold-soft"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All holdings
        </Link>
      </Reveal>

      <Reveal delay={60} className="mt-8 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Security
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            {stock.ticker}
          </h1>
          <p className="mt-2 text-lg text-fg-soft">{stock.company}</p>
        </div>
        <dl className="flex gap-px overflow-hidden rounded-2xl border border-line bg-line/60">
          <div className="bg-surface/90 px-6 py-4 text-center">
            <dd className="font-display text-2xl font-semibold text-fg" style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatMoney(stock.totalValue)}
            </dd>
            <dt className="mt-1 text-[11px] tracking-widest text-fg-faint uppercase">
              Combined value
            </dt>
          </div>
          <div className="bg-surface/90 px-6 py-4 text-center">
            <dd className="font-display text-2xl font-semibold text-fg">
              {holders.length}
            </dd>
            <dt className="mt-1 text-[11px] tracking-widest text-fg-faint uppercase">
              Legend holders
            </dt>
          </div>
          <div className="bg-surface/90 px-6 py-4 text-center">
            <dd
              className={`font-display text-2xl font-semibold ${
                stock.buys >= stock.sells ? "text-gain" : "text-loss"
              }`}
            >
              {stock.buys >= stock.sells ? "Buying" : "Selling"}
            </dd>
            <dt className="mt-1 text-[11px] tracking-widest text-fg-faint uppercase">
              Net flow
            </dt>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-7 py-5">
            <h2 className="font-display text-xl font-semibold text-fg">
              Who holds {stock.ticker}
            </h2>
            <p className="text-xs text-fg-faint">As filed · {LATEST_QUARTER}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-7 py-4 font-medium">
                    Investor
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    Position value
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    Shares
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    % of portfolio
                  </th>
                  <th scope="col" className="px-7 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {holders.map(({ investor, holding }) => (
                  <tr
                    key={investor.slug}
                    className="border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-7 py-4">
                      <Link
                        href={`/investors/${investor.slug}`}
                        className="group flex flex-col"
                      >
                        <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                          {investor.name}
                        </span>
                        {investor.manager && (
                          <span className="text-xs text-fg-faint">
                            {investor.manager}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-fg">
                      {formatMoney(holding.value)}
                    </td>
                    <td className="px-4 py-4 text-right text-fg-soft">
                      {formatShares(holding.shares)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span
                          className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-line sm:block"
                          aria-hidden="true"
                        >
                          <span
                            className="block h-full rounded-full bg-gold/70"
                            style={{
                              width: `${Math.min(holding.weight * 3, 100)}%`,
                            }}
                          />
                        </span>
                        <span className="font-medium text-fg">
                          {formatPct(holding.weight)}
                        </span>
                      </div>
                    </td>
                    <td className="px-7 py-4 text-right">
                      <ActionBadge action={holding.action} />
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
