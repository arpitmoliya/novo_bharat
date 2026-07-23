import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type FilterChipProps = ComponentProps<"button"> & {
  active?: boolean;
};

export default function FilterChip({
  active,
  className,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer rounded-2xl border border-black/20 bg-white px-4 py-2.25 font-body text-[clamp(0.85rem,0.95vw,1.0625rem)] font-medium tracking-[-0.02em] text-black transition-all duration-180 hover:border-blue hover:text-blue",
        active && "bg-gradient-soft text-black",
        className,
      )}
      {...props}
    />
  );
}
