import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPositionHistory, positionHistoryParams } from "@/lib/data";
import { formatMoney, formatPct, formatShares } from "@/lib/format";
import Reveal from "@/components/Reveal";
import ActionBadge from "@/components/ActionBadge";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return positionHistoryParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; ticker: string }>;
}): Promise<Metadata> {
  const { slug, ticker } = await params;
  const history = getPositionHistory(slug, decodeURIComponent(ticker));
  if (!history) return {};
  return {
    title: `${history.investor.name} — ${history.ticker} position history`,
    description: `Every reported quarter of ${history.investor.name}'s position in ${history.company} (${history.ticker}): shares held, share count changes and position value.`,
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

export default async function PositionHistoryPage({
  params,
}: {
  params: Promise<{ slug: string; ticker: string }>;
}) {
  const { slug, ticker } = await params;
  const history = getPositionHistory(slug, decodeURIComponent(ticker));
  if (!history) notFound();

  const { investor, quarters, current } = history;
  const held = quarters.filter((q) => q.held);
  const peak = held.reduce((max, q) => Math.max(max, q.shares ?? 0), 0);
  const firstReported = held[held.length - 1];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <Reveal>
        <Link
          href={`/investors/${investor.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm text-fg-soft transition-colors hover:text-gold-soft"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          {investor.name} portfolio
        </Link>

        <div className="mt-6">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Position history
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {investor.name} · {history.ticker}
          </h1>
          <p className="mt-2 text-fg-soft">
            {history.company}
            {" · "}
            <Link
              href={`/stocks/${history.tickerSlug}`}
              className="text-gold-soft transition-colors hover:text-gold"
            >
              Who else holds {history.ticker} →
            </Link>
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-4">
          {[
            {
              label: "Current stake",
              value: current ? formatShares(current.shares ?? 0) : "Exited",
              tone: current ? undefined : "loss",
            },
            {
              label: "Current value",
              value:
                current && current.value != null
                  ? formatMoney(current.value)
                  : "—",
            },
            {
              label: "Peak stake",
              value: peak ? formatShares(peak) : "—",
            },
            {
              label: "First reported",
              value: firstReported ? firstReported.quarterLabel : "—",
            },
          ].map((s) => (
            <div key={s.label} className="bg-surface/90 px-4 py-4">
              <dt className="text-[11px] tracking-widest text-fg-faint uppercase">
                {s.label}
              </dt>
              <dd
                className={`mt-1 text-sm font-semibold sm:text-base ${
                  s.tone === "loss" ? "text-loss" : "text-fg"
                }`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={80}>
        <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-fg">
              Reported quarters
            </h2>
            <p className="text-xs text-fg-faint">
              {quarters.length} filing{quarters.length === 1 ? "" : "s"} ·
              newest first
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Quarter
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Shares
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Δ Shares
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Δ %
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {quarters.map((q) => (
                  <tr
                    key={q.snapshot}
                    className="border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-6 py-3.5">
                      <span className="font-semibold text-fg">
                        {q.quarterLabel}
                      </span>
                      <span className="ml-2 text-xs text-fg-faint">
                        {formatDate(q.snapshot)}
                        {q.filingType ? ` · ${q.filingType}` : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-fg">
                      {q.held ? formatShares(q.shares ?? 0) : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-right text-fg-soft">
                      {q.sharesChange == null || q.sharesChange === 0
                        ? "—"
                        : `${q.sharesChange > 0 ? "+" : "−"}${formatShares(
                            Math.abs(q.sharesChange),
                          )}`}
                    </td>
                    <td
                      className={`px-4 py-3.5 text-right font-medium ${
                        !q.held
                          ? "text-loss"
                          : q.changePct == null || q.changePct === 0
                            ? "text-fg-faint"
                            : q.changePct > 0
                              ? "text-gain"
                              : "text-loss"
                      }`}
                    >
                      {!q.held
                        ? "−100.0%"
                        : q.action === "new"
                          ? "NEW"
                          : q.changePct == null || q.changePct === 0
                            ? "—"
                            : formatPct(q.changePct, true)}
                    </td>
                    <td className="px-4 py-3.5 text-right text-fg-soft">
                      {q.held && q.value != null ? formatMoney(q.value) : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-right text-fg-soft">
                      {q.held && q.weight != null ? formatPct(q.weight) : "—"}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <ActionBadge action={q.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-6 py-3 text-xs text-fg-faint">
            Only quarters this manager has reported appear here. A row with no
            shares is the filing in which the position was gone.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
