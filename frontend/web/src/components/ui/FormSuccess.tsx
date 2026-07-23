import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FormSuccessProps = {
  children: ReactNode;
  className?: string;
};

export default function FormSuccess({ children, className }: FormSuccessProps) {
  return (
    <div
      className={cn(
        "col-span-full rounded-2xl border border-[rgba(0,137,0,0.2)] bg-[rgba(0,137,0,0.08)] px-6 py-5 font-body text-[clamp(1rem,1.05vw,1.1875rem)] text-[#008900]",
        className,
      )}
    >
      {children}
    </div>
  );
}
