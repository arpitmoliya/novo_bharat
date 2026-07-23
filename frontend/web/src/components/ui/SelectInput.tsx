import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SelectInputProps = ComponentProps<"select">;

export default function SelectInput({ className, ...props }: SelectInputProps) {
  return (
    <select
      className={cn(
        "cursor-pointer rounded-xl border border-black/15 bg-white px-4 py-2.5 font-body text-[clamp(0.85rem,0.95vw,1.0625rem)] text-black",
        className,
      )}
      {...props}
    />
  );
}
