"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Converter } from "@/types/converter";
import convertersData from "@/data/converters.json";
import { useRouter } from "next/navigation";

const converters = convertersData as Converter[];

type SearchToolVariant = "hero" | "navbar";

interface SearchToolProps {
  variant?: SearchToolVariant;
  placeholder?: string;
}

export function SearchTool({ variant = "hero", placeholder }: SearchToolProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Converter[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const filtered = converters
        .filter(c => 
          c.title.toLowerCase().includes(query.toLowerCase()) || 
          c.metadata.keywords.some(k => k.includes(query.toLowerCase()))
        )
        .slice(0, 8);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = results.length > 0 ? results[0] : converters.find((c) => c.title.toLowerCase().includes(query.toLowerCase()));
    if (candidate) {
      router.push(`/${candidate.category}/${candidate.metadata.slug}`);
    }
  };

  const isHero = variant === "hero";
  const inputPlaceholder = placeholder ?? (isHero ? "Search conversions..." : "Search tools");

  return (
    <div ref={containerRef} className={isHero ? "relative w-full" : "relative w-[260px]"}>
      <form onSubmit={handleSearch} className="relative">
        <div className={isHero ? "absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none" : "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"}>
          <Search className={isHero ? "h-5 w-5 text-text-secondary" : "h-4 w-4 text-text-secondary"} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={inputPlaceholder}
          className={
            isHero
              ? "block w-full h-16 pl-12 pr-28 rounded-full bg-white/80 backdrop-blur border border-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.08)] text-base text-text-primary placeholder:text-text-secondary/60 outline-none focus:ring-4 focus:ring-primary/15"
              : "block w-full h-10 pl-9 pr-9 rounded-full bg-background/70 backdrop-blur border border-border shadow-sm text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:ring-2 focus:ring-primary/15"
          }
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className={isHero ? "absolute inset-y-0 right-20 px-3 inline-flex items-center text-text-secondary" : "absolute inset-y-0 right-0 px-3 inline-flex items-center text-text-secondary"}
          >
            <X className={isHero ? "h-5 w-5" : "h-4 w-4"} />
          </button>
        )}

        {isHero && (
          <button
            type="submit"
            className="absolute inset-y-0 right-1.5 my-1.5 px-6 rounded-full bg-gradient-to-r from-primary to-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:from-primary-dark hover:to-[#6D28D9] transition-colors"
          >
            Search
          </button>
        )}
      </form>
    </div>
  );
}
