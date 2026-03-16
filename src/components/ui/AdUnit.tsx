import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AdUnitProps {
  variant: "banner" | "sidebar" | "content";
  className?: string;
}

export function AdUnit({ variant, className }: AdUnitProps) {
  const styles = {
    banner: "h-[90px] md:h-[100px] w-full max-w-[728px] mx-auto",
    sidebar: "h-[250px] w-[300px] hidden lg:flex",
    content: "h-[280px] w-full max-w-[336px] mx-auto",
  };

  return (
    <div
      className={cn(
        "ad-container bg-gray-50 border-gray-200 text-gray-400 text-xs uppercase tracking-widest",
        styles[variant],
        className
      )}
    >
      <span>Advertisement</span>
    </div>
  );
}
