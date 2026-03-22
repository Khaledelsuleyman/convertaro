import { Converter } from "@/types/converter";
import { formatValue } from "@/lib/converter";

interface ConversionTableProps {
  converter: Converter;
}

export function ConversionTable({ converter }: ConversionTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-white">
      <table className="w-full text-left border-separate border-spacing-0">
        <caption className="px-4 py-3 text-left text-sm text-text-secondary sm:px-6">
          Quick reference values for common {converter.fromUnit} to {converter.toUnit} conversions.
        </caption>
        <thead>
          <tr className="bg-background/50">
            <th className="px-4 py-4 text-sm font-bold text-text-primary uppercase tracking-widest sm:px-6">{converter.fromUnit}</th>
            <th className="px-4 py-4 text-sm font-bold text-text-primary uppercase tracking-widest sm:px-6">{converter.toUnit}</th>
          </tr>
        </thead>
        <tbody>
          {converter.examples.map((example, i) => (
            <tr key={i} className="group transition-colors odd:bg-white even:bg-background/40 hover:bg-primary/5">
              <td className="border-t border-border px-4 py-4 text-sm font-bold text-text-primary transition-colors group-hover:text-primary sm:px-6 sm:text-base">
                <span className="inline-flex rounded-full bg-background px-3 py-1">{formatValue(example.input)} {converter.fromUnit}</span>
              </td>
              <td className="border-t border-border px-4 py-4 text-sm font-black text-primary sm:px-6 sm:text-base">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1">{formatValue(example.output)} {converter.toUnit}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
