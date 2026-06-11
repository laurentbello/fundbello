"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/investors", label: "Managers" },
  { href: "/stocks", label: "Holdings" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-fg transition-opacity hover:opacity-80"
        >
          <span className="flex size-7 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
            <Landmark size={14} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            FundBello
          </span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors duration-200 ${
                  active
                    ? "font-medium text-gold-soft"
                    : "text-fg-soft hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
