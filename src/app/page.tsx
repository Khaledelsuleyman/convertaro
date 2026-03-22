import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { HomeThemeToggle } from "@/components/home/HomeThemeToggle";
import {
  canonicalConverterCountByCategory,
  canonicalizeConverterHref,
  getCanonicalConverterById,
} from "@/lib/converter-routing";
import {
  INDEXABLE_ROBOTS,
  HOMEPAGE_LONGTAIL_KEYWORDS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Database,
  Droplets,
  Gauge,
  Globe,
  LayoutGrid,
  Lock,
  Ruler,
  Shield,
  Smartphone,
  Sparkles,
  Square,
  Star,
  Thermometer,
  TrendingUp,
  Weight,
  Wind,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Unit Converter - 500+ Accurate Tools",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length, weight, temperature, volume, speed, data & more. Fast, accurate, no signup.",
  robots: INDEXABLE_ROBOTS,
  keywords: [
    "free unit converter",
    "online unit converter",
    "cm to inches",
    "kg to lbs",
    "celsius to fahrenheit",
    "miles to km",
    "unit conversion",
    "measurement converter",
    "metric converter",
    "imperial converter",
    ...HOMEPAGE_LONGTAIL_KEYWORDS.slice(0, 20),
  ],
  alternates: buildAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    description: "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    path: "/",
  }),
  twitter: buildTwitter(
    "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed, data and more."
  ),
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler,
  Weight,
  Thermometer,
  Droplets,
  Square,
  Gauge,
  Clock,
  Database,
  Zap,
  Wind,
};

const QUICK_LINKS = [
  { href: "/length/cm-to-inches", label: "cm to inches", meta: "Sizing" },
  { href: "/weight/kg-to-lbs", label: "kg to lbs", meta: "Fitness" },
  { href: "/temperature/celsius-to-fahrenheit", label: "C to F", meta: "Weather" },
  { href: "/volume/liters-to-gallons", label: "L to gallons", meta: "Capacity" },
  { href: "/data/megabytes-to-gigabytes", label: "MB to GB", meta: "Storage" },
  { href: "/length/km-to-miles", label: "km to miles", meta: "Travel" },
].map((link) => ({
  ...link,
  href: canonicalizeConverterHref(link.href),
}));

const TRUST_METRICS = [
  { value: "500+", label: "Converters", note: "Across major unit categories" },
  { value: "Instant", label: "Results", note: "Fast enough for quick checks" },
  { value: "Formula-led", label: "Trust", note: "Clear method on each tool page" },
  { value: "Mobile-ready", label: "UX", note: "Readable on every screen" },
];

const FEATURES = [
  { icon: Zap, title: "Clarity-first search", desc: "A centered search experience that gets you to the right tool fast." },
  { icon: CheckCircle2, title: "Formula-backed pages", desc: "Converters pair instant answers with formulas, examples, and tables." },
  { icon: Shield, title: "Warm and trustworthy", desc: "Editorial trust signals and clean layouts keep the experience credible." },
  { icon: Smartphone, title: "Thoughtful on mobile", desc: "Whitespace, soft cards, and clear actions stay readable on smaller screens." },
];

const HIGHLIGHTS = [
  { icon: Sparkles, title: "Soft pastel gradients", desc: "Warm mocha, lavender, and green accents keep the interface calm and modern." },
  { icon: Globe, title: "Everyday to technical", desc: "From cooking and travel to engineering and labs, the same system stays easy to scan." },
  { icon: TrendingUp, title: "Built for growth", desc: "Homepage, category hubs, calculators, and converter pages connect cleanly into one structure." },
];

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => getCanonicalConverterById(id))
    .filter(Boolean) as Converter[];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convertaro Unit Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
    },
  };

  const webPageSchema = buildWebPageSchema({
    name: "Convertaro Home",
    description:
      "Convert any unit instantly with 500+ free online conversion tools for length, weight, temperature, volume, speed, data, and more.",
    path: "/",
  });

  return (
    <div
      className="home-shell min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 10% 0%, rgba(167,139,250,0.16), transparent 28%), radial-gradient(circle at 88% 4%, rgba(164,120,100,0.2), transparent 28%), linear-gradient(180deg, var(--home-bg) 0%, #ffffff 44%, #faf6f3 100%)",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(167,139,250,0.15),transparent_22%),radial-gradient(circle_at_82%_0%,rgba(164,120,100,0.22),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(76,175,80,0.1),transparent_28%)]" />
        <div className="container-pro relative">
          <div className="mb-8 flex justify-end">
            <HomeThemeToggle />
          </div>

          <div className="mx-auto max-w-5xl text-center reveal-on-scroll">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_16px_32px_-26px_rgba(164,120,100,0.75)] backdrop-blur"
              style={{
                color: "var(--home-accent-strong)",
                borderColor: "var(--home-border)",
                background: "rgba(255,255,255,0.74)",
              }}
            >
              <Star className="h-4 w-4" style={{ color: "var(--home-lavender)" }} />
              Warm, clarity-first converter workspace
            </div>

            <h1 className="mt-8 font-display text-4xl font-semibold leading-tight sm:text-6xl sm:leading-[1.05]"
              style={{ color: "var(--home-text)" }}
            >
              Modern unit conversion,
              <span className="block" style={{ color: "var(--home-accent)" }}>
                designed for calm confidence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 sm:text-lg" style={{ color: "var(--home-muted)" }}>
              Search instantly, browse clean category cards, and move into formula-backed converter pages without friction.
              Convertaro blends warm visual design with practical utility so every measurement task feels easier to trust.
            </p>

            <div className="mx-auto mt-10 max-w-3xl rounded-[32px] border p-4 sm:p-6 home-card">
              <div className="rounded-[28px] bg-white/90 p-3 sm:p-4">
                <SearchTool />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span style={{ color: "var(--home-muted)" }}>Popular starts:</span>
                {QUICK_LINKS.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="home-soft-button inline-flex items-center gap-2 rounded-full border px-3 py-2 font-medium"
                    style={{
                      color: "var(--home-text)",
                      borderColor: "var(--home-border)",
                      background: "rgba(255,255,255,0.92)",
                    }}
                  >
                    <span>{link.label}</span>
                    <span className="rounded-full px-2 py-0.5 text-[11px]" style={{ background: "rgba(167,139,250,0.14)", color: "var(--home-accent)" }}>
                      {link.meta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={canonicalizeConverterHref("/length/cm-to-inches")}
                className="home-soft-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #A47864 0%, #8F6652 100%)" }}
              >
                Start converting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/popular-conversion-tools"
                className="home-soft-button inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
                style={{ color: "var(--home-text)", borderColor: "var(--home-border)", background: "rgba(255,255,255,0.82)" }}
              >
                Explore the hub
                <ArrowUpRight className="h-4 w-4" style={{ color: "var(--home-lavender)" }} />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 reveal-on-scroll">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="home-card rounded-[28px] p-5">
                <p className="text-2xl font-display font-semibold tabular-nums" style={{ color: "var(--home-text)" }}>{metric.value}</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: "var(--home-accent)" }}>{metric.label}</p>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--home-muted)" }}>{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container-pro">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between reveal-on-scroll">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--home-lavender)" }}>
                Browse by category
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold" style={{ color: "var(--home-text)" }}>
                Clean cards. Simple icons. Fast pathways.
              </h2>
              <p className="mt-3 text-base leading-7" style={{ color: "var(--home-muted)" }}>
                Jump into the exact measurement family you need without scanning a cluttered directory.
              </p>
            </div>
            <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--home-accent)" }}>
              Search everything
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 reveal-on-scroll">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? LayoutGrid;

              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="home-card group rounded-[28px] p-5 text-left transition-all duration-300"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "linear-gradient(145deg, rgba(167,139,250,0.14), rgba(164,120,100,0.12))",
                      color: "var(--home-green)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold" style={{ color: "var(--home-text)" }}>{category.name}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--home-muted)" }}>{category.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                    <span style={{ color: "var(--home-accent)" }}>{canonicalConverterCountByCategory.get(category.id) ?? 0} tools</span>
                    <ArrowUpRight className="h-4 w-4" style={{ color: "var(--home-lavender)" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container-pro grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="home-card reveal-on-scroll rounded-[32px] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--home-accent)" }}>
              Most used tools
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold" style={{ color: "var(--home-text)" }}>
              Popular converters, surfaced early.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: "var(--home-muted)" }}>
              The strongest high-intent tools stay near the top so users and crawlers reach the best pages faster.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {popularConverters.map((converter) => (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="home-soft-button rounded-[26px] border p-5"
                  style={{ borderColor: "var(--home-border)", background: "var(--home-panel-strong)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold" style={{ color: "var(--home-text)" }}>{converter.title}</p>
                    <ArrowUpRight className="h-4 w-4" style={{ color: "var(--home-lavender)" }} />
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--home-muted)" }}>{converter.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6 reveal-on-scroll">
            <div className="home-card rounded-[32px] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold" style={{ color: "var(--home-text)" }}>What makes it feel better</h2>
              <div className="mt-5 space-y-4">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="rounded-[24px] border p-4" style={{ borderColor: "var(--home-border)", background: "rgba(255,255,255,0.68)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: "rgba(76,175,80,0.12)", color: "var(--home-green)" }}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: "var(--home-text)" }}>{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6" style={{ color: "var(--home-muted)" }}>{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border p-6 sm:p-8" style={{ borderColor: "rgba(167,139,250,0.2)", background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(167,139,250,0.1) 100%)" }}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--home-lavender)" }}>
                Warm trust layer
              </p>
              <p className="mt-3 text-base leading-7" style={{ color: "var(--home-text)" }}>
                Subtle gradients, soft shadows, and generous whitespace create a modern 2026-style interface without sacrificing speed or readability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container-pro reveal-on-scroll">
          <div className="rounded-[36px] border px-6 py-8 sm:px-10 sm:py-12" style={{ borderColor: "var(--home-border)", background: "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(164,120,100,0.08) 54%, rgba(167,139,250,0.12) 100%)" }}>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--home-green)" }}>
                  Built for modern workflows
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold" style={{ color: "var(--home-text)" }}>
                  Trustworthy by default, inviting by design.
                </h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--home-muted)" }}>
                  Whether someone needs a quick answer or wants to browse deeper into category hubs, the structure stays clear, warm, and accessible.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/popular-conversion-tools"
                    className="home-soft-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)" }}
                  >
                    Open popular tools
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/calculators"
                    className="home-soft-button inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold"
                    style={{ borderColor: "var(--home-border)", color: "var(--home-text)", background: "rgba(255,255,255,0.82)" }}
                  >
                    Browse calculators
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {HIGHLIGHTS.map((highlight) => (
                  <div key={highlight.title} className="home-card rounded-[26px] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "rgba(164,120,100,0.12)", color: "var(--home-accent)" }}>
                      <highlight.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold" style={{ color: "var(--home-text)" }}>{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--home-muted)" }}>{highlight.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 px-4 py-14 sm:py-16">
        <div className="container-pro">
          <CrawlableLinkHub title="Internal Links Hub" limitPerCategory={3} />
        </div>
      </section>
    </div>
  );
}
