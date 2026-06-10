"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Landmark, Menu, X } from "lucide-react";

const links = [
  { href: "/investors", label: "Investors" },
  { href: "/stocks", label: "Holdings" },
  { href: "/#features", label: "Research" },
  { href: "/#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-fg transition-opacity hover:opacity-80"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
            <Landmark size={16} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            FundBello
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active =
              !l.href.includes("#") && pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors duration-200 ${
                  active ? "text-gold-soft" : "text-fg-soft hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/investors"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(217,164,65,0.35)]"
          >
            Start Tracking
          </Link>
        </div>

        <button
          type="button"
          className="flex size-11 cursor-pointer items-center justify-center rounded-md text-fg-soft transition-colors hover:text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/95 px-4 pt-2 pb-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-fg-soft transition-colors hover:bg-raised hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/investors"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gold px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Start Tracking
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
