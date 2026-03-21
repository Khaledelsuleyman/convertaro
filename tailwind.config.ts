import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Safelist dynamic category colors so Tailwind doesn't purge them
  safelist: [
    { pattern: /^(bg|text|border|from|to|shadow|ring)-(blue|violet|orange|cyan|emerald|amber|sky|indigo|rose|teal)-(50|100|200|400|500|600|700)/ },
    { pattern: /^hover:(border|shadow|bg)-(blue|violet|orange|cyan|emerald|amber|sky|indigo|rose|teal)-(100|200|500)/ },
    "shadow-blue-100/60",
    "shadow-violet-100/60",
    "shadow-orange-100/60",
    "shadow-cyan-100/60",
    "shadow-emerald-100/60",
    "shadow-amber-100/60",
    "shadow-sky-100/60",
    "shadow-indigo-100/60",
    "shadow-rose-100/60",
    "shadow-teal-100/60",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#EEF2FF",
        },
        secondary: "#06B6D4",
        accent: "#22C55E",
        background: "#F8FAFC",
        card: "#FFFFFF",
        text: {
          primary: "#0F172A",
          secondary: "#475569",
        },
        border: "#E5E7EB",
        slate: {
          400: "#94A3B8",
          500: "#64748B",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "spin-slow": "spin 12s linear infinite",
        blob: "blob 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-10px, 10px) scale(0.96)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.18)",
        "glow-lg": "0 0 80px rgba(99, 102, 241, 0.22)",
        card: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        "inner-glow": "inset 0 1px 2px rgba(255,255,255,0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
