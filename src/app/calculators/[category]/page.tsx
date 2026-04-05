import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { calculators } from "@/data/calculators";
import { calculatorCategories, calculatorCategoryBySlug } from "@/data/calculator-categories";
import {
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
  generateBreadcrumbSchemaFromPaths,
} from "@/lib/seo";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const dynamic = "force-static";
export const dynamicParams = false;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return calculatorCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryDef = calculatorCategoryBySlug.get(category);

  if (!categoryDef) {
    return {};
  }

  return {
    title: categoryDef.name,
    description: categoryDef.description,
    robots: INDEXABLE_ROBOTS,
    alternates: buildAlternates(`/calculators/${category}`),
    keywords: [
      `${categoryDef.shortLabel.toLowerCase()} calculator`,
      `${categoryDef.shortLabel.toLowerCase()} calculators`,
      "online calculators",
      "calculator tools",
    ],
    openGraph: buildOpenGraph({
      title: `${categoryDef.name} | Convertaro`,
      description: categoryDef.description,
      path: `/calculators/${category}`,
    }),
    twitter: buildTwitter(`${categoryDef.name} | Convertaro`, categoryDef.description),
  };
}

export default async function CalculatorCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryDef = calculatorCategoryBySlug.get(category);

  if (!categoryDef) {
    notFound();
  }

  const items = calculators.filter((calculator) => calculator.category === category);
  const webPageSchema = buildWebPageSchema({
    name: categoryDef.name,
    description: categoryDef.description,
    path: `/calculators/${category}`,
  });
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: categoryDef.name, path: `/calculators/${category}` },
  ]);

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <Breadcrumbs
            className="mb-3 flex flex-wrap items-center gap-2 text-sm text-text-secondary"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: categoryDef.name },
            ]}
          />

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
            {categoryDef.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">{categoryDef.description}</p>

          {items.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={`/${calculator.slug}`}
                  className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
                >
                  <p className="text-sm font-bold text-text-primary">{calculator.title}</p>
                  <p className="mt-1.5 text-xs text-text-secondary">{calculator.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 text-sm text-text-secondary">
              This category is set up and ready. New calculators will appear here as we expand the platform.
            </div>
          )}

          <div className="mt-6">
            <Link href="/calculators" className="text-sm font-semibold text-primary hover:underline">View all calculators</Link>
          </div>
        </div>

        <CrawlableLinkHub title="Related Conversion and Calculator Links" limitPerCategory={2} />
      </div>
    </div>
  );
}
