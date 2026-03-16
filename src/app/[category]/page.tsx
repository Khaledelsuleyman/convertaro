import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import { ChevronRight, Home, Calculator, CheckCircle2 } from "lucide-react";

const converters = convertersData as Converter[];

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find(c => c.slug === slug);
  
  if (!category) return {};

  return {
    title: `${category.name} Converters - Free Online Tools | Convertaro`,
    description: category.description,
    alternates: {
      canonical: `https://convertaro.com/${slug}`,
    },
    openGraph: {
      siteName: "Convertaro",
      title: `${category.name} Converters - Free Online Tools | Convertaro`,
      description: category.description,
      type: "website",
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryConverters = converters.filter(c => c.category === slug);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-10">
          <Link href="/" className="hover:text-primary flex items-center transition-colors">
            <Home className="h-4 w-4 mr-2" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="text-text-primary font-bold capitalize">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          <div className="space-y-12">
            {/* Title Section */}
            <div className="relative p-10 md:p-16 bg-white rounded-[3rem] border border-border overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10">
                <h1 className="text-5xl font-extrabold text-text-primary mb-6 tracking-tight">
                  {category.name} <span className="text-primary">Converters</span>
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed font-medium">
                  {category.description} Precise and instant {category.name.toLowerCase()} conversion tools for engineering, science, and everyday use.
                </p>
              </div>
            </div>

            {/* Converters Grid */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary">Available Tools</h2>
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full">
                  {categoryConverters.length} Converters
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${category.slug}/${converter.metadata.slug}`}
                    className="bg-white p-8 rounded-[2rem] border border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-background text-text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Calculator className="h-6 w-6" />
                      </div>
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors mb-3">
                      {converter.title}
                    </h3>
                    <p className="text-base text-text-secondary line-clamp-2 font-medium">
                      {converter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category Explanation */}
            <section className="bg-white p-10 md:p-16 rounded-[3rem] border border-border shadow-sm">
              <h2 className="text-3xl font-bold text-text-primary mb-8 tracking-tight">Understanding {category.name}</h2>
              <div className="prose prose-slate prose-lg max-w-none text-text-secondary font-medium leading-relaxed">
                <p className="mb-6">
                  {category.name} units are fundamental to our understanding of the physical world. From high-precision engineering projects to daily measurements, accurate conversion is essential.
                </p>
                <p className="mb-6">
                  Our platform uses high-precision algorithms to ensure that every conversion result is accurate. We provide:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span>Real-time instant results</span>
                  </li>
                  <li className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span>Scientific-grade formulas</span>
                  </li>
                  <li className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span>Historical unit context</span>
                  </li>
                  <li className="flex items-center space-x-3 bg-background p-4 rounded-2xl border border-border">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span>Easy-to-read reference tables</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <AdUnit variant="sidebar" />
            
            <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-text-primary mb-8 tracking-tight">Browse Categories</h3>
              <div className="space-y-3">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all border ${
                      cat.slug === slug 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'text-text-secondary hover:bg-background border-transparent hover:border-border'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 ${cat.slug === slug ? 'opacity-100' : 'opacity-0'}`} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
