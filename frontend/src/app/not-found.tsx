import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
        <Compass size={24} aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold text-fg">
        Position not found
      </h1>
      <p className="mt-3 max-w-sm text-fg-soft">
        This page has been liquidated — or never existed. Even the best
        investors take losses.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-gold px-6 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(217,164,65,0.35)]"
      >
        Back to safety
      </Link>
    </div>
  );
}
