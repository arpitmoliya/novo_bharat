import Link from "next/link";
import type { ComponentProps } from "react";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import {
  buttonClasses,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  showArrow?: boolean;
  responsiveFullWidth?: boolean;
  className?: string;
};

export default function ButtonLink({
  variant = "solid",
  showArrow = false,
  responsiveFullWidth = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, responsiveFullWidth, className })}
      {...props}
    >
      {children}
      {showArrow ? <ArrowRightIcon /> : null}
    </Link>
  );
}
