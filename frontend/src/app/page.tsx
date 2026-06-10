import Link from "next/link";
import {
  investors,
  platformStats,
  LATEST_QUARTER,
} from "@/lib/data";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Ticker from "@/components/Ticker";
import InvestorCard from "@/components/InvestorCard";
import ActionBadge from "@/components/ActionBadge";
import {
  ArrowRight,
  Bell,
  Check,
  FileSearch,
  Globe2,
  LineChart,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    Icon: FileSearch,
    title: "Every filing, decoded",
    body: "We parse 13F, 13D and international disclosures within minutes of release, turning raw filings into clean position-level changes.",
  },
  {
    Icon: Globe2,
    title: "Global coverage",
    body: "Beyond the US — UK, European and Asian managers tracked across 27 jurisdictions, normalized into one comparable view.",
  },
  {
    Icon: Bell,
    title: "Real-time conviction alerts",
    body: "Get notified when a legend opens a new position, doubles down, or quietly heads for the exit — before the crowd notices.",
  },
  {
    Icon: LineChart,
    title: "Decade-deep history",
    body: "Replay any portfolio quarter by quarter since 2001. See how the greats built positions through fear and euphoria.",
  },
  {
    Icon: Zap,
    title: "Consensus & divergence",
    body: "Spot where the smart money agrees — and where a lone contrarian is betting against everyone else.",
  },
  {
    Icon: ShieldCheck,
    title: "Institutional rigor",
    body: "Audited data pipeline, point-in-time accuracy, and methodology notes on every figure. No survivorship bias.",
  },
];

const tiers = [
  {
    name: "Observer",
    price: "Free",
    cadence: "",
    blurb: "For the curious. Follow the headlines of smart money.",
    features: [
      "Top 10 investors",
      "Quarterly holdings snapshots",
      "Weekly digest email",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Analyst",
    price: "$29",
    cadence: "/month",
    blurb: "For serious individual investors building real positions.",
    features: [
      "All 312 tracked managers",
      "Real-time filing alerts",
      "Full position history since 2001",
      "Consensus & divergence screens",
      "CSV / API export",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Institutional",
    price: "Custom",
    cadence: "",
    blurb: "For funds and family offices that need the full firehose.",
    features: [
      "Everything in Analyst",
      "Bulk data feed & webhooks",
      "Dedicated research support",
      "White-label reporting",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

export default function Home() {
  const featured = investors.slice(0, 6);
  const recentMoves = investors
    .flatMap((inv) =>
      inv.activity
        .filter((a) => a.quarter === LATEST_QUARTER)
        .map((a) => ({ investor: inv, ...a })),
    )
    .slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16">
        {/* ambient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -top-40 left-1/2 h-[480px] w-[760px] max-w-[150vw] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
          <div className="absolute top-40 -right-40 h-80 w-80 rounded-full bg-gain/5 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-widest text-gold-soft uppercase">
              <span className="size-1.5 animate-shimmer rounded-full bg-gold" />
              {LATEST_QUARTER} filings now live
            </p>
            <h1 className="mt-8 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-fg sm:text-6xl lg:text-7xl">
              Follow the moves of{" "}
              <span className="text-glow bg-gradient-to-r from-gold-soft via-gold to-gold-soft bg-clip-text text-transparent italic">
                legendary
              </span>{" "}
              investors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-soft sm:text-lg">
              FundBello decodes the portfolio holdings and trading activity of
              the world&apos;s greatest hedge fund managers — from Omaha to
              London to Hong Kong — the moment their filings drop.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/investors"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_32px_rgba(217,164,65,0.4)] sm:w-auto"
              >
                Explore the legends
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/stocks"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-line bg-surface/60 px-7 text-sm font-medium text-fg transition-colors duration-200 hover:border-fg-faint hover:bg-raised sm:w-auto"
              >
                See top holdings
              </Link>
            </div>
          </Reveal>

          {/* stats */}
          <Reveal delay={150}>
            <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 lg:grid-cols-4">
              {[
                {
                  label: "Investors tracked",
                  value: platformStats.investorsTracked,
                  kind: "int" as const,
                },
                {
                  label: "Filings parsed",
                  value: platformStats.filingsParsed,
                  kind: "int" as const,
                },
                {
                  label: "Assets followed",
                  value: platformStats.assetsTracked,
                  kind: "money" as const,
                },
                {
                  label: "Countries",
                  value: platformStats.countries,
                  kind: "int" as const,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-surface/90 px-6 py-7 text-center"
                >
                  <dd className="font-display text-3xl font-semibold text-fg">
                    <CountUp value={s.value} kind={s.kind} />
                  </dd>
                  <dt className="mt-1.5 text-xs tracking-widest text-fg-faint uppercase">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Ticker />
      </section>

      {/* ── Featured investors ───────────────────────────────── */}
      <section
        id="about"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-widest text-gold uppercase">
              The Directory
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Minds worth following
            </h2>
            <p className="mt-4 leading-relaxed text-fg-soft">
              Each manager profile includes full holdings, sector allocation,
              quarter-over-quarter activity, and a decade of performance
              context.
            </p>
          </div>
          <Link
            href="/investors"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft transition-colors hover:text-gold"
          >
            View all managers
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((inv, i) => (
            <Reveal key={inv.slug} delay={(i % 3) * 70}>
              <InvestorCard investor={inv} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Latest moves ─────────────────────────────────────── */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <p className="text-xs font-medium tracking-widest text-gold uppercase">
              {LATEST_QUARTER} Activity
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              What the smart money just did
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentMoves.map((m, i) => (
              <Reveal key={`${m.investor.slug}-${m.ticker}`} delay={(i % 3) * 60}>
                <Link
                  href={`/investors/${m.investor.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-ink/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-fg">{m.ticker}</span>
                    <ActionBadge action={m.action} />
                  </div>
                  <p className="mt-2 text-sm text-fg-soft">{m.detail}</p>
                  <p className="mt-auto pt-4 text-xs text-fg-faint">
                    {m.investor.name} ·{" "}
                    <span className="text-fg-soft">{m.investor.firm}</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section
        id="features"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Research engine
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Built like a Bloomberg.
            <br />
            Priced like a newsletter.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 70}>
              <div className="group h-full rounded-2xl border border-line bg-surface/60 p-7 transition-all duration-300 hover:border-gold/30 hover:bg-raised">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                  <f.Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-soft">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Quote ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 h-72 w-[640px] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[100px]" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="font-display text-2xl leading-snug font-medium text-fg italic sm:text-3xl">
            “If you copied the 13F filings of great investors, you&apos;d
            outperform most professional money managers — for free.”
          </p>
          <div className="mx-auto mt-8 h-px w-24 hairline-gradient" />
          <p className="mt-6 text-sm tracking-widest text-fg-faint uppercase">
            The thesis behind FundBello
          </p>
        </Reveal>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section
        id="pricing"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Less than one bad trade
          </h2>
          <p className="mt-4 leading-relaxed text-fg-soft">
            Start free. Upgrade when you&apos;re ready to follow every move of
            all 312 managers in real time.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  t.featured
                    ? "border-gold/50 bg-raised shadow-[0_0_48px_rgba(217,164,65,0.12)]"
                    : "border-line bg-surface/60 hover:border-fg-faint"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-wide text-ink uppercase">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-fg">
                  {t.name}
                </h3>
                <p className="mt-3">
                  <span
                    className="font-display text-4xl font-semibold text-fg"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {t.price}
                  </span>
                  <span className="text-sm text-fg-faint">{t.cadence}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-soft">
                  {t.blurb}
                </p>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-fg-soft"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-gain"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/investors"
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                    t.featured
                      ? "bg-gold text-ink hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(217,164,65,0.35)]"
                      : "border border-line text-fg hover:border-gold/40 hover:text-gold-soft"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section id="cta" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute bottom-0 left-1/2 h-80 w-[800px] max-w-[150vw] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            The legends file.{" "}
            <span className="bg-gradient-to-r from-gold-soft to-gold bg-clip-text text-transparent italic">
              We decode.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-fg-soft">
            Join 40,000+ investors who never miss a move from the world&apos;s
            greatest capital allocators.
          </p>
          <Link
            href="/investors"
            className="group mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_32px_rgba(217,164,65,0.4)]"
          >
            Start tracking now
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
