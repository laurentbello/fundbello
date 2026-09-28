import type { Tier } from "@/lib/data";
import { TIER_LABEL } from "@/lib/data";

const classes: Record<Tier, string> = {
  clone: "bg-gold/10 text-gold-soft border-gold/30",
  "read-only": "bg-line/40 text-fg-soft border-line",
  trader: "bg-loss/10 text-loss border-loss/30",
};

export default function TierBadge({ tier }: { tier: Tier | null }) {
  if (!tier) return <span className="text-xs text-fg-faint">—</span>;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${classes[tier]}`}
    >
      {TIER_LABEL[tier]}
    </span>
  );
}
