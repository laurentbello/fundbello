import Link from "next/link";
import {
  investors,
  aggregateStocks,
  platformStats,
  LATEST_QUARTER,
} from "@/lib/data";
import { formatMoney, formatPct } from "@/lib/format";
import Reveal from "@/components/Reveal";
import ActionBadge from "@/components/ActionBadge";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const stocks = aggregateStocks();
  const topStocks = stocks.slice(0, 8);
  const recentMoves = investors
    .flatMap((inv) =>
      inv.activity.map((a) => ({
        investor: inv,
        value: inv.holdings.find((h) => h.ticker === a.ticker)?.value ?? 0,
        ...a,
      })),
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const searchStocks = stocks.map((s) => ({
    ticker: s.ticker,
    tickerSlug: s.tickerSlug,
    company: s.company,
    holders: s.holders.length,
  }));
  const searchFunds = investors.map((i) => ({
    slug: i.slug,
    name: i.name,
    manager: i.manager,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      {/* Intro + search */}
      <Reveal>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Track the world&apos;s greatest investors
        </h1>
        <p
          className="mt-3 text-sm text-fg-faint"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {platformStats.investorsTracked} managers ·{" "}
          {formatMoney(platformStats.assetsTracked)} tracked ·{" "}
          {LATEST_QUARTER} filings
        </p>
        <div className="mt-6">
          <SearchBox stocks={searchStocks} funds={searchFunds} />
        </div>
      </Reveal>

      {/* Managers table */}
      <Reveal delay={80}>
        <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="border-b border-line px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Managers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Manager
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Top holding
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Portfolio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Holdings
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {investors.map((inv) => (
                  <tr
                    key={inv.slug}
                    className="group border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/investors/${inv.slug}`}
                        className="flex flex-col"
                      >
                        <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                          {inv.name}
                        </span>
                        {inv.manager && (
                          <span className="text-xs text-fg-faint">
                            {inv.manager}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-fg-soft">
                      {inv.holdings[0] ? (
                        <>
                          <span className="font-medium text-fg">
                            {inv.holdings[0].ticker}
                          </span>{" "}
                          <span className="text-xs text-fg-faint">
                            {formatPct(inv.holdings[0].weight)}
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium text-fg">
                      {formatMoney(inv.aum)}
                    </td>
                    <td className="px-6 py-3.5 text-right text-fg-soft">
                      {inv.holdingsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Top holdings + recent activity */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Reveal delay={120}>
          <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-fg">
                Top consensus holdings
              </h2>
              <Link
                href="/stocks"
                className="text-sm text-gold-soft transition-colors hover:text-gold"
              >
                View all →
              </Link>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Security
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Holders
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {topStocks.map((s) => (
                  <tr
                    key={s.tickerSlug}
                    className="group border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-6 py-3">
                      <Link
                        href={`/stocks/${s.tickerSlug}`}
                        className="flex flex-col"
                      >
                        <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                          {s.ticker}
                        </span>
                        <span className="text-xs text-fg-faint">
                          {s.company}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right text-fg-soft">
                      {s.holders.length}
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-fg">
                      {formatMoney(s.totalValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Reveal>

        <Reveal delay={160}>
          <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
            <div className="border-b border-line px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-fg">
                Latest moves · {LATEST_QUARTER}
              </h2>
            </div>
            <ul>
              {recentMoves.map((m) => (
                <li
                  key={`${m.investor.slug}-${m.ticker}`}
                  className="border-b border-line/50 last:border-0"
                >
                  <Link
                    href={`/investors/${m.investor.slug}`}
                    className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-raised/60"
                  >
                    <ActionBadge action={m.action} />
                    <span className="font-semibold text-fg">{m.ticker}</span>
                    <span className="truncate text-xs text-fg-faint">
                      {m.investor.name}
                    </span>
                    <span className="ml-auto hidden text-xs text-fg-soft sm:block">
                      {m.detail}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
