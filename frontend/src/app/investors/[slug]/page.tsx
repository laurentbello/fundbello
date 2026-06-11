import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { investors, getInvestor } from "@/lib/data";
import { formatMoney, formatPct, formatShares } from "@/lib/format";
import Reveal from "@/components/Reveal";
import ActionBadge from "@/components/ActionBadge";
import { ArrowLeft } from "lucide-react";

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
    title: `${inv.name} — Portfolio`,
    description: `Track ${inv.name}'s portfolio: holdings and the latest ${inv.quarterLabel} trading activity.`,
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function InvestorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const investor = getInvestor(slug);
  if (!investor) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
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
          All managers
        </Link>

        {/* Header */}
        <div className="mt-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {investor.name}
          </h1>
          <p className="mt-1.5 text-fg-soft">
            {investor.manager ? `${investor.manager} · ` : ""}
            As filed {investor.quarterLabel} ({formatDate(investor.asOf)})
          </p>
        </div>

        {/* Stats strip */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-5">
          {[
            { label: "Portfolio", value: formatMoney(investor.aum) },
            {
              label: "QoQ change",
              value:
                investor.qoqChange == null
                  ? "—"
                  : formatPct(investor.qoqChange, true),
              tone:
                investor.qoqChange == null
                  ? undefined
                  : investor.qoqChange >= 0
                    ? "gain"
                    : "loss",
            },
            { label: "Holdings", value: String(investor.holdingsCount) },
            {
              label: "Top-10 weight",
              value: formatPct(investor.concentration),
            },
            { label: "As of", value: formatDate(investor.asOf) },
          ].map((s) => (
            <div key={s.label} className="bg-surface/90 px-4 py-4">
              <dt className="text-[11px] tracking-widest text-fg-faint uppercase">
                {s.label}
              </dt>
              <dd
                className={`mt-1 text-sm font-semibold sm:text-base ${
                  s.tone === "gain"
                    ? "text-gain"
                    : s.tone === "loss"
                      ? "text-loss"
                      : "text-fg"
                }`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Holdings table */}
      <Reveal delay={80}>
        <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Holdings
            </h2>
            <p className="text-xs text-fg-faint">
              As filed · {investor.quarterLabel}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Security
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Weight
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Shares
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Δ Shares
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
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
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/stocks/${h.tickerSlug}`}
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
                    <td className="px-4 py-3.5 text-right">
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
                    <td className="px-4 py-3.5 text-right text-fg-soft">
                      {formatMoney(h.value)}
                    </td>
                    <td className="px-4 py-3.5 text-right text-fg-soft">
                      {formatShares(h.shares)}
                    </td>
                    <td
                      className={`px-4 py-3.5 text-right font-medium ${
                        h.changePct == null || h.changePct === 0
                          ? "text-fg-faint"
                          : h.changePct > 0
                            ? "text-gain"
                            : "text-loss"
                      }`}
                    >
                      {h.changePct == null || h.changePct === 0
                        ? "—"
                        : h.action === "new"
                          ? "NEW"
                          : formatPct(h.changePct, true)}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <ActionBadge action={h.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Quarterly activity */}
      <Reveal delay={120}>
        <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="border-b border-line px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Activity · {investor.quarterLabel}
            </h2>
          </div>
          {investor.activity.length === 0 ? (
            <p className="px-6 py-8 text-sm text-fg-soft">
              No position changes reported this quarter.
            </p>
          ) : (
            <ul>
              {investor.activity.map((a) => (
                <li
                  key={`${a.action}-${a.ticker}`}
                  className="border-b border-line/50 last:border-0"
                >
                  <Link
                    href={`/stocks/${a.tickerSlug}`}
                    className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-raised/60"
                  >
                    <ActionBadge action={a.action} />
                    <span className="font-semibold text-fg">{a.ticker}</span>
                    <span className="hidden truncate text-xs text-fg-faint sm:block">
                      {a.company}
                    </span>
                    <span className="ml-auto pl-3 text-right text-xs text-fg-soft">
                      {a.detail}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Reveal>
    </div>
  );
}
