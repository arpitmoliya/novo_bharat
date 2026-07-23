import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TagColor = "gold" | "blue" | "green";

const colorClasses: Record<TagColor, string> = {
  gold: "border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.1)] text-gold",
  blue: "border-[rgba(34,163,247,0.2)] bg-[rgba(34,163,247,0.1)] text-blue",
  green: "border-[rgba(0,137,0,0.2)] bg-[rgba(0,137,0,0.1)] text-[#008900]",
};

type TagProps = ComponentProps<"span"> & {
  color: TagColor;
};

export default function Tag({ color, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl border px-3 py-2 font-body text-[clamp(0.9rem,0.95vw,1.125rem)] leading-normal font-medium tracking-[-0.02em]",
        colorClasses[color],
        className,
      )}
      {...props}
    />
  );
}
