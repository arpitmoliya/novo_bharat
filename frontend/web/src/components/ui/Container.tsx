import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentProps<"div">;

export default function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto max-w-[1920px]", className)} {...props} />;
}
