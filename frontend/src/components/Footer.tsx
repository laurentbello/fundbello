import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-display font-semibold text-fg">FundBello</p>
          <nav className="flex gap-6" aria-label="Footer">
            <Link
              href="/investors"
              className="text-sm text-fg-soft transition-colors hover:text-gold-soft"
            >
              Managers
            </Link>
            <Link
              href="/stocks"
              className="text-sm text-fg-soft transition-colors hover:text-gold-soft"
            >
              Holdings
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-fg-faint">
          © {new Date().getFullYear()} FundBello. Data is derived from public
          13F and fund filings and is provided for research purposes only. It
          may contain errors or be out of date. Nothing on this site
          constitutes investment advice.
        </p>
      </div>
    </footer>
  );
}
