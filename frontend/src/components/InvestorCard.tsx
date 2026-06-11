import Link from "next/link";
import type { Investor } from "@/lib/data";
import { formatMoney, formatPct } from "@/lib/format";
import Sparkline from "./Sparkline";
import { ArrowUpRight } from "lucide-react";

export default function InvestorCard({ investor }: { investor: Investor }) {
  const top = investor.holdings.slice(0, 3);
  return (
    <Link
      href={`/investors/${investor.slug}`}
      className="group relative flex flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-raised hover:shadow-[0_12px_40px_rgba(2,6,23,0.6)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight font-semibold text-fg">
            {investor.name}
          </h3>
          <p className="mt-0.5 text-sm text-fg-soft">
            {investor.manager ?? `${investor.holdingsCount} holdings`}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-fg-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {top.map((h) => (
          <span
            key={h.ticker}
            className="rounded-full border border-line bg-ink/60 px-2.5 py-0.5 text-[11px] text-fg-soft"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {h.ticker} {formatPct(h.weight)}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line/70 pt-4">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <dt className="text-xs text-fg-faint">Portfolio</dt>
          <dt className="text-xs text-fg-faint">QoQ</dt>
          <dd
            className="font-semibold text-fg"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatMoney(investor.aum)}
          </dd>
          <dd
            className={`font-semibold ${
              investor.qoqChange == null
                ? "text-fg-faint"
                : investor.qoqChange >= 0
                  ? "text-gain"
                  : "text-loss"
            }`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {investor.qoqChange == null
              ? "—"
              : formatPct(investor.qoqChange, true)}
          </dd>
        </dl>
        {investor.trend.length > 1 && (
          <Sparkline data={investor.trend} width={104} height={34} />
        )}
      </div>
    </Link>
  );
}
