import Link from "next/link";
import { Category, Converter } from "@/types/converter";
import { getConverterNarrative, getExampleContext } from "@/lib/converter-content";

interface ConverterContentSectionsProps {
  converter: Converter;
  category: Category;
  reverseConverter?: Converter;
  contextualLinks: Converter[];
}

export function ConverterContentSections({
  converter,
  category,
  reverseConverter,
  contextualLinks,
}: ConverterContentSectionsProps) {
  const content = getConverterNarrative(converter, category);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Understanding the units</h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-xl border border-border bg-background/60 p-4">
            <h3 className="text-sm font-bold text-text-primary">What is {converter.fromUnit}?</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{content.fromExplanation}</p>
          </article>
          <article className="rounded-xl border border-border bg-background/60 p-4">
            <h3 className="text-sm font-bold text-text-primary">What is {converter.toUnit}?</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{content.toExplanation}</p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">
          Where this conversion shows up
        </h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {converter.title} often comes up in {content.useCases[0]}, {content.useCases[1]}, and {content.useCases[2]}. It is most useful when the source value is published in one unit but the person reading it expects another.
        </p>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          If you are comparing nearby units, browse the full&nbsp;
          <Link href={`/${category.slug}`} className="font-semibold text-primary hover:underline">
            {category.name.toLowerCase()} converters collection
          </Link>
          &nbsp;for the closest match instead of doing extra manual steps.
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Real-world examples</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {converter.examples.slice(0, 3).map((example, index) => (
            <article key={index} className="rounded-xl border border-border bg-background/60 px-4 py-4">
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
                {getExampleContext(converter, category, index).title}
              </p>
              <p className="mt-2 text-sm font-bold text-text-primary">
                {example.input} {converter.fromUnit} {"->"} {example.output.toString()} {converter.toUnit}
              </p>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {getExampleContext(converter, category, index).description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Quick reference and common mistakes</h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          Use the quick table for fast lookups and the formula when accuracy matters. Keep more decimals during intermediate steps, then round only for the final number you plan to show or report.
        </p>
        <ul className="mt-4 space-y-2">
          {content.mistakes.map((mistake) => (
            <li key={mistake} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
              <span aria-hidden="true" className="mt-1 text-primary">•</span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Why this conversion matters</h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          Converting {content.fromLabel} to {content.toLabel} accurately prevents communication errors between teams, tools, and regions that use different standards.
          {" "}
          {reverseConverter ? (
            <>
              If you need the opposite direction, use the
              {" "}
              <Link
                href={`/${reverseConverter.category}/${reverseConverter.metadata.slug}`}
                className="font-semibold text-primary hover:underline"
              >
                {reverseConverter.title}
              </Link>
              .
            </>
          ) : null}
        </p>
        {contextualLinks.length > 0 ? (
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            People often follow this with {" "}
            {contextualLinks.map((item, index) => (
              <span key={item.id}>
                <Link
                  href={`/${item.category}/${item.metadata.slug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {item.title.replace(/ Converter$/i, "")}
                </Link>
                {index < contextualLinks.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        ) : null}
      </section>
    </div>
  );
}
