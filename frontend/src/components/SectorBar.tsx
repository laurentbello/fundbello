import type { SectorSlice } from "@/lib/data";
import { formatPct } from "@/lib/format";

const PALETTE = [
  "bg-gold/80",
  "bg-gold/55",
  "bg-gold/35",
  "bg-fg-soft/60",
  "bg-fg-soft/40",
  "bg-fg-faint/50",
  "bg-fg-faint/35",
  "bg-line",
];

/** Stacked bar + legend for a custom-sector breakdown. */
export default function SectorBar({
  sectors,
  max = 8,
  title,
  subtitle,
}: {
  sectors: SectorSlice[];
  max?: number;
  title?: string;
  subtitle?: string;
}) {
  const total = sectors.reduce((s, x) => s + x.weight, 0) || 1;
  const shown = sectors.slice(0, max);
  const rest = sectors.slice(max).reduce((s, x) => s + x.weight, 0);
  const slices = rest > 0 ? [...shown, { sector: "Other", weight: rest, count: 0 }] : shown;

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface/60">
      {(title || subtitle) && (
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
          {title && (
            <h2 className="font-display text-lg font-semibold text-fg">{title}</h2>
          )}
          {subtitle && <p className="text-xs text-fg-faint">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-5">
        <div
          className="flex h-3 w-full overflow-hidden rounded-full bg-line"
          role="img"
          aria-label={slices.map((s) => `${s.sector} ${formatPct(s.weight)}`).join(", ")}
        >
          {slices.map((s, i) => (
            <span
              key={s.sector}
              className={`block h-full ${PALETTE[i % PALETTE.length]}`}
              style={{ width: `${(s.weight / total) * 100}%` }}
              title={`${s.sector} · ${formatPct(s.weight)}`}
            />
          ))}
        </div>
        <ul
          className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {slices.map((s, i) => (
            <li key={s.sector} className="flex items-center gap-2.5">
              <span
                className={`size-2.5 shrink-0 rounded-sm ${PALETTE[i % PALETTE.length]}`}
                aria-hidden="true"
              />
              <span className="truncate text-fg-soft">{s.sector}</span>
              <span className="ml-auto font-medium text-fg">{formatPct(s.weight)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
