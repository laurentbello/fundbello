import type { Metadata } from "next";
import { activityLog, ACTIVITY_QUARTERS } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ActivityExplorer from "@/components/ActivityExplorer";

export const metadata: Metadata = {
  title: "Activity — who bought and sold",
  description:
    "Every buy and sell by tracked managers, quarter by quarter: new positions, adds, trims and complete exits, ranked by how much of the portfolio moved.",
};

export default function ActivityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">
          Activity
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Who bought, who sold
        </h1>
        <p className="mt-4 leading-relaxed text-fg-soft">
          Every position change in every filing we hold — new positions, adds,
          trims and complete exits — including names a manager no longer owns.
          Pick a quarter, or look across all of them. Impact is how much of the
          manager&apos;s portfolio the move represented, so a 5% new position
          ranks above a token starter.
        </p>
      </Reveal>
      <Reveal delay={100} className="mt-12">
        <ActivityExplorer events={activityLog} quarters={ACTIVITY_QUARTERS} />
      </Reveal>
    </div>
  );
}
