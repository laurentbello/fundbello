"use client";

import { useEffect, useState } from "react";

const KEY = "analytics-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Asks once before Google Analytics may set cookies (needed for EU/UK
 * visitors under GDPR). Until a visitor accepts, GA runs in consent mode
 * "denied": no cookies, only anonymous cookieless pings.
 */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage blocked: just ask */
    }
    if (stored) return;
    const t = setTimeout(() => setShow(true), 0);
    return () => clearTimeout(t);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    window.gtag?.("consent", "update", { analytics_storage: value });
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-fg-soft shadow-lg sm:flex-row sm:items-center"
    >
      <p className="flex-1">
        We use Google Analytics cookies to count visits. No advertising
        cookies.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => choose("denied")}
          className="rounded-full border border-line px-4 py-1.5 hover:text-fg"
        >
          Decline
        </button>
        <button
          onClick={() => choose("granted")}
          className="rounded-full border border-gold/40 px-4 py-1.5 text-gold-soft hover:bg-gold/10"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
