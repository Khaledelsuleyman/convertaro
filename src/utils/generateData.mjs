import fs from 'fs';
import path from 'path';

const units = {
  length: [
    { name: 'Centimeters', unit: 'cm', factor: 0.01 },
    { name: 'Inches', unit: 'inches', factor: 0.0254 },
    { name: 'Meters', unit: 'm', factor: 1 },
    { name: 'Feet', unit: 'feet', factor: 0.3048 },
    { name: 'Kilometers', unit: 'km', factor: 1000 },
    { name: 'Miles', unit: 'miles', factor: 1609.34 },
    { name: 'Millimeters', unit: 'mm', factor: 0.001 },
    { name: 'Yards', unit: 'yards', factor: 0.9144 },
    { name: 'Nautical Miles', unit: 'nmi', factor: 1852 },
  ],
  weight: [
    { name: 'Kilograms', unit: 'kg', factor: 1 },
    { name: 'Pounds', unit: 'lbs', factor: 0.453592 },
    { name: 'Grams', unit: 'g', factor: 0.001 },
    { name: 'Ounces', unit: 'oz', factor: 0.0283495 },
    { name: 'Milligrams', unit: 'mg', factor: 0.000001 },
    { name: 'Metric Tons', unit: 't', factor: 1000 },
    { name: 'Stones', unit: 'st', factor: 6.35029 },
  ],
  data: [
    { name: 'Bytes', unit: 'B', factor: 1 },
    { name: 'Kilobytes', unit: 'KB', factor: 1024 },
    { name: 'Megabytes', unit: 'MB', factor: 1024 * 1024 },
    { name: 'Gigabytes', unit: 'GB', factor: 1024 * 1024 * 1024 },
    { name: 'Terabytes', unit: 'TB', factor: 1024 * 1024 * 1024 * 1024 },
    { name: 'Bits', unit: 'bits', factor: 0.125 },
  ],
  time: [
    { name: 'Seconds', unit: 'sec', factor: 1 },
    { name: 'Minutes', unit: 'min', factor: 60 },
    { name: 'Hours', unit: 'hr', factor: 3600 },
    { name: 'Days', unit: 'day', factor: 86400 },
    { name: 'Weeks', unit: 'week', factor: 604800 },
    { name: 'Months', unit: 'month', factor: 2629746 },
    { name: 'Years', unit: 'year', factor: 31556952 },
  ],
  volume: [
    { name: 'Liters', unit: 'L', factor: 1 },
    { name: 'Gallons', unit: 'gal', factor: 3.78541 },
    { name: 'Milliliters', unit: 'ml', factor: 0.001 },
    { name: 'Cups', unit: 'cups', factor: 0.236588 },
    { name: 'Pints', unit: 'pt', factor: 0.473176 },
    { name: 'Quarts', unit: 'qt', factor: 0.946353 },
    { name: 'Fluid Ounces', unit: 'floz', factor: 0.0295735 },
  ],
  area: [
    { name: 'Square Meters', unit: 'sqm', factor: 1 },
    { name: 'Square Feet', unit: 'sqft', factor: 0.092903 },
    { name: 'Acres', unit: 'acres', factor: 4046.86 },
    { name: 'Hectares', unit: 'hectares', factor: 10000 },
    { name: 'Square Kilometers', unit: 'sqkm', factor: 1000000 },
    { name: 'Square Miles', unit: 'sqmi', factor: 2589988.11 },
  ],
  speed: [
    { name: 'Km/h', unit: 'kmh', factor: 1 },
    { name: 'Mph', unit: 'mph', factor: 1.60934 },
    { name: 'm/s', unit: 'ms', factor: 3.6 },
    { name: 'Knots', unit: 'knots', factor: 1.852 },
    { name: 'Mach', unit: 'mach', factor: 1234.8 },
  ],
  energy: [
    { name: 'Joules', unit: 'J', factor: 1 },
    { name: 'Calories', unit: 'cal', factor: 4.184 },
    { name: 'Kilowatt-hours', unit: 'kWh', factor: 3600000 },
    { name: 'Electronvolts', unit: 'eV', factor: 1.60218e-19 },
    { name: 'BTU', unit: 'btu', factor: 1055.06 },
  ],
  pressure: [
    { name: 'Pascals', unit: 'Pa', factor: 1 },
    { name: 'Bar', unit: 'bar', factor: 100000 },
    { name: 'PSI', unit: 'psi', factor: 6894.76 },
    { name: 'Atmospheres', unit: 'atm', factor: 101325 },
    { name: 'Torr', unit: 'torr', factor: 133.322 },
  ],
};

const converters = [];

const focusCategories = new Set(['length', 'weight', 'volume', 'data', 'speed', 'area', 'time', 'temperature']);

const seoUnit = {
  length: {
    cm: 'centimeters',
    inches: 'inches',
    m: 'meters',
    feet: 'feet',
    km: 'kilometers',
    miles: 'miles',
    mm: 'millimeters',
    yards: 'yards',
    nmi: 'nautical-miles',
  },
  weight: {
    kg: 'kilograms',
    lbs: 'pounds',
    g: 'grams',
    oz: 'ounces',
    mg: 'milligrams',
    t: 'metric-tons',
    st: 'stones',
  },
  volume: {
    L: 'liters',
    gal: 'gallons',
    ml: 'milliliters',
    cups: 'cups',
    pt: 'pints',
    qt: 'quarts',
    floz: 'fluid-ounces',
  },
  data: {
    B: 'bytes',
    KB: 'kilobytes',
    MB: 'megabytes',
    GB: 'gigabytes',
    TB: 'terabytes',
    bits: 'bits',
  },
  speed: {
    kmh: 'km-h',
    mph: 'mph',
    ms: 'm-s',
    knots: 'knots',
    mach: 'mach',
  },
  area: {
    sqm: 'square-meters',
    sqft: 'square-feet',
    acres: 'acres',
    hectares: 'hectares',
    sqkm: 'square-kilometers',
    sqmi: 'square-miles',
  },
  time: {
    sec: 'seconds',
    min: 'minutes',
    hr: 'hours',
    day: 'days',
    week: 'weeks',
    month: 'months',
    year: 'years',
  },
  temperature: {
    C: 'celsius',
    F: 'fahrenheit',
    K: 'kelvin',
  },
};

const highInterestUnits = {
  length: new Set(['cm', 'inches', 'm', 'feet', 'km', 'miles']),
  weight: new Set(['kg', 'lbs', 'g', 'oz']),
  volume: new Set(['L', 'gal', 'ml', 'cups']),
  data: new Set(['MB', 'GB', 'TB', 'KB', 'B', 'bits']),
  speed: new Set(['mph', 'kmh', 'ms', 'knots']),
  area: new Set(['sqm', 'sqft', 'acres', 'hectares']),
  time: new Set(['sec', 'min', 'hr', 'day', 'week']),
  temperature: new Set(['C', 'F', 'K']),
};

const lastUpdated = new Date().toISOString().split('T')[0];

const normalizeRatio = (x) => Number(x.toFixed(12));

const aliasSlugFor = (category, fromUnit, toUnit) => {
  const fromSeo = seoUnit?.[category]?.[fromUnit];
  const toSeo = seoUnit?.[category]?.[toUnit];
  if (!fromSeo || !toSeo) return null;
  return `${fromSeo}-to-${toSeo}`;
};

const convertTemperatureExample = (value, from, to) => {
  let celsius = 0;
  if (from === 'C') celsius = value;
  else if (from === 'F') celsius = (value - 32) * 5 / 9;
  else if (from === 'K') celsius = value - 273.15;

  if (to === 'C') return celsius;
  if (to === 'F') return (celsius * 9 / 5) + 32;
  if (to === 'K') return celsius + 273.15;
  return value;
};

const buildFaq = ({ slug, from, to, fromName, toName, ratioText, formulaText }) => {
  return [
    {
      question: `How many ${toName.toLowerCase()} are in a ${fromName.toLowerCase()}?`,
      answer: ratioText
        ? `There are ${ratioText} ${toName.toLowerCase()} in one ${fromName.toLowerCase()}.`
        : `Use the conversion formula to convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}.`,
      keywords: [slug, `${from} to ${to}`],
    },
    {
      question: `How do I convert ${from} to ${to}?`,
      answer: ratioText
        ? `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply the ${fromName.toLowerCase()} value by ${ratioText}.`
        : `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, use: ${formulaText}.`,
      keywords: [`convert ${from} to ${to}`],
    },
    {
      question: `What is ${fromName.toLowerCase()}?`,
      answer: `${fromName} is a common unit used in ${slug.includes('temperature') ? 'temperature measurement' : 'measurements'} and conversions. Convertaro provides instant conversion to ${toName.toLowerCase()} and more.`,
      keywords: [fromName.toLowerCase(), `what is ${fromName.toLowerCase()}`],
    },
  ];
};

const ensureRelated = (allByCategory, converter) => {
  const pool = (allByCategory.get(converter.category) ?? []).filter((c) => c.id !== converter.id);
  const related = [];

  const add = (id) => {
    if (!id) return;
    if (id === converter.id) return;
    if (related.includes(id)) return;
    related.push(id);
  };

  pool
    .filter((c) => c.fromUnit === converter.fromUnit)
    .slice(0, 4)
    .forEach((c) => add(c.id));

  pool
    .filter((c) => c.toUnit === converter.toUnit)
    .slice(0, 4)
    .forEach((c) => add(c.id));

  for (const c of pool) {
    if (related.length >= 6) break;
    add(c.id);
  }

  return related.slice(0, 10);
};

Object.keys(units).forEach(category => {
  const categoryUnits = units[category];
  categoryUnits.forEach(from => {
    categoryUnits.forEach(to => {
      if (from.unit === to.unit) return;

      const slug = `${from.unit}-to-${to.unit}`;
      const title = `${from.name} to ${to.name} Converter`;
      
      // Calculate conversion factor from 'from' to 'to'
      // factor_from * from_val = base_val
      // factor_to * to_val = base_val
      // to_val = (factor_from / factor_to) * from_val
      const ratio = from.factor / to.factor;
      const inverseRatio = to.factor / from.factor;

      converters.push({
        id: slug,
        category: category,
        fromUnit: from.unit,
        toUnit: to.unit,
        title: title,
        description: `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly with our free online tool.`,
        formula: `${to.unit} = ${from.unit} × ${ratio.toFixed(6).replace(/\.?0+$/, '')}`,
        inverseFormula: `${from.unit} = ${to.unit} × ${inverseRatio.toFixed(6).replace(/\.?0+$/, '')}`,
        examples: [
          { input: 1, output: normalizeRatio(ratio), description: `1 ${from.unit} to ${to.unit}` },
          { input: 10, output: normalizeRatio(ratio * 10), description: `10 ${from.unit} to ${to.unit}` },
          { input: 100, output: normalizeRatio(ratio * 100), description: `100 ${from.unit} to ${to.unit}` },
        ],
        faq: buildFaq({
          slug,
          from: from.unit,
          to: to.unit,
          fromName: from.name,
          toName: to.name,
          ratioText: ratio.toFixed(6).replace(/\.?0+$/, ''),
          formulaText: `${to.unit} = ${from.unit} × ${ratio.toFixed(6).replace(/\.?0+$/, '')}`,
        }),
        relatedConverters: [],
        metadata: {
          slug: slug,
          keywords: [slug, title.toLowerCase(), `convert ${from.unit} to ${to.unit}`],
          lastUpdated,
        }
      });
    });
  });
});

// Add Temperature special cases (since they are not linear with just a factor)
const tempUnits = [
  { name: 'Celsius', unit: 'C' },
  { name: 'Fahrenheit', unit: 'F' },
  { name: 'Kelvin', unit: 'K' }
];

tempUnits.forEach(from => {
  tempUnits.forEach(to => {
    if (from.unit === to.unit) return;
    const slug = `${from.unit.toLowerCase()}-to-${to.unit.toLowerCase()}`;
    let formula = '';
    let inverseFormula = '';
    
    if (from.unit === 'C' && to.unit === 'F') {
      formula = 'F = (C × 9/5) + 32';
      inverseFormula = 'C = (F - 32) × 5/9';
    } else if (from.unit === 'F' && to.unit === 'C') {
      formula = 'C = (F - 32) × 5/9';
      inverseFormula = 'F = (C × 9/5) + 32';
    } else if (from.unit === 'C' && to.unit === 'K') {
      formula = 'K = C + 273.15';
      inverseFormula = 'C = K - 273.15';
    } else if (from.unit === 'K' && to.unit === 'C') {
      formula = 'C = K - 273.15';
      inverseFormula = 'K = C + 273.15';
    } else if (from.unit === 'F' && to.unit === 'K') {
      formula = 'K = (F - 32) × 5/9 + 273.15';
      inverseFormula = 'F = (K - 273.15) × 9/5 + 32';
    } else if (from.unit === 'K' && to.unit === 'F') {
      formula = 'F = (K - 273.15) × 9/5 + 32';
      inverseFormula = 'K = (F - 32) × 5/9 + 273.15';
    }

    const examples = [0, 10, 100].map((input) => ({
      input,
      output: normalizeRatio(convertTemperatureExample(input, from.unit, to.unit)),
      description: `${input} ${from.unit} to ${to.unit}`,
    }));

    converters.push({
      id: slug,
      category: 'temperature',
      fromUnit: from.unit,
      toUnit: to.unit,
      title: `${from.name} to ${to.name} Converter`,
      description: `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} scale instantly.`,
      formula: formula,
      inverseFormula: inverseFormula,
      examples,
      faq: buildFaq({
        slug,
        from: from.unit,
        to: to.unit,
        fromName: from.name,
        toName: to.name,
        ratioText: null,
        formulaText: formula,
      }),
      relatedConverters: [],
      metadata: {
        slug: slug,
        keywords: [slug, `convert ${from.unit} to ${to.unit}`],
        lastUpdated,
      }
    });
  });
});

const existingIds = new Set(converters.map((c) => c.id));
const baseByCategory = new Map();

for (const c of converters) {
  if (!baseByCategory.has(c.category)) baseByCategory.set(c.category, []);
  baseByCategory.get(c.category).push(c);
}

const aliasTargets = {
  length: 44,
  weight: 26,
  volume: 26,
  data: 19,
  speed: 12,
  area: 19,
  time: 26,
  temperature: 4,
};

const shouldAlias = (category, fromUnit, toUnit) => {
  const set = highInterestUnits[category];
  if (!set) return false;
  return set.has(fromUnit) && set.has(toUnit);
};

for (const [category, targetCount] of Object.entries(aliasTargets)) {
  const pool = (baseByCategory.get(category) ?? []).filter((c) => focusCategories.has(c.category));
  let added = 0;

  const tryAddAlias = (c) => {
    const aliasId = aliasSlugFor(c.category, c.fromUnit, c.toUnit);
    if (!aliasId) return false;
    if (existingIds.has(aliasId)) return false;
    existingIds.add(aliasId);

    converters.push({
      ...c,
      id: aliasId,
      title: `${seoUnit[c.category][c.fromUnit].replace(/-/g, ' ')} to ${seoUnit[c.category][c.toUnit].replace(/-/g, ' ')} Converter`.
        replace(/\b\w/g, (m) => m.toUpperCase()),
      description: `Convert ${seoUnit[c.category][c.fromUnit].replace(/-/g, ' ')} to ${seoUnit[c.category][c.toUnit].replace(/-/g, ' ')} instantly with our free online tool.`,
      faq: buildFaq({
        slug: aliasId,
        from: c.fromUnit,
        to: c.toUnit,
        fromName: seoUnit[c.category][c.fromUnit].replace(/-/g, ' '),
        toName: seoUnit[c.category][c.toUnit].replace(/-/g, ' '),
        ratioText: c.category === 'temperature' ? null : c.formula.split('× ')[1],
        formulaText: c.formula,
      }),
      relatedConverters: [],
      metadata: {
        ...c.metadata,
        slug: aliasId,
        keywords: [aliasId, `convert ${c.fromUnit} to ${c.toUnit}`, `${seoUnit[c.category][c.fromUnit]} to ${seoUnit[c.category][c.toUnit]}`],
        lastUpdated,
      },
    });

    return true;
  };

  for (const c of pool) {
    if (added >= targetCount) break;
    if (!shouldAlias(category, c.fromUnit, c.toUnit)) continue;
    if (tryAddAlias(c)) added += 1;
  }

  for (const c of pool) {
    if (added >= targetCount) break;
    if (tryAddAlias(c)) added += 1;
  }
}

const allByCategory = new Map();
for (const c of converters) {
  if (!allByCategory.has(c.category)) allByCategory.set(c.category, []);
  allByCategory.get(c.category).push(c);
}

for (const c of converters) {
  c.relatedConverters = ensureRelated(allByCategory, c);
}

console.log(`Generated ${converters.length} converters.`);

const outputPath = path.join(process.cwd(), 'src/data/converters.json');
fs.writeFileSync(outputPath, JSON.stringify(converters, null, 2));
