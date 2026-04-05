import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { MortgageCalculatorCard } from "@/components/calculators/MortgageCalculatorCard";

export const dynamic = "force-static";

const calculator = calculatorsBySlug.get("mortgage-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function MortgageCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <MortgageCalculatorCard />
    </CalculatorShell>
  );
}
