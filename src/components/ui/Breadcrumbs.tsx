import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className ?? "flex items-center gap-2 text-sm text-slate-500"}
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2 min-w-0">
            {item.href && !isLast ? (
              <Link href={item.href} className="flex items-center hover:text-slate-900 min-w-0">
                {isFirst ? <Home className="h-3.5 w-3.5 mr-1 shrink-0" /> : null}
                <span className="truncate">{item.label}</span>
              </Link>
            ) : (
              <span className="flex items-center text-slate-900 font-medium truncate">
                {isFirst ? <Home className="h-3.5 w-3.5 mr-1 shrink-0" /> : null}
                {item.label}
              </span>
            )}
            {!isLast ? <ChevronRight className="h-3.5 w-3.5 shrink-0" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
