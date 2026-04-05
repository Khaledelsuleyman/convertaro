import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import {
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";
import { TrustMetadataBlock } from "@/components/trust/TrustMetadataBlock";
import { getAboutTrustSections, getSiteTrustMetadata } from "@/lib/trust";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Convertaro is, what it does, and who it is for.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/about"),
  openGraph: buildOpenGraph({
    title: "About Convertaro",
    description: "Learn what Convertaro is, what it does, and who it is for.",
    path: "/about",
  }),
  twitter: buildTwitter("About Convertaro", "Learn what Convertaro is, what it does, and who it is for."),
};

export default function AboutPage() {
  const webPageSchema = buildWebPageSchema({
    name: "About Convertaro",
    description: "Learn what Convertaro is, what it does, and who it is for.",
    path: "/about",
  });
  const aboutTrust = getAboutTrustSections();
  const siteTrustMetadata = getSiteTrustMetadata();

  return (
    <PageShell
      title="About Convertaro"
      subtitle="Convertaro is a converter and calculator platform designed to make standard formulas easier to use, check, and understand."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div className="space-y-8 text-text-secondary">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">What Convertaro does</h2>
          <p className="leading-relaxed">
            Convertaro helps people convert units and run practical calculations without digging through scattered formulas,
            tables, or documentation. Converter pages show the formula, examples, reference values, and related tools.
            Calculator pages focus on common planning tasks like BMI, age, percentages, loans, and mortgages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">How formulas and conversions are maintained</h2>
          <ul className="space-y-3">
            {aboutTrust.maintenance.map((item) => (
              <li key={item} className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Who it’s for</h2>
          <p className="leading-relaxed">
            Convertaro is designed for students, engineers, researchers, professionals, and anyone who needs reliable
            conversions without friction.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Students</span> — homework, labs, and exam prep
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Engineers</span> — specs, drawings, and calculations
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Professionals</span> — reporting, logistics, and ops
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Everyone</span> — everyday conversions in seconds
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Why users can trust the site</h2>
          <p className="leading-relaxed">
            We keep trust language specific and restrained. Pages identify when a tool is based on a standard definition,
            when a formula has been reviewed, and when a calculator is meant for informational planning rather than a
            professional decision on its own.
          </p>
          <ul className="space-y-3">
            {aboutTrust.trust.map((item) => (
              <li key={item} className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <TrustMetadataBlock metadata={siteTrustMetadata} title="Editorial and verification approach" />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Performance and usability</h2>
          <p className="leading-relaxed">
            The platform is built to stay fast and readable. Pages are generated from structured content, interactive tools
            respond immediately, and supporting explanations are kept concise so the page remains useful without feeling crowded.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Explore the tools</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/length"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Length
            </Link>
            <Link
              href="/weight"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Weight
            </Link>
            <Link
              href="/temperature"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Temperature
            </Link>
            <Link
              href="/data"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Data
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

