import type { Metadata } from "next";
import { CalculatorDefinition } from "@/data/calculators";
import { buildCalculatorPageMetadata } from "@/lib/page-metadata";

export function buildCalculatorMetadata(calculator: CalculatorDefinition): Metadata {
  return buildCalculatorPageMetadata(calculator);
}
