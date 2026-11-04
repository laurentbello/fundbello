import type { ActivityEvent } from "@/lib/data";
import { formatPct, formatShares } from "@/lib/format";

/** One-line plain-English description of a move. */
export function describe(e: ActivityEvent): string {
  const n = e.sharesChange == null ? null : formatShares(Math.abs(e.sharesChange));
  switch (e.action) {
    case "new":
      return `Bought ${formatShares(e.shares ?? 0)} shares`;
    case "exit":
      return n ? `Sold all ${n} shares` : "Sold entire position";
    case "add":
      return `Added ${n ?? "?"} · ${formatPct(e.changePct ?? 0, true)}`;
    case "trim":
      return `Sold ${n ?? "?"} · ${formatPct(e.changePct ?? 0)}`;
  }
}

