import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  aggregateStocks,
  getStock,
  everTickerSlugs,
  stockActivity,
  pastHolders,
  companyFor,
  ACTIVITY_QUARTERS,
} from "@/lib/data";
import ActivityHistory from "@/components/ActivityHistory";
import { formatMoney, formatPct, formatShares } from "@/lib/format";
import Reveal from "@/components/Reveal";
import ActionBadge from "@/components/ActionBadge";
import SponsorSlot from "@/components/SponsorSlot";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const slugs = new Set([
    ...aggregateStocks().map((s) => s.tickerSlug),
    ...everTickerSlugs(),
  ]);
  return [...slugs].map((ticker) => ({ ticker }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const id = companyFor(decodeURIComponent(ticker)) ?? getStock(decodeURIComponent(ticker));
  if (!id) return {};
  return {
    title: `${id.ticker} — Who owns ${id.company}`,
    description: `See which legendary investors hold ${id.company} (${id.ticker}), who bought and sold it each quarter, and who has exited.`,
  };
}

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const slug = decodeURIComponent(ticker);
  const found = getStock(slug);
  const id = found ?? companyFor(slug);
  if (!id) notFound();
  // A security every tracked manager has sold still gets a page.
  const stock = found ?? {
    ticker: id.ticker,
    tickerSlug: slug.toLowerCase(),
    company: id.company,
    holders: [],
    totalValue: 0,
    buys: 0,
    sells: 0,
  };

  const holders = [...stock.holders].sort(
    (a, b) => b.holding.value - a.holding.value,
  );
  const events = stockActivity(stock.tickerSlug);
  const former = pastHolders(stock.tickerSlug);
  const recent = new Set(ACTIVITY_QUARTERS.slice(0, 4).map((q) => q.key));
  const lastYear = events.filter((e) => recent.has(e.quarter));
  const newCount = lastYear.filter((e) => e.action === "new").length;
  const exitCount = lastYear.filter((e) => e.action === "exit").length;

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
          <div className="bg-surface/90 px-6 py-4 text-center">
            <dd className="font-display text-2xl font-semibold text-fg">
              <span className="text-gain">{newCount}</span>
              <span className="text-fg-faint"> / </span>
              <span className="text-loss">{exitCount}</span>
            </dd>
            <dt className="mt-1 text-[11px] tracking-widest text-fg-faint uppercase">
              New / sold out · 4 qtrs
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
            <p className="text-xs text-fg-faint">
              Latest filing per manager · click a manager for its {stock.ticker}{" "}
              history
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
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
                  <th scope="col" className="px-4 py-4 text-right font-medium">
                    As of
                  </th>
                  <th scope="col" className="px-7 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {holders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-7 py-6 text-sm text-fg-soft">
                      No tracked manager holds {stock.ticker} in its latest
                      filing — see who sold out below.
                    </td>
                  </tr>
                )}
                {holders.map(({ investor, holding }) => (
                  <tr
                    key={investor.slug}
                    className="border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-7 py-4">
                      <Link
                        href={`/investors/${investor.slug}/${stock.tickerSlug}`}
                        className="group flex flex-col"
                        title={`${investor.name}'s ${stock.ticker} position history`}
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
                    <td className="px-4 py-4 text-right text-fg-soft">
                      {investor.quarterLabel}
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

      <Reveal delay={160} className="mt-8">
        <ActivityHistory
          events={events}
          by="investor"
          title={`Who bought and sold ${stock.ticker}`}
          subtitle="Every filing we hold, newest first · impact = share of the manager's portfolio"
          openCount={4}
        />
      </Reveal>

      {former.length > 0 && (
        <Reveal delay={180} className="mt-8">
          <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-fg">
                Former holders
              </h2>
              <p className="text-xs text-fg-faint">
                Owned {stock.ticker} in an earlier filing, not in their latest
              </p>
            </div>
            <ul>
              {former.map((f) => (
                <li key={f.investorSlug} className="border-b border-line/50 last:border-0">
                  <Link
                    href={`/investors/${f.investorSlug}/${stock.tickerSlug}`}
                    className="flex items-center gap-3 px-6 py-3 text-sm transition-colors hover:bg-raised/60"
                  >
                    <span className="font-medium text-fg">{f.investorName}</span>
                    {f.manager && (
                      <span className="hidden text-xs text-fg-faint sm:block">{f.manager}</span>
                    )}
                    <span className="ml-auto text-xs text-fg-soft">
                      Last held {f.lastHeld}
                      {f.exited ? ` · sold out ${f.exited}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      <Reveal delay={120} className="mt-8">
        <SponsorSlot />
      </Reveal>
    </div>
  );
}
