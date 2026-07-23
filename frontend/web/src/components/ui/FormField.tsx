import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  error?: string;
  children: ReactNode;
};

export default function FormField({
  id,
  label,
  required,
  fullWidth,
  error,
  children,
}: FormFieldProps) {
  return (
    <div
      className={cn("flex flex-col gap-2", fullWidth && "col-span-full", error && "has-error")}
    >
      <label
        htmlFor={id}
        className="font-body text-[clamp(0.85rem,0.9vw,1rem)] font-medium tracking-[-0.02em] text-black"
      >
        {label} {required ? <span className="text-blue">*</span> : null}
      </label>
      {children}
      {error ? (
        <span className="font-body text-[0.85rem] text-[#d92d20]">{error}</span>
      ) : null}
    </div>
  );
}

export const formControlClass =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3.25 font-body text-[clamp(0.95rem,1vw,1.0625rem)] text-black outline-none transition-[border-color,box-shadow] duration-[180ms] focus:border-blue focus:shadow-[0_0_0_3px_rgba(34,163,247,0.15)]";

export const formControlErrorClass = "border-[#d92d20]";
