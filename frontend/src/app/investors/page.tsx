import type { Metadata } from "next";
import { investors } from "@/lib/data";
import InvestorDirectory from "@/components/InvestorDirectory";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Investor Directory",
  description:
    "Browse the portfolio holdings and trading activity of the world's legendary investors and hedge fund managers.",
};

export default function InvestorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">
          Investor Directory
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          The legends, tracked
        </h1>
        <p className="mt-4 leading-relaxed text-fg-soft">
          Every manager below is followed filing-by-filing. Open a profile for
          full holdings, sector allocation, and quarter-over-quarter activity.
        </p>
      </Reveal>

      <div className="mt-12">
        <InvestorDirectory investors={investors} />
      </div>
    </div>
  );
}
