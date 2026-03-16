import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { AdUnit } from "@/components/ui/AdUnit";
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
} from "lucide-react";

const converters = convertersData as Converter[];

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

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];
  const latestConverters = converters.slice(10, 16);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-10 right-0 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <section className="relative pt-20 sm:pt-24 pb-14 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary leading-[1.05]">
            Convert Anything Instantly
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Fast and accurate unit converters for engineers, students and professionals.
          </p>

          <div className="mt-9 sm:mt-10 mx-auto max-w-2xl">
            <SearchTool variant="hero" placeholder="Search conversions..." />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Link href="/length/cm-to-inches" className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all">
              cm → inches
            </Link>
            <Link href="/weight/kg-to-lbs" className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all">
              kg → lbs
            </Link>
            <Link href="/speed/mph-to-kmh" className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all">
              mph → km/h
            </Link>
            <Link href="/temperature/celsius-to-fahrenheit" className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all">
              celsius → fahrenheit
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-10 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Explore Categories
          </h2>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? Ruler;
              const count = converters.filter((c) => c.category === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="group rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 text-primary flex items-center justify-center border border-border/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-sm font-semibold text-text-primary">{category.name}</div>
                  <div className="mt-1 text-xs font-medium text-text-secondary">{count} Tools</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/10 p-6 sm:p-8 shadow-sm">
            <div className="pointer-events-none absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full bg-secondary/15 blur-3xl" />
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">Most Popular Tools</h2>
              <ArrowRight className="h-5 w-5 text-text-secondary" />
            </div>
            <div className="relative mt-6 flex gap-4 overflow-x-auto pb-2">
              {popularConverters.map((converter) => (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="min-w-[260px] flex items-center justify-between rounded-xl bg-white/90 backdrop-blur border border-border/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all px-5 py-4"
                >
                  <div className="text-sm font-semibold text-text-primary">
                    {converter.title.replace("Converter", "").trim()} Converter
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-secondary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">Recently Added</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${converter.category}/${converter.metadata.slug}`}
                    className="group rounded-xl border border-border/70 bg-white/90 backdrop-blur shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all px-5 py-4"
                  >
                    <div className="text-sm font-semibold text-text-primary">{converter.title}</div>
                    <div className="mt-1 text-xs font-medium text-text-secondary capitalize">{converter.category}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-b from-white/90 to-white/70 backdrop-blur border border-border/60 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-text-primary">Quick Jump</h3>
              <div className="mt-5 divide-y divide-border/60 rounded-xl border border-border/60 bg-white/70 backdrop-blur">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background/70 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Why Choose Convertaro
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="group rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-border/60">
                <Zap className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-text-primary">Instant Processing</div>
              <div className="mt-2 text-sm text-text-secondary">Real-time conversions with minimal latency.</div>
            </div>
            <div className="group rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-border/60">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-text-primary">Verified Accuracy</div>
              <div className="mt-2 text-sm text-text-secondary">Formulas aligned with standard conversion factors.</div>
            </div>
            <div className="group rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6">
              <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-border/60">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-text-primary">Mobile Friendly</div>
              <div className="mt-2 text-sm text-text-secondary">Designed to work beautifully on any device.</div>
            </div>
          </div>
        </section>

        <AdUnit variant="banner" className="my-12" />
      </div>
    </div>
  );
}
