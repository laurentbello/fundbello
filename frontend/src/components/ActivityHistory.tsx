import Link from "next/link";
import type { ActivityEvent } from "@/lib/data";
import ActionBadge from "@/components/ActionBadge";
import { describe } from "@/lib/activity";
import { formatPct } from "@/lib/format";

/** Order the moves are shown in within each quarter. */
const SECTIONS = [
  { action: "new", heading: "New buys", short: "new", tone: "text-gold-soft" },
  { action: "add", heading: "Added to", short: "added", tone: "text-gain" },
  { action: "trim", heading: "Trimmed", short: "trimmed", tone: "text-loss" },
  { action: "exit", heading: "Sold out", short: "sold out", tone: "text-loss" },
] as const;

/**
 * Quarter-by-quarter activity, newest first. `by` decides what each row
 * names: the manager (on a stock page) or the security (on a manager page).
 * Within a quarter, moves are grouped: new buys, adds, trims, exits —
 * each group sorted by size. The newest `openCount` quarters start expanded.
 */
export default function ActivityHistory({
  events,
  by,
  title,
  subtitle,
  openCount = 2,
}: {
  events: ActivityEvent[];
  by: "investor" | "stock";
  title: string;
  subtitle?: string;
  openCount?: number;
}) {
  const groups = new Map<string, { label: string; rows: ActivityEvent[] }>();
  for (const e of events) {
    const g = groups.get(e.quarter) ?? { label: e.quarterLabel, rows: [] };
    g.rows.push(e);
    groups.set(e.quarter, g);
  }
  const ordered = [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-fg">{title}</h2>
        {subtitle && <p className="text-xs text-fg-faint">{subtitle}</p>}
      </div>
      {ordered.length === 0 ? (
        <p className="px-6 py-8 text-sm text-fg-soft">
          No position changes in the filings we hold.
        </p>
      ) : (
        ordered.map(([key, g], idx) => {
          const sections = SECTIONS.map((sec) => ({
            ...sec,
            rows: g.rows
              .filter((e) => e.action === sec.action)
              .sort((a, b) => Math.abs(b.impact ?? 0) - Math.abs(a.impact ?? 0)),
          })).filter((sec) => sec.rows.length > 0);
          return (
            <details key={key} open={idx < openCount} className="group border-b border-line/60 last:border-0">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-6 py-3 text-sm hover:bg-raised/40">
                <span className="text-fg-faint transition-transform group-open:rotate-90">›</span>
                <span className="font-semibold text-fg">{g.label}</span>
                <span className="ml-auto flex flex-wrap gap-x-3 text-xs">
                  {sections.map((sec) => (
                    <span key={sec.action} className={sec.tone}>
                      {sec.rows.length} {sec.short}
                    </span>
                  ))}
                </span>
              </summary>
              <div className="pb-3">
                {sections.map((sec) => (
                  <div key={sec.action} className="mt-1">
                    <h3 className={`flex items-baseline gap-2 px-6 pb-1 pt-2 pl-12 text-[11px] font-semibold uppercase tracking-wider ${sec.tone}`}>
                      {sec.heading}
                      <span className="font-normal text-fg-faint">{sec.rows.length}</span>
                    </h3>
                    <ul>
                      {sec.rows.map((e) => (
                        <li key={`${e.investorSlug}-${e.tickerSlug}-${e.snapshot}`}>
                          <Link
                            href={`/investors/${e.investorSlug}/${e.tickerSlug}`}
                            className="flex items-center gap-3 px-6 py-2 pl-12 text-sm transition-colors hover:bg-raised/60"
                          >
                            <ActionBadge action={e.action} />
                            {by === "investor" ? (
                              <span className="font-medium text-fg">{e.investorName}</span>
                            ) : (
                              <>
                                <span className="font-semibold text-fg">{e.ticker}</span>
                                <span className="hidden truncate text-xs text-fg-faint sm:block">
                                  {e.company}
                                </span>
                              </>
                            )}
                            <span className="ml-auto pl-3 text-right text-xs text-fg-soft">
                              {describe(e)}
                            </span>
                            <span
                              className={`w-16 text-right text-xs font-medium ${
                                e.impact == null ? "text-fg-faint" : e.impact >= 0 ? "text-gain" : "text-loss"
                              }`}
                              style={{ fontVariantNumeric: "tabular-nums" }}
                              title="Share of the manager's portfolio bought or sold"
                            >
                              {e.impact == null ? "—" : formatPct(e.impact, true)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          );
        })
      )}
    </section>
  );
}
