"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney, formatPct } from "@/lib/format";

/** Serialisable slice of StockAggregate for the client. */
export interface ConsensusRow {
  ticker: string;
  tickerSlug: string;
  company: string;
  sector: string;
  model: string;
  holders: number;
  totalValue: number;
  avgWeight: number;
  avgWeightChange: number | null;
  buys: number;
  sells: number;
}

type SortKey = "holders" | "avgWeight" | "conviction" | "value";

const SORTS: { key: SortKey; label: string; hint: string }[] = [
  { key: "holders", label: "Holders", hint: "Number of managers holding" },
  { key: "avgWeight", label: "Avg weight", hint: "Mean portfolio weight across holders" },
  { key: "conviction", label: "Conviction", hint: "Mean change in weight vs prior quarter" },
  { key: "value", label: "Value", hint: "Combined position value" },
];

type SortDir = "desc" | "asc";

function sortRows(rows: ConsensusRow[], key: SortKey, dir: SortDir): ConsensusRow[] {
  const v = (r: ConsensusRow) =>
    key === "holders"
      ? r.holders * 1e6 + r.avgWeight
      : key === "avgWeight"
        ? r.avgWeight
        : key === "conviction"
          ? (r.avgWeightChange ?? -Infinity)
          : r.totalValue;
  const sign = dir === "desc" ? 1 : -1;
  return [...rows].sort((a, b) => sign * (v(b) - v(a)));
}

export default function ConsensusTable({
  rows,
  limit,
  minHolders = 1,
  showRank = false,
  compact = false,
}: {
  rows: ConsensusRow[];
  limit?: number;
  minHolders?: number;
  showRank?: boolean;
  compact?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("holders");
  const [dir, setDir] = useState<SortDir>("desc");

  /** Click a column: sort largest→smallest; click again to flip. */
  const toggleSort = (key: SortKey) => {
    if (key === sort) setDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSort(key);
      setDir("desc");
    }
  };
  const arrow = (key: SortKey) =>
    sort === key ? (dir === "desc" ? " ▼" : " ▲") : "";
  const [sector, setSector] = useState<string>("all");

  const sectors = [...new Set(rows.map((r) => r.sector))].sort();
  const models = [...new Set(rows.map((r) => r.model))].sort();
  // Filter values are prefixed: "m:" = business model, "s:" = granular industry.
  const filtered = rows.filter(
    (r) =>
      r.holders >= minHolders &&
      (sector === "all" ||
        (sector.startsWith("m:") && r.model === sector.slice(2)) ||
        (sector.startsWith("s:") && r.sector === sector.slice(2))),
  );
  const sorted = sortRows(filtered, sort, dir).slice(0, limit ?? filtered.length);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-3">
        <span className="text-[11px] tracking-widest text-fg-faint uppercase">
          Sort
        </span>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Sort by">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              title={`${s.hint} — click again to flip order`}
              onClick={() => toggleSort(s.key)}
              aria-pressed={sort === s.key}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                sort === s.key
                  ? "border-gold/40 bg-gold/10 text-gold-soft"
                  : "border-line text-fg-soft hover:text-fg"
              }`}
            >
              {s.label}
              {arrow(s.key)}
            </button>
          ))}
        </div>
        {!compact && (
          <label className="ml-auto flex items-center gap-2 text-xs text-fg-faint">
            Sector
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="rounded-md border border-line bg-raised px-2 py-1 text-xs text-fg"
            >
              <option value="all">All</option>
              <optgroup label="Business model">
                {models.map((m) => (
                  <option key={m} value={`m:${m}`}>
                    {m}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Industry">
                {sectors.map((s) => (
                  <option key={s} value={`s:${s}`}>
                    {s}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full text-sm ${compact ? "" : "min-w-[640px]"}`}>
          <thead>
            <tr className="border-b border-line text-left text-[11px] tracking-widest text-fg-faint uppercase">
              {showRank && (
                <th scope="col" className="px-6 py-3 font-medium">
                  #
                </th>
              )}
              <th scope="col" className={`${showRank ? "px-4" : "px-6"} py-3 font-medium`}>
                Security
              </th>
              <th
                scope="col"
                aria-sort={sort === "holders" ? (dir === "desc" ? "descending" : "ascending") : "none"}
                className="px-4 py-3 text-right font-medium"
              >
                <button
                  type="button"
                  onClick={() => toggleSort("holders")}
                  className={`uppercase tracking-widest hover:text-fg ${sort === "holders" ? "text-gold-soft" : ""}`}
                  title="Click to sort largest to smallest; click again to flip"
                >
                  Holders{arrow("holders")}
                </button>
              </th>
              <th
                scope="col"
                aria-sort={sort === "avgWeight" ? (dir === "desc" ? "descending" : "ascending") : "none"}
                className="px-4 py-3 text-right font-medium"
              >
                <button
                  type="button"
                  onClick={() => toggleSort("avgWeight")}
                  className={`uppercase tracking-widest hover:text-fg ${sort === "avgWeight" ? "text-gold-soft" : ""}`}
                  title="Click to sort largest to smallest; click again to flip"
                >
                  Avg weight{arrow("avgWeight")}
                </button>
              </th>
              <th
                scope="col"
                aria-sort={sort === "conviction" ? (dir === "desc" ? "descending" : "ascending") : "none"}
                className="px-4 py-3 text-right font-medium"
              >
                <button
                  type="button"
                  onClick={() => toggleSort("conviction")}
                  className={`uppercase tracking-widest hover:text-fg ${sort === "conviction" ? "text-gold-soft" : ""}`}
                  title="Click to sort largest to smallest; click again to flip"
                >
                  Δ weight{arrow("conviction")}
                </button>
              </th>
              {!compact && (
                <th
                scope="col"
                aria-sort={sort === "value" ? (dir === "desc" ? "descending" : "ascending") : "none"}
                className="px-6 py-3 text-right font-medium"
              >
                <button
                  type="button"
                  onClick={() => toggleSort("value")}
                  className={`uppercase tracking-widest hover:text-fg ${sort === "value" ? "text-gold-soft" : ""}`}
                  title="Click to sort largest to smallest; click again to flip"
                >
                  Value{arrow("value")}
                </button>
              </th>
              )}
            </tr>
          </thead>
          <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
            {sorted.map((s, i) => (
              <tr
                key={s.tickerSlug}
                className="group border-b border-line/50 transition-colors last:border-0 hover:bg-raised/60"
              >
                {showRank && (
                  <td className="px-6 py-3 text-fg-faint">{i + 1}</td>
                )}
                <td className={`${showRank ? "px-4" : "px-6"} py-3`}>
                  <Link href={`/stocks/${s.tickerSlug}`} className="flex flex-col">
                    <span className="font-semibold text-fg transition-colors group-hover:text-gold-soft">
                      {s.ticker}
                    </span>
                    <span className="text-xs text-fg-faint">
                      {s.company}
                      {!compact && (
                        <span className="text-fg-faint/70"> · {s.sector} · {s.model}</span>
                      )}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-fg-soft">{s.holders}</td>
                <td className="px-4 py-3 text-right font-medium text-fg">
                  {formatPct(s.avgWeight)}
                </td>
                <td
                  className={`px-4 py-3 text-right ${
                    s.avgWeightChange == null
                      ? "text-fg-faint"
                      : s.avgWeightChange > 0.05
                        ? "text-gain"
                        : s.avgWeightChange < -0.05
                          ? "text-loss"
                          : "text-fg-soft"
                  }`}
                  title="Mean change in portfolio weight across holders vs prior quarter, in percentage points"
                >
                  {s.avgWeightChange == null
                    ? "new"
                    : `${s.avgWeightChange > 0 ? "+" : ""}${s.avgWeightChange.toFixed(1)}pp`}
                </td>
                {!compact && (
                  <td className="px-6 py-3 text-right font-medium text-fg">
                    {formatMoney(s.totalValue)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
