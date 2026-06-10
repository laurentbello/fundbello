import type { HoldingAction } from "@/lib/data";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Sparkles,
  XCircle,
} from "lucide-react";

const config: Record<
  HoldingAction,
  { label: string; classes: string; Icon: typeof Minus }
> = {
  new: {
    label: "New",
    classes: "bg-gold/10 text-gold-soft border-gold/30",
    Icon: Sparkles,
  },
  add: {
    label: "Add",
    classes: "bg-gain/10 text-gain border-gain/30",
    Icon: ArrowUpRight,
  },
  trim: {
    label: "Trim",
    classes: "bg-loss/10 text-loss border-loss/30",
    Icon: ArrowDownRight,
  },
  exit: {
    label: "Exit",
    classes: "bg-loss/15 text-loss border-loss/40",
    Icon: XCircle,
  },
  hold: {
    label: "Hold",
    classes: "bg-line/40 text-fg-soft border-line",
    Icon: Minus,
  },
};

export default function ActionBadge({ action }: { action: HoldingAction }) {
  const { label, classes, Icon } = config[action];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${classes}`}
    >
      <Icon size={11} aria-hidden="true" />
      {label}
    </span>
  );
}
