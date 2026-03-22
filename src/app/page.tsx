import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { canonicalFromPath, INDEXABLE_ROBOTS, HOMEPAGE_LONGTAIL_KEYWORDS } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Database,
  Droplets,
  Gauge,
  Ruler,
  Square,
  Thermometer,
  Weight,
  Wind,
  Clock,
  Zap,
  Smartphone,
  CheckCircle2,
  Lock,
  Globe,
  Star,
  TrendingUp,
  LayoutGrid,
  Search,
  Shield,
  Lightning,
} from "lucide-react";

// Enhanced SEO with long-tail keywords
export const metadata: Metadata = {
  title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length (cm to inches), weight (kg to lbs), temperature (°C to °F), volume, speed, data & more. Fast, accurate, no signup.",
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
  alternates: { canonical: canonicalFromPath("/") },
  openGraph: {
    title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    description: "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    url: "https://convertaro.com",
    type: "website",
  },
};

const converters = convertersData as Converter[];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind,
};

const QUICK_LINKS = [
  { href: "/length/cm-to-inches", label: "cm → inches" },
  { href: "/weight/kg-to-lbs", label: "kg → lbs" },
  { href: "/speed/mph-to-kmh", label: "mph → km/h" },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F" },
  { href: "/length/km-to-miles", label: "km → miles" },
  { href: "/data/mb-to-gb", label: "MB → GB" },
  { href: "/volume/liters-to-gallons", label: "L → gallons" },
  { href: "/weight/lbs-to-kg", label: "lbs → kg" },
];

const FEATURES = [
  { icon: Lightning, title: "Instant Results", desc: "Sub-millisecond calculations. No waiting, no loading." },
  { icon: CheckCircle2, title: "Verified Accuracy", desc: "All formulas verified against SI, NIST, and ISO standards." },
  { icon: Lock, title: "100% Private", desc: "Your data never leaves your browser. No account required." },
  { icon: Smartphone, title: "Works Everywhere", desc: "Fully responsive. Desktop, tablet, and mobile." },
  { icon: Globe, title: "Used Worldwide", desc: "Trusted by professionals in 150+ countries." },
  { icon: TrendingUp, title: "Always Free", desc: "No hidden fees. No premium plans. Just free tools." },
];

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];

  const latestConverters = converters.slice(10, 16);

  // Schema markup for homepage
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convertaro Unit Converter",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: "https://convertaro.com",
    description: "Free online unit conversion tool with 500+ converters across 10 categories.",
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

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero Section - Clean, Professional */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 mb-6">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>500+ Free Tools · Accurate · No Signup</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4">
              Convert Any Unit.
              <br />
              <span className="text-slate-400">Instantly.</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
              The world&apos;s fastest free unit converter. Length, weight, temperature, speed, and 7 more categories — all in one place.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-6">
              <SearchTool variant="hero" placeholder="Search any conversion (e.g., kg to lbs)" />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-md hover:border-slate-300 hover:text-slate-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { value: "500+", label: "Free Tools" },
                { value: "10", label: "Categories" },
                { value: "150+", label: "Countries" },
                { value: "100%", label: "Free" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-slate-900 tabular-nums">{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-pro border-b border-slate-200">
        <div className="container-pro">
          <div className="mb-10">
            <h2 className="heading-section mb-2">Browse Categories</h2>
            <p className="text-muted-pro">10 categories with 500+ conversion tools</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? Ruler;
              const count = converters.filter((c) => c.category === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="card-pro p-5 group"
                >
                  <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5 text-slate-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-slate-700">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500">{count} tools</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="section-pro border-b border-slate-200 bg-slate-50">
        <div className="container-pro">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="heading-section mb-2">Calculators</h2>
              <p className="text-muted-pro">Beyond conversions: finance, health, and everyday math</p>
            </div>
            <Link href="/calculators" className="btn-pro-secondary hidden sm:inline-flex">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/${calculator.slug}`}
                className="card-pro p-4"
              >
                <h3 className="font-semibold text-slate-900 mb-1">{calculator.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="section-pro border-b border-slate-200">
        <div className="container-pro">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-section mb-2">Popular Converters</h2>
              <p className="text-muted-pro">Most used conversion tools this month</p>
            </div>
            <Link href="/length" className="text-sm font-medium text-slate-900 hover:text-slate-600 hidden sm:inline-flex items-center">
              Browse All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularConverters.map((converter, i) => (
              <Link
                key={converter.id}
                href={`/${converter.category}/${converter.metadata.slug}`}
                className="card-pro p-5 relative overflow-hidden"
              >
                <span className="absolute top-3 right-4 text-5xl font-bold text-slate-100 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                    {converter.category}
                  </p>
                  <h3 className="font-semibold text-slate-900 mb-4">{converter.title}</h3>
                  <div className="flex items-center text-sm text-slate-600">
                    <span>Open Tool</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-pro border-b border-slate-200">
        <div className="container-pro">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-2">Built Different</h2>
            <p className="text-muted-pro max-w-md mx-auto">
              We obsess over accuracy, speed, and design so you can focus on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-slate-200 rounded-lg bg-white">
                <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added + Quick Jump */}
      <section className="section-pro border-b border-slate-200 bg-slate-50">
        <div className="container-pro">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recently Added */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="heading-subsection">Recently Added</h3>
                  <span className="badge-pro">New</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {latestConverters.map((converter) => (
                    <Link
                      key={converter.id}
                      href={`/${converter.category}/${converter.metadata.slug}`}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{converter.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{converter.category}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="heading-subsection mb-4">Quick Jump</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pro">
        <div className="container-pro">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Ready to Convert?</h2>
            <p className="text-slate-500 mb-8">
              Join millions of users who rely on Convertaro for fast, accurate conversions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/length/cm-to-inches" className="btn-pro">
                Try cm to inches
              </Link>
              <Link href="/weight/kg-to-lbs" className="btn-pro-secondary">
                Try kg to lbs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
