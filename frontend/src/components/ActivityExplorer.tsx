"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ActivityEvent, Tier } from "@/lib/data";
import ActionBadge from "@/components/ActionBadge";
import { formatPct } from "@/lib/format";
import { describe } from "@/lib/activity";

type Side = "all" | "buys" | "sells" | "new" | "exit";

const SIDES: { key: Side; label: string }[] = [
  { key: "all", label: "All" },
  { key: "buys", label: "Buys" },
  { key: "sells", label: "Sells" },
  { key: "new", label: "New positions" },
  { key: "exit", label: "Sold out" },
];

const TIERS: { key: Tier | "all"; label: string }[] = [
  { key: "all", label: "All managers" },
  { key: "clone", label: "Clone tier" },
  { key: "read-only", label: "Read-only tier" },
  { key: "trader", label: "Trader tier" },
];

function matchesSide(e: ActivityEvent, side: Side): boolean {
  if (side === "all") return true;
  if (side === "buys") return e.action === "new" || e.action === "add";
  if (side === "sells") return e.action === "trim" || e.action === "exit";
  return e.action === side;
}

interface Mover {
  ticker: string;
  tickerSlug: string;
  company: string;
  count: number;
  strong: number; // new positions (buy side) or full exits (sell side)
}

function movers(events: ActivityEvent[], buy: boolean): Mover[] {
  const map = new Map<string, Mover>();
  for (const e of events) {
    const isBuy = e.action === "new" || e.action === "add";
    if (isBuy !== buy) continue;
    const m = map.get(e.tickerSlug) ?? {
      ticker: e.ticker,
      tickerSlug: e.tickerSlug,
      company: e.company,
      count: 0,
      strong: 0,
    };
    m.count += 1;
    if (e.action === (buy ? "new" : "exit")) m.strong += 1;
    map.set(e.tickerSlug, m);
  }
  return [...map.values()]
    .filter((m) => m.count >= 2)
    .sort((a, b) => b.count - a.count || b.strong - a.strong)
    .slice(0, 8);
}

const PAGE = 100;

export default function ActivityExplorer({
  events,
  quarters,
}: {
  events: ActivityEvent[];
  quarters: { key: string; label: string }[];
}) {
  const [quarter, setQuarter] = useState<string>(quarters[0]?.key ?? "all");
  const [side, setSide] = useState<Side>("all");
  const [tier, setTier] = useState<Tier | "all">("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const inScope = useMemo(
    () =>
      events.filter(
        (e) =>
          (quarter === "all" || e.quarter === quarter) &&
          (tier === "all" || e.tier === tier),
      ),
    [events, quarter, tier],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inScope.filter(
      (e) =>
        matchesSide(e, side) &&
        (!q ||
          e.ticker.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q) ||
          e.investorName.toLowerCase().includes(q) ||
          (e.manager ?? "").toLowerCase().includes(q)),
    );
  }, [inScope, side, query]);

  const topBuys = useMemo(() => movers(inScope, true), [inScope]);
  const topSells = useMemo(() => movers(inScope, false), [inScope]);
  const scopeLabel =
    quarter === "all"
      ? "all quarters"
      : quarters.find((q) => q.key === quarter)?.label ?? quarter;

  const pill = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs transition-colors ${
      active
        ? "border-gold/50 bg-gold/10 text-gold-soft"
        : "border-line text-fg-soft hover:text-fg"
    }`;

  return (
    <div>
      {/* Movers */}
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Most bought", list: topBuys, strongLabel: "new", tone: "text-gain" },
          { title: "Most sold", list: topSells, strongLabel: "sold out", tone: "text-loss" },
        ].map((block) => (
          <section
            key={block.title}
            className="overflow-hidden rounded-2xl border border-line bg-surface/60"
          >
            <div className="flex items-baseline justify-between border-b border-line px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-fg">
                {block.title}
              </h2>
              <p className="text-xs text-fg-faint">
                managers acting · {scopeLabel}
              </p>
            </div>
            {block.list.length === 0 ? (
              <p className="px-6 py-6 text-sm text-fg-soft">
                No security with two or more managers on this side.
              </p>
            ) : (
              <ul>
                {block.list.map((m) => (
                  <li key={m.tickerSlug} className="border-b border-line/50 last:border-0">
                    <Link
                      href={`/stocks/${m.tickerSlug}`}
                      className="flex items-center gap-3 px-6 py-2.5 text-sm transition-colors hover:bg-raised/60"
                    >
                      <span className="w-16 font-semibold text-fg">{m.ticker}</span>
                      <span className="truncate text-xs text-fg-faint">{m.company}</span>
                      <span className={`ml-auto font-medium ${block.tone}`}>{m.count}</span>
                      <span className="w-20 text-right text-xs text-fg-faint">
                        {m.strong > 0 ? `${m.strong} ${block.strongLabel}` : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <select
          value={quarter}
          onChange={(e) => {
            setQuarter(e.target.value);
            setShown(PAGE);
          }}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg"
          aria-label="Quarter"
        >
          {quarters.map((q) => (
            <option key={q.key} value={q.key}>
              {q.label}
            </option>
          ))}
          <option value="all">All quarters</option>
        </select>
        <select
          value={tier}
          onChange={(e) => {
            setTier(e.target.value as Tier | "all");
            setShown(PAGE);
          }}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg"
          aria-label="Manager tier"
        >
          {TIERS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {SIDES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setSide(s.key);
                setShown(PAGE);
              }}
              className={pill(side === s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE);
          }}
          placeholder="Filter by ticker, company or manager"
          className="ml-auto w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-fg-faint sm:w-72"
        />
      </div>

      {/* Log */}
      <section className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface/60">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-fg">
            {rows.length.toLocaleString("en-US")} moves
          </h2>
          <p className="text-xs text-fg-faint">
            Largest by portfolio impact first · impact = share of the
            manager&apos;s book bought or sold
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
                <th scope="col" className="px-6 py-3 font-medium">Quarter</th>
                <th scope="col" className="px-4 py-3 font-medium">Manager</th>
                <th scope="col" className="px-4 py-3 font-medium">Security</th>
                <th scope="col" className="px-4 py-3 font-medium">Action</th>
                <th scope="col" className="px-4 py-3 font-medium">Change</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Impact</th>
                <th scope="col" className="px-6 py-3 text-right font-medium">Weight</th>
              </tr>
            </thead>
            <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
              {rows.slice(0, shown).map((e) => (
                <tr
                  key={`${e.investorSlug}-${e.tickerSlug}-${e.snapshot}`}
                  className="border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
                >
                  <td className="px-6 py-3 text-fg-soft">{e.quarterLabel}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/investors/${e.investorSlug}`}
                      className="font-medium text-fg hover:text-gold-soft"
                    >
                      {e.investorName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/stocks/${e.tickerSlug}`} className="group flex flex-col">
                      <span className="font-semibold text-fg group-hover:text-gold-soft">
                        {e.ticker}
                      </span>
                      <span className="max-w-[14rem] truncate text-xs text-fg-faint">
                        {e.company}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/investors/${e.investorSlug}/${e.tickerSlug}`}>
                      <ActionBadge action={e.action} />
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-fg-soft">{describe(e)}</td>
                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      e.impact == null
                        ? "text-fg-faint"
                        : e.impact >= 0
                          ? "text-gain"
                          : "text-loss"
                    }`}
                  >
                    {e.impact == null ? "—" : formatPct(e.impact, true)}
                  </td>
                  <td className="px-6 py-3 text-right text-fg-soft">
                    {e.weight == null ? "—" : formatPct(e.weight)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > shown && (
          <div className="border-t border-line px-6 py-4 text-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE * 2)}
              className="text-sm text-gold-soft hover:text-gold"
            >
              Show more ({(rows.length - shown).toLocaleString("en-US")} left)
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
