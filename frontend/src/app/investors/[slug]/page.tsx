import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { investors, getInvestor, LATEST_QUARTER } from "@/lib/data";
import { formatMoney, formatPct, formatShares } from "@/lib/format";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Sparkline from "@/components/Sparkline";
import Donut from "@/components/Donut";
import ActionBadge from "@/components/ActionBadge";
import { ArrowLeft, Quote } from "lucide-react";

export function generateStaticParams() {
  return investors.map((inv) => ({ slug: inv.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = getInvestor(slug);
  if (!inv) return {};
  return {
    title: `${inv.name} — ${inv.firm}`,
    description: `Track ${inv.name}'s portfolio at ${inv.firm}: top holdings, sector allocation and the latest ${LATEST_QUARTER} trading activity.`,
  };
}

export default async function InvestorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const investor = getInvestor(slug);
  if (!investor) notFound();

  const up = investor.qoqChange >= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <Link
          href="/investors"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-soft transition-colors hover:text-gold-soft"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All investors
        </Link>
      </Reveal>

      {/* Header */}
      <Reveal delay={60} className="mt-8 flex flex-wrap items-start justify-between gap-8">
        <div className="flex items-start gap-5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 font-display text-2xl font-semibold text-gold-soft sm:size-20 sm:text-3xl">
            {investor.name
              .split(" ")
              .filter((w) => w[0] === w[0]?.toUpperCase())
              .slice(-2)
              .map((w) => w[0])
              .join("")}
          </span>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {investor.name}
            </h1>
            <p className="mt-1.5 text-fg-soft">
              {investor.firm} · {investor.country}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {investor.styleTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] text-fg-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface/60 px-6 py-4">
          <p className="text-xs tracking-widest text-fg-faint uppercase">
            Portfolio value
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-fg">
            <CountUp value={investor.aum} kind="money" />
          </p>
          <p
            className={`mt-1 text-sm font-medium ${up ? "text-gain" : "text-loss"}`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatPct(investor.qoqChange, true)} vs last quarter
          </p>
        </div>
      </Reveal>

      {/* Philosophy */}
      <Reveal delay={120}>
        <blockquote className="relative mt-10 rounded-2xl border border-line bg-surface/40 p-7 sm:p-8">
          <Quote
            size={20}
            className="absolute top-6 left-6 text-gold/40"
            aria-hidden="true"
          />
          <p className="pl-9 font-display text-lg leading-relaxed text-fg italic sm:text-xl">
            {investor.philosophy}
          </p>
        </blockquote>
      </Reveal>

      {/* Key stats */}
      <Reveal delay={160}>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Investing since", value: String(investor.since) },
            { label: "Long-run CAGR", value: formatPct(investor.cagr) },
            { label: "Holdings", value: String(investor.holdingsCount) },
            { label: "Top-10 weight", value: formatPct(investor.concentration) },
            { label: "Turnover", value: formatPct(investor.turnover) },
            { label: "Strategy", value: investor.strategy },
          ].map((s) => (
            <div key={s.label} className="bg-surface/90 px-5 py-5">
              <dt className="text-[11px] tracking-widest text-fg-faint uppercase">
                {s.label}
              </dt>
              <dd
                className="mt-1.5 text-sm font-semibold text-fg sm:text-base"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Performance + allocation */}
      <div className="mt-10 grid gap-5 lg:grid-cols-5">
        <Reveal delay={80} className="lg:col-span-3">
          <div className="h-full rounded-2xl border border-line bg-surface/60 p-7">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-fg">
                Performance
              </h2>
              <p className="text-xs text-fg-faint">Indexed, trailing 12 quarters</p>
            </div>
            <div className="mt-6">
              <Sparkline
                data={investor.performance}
                width={560}
                height={160}
                animated
                className="h-auto w-full"
              />
            </div>
            <div
              className="mt-4 flex justify-between text-xs text-fg-faint"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <span>Q2 2023</span>
              <span className="font-medium text-fg-soft">
                {(
                  (investor.performance[investor.performance.length - 1] /
                    investor.performance[0] -
                    1) *
                  100
                ).toFixed(0)}
                % total return
              </span>
              <span>{LATEST_QUARTER}</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={140} className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-line bg-surface/60 p-7">
            <h2 className="font-display text-xl font-semibold text-fg">
              Sector allocation
            </h2>
            <div className="mt-6">
              <Donut slices={investor.sectors} size={170} />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Holdings table */}
      <Reveal delay={80}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-7 py-5">
            <h2 className="font-display text-xl font-semibold text-fg">
              Top holdings
            </h2>
            <p className="text-xs text-fg-faint">
              As filed · {LATEST_QUARTER}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-7 py-3.5 font-medium">
                    Security
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right font-medium">
                    Weight
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right font-medium">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right font-medium">
                    Shares
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right font-medium">
                    Δ Shares
                  </th>
                  <th scope="col" className="px-7 py-3.5 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {investor.holdings.map((h) => (
                  <tr
                    key={h.ticker}
                    className="border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-7 py-4">
                      <Link
                        href={`/stocks/${h.ticker.toLowerCase()}`}
                        className="group flex flex-col"
                      >
                        <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                          {h.ticker}
                        </span>
                        <span className="text-xs text-fg-faint">
                          {h.company}
                        </span>
                      </Link>
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
                              width: `${Math.min(h.weight * 3, 100)}%`,
                            }}
                          />
                        </span>
                        <span className="font-medium text-fg">
                          {formatPct(h.weight)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-fg-soft">
                      {formatMoney(h.value)}
                    </td>
                    <td className="px-4 py-4 text-right text-fg-soft">
                      {formatShares(h.shares)}
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-medium ${
                        h.changePct > 0
                          ? "text-gain"
                          : h.changePct < 0
                            ? "text-loss"
                            : "text-fg-faint"
                      }`}
                    >
                      {h.changePct === 0
                        ? "—"
                        : h.action === "new"
                          ? "NEW"
                          : formatPct(h.changePct, true)}
                    </td>
                    <td className="px-7 py-4 text-right">
                      <ActionBadge action={h.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Activity timeline */}
      <Reveal delay={80}>
        <div className="mt-10 rounded-2xl border border-line bg-surface/60 p-7">
          <h2 className="font-display text-xl font-semibold text-fg">
            Recent activity
          </h2>
          <ol className="mt-7 space-y-0">
            {investor.activity.map((a, i) => (
              <li key={`${a.quarter}-${a.ticker}`} className="relative flex gap-5 pb-7 last:pb-0">
                {i < investor.activity.length - 1 && (
                  <span
                    className="absolute top-3 left-[5px] h-full w-px bg-line"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 ${
                    a.action === "new" || a.action === "add"
                      ? "border-gain bg-gain/30"
                      : a.action === "hold"
                        ? "border-fg-faint bg-line"
                        : "border-loss bg-loss/30"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <span className="w-16 text-xs text-fg-faint" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {a.quarter}
                  </span>
                  <ActionBadge action={a.action} />
                  <Link
                    href={`/stocks/${a.ticker.toLowerCase()}`}
                    className="font-semibold text-fg transition-colors hover:text-gold-soft"
                  >
                    {a.ticker}
                  </Link>
                  <span className="text-sm text-fg-soft">{a.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}
