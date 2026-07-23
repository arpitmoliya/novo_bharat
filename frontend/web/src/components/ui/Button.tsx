import type { ButtonHTMLAttributes } from "react";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import {
  buttonClasses,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  showArrow?: boolean;
  responsiveFullWidth?: boolean;
};

export default function Button({
  variant = "solid",
  showArrow = false,
  responsiveFullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, responsiveFullWidth, className })}
      {...props}
    >
      {children}
      {showArrow ? <ArrowRightIcon /> : null}
    </button>
  );
}
