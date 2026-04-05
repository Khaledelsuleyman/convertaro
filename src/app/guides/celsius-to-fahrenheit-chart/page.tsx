import type { Metadata } from "next";
import { buildGuideMetadata, renderGuidePage } from "@/app/guides/guide-page";

export const dynamic = "force-static";

export const metadata: Metadata = buildGuideMetadata("celsius-to-fahrenheit-chart");

export default function CelsiusToFahrenheitChartPage() {
  return renderGuidePage("celsius-to-fahrenheit-chart");
}
