import type { Metadata } from "next";
import { CalculatorDefinition } from "@/data/calculators";
import { Category, Converter } from "@/types/converter";
import { buildPageMetadata, getConverterLongTailKeywords } from "@/lib/seo";

const CONVERTER_USE_CASES: Record<string, string> = {
  length: "Useful for measurements and sizing.",
  weight: "Useful for fitness, shipping, and cooking.",
  temperature: "Includes the exact formula and reference values.",
  volume: "Helpful for recipes and liquid measurements.",
  area: "Helpful for floor plans and property sizes.",
  speed: "Useful for driving, fitness, and travel.",
  time: "Helpful for schedules and planning.",
  data: "Useful for file sizes and storage planning.",
  energy: "Helpful for utility and engineering comparisons.",
  pressure: "Useful for tire, lab, and equipment checks.",
};

const CALCULATOR_ENDINGS: Partial<Record<CalculatorDefinition["category"], string>> = {
  finance: "Useful for planning and comparison.",
  health: "Designed for informational use.",
  math: "Useful for quick checks and repeat calculations.",
  time: "Useful for forms, planning, and date checks.",
};

function buildConverterTitle(converter: Converter): string {
  return converter.title;
}

function buildConverterDescription(converter: Converter, category: Category): string {
  const useCase = CONVERTER_USE_CASES[category.slug] ?? "Includes the exact formula, examples, and a quick reference table.";
  return `${converter.title}. Convert ${converter.fromUnit} to ${converter.toUnit} with the exact formula, examples, and a quick reference table. ${useCase}`;
}

function buildCalculatorTitle(calculator: CalculatorDefinition): string {
  return calculator.title;
}

function buildCalculatorDescription(calculator: CalculatorDefinition): string {
  const ending = CALCULATOR_ENDINGS[calculator.category] ?? "Clear inputs, practical outputs, and easy-to-check assumptions.";
  return `${calculator.description} ${ending}`;
}

export function buildConverterPageMetadata(converter: Converter, category: Category, canonicalPath: string): Metadata {
  const longTailKeywords = getConverterLongTailKeywords(converter.fromUnit, converter.toUnit, category.slug);

  return buildPageMetadata({
    title: buildConverterTitle(converter),
    description: buildConverterDescription(converter, category),
    path: canonicalPath,
    keywords: [
      ...converter.metadata.keywords,
      `${converter.fromUnit} to ${converter.toUnit}`,
      `convert ${converter.fromUnit} to ${converter.toUnit}`,
      `${converter.fromUnit} to ${converter.toUnit} converter`,
      `${converter.fromUnit} to ${converter.toUnit} formula`,
      `${category.name.toLowerCase()} converter`,
      ...longTailKeywords.slice(0, 8),
    ].filter(Boolean),
  });
}

export function buildCalculatorPageMetadata(calculator: CalculatorDefinition): Metadata {
  return buildPageMetadata({
    title: buildCalculatorTitle(calculator),
    description: buildCalculatorDescription(calculator),
    path: `/${calculator.slug}`,
    keywords: calculator.keywords,
  });
}
