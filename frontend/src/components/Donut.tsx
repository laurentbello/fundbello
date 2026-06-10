"use client";

import { useEffect, useRef, useState } from "react";
import type { SectorSlice } from "@/lib/data";

const PALETTE = [
  "#d9a441",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#fb923c",
];

interface DonutProps {
  slices: SectorSlice[];
  size?: number;
}

/** Animated SVG donut chart for sector allocation, with legend. */
export default function Donut({ slices, size = 180 }: DonutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion is handled in CSS (.donut-seg transition disabled),
    // so segments simply snap in when the observer fires.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offsets = slices.reduce<number[]>(
    (acc, s, i) => [...acc, acc[i] + (s.pct / 100) * c],
    [0],
  );
  const largest = slices.reduce(
    (max, s) => (s.pct > max.pct ? s : max),
    slices[0],
  );

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Sector allocation: ${slices.map((s) => `${s.sector} ${s.pct}%`).join(", ")}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
          opacity={0.35}
        />
        {slices.map((s, i) => {
          const len = (s.pct / 100) * c;
          return (
            <circle
              key={s.sector}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={visible ? -offsets[i] : c * 0.25}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="donut-seg"
              style={{ transitionDelay: `${i * 90}ms` }}
              opacity={visible ? 1 : 0}
            />
          );
        })}
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          fill="var(--color-fg)"
          fontSize="22"
          fontWeight="600"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {largest?.pct.toFixed(0)}%
        </text>
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          fill="var(--color-fg-soft)"
          fontSize="10"
        >
          {largest?.sector}
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {slices.map((s, i) => (
          <li key={s.sector} className="flex items-center gap-2.5">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="text-fg-soft">{s.sector}</span>
            <span
              className="ml-auto pl-4 font-medium text-fg"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {s.pct.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
