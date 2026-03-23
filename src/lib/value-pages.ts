import { getRouteVariantSlugs } from "@/lib/converter-routing";

export type StaticValuePageParam = {
  category: string;
  converter: string;
  value: string;
};

export function formatStaticValue(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(6)));
}

const CM_TO_INCHES_VALUES = [150, 155, 160, 163, 165, 167, 168, 170, 172, 173, 175, 177, 178, 180, 183, 185, 190, 195, 200];
const KG_TO_LBS_VALUES = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const CELSIUS_TO_FAHRENHEIT_VALUES = [-40, -20, -10, 0, 10, 20, 25, 30, 37, 40, 50, 100, 150, 200];
const MILES_TO_KM_VALUES = [1, 5, 10, 13.1, 20, 26.2, 50, 100];
const METERS_TO_FEET_VALUES = [1, 2, 3, 5, 10, 20, 50, 100, 1000];
const FEET_TO_CM_VALUES = [4.5, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5];
const INCHES_TO_CM_VALUES = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
const LBS_TO_KG_VALUES = [100, 110, 120, 125, 130, 140, 150, 160, 170, 175, 180, 190, 200];
const FAHRENHEIT_TO_CELSIUS_VALUES = [32, 68, 77, 86, 98.6, 100, 212, 350, 400];

export const STATIC_VALUE_PAGE_PARAMS: StaticValuePageParam[] = [
  ...CM_TO_INCHES_VALUES.map((value) => ({
    category: "length",
    converter: "cm-to-inches",
    value: `${value}-cm-to-inches`,
  })),
  ...KG_TO_LBS_VALUES.map((value) => ({
    category: "weight",
    converter: "kg-to-lbs",
    value: `${value}-kg-to-lbs`,
  })),
  ...CELSIUS_TO_FAHRENHEIT_VALUES.map((value) => ({
    category: "temperature",
    converter: "celsius-to-fahrenheit",
    value: `${value}-celsius-to-fahrenheit`,
  })),
  ...MILES_TO_KM_VALUES.map((value) => ({
    category: "length",
    converter: "miles-to-km",
    value: `${formatStaticValue(value)}-miles-to-km`,
  })),
  ...METERS_TO_FEET_VALUES.map((value) => ({
    category: "length",
    converter: "meters-to-feet",
    value: `${value}-meters-to-feet`,
  })),
  ...FEET_TO_CM_VALUES.map((value) => ({
    category: "length",
    converter: "feet-to-cm",
    value: `${formatStaticValue(value)}-feet-to-cm`,
  })),
  ...INCHES_TO_CM_VALUES.map((value) => ({
    category: "length",
    converter: "inches-to-cm",
    value: `${formatStaticValue(value)}-inches-to-cm`,
  })),
  ...LBS_TO_KG_VALUES.map((value) => ({
    category: "weight",
    converter: "lbs-to-kg",
    value: `${formatStaticValue(value)}-lbs-to-kg`,
  })),
  ...FAHRENHEIT_TO_CELSIUS_VALUES.map((value) => ({
    category: "temperature",
    converter: "fahrenheit-to-celsius",
    value: `${formatStaticValue(value)}-fahrenheit-to-celsius`,
  })),
];

export function getStaticValuePagesForConverter(category: string, converter: string): StaticValuePageParam[] {
  const directMatches = STATIC_VALUE_PAGE_PARAMS.filter(
    (entry) => entry.category === category && entry.converter === converter
  );
  if (directMatches.length > 0) {
    return directMatches;
  }

  const variants = new Set(getRouteVariantSlugs(category, converter));
  return STATIC_VALUE_PAGE_PARAMS.filter(
    (entry) => entry.category === category && variants.has(entry.converter)
  );
}

export function getStaticValuePageHref(category: string, converter: string, value: number): string | null {
  const valueSlug = `${formatStaticValue(value)}-${converter}`;
  const exists = STATIC_VALUE_PAGE_PARAMS.some(
    (entry) => entry.category === category && entry.converter === converter && entry.value === valueSlug
  );

  if (exists) {
    return `/${category}/${converter}/${valueSlug}`;
  }

  const variants = getRouteVariantSlugs(category, converter);
  const fallback = variants
    .map((variant) => ({
      converter: variant,
      value: `${formatStaticValue(value)}-${variant}`,
    }))
    .find((entry) =>
      STATIC_VALUE_PAGE_PARAMS.some(
        (param) => param.category === category && param.converter === entry.converter && param.value === entry.value
      )
    );

  return fallback ? `/${category}/${fallback.converter}/${fallback.value}` : null;
}
