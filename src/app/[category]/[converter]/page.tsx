import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Converter } from "@/types/converter";
import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import { ChevronRight, Home, Calculator, Lightbulb, Table, Zap } from "lucide-react";

const converters = convertersData as Converter[];

interface PageProps {
  params: Promise<{
    category: string;
    converter: string;
  }>;
}

export async function generateStaticParams() {
  return converters.map((c) => ({
    category: c.category,
    converter: c.metadata.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, converter: slug } = await params;
  const converter = converters.find(c => c.category === category && c.metadata.slug === slug);
  
  if (!converter) return {};

  return {
    title: `${converter.title} - Free Online Tool | Convertaro`,
    description: converter.description,
    keywords: converter.metadata.keywords,
    alternates: {
      canonical: `https://convertaro.com/${category}/${slug}`,
    },
    openGraph: {
      title: converter.title,
      description: converter.description,
      siteName: "Convertaro",
      type: "website",
    },
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { category: categorySlug, converter: slug } = await params;
  const converter = converters.find(c => c.category === categorySlug && c.metadata.slug === slug);
  const category = categories.find(c => c.slug === categorySlug);

  if (!converter || !category) {
    notFound();
  }

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": converter.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="bg-background min-h-screen py-12">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-10">
          <Link href="/" className="hover:text-primary flex items-center transition-colors">
            <Home className="h-4 w-4 mr-2" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <Link href={`/${categorySlug}`} className="hover:text-primary capitalize transition-colors">
            {category.name}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="text-text-primary font-bold truncate">{converter.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
                {converter.title}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl leading-relaxed font-medium">
                {converter.description} Fast, accurate, and completely free.
              </p>
            </div>

            {/* Converter Tool */}
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border">
              <ConverterTool converter={converter} />
            </div>

            <AdUnit variant="banner" />

            {/* Formula & Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border group hover:border-primary transition-all duration-300">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-8">
                  <Calculator className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Conversion Formula</h2>
                <div className="bg-background p-6 rounded-2xl border border-border font-mono text-primary font-bold text-xl mb-6 text-center shadow-inner">
                  {converter.formula}
                </div>
                <p className="text-text-secondary text-base leading-relaxed font-medium">
                  To convert {converter.fromUnit} to {converter.toUnit}, multiply the value by the conversion factor or use our instant tool above.
                </p>
              </section>

              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border group hover:border-secondary transition-all duration-300">
                <div className="h-12 w-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-8">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Calculation Guide</h2>
                <p className="text-text-secondary text-base leading-relaxed font-medium mb-8">
                  Learn how to convert units with our simple guide and formula explanation. We provide step-by-step calculations for precision.
                </p>
                <Link href={`/${categorySlug}`} className="text-primary font-bold hover:underline flex items-center group/link">
                  Browse {category.name} tools <ChevronRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </section>
            </div>

            {/* Conversion Table */}
            <section className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-border">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-bold text-text-primary tracking-tight">{converter.fromUnit} to {converter.toUnit} Table</h2>
                  <Table className="h-8 w-8 text-text-secondary opacity-20" />
              </div>
              <ConversionTable converter={converter} />
            </section>

            {/* FAQ Section */}
            <section className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-border">
              <h2 className="text-3xl font-bold text-text-primary mb-12 tracking-tight">Common Questions</h2>
              <FAQSection faq={converter.faq} />
            </section>

            {/* Related Converters */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">More {category.name} Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {converter.relatedConverters.map((slug) => {
                  const related = converters.find(c => c.id === slug);
                  if (!related) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/${categorySlug}/${related.metadata.slug}`}
                      className="bg-white p-6 rounded-2xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300 group"
                    >
                      <span className="text-text-primary group-hover:text-primary font-bold text-lg transition-colors">{related.title}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <AdUnit variant="sidebar" />
            
            <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-text-primary mb-8 tracking-tight">All Categories</h3>
              <div className="space-y-3">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all border ${
                      cat.slug === categorySlug 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'text-text-secondary hover:bg-background border-transparent hover:border-border'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 ${cat.slug === categorySlug ? 'opacity-100' : 'opacity-0'}`} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary to-secondary/80 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-secondary/10 relative overflow-hidden group">
              <Zap className="h-10 w-10 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Fast & Accurate</h3>
              <p className="text-white/80 font-medium leading-relaxed">
                Need more precision? Our tools support up to 10 decimal places for engineering needs.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
