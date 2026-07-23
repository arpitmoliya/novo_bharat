import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const eyebrowClass =
  "m-0 font-body text-[clamp(0.85rem,1.05vw,1.25rem)] leading-normal font-normal tracking-[0.02em] text-black uppercase";
const headingClass =
  "m-0 font-heading text-[clamp(1.5rem,2.5vw,3rem)] leading-[1.2] font-bold tracking-[-0.02em] text-black";
const leadClass =
  "m-0 font-body text-[clamp(1rem,1.1vw,1.25rem)] leading-normal font-normal tracking-[-0.02em]";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(eyebrowClass, className)} {...props} />;
}

export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn(headingClass, className)} {...props} />;
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(leadClass, className)} {...props} />;
}

export function GradientText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "bg-(image:--gradient-full) bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "m-0 block w-full text-left font-heading text-[clamp(2.25rem,4.6875vw,5.625rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-white",
        className,
      )}
      {...props}
    />
  );
}

export function HeroHeading({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "m-0 block w-full text-left font-heading text-[clamp(2.25rem,4.6875vw,5.625rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-white",
        className,
      )}
      {...props}
    />
  );
}
