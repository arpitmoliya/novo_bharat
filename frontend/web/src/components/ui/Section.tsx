import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentProps<"section"> & {
  tight?: boolean;
};

export default function Section({ tight, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "mx-auto max-w-[1920px] px-(--gutter)",
        tight ? "py-[clamp(32px,3vw,56px)]" : "py-[clamp(48px,4.5vw,88px)]",
        className,
      )}
      {...props}
    />
  );
}

type SectionHeaderProps = ComponentProps<"div">;

export function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("mb-[clamp(32px,3.5vw,56px)]", className)} {...props} />
  );
}
