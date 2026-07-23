export type ButtonVariant = "solid" | "ghost" | "ghost-light";

const variantClasses: Record<ButtonVariant, string> = {
  solid: "border-gold bg-gold text-white hover:brightness-[1.07]",
  ghost: "border-gold bg-transparent text-gold hover:bg-gold hover:text-white",
  "ghost-light":
    "border-gold bg-transparent text-white hover:border-gold hover:bg-gold",
};

export function buttonClasses({
  variant = "solid",
  responsiveFullWidth = false,
  className = "",
}: {
  variant?: ButtonVariant;
  responsiveFullWidth?: boolean;
  className?: string;
}) {
  return [
    "inline-flex cursor-pointer items-center gap-2.5 rounded-lg border px-[18px] py-2.5 font-body text-[clamp(0.9rem,0.95vw,1.125rem)] leading-normal font-medium tracking-[-0.04em] whitespace-nowrap transition-[filter,background,color] duration-200 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0",
    variantClasses[variant],
    responsiveFullWidth && "w-full justify-between sm:w-auto sm:justify-start",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
