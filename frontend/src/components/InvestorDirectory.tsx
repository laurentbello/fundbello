"use client";

import { useMemo, useState } from "react";
import type { Investor } from "@/lib/data";
import InvestorCard from "./InvestorCard";
import Reveal from "./Reveal";
import { Search, SearchX } from "lucide-react";

export default function InvestorDirectory({
  investors,
}: {
  investors: Investor[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return investors;
    return investors.filter(
      (inv) =>
        inv.name.toLowerCase().includes(q) ||
        (inv.manager ?? "").toLowerCase().includes(q) ||
        inv.holdings.some(
          (h) =>
            h.ticker.toLowerCase().includes(q) ||
            h.company.toLowerCase().includes(q),
        ),
    );
  }, [investors, query]);

  return (
    <div>
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg-faint"
          aria-hidden="true"
        />
        <label htmlFor="investor-search" className="sr-only">
          Search funds, managers, or tickers
        </label>
        <input
          id="investor-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search funds, managers, tickers…"
          className="h-11 w-full rounded-full border border-line bg-surface pr-4 pl-10 text-sm text-fg placeholder:text-fg-faint focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none"
        />
      </div>

      <p className="mt-6 text-sm text-fg-faint" aria-live="polite">
        {filtered.length} manager{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line py-20 text-center">
          <SearchX size={32} className="text-fg-faint" aria-hidden="true" />
          <p className="mt-4 font-medium text-fg">No managers found</p>
          <p className="mt-1 text-sm text-fg-soft">
            Try a different fund, manager, or ticker symbol.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 cursor-pointer rounded-full border border-gold/40 px-5 py-2 text-sm text-gold-soft transition-colors hover:bg-gold/10"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((inv, i) => (
            <Reveal key={inv.slug} delay={Math.min(i, 5) * 60}>
              <InvestorCard investor={inv} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
