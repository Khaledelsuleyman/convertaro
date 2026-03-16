import { Converter } from "@/types/converter";
import { formatValue } from "@/lib/converter";

interface ConversionTableProps {
  converter: Converter;
}

export function ConversionTable({ converter }: ConversionTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-background/50 border-b border-border">
            <th className="px-8 py-5 text-sm font-bold text-text-primary uppercase tracking-widest">{converter.fromUnit}</th>
            <th className="px-8 py-5 text-sm font-bold text-text-primary uppercase tracking-widest">{converter.toUnit}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {converter.examples.map((example, i) => (
            <tr key={i} className="hover:bg-primary/5 transition-colors group">
              <td className="px-8 py-5 text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                {formatValue(example.input)} {converter.fromUnit}
              </td>
              <td className="px-8 py-5 text-base font-black text-primary">
                {formatValue(example.output)} {converter.toUnit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
