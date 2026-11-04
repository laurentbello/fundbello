import Link from "next/link";
import type { ActivityEvent } from "@/lib/data";
import ActionBadge from "@/components/ActionBadge";
import { describe } from "@/lib/activity";
import { formatPct } from "@/lib/format";

/**
 * Quarter-by-quarter activity, newest first. `by` decides what each row
 * names: the manager (on a stock page) or the security (on a manager page).
 * The newest `openCount` quarters start expanded.
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
          const buys = g.rows.filter((e) => e.action === "new" || e.action === "add").length;
          const sells = g.rows.length - buys;
          const rows = [...g.rows].sort(
            (a, b) => Math.abs(b.impact ?? 0) - Math.abs(a.impact ?? 0),
          );
          return (
            <details key={key} open={idx < openCount} className="group border-b border-line/60 last:border-0">
              <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-3 text-sm hover:bg-raised/40">
                <span className="text-fg-faint transition-transform group-open:rotate-90">›</span>
                <span className="font-semibold text-fg">{g.label}</span>
                <span className="ml-auto text-xs">
                  <span className="text-gain">{buys} buy{buys === 1 ? "" : "s"}</span>
                  <span className="text-fg-faint"> · </span>
                  <span className="text-loss">{sells} sell{sells === 1 ? "" : "s"}</span>
                </span>
              </summary>
              <ul className="pb-2">
                {rows.map((e) => (
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
            </details>
          );
        })
      )}
    </section>
  );
}
