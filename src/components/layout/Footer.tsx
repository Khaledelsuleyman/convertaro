import Link from "next/link";
import { Calculator } from "lucide-react";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-sm">
                <Calculator className="h-4 w-4" />
              </div>
              <div className="text-base font-semibold text-text-primary">Convertaro</div>
            </div>
            <p className="mt-4 text-sm text-text-secondary max-w-md">
              The world&apos;s most accurate and high-performance unit conversion platform. Built for professionals and anyone who values speed and precision.
            </p>
            <p className="mt-6 text-xs text-text-secondary">© {new Date().getFullYear()} Convertaro. All rights reserved.</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Converters</div>
            <ul className="mt-4 space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-text-secondary hover:text-text-primary">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Categories</div>
            <ul className="mt-4 space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-text-secondary hover:text-text-primary">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Resources</div>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/length" className="text-sm text-text-secondary hover:text-text-primary">
                  Length
                </Link>
              </li>
              <li>
                <Link href="/weight" className="text-sm text-text-secondary hover:text-text-primary">
                  Weight
                </Link>
              </li>
              <li>
                <Link href="/temperature" className="text-sm text-text-secondary hover:text-text-primary">
                  Temperature
                </Link>
              </li>
              <li>
                <Link href="/volume" className="text-sm text-text-secondary hover:text-text-primary">
                  Volume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Company</div>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-secondary hover:text-text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-secondary hover:text-text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-text-secondary">Built for Speed — Secure — No Ads Premium Option</div>
          <div className="text-xs text-text-secondary">convertaro.com</div>
        </div>
      </div>
    </footer>
  );
}
