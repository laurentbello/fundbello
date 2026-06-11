"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, User } from "lucide-react";

export interface StockHit {
  ticker: string;
  tickerSlug: string;
  company: string;
  holders: number;
}

export interface FundHit {
  slug: string;
  name: string;
  manager: string | null;
}

export default function SearchBox({
  stocks,
  funds,
}: {
  stocks: StockHit[];
  funds: FundHit[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // Names match on word prefixes ("ge" → "General Electric", not
    // "...Management"); tickers match anywhere.
    const wordMatch = (text: string) =>
      text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .some((w) => w.startsWith(q));

    const stockHits = stocks
      .filter(
        (s) => s.ticker.toLowerCase().includes(q) || wordMatch(s.company),
      )
      .sort((a, b) => {
        // Exact/prefix ticker matches first, then by number of holders.
        const rank = (s: StockHit) =>
          s.ticker.toLowerCase() === q
            ? 0
            : s.ticker.toLowerCase().startsWith(q)
              ? 1
              : 2;
        return rank(a) - rank(b) || b.holders - a.holders;
      })
      .slice(0, 6);

    const fundHits = funds
      .filter((f) => wordMatch(f.name) || wordMatch(f.manager ?? ""))
      .slice(0, 4);

    return { stockHits, fundHits };
  }, [query, stocks, funds]);

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-faint"
          aria-hidden="true"
        />
        <label htmlFor="site-search" className="sr-only">
          Search stocks or managers
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Company/ticker"
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-line bg-surface pr-4 pl-11 text-base text-fg placeholder:text-fg-faint focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none"
        />
      </div>

      {results && (
        <div className="mt-2 overflow-hidden rounded-xl border border-line bg-surface">
          {results.stockHits.length === 0 && results.fundHits.length === 0 ? (
            <p className="px-4 py-4 text-sm text-fg-soft">
              No stock or manager matches &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <ul>
              {results.stockHits.map((s) => (
                <li key={s.tickerSlug} className="border-b border-line/50 last:border-0">
                  <Link
                    href={`/stocks/${s.tickerSlug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-raised"
                  >
                    <TrendingUp size={15} className="shrink-0 text-gold" aria-hidden="true" />
                    <span className="font-semibold text-fg">{s.ticker}</span>
                    <span className="truncate text-sm text-fg-soft">
                      {s.company}
                    </span>
                    <span
                      className="ml-auto shrink-0 text-xs text-fg-faint"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {s.holders} investor{s.holders === 1 ? "" : "s"}
                    </span>
                  </Link>
                </li>
              ))}
              {results.fundHits.map((f) => (
                <li key={f.slug} className="border-b border-line/50 last:border-0">
                  <Link
                    href={`/investors/${f.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-raised"
                  >
                    <User size={15} className="shrink-0 text-fg-faint" aria-hidden="true" />
                    <span className="font-semibold text-fg">{f.name}</span>
                    {f.manager && (
                      <span className="truncate text-sm text-fg-soft">
                        {f.manager}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
