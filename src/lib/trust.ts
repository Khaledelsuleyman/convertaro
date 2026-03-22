import { CalculatorDefinition } from "@/data/calculators";
import { Category, Converter } from "@/types/converter";

export type TrustMetadata = {
  writtenBy: string;
  reviewedBy: string;
  lastUpdated: string;
  basis: string;
  reviewNote: string;
  disclaimer?: string;
};

export const DEFAULT_TRUST_AUTHOR = "Convertaro Editorial Team";
export const DEFAULT_TRUST_REVIEWER = "Convertaro Review Process";

const CALCULATOR_UPDATED_AT: Record<string, string> = {
  "bmi-calculator": "2026-03-22",
  "age-calculator": "2026-03-22",
  "percentage-calculator": "2026-03-22",
  "loan-calculator": "2026-03-22",
  "mortgage-calculator": "2026-03-22",
};

const CALCULATOR_DISCLAIMERS: Partial<Record<CalculatorDefinition["category"], string>> = {
  finance: "For informational planning only. Confirm final terms, fees, and disclosures with the lender or provider.",
  health: "For informational use only and not a medical diagnosis or treatment recommendation.",
};

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getConverterTrustMetadata(converter: Converter, category: Category): TrustMetadata {
  return {
    writtenBy: DEFAULT_TRUST_AUTHOR,
    reviewedBy: DEFAULT_TRUST_REVIEWER,
    lastUpdated: formatDate(converter.metadata.lastUpdated),
    basis: `${converter.title} is based on standard ${category.name.toLowerCase()} definitions and the formula shown on the page.`,
    reviewNote: "We review the displayed formula, example values, and reverse conversion logic for consistency before publishing updates.",
  };
}

export function getCalculatorTrustMetadata(calculator: CalculatorDefinition): TrustMetadata {
  const updatedAt = CALCULATOR_UPDATED_AT[calculator.slug] ?? "2026-03-22";

  return {
    writtenBy: DEFAULT_TRUST_AUTHOR,
    reviewedBy: DEFAULT_TRUST_REVIEWER,
    lastUpdated: formatDate(updatedAt),
    basis: `${calculator.title} uses the standard formula or method described on the page and is checked against the stated assumptions.`,
    reviewNote: "We review input logic, output behavior, and example use cases so the calculator stays consistent and easy to verify.",
    disclaimer: CALCULATOR_DISCLAIMERS[calculator.category],
  };
}

export function getAboutTrustSections() {
  return {
    maintenance: [
      "Converter formulas are tied to standard unit definitions and the exact equation shown on each page.",
      "Calculator logic is checked against the method described on the page, along with sample scenarios and expected outputs.",
      "Updates are made centrally so changes can be applied consistently across the site.",
    ],
    trust: [
      "We use neutral editorial bylines until named contributors or specialist reviewers are added.",
      "We avoid exaggerated accuracy claims and show the formula or method so users can verify the result themselves.",
      "Where a tool supports planning rather than professional advice, we say so directly and keep the wording brief.",
    ],
  };
}

export function getSiteTrustMetadata(): TrustMetadata {
  return {
    writtenBy: DEFAULT_TRUST_AUTHOR,
    reviewedBy: DEFAULT_TRUST_REVIEWER,
    lastUpdated: formatDate("2026-03-22"),
    basis: "Convertaro publishes converter and calculator content from centralized formulas, definitions, and page-level review notes.",
    reviewNote: "We maintain tool logic and supporting copy together so updates can be checked consistently across the site.",
  };
}
