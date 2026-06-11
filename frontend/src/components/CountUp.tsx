"use client";

import { useEffect, useRef, useState } from "react";
import { formatMoney } from "@/lib/format";

interface CountUpProps {
  value: number;
  /** "int" renders a localized integer; "money" renders compact USD. */
  kind?: "int" | "money";
  duration?: number;
  className?: string;
}

/** Animates a number from 0 to value once it scrolls into view. */
export default function CountUp({
  value,
  kind = "int",
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        if (reduced) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const text =
    kind === "money"
      ? formatMoney(display)
      : Math.round(display).toLocaleString("en-US");

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {text}
    </span>
  );
}
