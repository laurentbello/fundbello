import Link from "next/link";
import { Landmark } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Investor Directory", href: "/investors" },
      { label: "Top Holdings", href: "/stocks" },
      { label: "Research", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Methodology", href: "/#features" },
      { label: "Careers", href: "/#about" },
      { label: "Contact", href: "/#cta" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Disclosures", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-fg">
              <span className="flex size-8 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
                <Landmark size={16} aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold">
                FundBello
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-soft">
              Institutional-grade research on the holdings and trades of the
              world&apos;s most legendary investors.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-widest text-fg-faint uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-soft transition-colors duration-200 hover:text-gold-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-fg-faint">
            © {new Date().getFullYear()} FundBello. All data shown is
            illustrative sample data derived from public 13F-style filings and
            is provided for research purposes only. Nothing on this site
            constitutes investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
