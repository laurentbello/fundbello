import Link from "next/link";
import { Landmark } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8"
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
            Dataroma Global
          </span>
        </Link>
      </nav>
    </header>
  );
}
