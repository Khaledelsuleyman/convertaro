import { FAQItem } from "@/types/converter";

interface FAQSectionProps {
  faq: FAQItem[];
}

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <div className="space-y-8">
      {faq.map((item, index) => (
        <div key={index} className="p-8 bg-background/50 rounded-3xl border border-border hover:border-primary/20 hover:bg-white transition-all duration-300">
          <h3 className="text-xl font-bold text-text-primary mb-4 flex items-start">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm mr-4 mt-0.5">Q</span>
            {item.question}
          </h3>
          <div className="flex items-start">
            <div className="w-10 mr-4 flex-shrink-0" />
            <p className="text-text-secondary leading-relaxed font-medium text-lg">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
