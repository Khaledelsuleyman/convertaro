import Link from "next/link";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

// Enhanced Breadcrumb Component
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-sm text-slate-500">
        <li>
          <Link href="/" className="flex items-center hover:text-slate-900 transition-colors">
            <Home className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-slate-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-slate-900 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Related Converters Section
export function RelatedConverters({ converters, categoryName, currentSlug }: {
  converters: { slug: string; title: string; category: string }[];
  categoryName: string;
  currentSlug: string;
}) {
  const related = converters.filter(c => c.slug !== currentSlug).slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Related {categoryName} Converters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((converter) => (
          <Link
            key={converter.slug}
            href={`/${converter.category}/${converter.slug}`}
            className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-700">{converter.title}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Cross-Category Links
export function CrossCategoryLinks({ currentCategory }: { currentCategory: string }) {
  const otherCategories = categories.filter(c => c.slug !== currentCategory).slice(0, 5);

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Other Categories</h2>
      <div className="space-y-2">
        {otherCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-white hover:shadow-sm transition-all"
          >
            <span className="text-slate-700">{cat.name}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Popular Tools Sidebar
export function PopularToolsSidebar({ excludeSlug }: { excludeSlug?: string }) {
  const popular = [
    { href: "/length/cm-to-inches", label: "cm to inches", category: "Length" },
    { href: "/weight/kg-to-lbs", label: "kg to lbs", category: "Weight" },
    { href: "/temperature/celsius-to-fahrenheit", label: "°C to °F", category: "Temperature" },
    { href: "/speed/mph-to-kmh", label: "mph to km/h", category: "Speed" },
    { href: "/data/mb-to-gb", label: "MB to GB", category: "Data" },
    { href: "/volume/liters-to-gallons", label: "liters to gallons", category: "Volume" },
  ].filter(t => !excludeSlug || !t.href.includes(excludeSlug));

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Popular Tools
      </h3>
      <div className="space-y-2">
        {popular.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-2 rounded-md hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-900">{tool.label}</span>
            <span className="text-xs text-slate-400 block">{tool.category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Related Calculators
export function RelatedCalculators({ currentSlug }: { currentSlug?: string }) {
  const related = calculators.filter(c => c.slug !== currentSlug).slice(0, 4);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Calculators
      </h3>
      <div className="space-y-2">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="block p-2 rounded-md hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-900">{calc.navLabel}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// SEO Text Links Section (for content pages)
export function SEOLinksSection() {
  return (
    <section className="border-t border-slate-200 pt-8 mt-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Length</h3>
          <ul className="space-y-1">
            <li><Link href="/length/cm-to-inches" className="text-sm text-slate-500 hover:text-slate-900">cm to inches</Link></li>
            <li><Link href="/length/meters-to-feet" className="text-sm text-slate-500 hover:text-slate-900">meters to feet</Link></li>
            <li><Link href="/length/km-to-miles" className="text-sm text-slate-500 hover:text-slate-900">km to miles</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Weight</h3>
          <ul className="space-y-1">
            <li><Link href="/weight/kg-to-lbs" className="text-sm text-slate-500 hover:text-slate-900">kg to lbs</Link></li>
            <li><Link href="/weight/grams-to-ounces" className="text-sm text-slate-500 hover:text-slate-900">g to oz</Link></li>
            <li><Link href="/weight/lbs-to-kg" className="text-sm text-slate-500 hover:text-slate-900">lbs to kg</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Temperature</h3>
          <ul className="space-y-1">
            <li><Link href="/temperature/celsius-to-fahrenheit" className="text-sm text-slate-500 hover:text-slate-900">°C to °F</Link></li>
            <li><Link href="/temperature/fahrenheit-to-celsius" className="text-sm text-slate-500 hover:text-slate-900">°F to °C</Link></li>
            <li><Link href="/temperature/celsius-to-kelvin" className="text-sm text-slate-500 hover:text-slate-900">°C to K</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Calculators</h3>
          <ul className="space-y-1">
            <li><Link href="/bmi-calculator" className="text-sm text-slate-500 hover:text-slate-900">BMI Calculator</Link></li>
            <li><Link href="/percentage-calculator" className="text-sm text-slate-500 hover:text-slate-900">Percentage</Link></li>
            <li><Link href="/age-calculator" className="text-sm text-slate-500 hover:text-slate-900">Age Calculator</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Navigation Sidebar with all categories
export function CategoryNavigation({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Categories
      </h3>
      <div className="space-y-1">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
              cat.slug === activeCategory
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{cat.name}</span>
            {cat.slug === activeCategory && <ChevronRight className="h-3.5 w-3.5" />}
          </Link>
        ))}
      </div>
    </div>
  );
}
