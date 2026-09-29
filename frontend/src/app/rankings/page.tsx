import type { Metadata } from "next";
import Link from "next/link";
import {
  rankedInvestors,
  aggregateSectors,
  LATEST_QUARTER,
  TIER_BLURB,
  type Tier,
} from "@/lib/data";
import { formatMoney, formatPct } from "@/lib/format";
import Reveal from "@/components/Reveal";
import TierBadge from "@/components/TierBadge";
import SectorBar from "@/components/SectorBar";
import { rollUpModels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manager Rankings",
  description:
    "Every tracked manager scored on the filing record alone — continuity, stability, concentration and conviction. Performance is deliberately excluded.",
};

const COMPONENTS: {
  key: "continuity" | "stability" | "concentration" | "conviction";
  label: string;
  weight: string;
  hint: string;
}[] = [
  {
    key: "continuity",
    label: "Continuity",
    weight: "35%",
    hint: "Share of the manager's earliest top-10 positions still held today.",
  },
  {
    key: "stability",
    label: "Stability",
    weight: "25%",
    hint: "100 minus names added and dropped per quarter as a share of the book, trailing four quarters.",
  },
  {
    key: "concentration",
    label: "Concentration",
    weight: "25%",
    hint: "Top-10 weight; 60% or more scores full marks.",
  },
  {
    key: "conviction",
    label: "Conviction",
    weight: "15%",
    hint: "Among positions of 2% or more, the share of changes that were adds rather than trims this quarter.",
  },
];

function ScoreCell({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-end gap-2.5">
      <span
        className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-line sm:block"
        aria-hidden="true"
      >
        <span
          className="block h-full rounded-full bg-gold/60"
          style={{ width: `${value}%` }}
        />
      </span>
      <span className="w-7 text-right text-fg-soft">{value}</span>
    </div>
  );
}

export default function RankingsPage() {
  const ranked = rankedInvestors();
  const sectors = aggregateSectors();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">
          Manager Rankings
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Who is worth cloning
        </h1>
        <p className="mt-4 leading-relaxed text-fg-soft">
          Each manager is scored on the filing record alone, as of{" "}
          {LATEST_QUARTER}: does the book hold together over time, how
          concentrated is it, and do they add or cut when they act. Returns are
          left out on purpose — filings cannot measure them, and a high score
          here means &ldquo;the positions can be studied&rdquo;, not
          &ldquo;the positions will work&rdquo;. The tier is an editorial call
          layered on top.
        </p>
      </Reveal>

      <Reveal delay={60}>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-3">
          {(Object.keys(TIER_BLURB) as Tier[]).map((t) => (
            <div key={t} className="bg-surface/90 px-5 py-4">
              <dt>
                <TierBadge tier={t} />
              </dt>
              <dd className="mt-2 text-xs leading-relaxed text-fg-soft">
                {TIER_BLURB[t]}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                  <th scope="col" className="px-7 py-4 font-medium">#</th>
                  <th scope="col" className="px-4 py-4 font-medium">Manager</th>
                  <th scope="col" className="px-4 py-4 font-medium">Tier</th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">Score</th>
                  {COMPONENTS.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className="px-4 py-4 text-right font-medium"
                      title={`${c.hint} Weight ${c.weight}.`}
                    >
                      {c.label}
                      <span className="block text-[10px] tracking-normal text-fg-faint/80 normal-case">
                        {c.weight}
                      </span>
                    </th>
                  ))}
                  <th scope="col" className="px-7 py-4 text-right font-medium">
                    Record
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {ranked.map((inv, i) => (
                  <tr
                    key={inv.slug}
                    className="group border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                  >
                    <td className="px-7 py-4 text-fg-faint">{i + 1}</td>
                    <td className="px-4 py-4">
                      <Link href={`/investors/${inv.slug}`} className="flex flex-col">
                        <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                          {inv.name}
                        </span>
                        <span className="text-xs text-fg-faint">
                          {inv.manager ? `${inv.manager} · ` : ""}
                          {formatMoney(inv.aum)} · top-10 {formatPct(inv.concentration)}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <TierBadge tier={inv.tier} />
                    </td>
                    <td className="px-4 py-4 text-right text-base font-semibold text-fg">
                      {inv.ranking.score}
                    </td>
                    {COMPONENTS.map((c) => (
                      <td key={c.key} className="px-4 py-4">
                        <ScoreCell value={inv.ranking[c.key]} />
                      </td>
                    ))}
                    <td className="px-7 py-4 text-right text-xs text-fg-faint">
                      {inv.ranking.quarters} qtr{inv.ranking.quarters === 1 ? "" : "s"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-6 py-3 text-xs text-fg-faint">
            Continuity and stability need history: a manager with only one or
            two quarters in the record scores a neutral 50 on those until more
            filings accumulate. Options-heavy and long/short filers are flagged
            on their pages because their 13F understates the real book.
          </p>
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-8">
        <SectorBar
          sectors={sectors}
          models={rollUpModels(sectors)}
          max={10}
          title="Where the managers sit, in aggregate"
          subtitle="Equal-weighted across managers · custom classification, not GICS"
        />
      </Reveal>
    </div>
  );
}
