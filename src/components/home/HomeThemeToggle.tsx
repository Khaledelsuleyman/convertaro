"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "convertaro-home-theme";

export function HomeThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const nextIsDark = saved === "dark";
    setIsDark(nextIsDark);
    document.documentElement.dataset.homeTheme = nextIsDark ? "dark" : "light";

    return () => {
      delete document.documentElement.dataset.homeTheme;
    };
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.dataset.homeTheme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch homepage to light mode" : "Switch homepage to dark mode"}
      className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(164,120,100,0.2)] bg-white/80 px-3 py-2 text-xs font-semibold text-[color:#6C4D3B] shadow-[0_18px_30px_-24px_rgba(164,120,100,0.75)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
    >
      {isDark ? <MoonStar className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
      {isDark ? "Dark mode" : "Light mode"}
    </button>
  );
}
