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
];

export function getStaticValuePagesForConverter(category: string, converter: string): StaticValuePageParam[] {
  return STATIC_VALUE_PAGE_PARAMS.filter((entry) => entry.category === category && entry.converter === converter);
}

export function getStaticValuePageHref(category: string, converter: string, value: number): string | null {
  const valueSlug = `${formatStaticValue(value)}-${converter}`;
  const exists = STATIC_VALUE_PAGE_PARAMS.some(
    (entry) => entry.category === category && entry.converter === converter && entry.value === valueSlug
  );

  return exists ? `/${category}/${converter}/${valueSlug}` : null;
}
