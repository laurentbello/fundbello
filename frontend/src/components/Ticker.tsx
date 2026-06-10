import { investors } from "@/lib/data";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";

/** Infinite marquee of latest portfolio moves. Pure CSS animation. */
export default function Ticker() {
  const moves = investors
    .flatMap((inv) =>
      inv.holdings
        .filter((h) => h.action !== "hold")
        .map((h) => ({ firm: inv.firm, ...h })),
    )
    .slice(0, 18);

  const items = [...moves, ...moves]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface/60 py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {items.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-xs whitespace-nowrap text-fg-soft"
          >
            <span className="font-semibold text-fg">{m.ticker}</span>
            <span className="hidden sm:inline">{m.firm}</span>
            {m.action === "new" ? (
              <span className="flex items-center gap-1 text-gold">
                <Sparkles size={12} /> NEW
              </span>
            ) : m.action === "add" || m.changePct > 0 ? (
              <span className="flex items-center gap-1 text-gain">
                <ArrowUpRight size={13} />+{m.changePct.toFixed(1)}%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-loss">
                <ArrowDownRight size={13} />
                {m.changePct.toFixed(1)}%
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
