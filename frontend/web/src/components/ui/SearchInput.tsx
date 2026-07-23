import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SearchInputProps = Omit<ComponentProps<"input">, "type">;

export default function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex min-w-0 flex-1 items-center", className)}>
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        aria-hidden="true"
        className="absolute left-[18px] h-5 w-5 fill-none stroke-gray"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="w-full rounded-xl border border-black/15 bg-white py-3.5 pr-4.5 pl-12 font-body text-[clamp(0.95rem,1vw,1.125rem)] text-black outline-none transition-[border-color,box-shadow] duration-[180ms] focus:border-blue focus:shadow-[0_0_0_3px_rgba(34,163,247,0.15)]"
        {...props}
      />
    </div>
  );
}
