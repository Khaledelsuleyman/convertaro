export interface ConversionExample {
  input: number;
  output: number;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export interface Converter {
  id: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  title: string;
  description: string;
  formula: string;
  inverseFormula: string;
  examples: ConversionExample[];
  faq: FAQItem[];
  relatedConverters: string[];
  metadata: {
    slug: string;
    keywords: string[];
    lastUpdated: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}
