import { FAQItem } from "@/types/converter";

interface FAQSectionProps {
  faq: FAQItem[];
}

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <div className="space-y-4">
      {faq.map((item, index) => (
        <details
          key={index}
          className="group rounded-2xl border border-border bg-background/40 px-5 py-4 transition-colors open:bg-white open:shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-start gap-3 text-left">
            <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              Q
            </span>
            <span className="pr-6 text-base font-bold leading-relaxed text-text-primary sm:text-lg">
              {item.question}
            </span>
          </summary>
          <p className="pl-9 pt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
