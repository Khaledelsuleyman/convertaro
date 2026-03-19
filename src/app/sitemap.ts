import { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";

const converters = convertersData as Converter[];
const BASE_URL = "https://convertaro.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Add static pages
  const staticPages = [
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  // Add category pages
  categories.forEach((category) => {
    routes.push({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  // Add converter pages
  converters.forEach((converter) => {
    routes.push({
      url: `${BASE_URL}/${converter.category}/${converter.metadata.slug}`,
      lastModified: new Date(converter.metadata.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  });

  return routes;
}
