import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Search converters",
  description: "Search all Convertaro converters by unit names, categories, and keywords.",
  alternates: buildAlternates("/search"),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<section className="py-10 sm:py-14" />}>
      <SearchResultsClient />
    </Suspense>
  );
}
