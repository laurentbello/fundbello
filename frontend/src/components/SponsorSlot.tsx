import { ArrowUpRight } from "lucide-react";
import { current, ADVERTISE_EMAIL } from "@/data/sponsor";

/**
 * A single tasteful, clearly-labelled ad slot. Renders the configured sponsor
 * or, when none is set, an "Advertise here" placeholder. Pure markup (no JS,
 * no third-party scripts) so it works on every browser and never covers
 * content. Paid links use rel="sponsored" per Google's guidance.
 */
export default function SponsorSlot() {
  return (
    <aside
      aria-label={current ? "Sponsored" : "Advertising"}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {current ? (
        <>
          <div className="min-w-0">
            <p className="text-[11px] tracking-widest text-fg-faint uppercase">
              Sponsored
            </p>
            <p className="mt-1 text-sm text-fg-soft">
              <span className="font-semibold text-fg">{current.name}</span>
              {" — "}
              {current.tagline}
            </p>
          </div>
          <a
            href={current.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-gold/40 px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:bg-gold/10 sm:self-auto"
          >
            {current.cta ?? "Learn more"}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </>
      ) : (
        <>
          <div className="min-w-0">
            <p className="text-[11px] tracking-widest text-fg-faint uppercase">
              Advertising
            </p>
            <p className="mt-1 text-sm text-fg-soft">
              Reach an audience of serious investors who follow the world&apos;s
              best fund managers.
            </p>
          </div>
          <a
            href={`mailto:${ADVERTISE_EMAIL}?subject=Advertising on Dataroma Global`}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line px-4 py-2 text-sm font-medium text-fg-soft transition-colors hover:border-gold/40 hover:text-gold-soft sm:self-auto"
          >
            Advertise here
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </>
      )}
    </aside>
  );
}
