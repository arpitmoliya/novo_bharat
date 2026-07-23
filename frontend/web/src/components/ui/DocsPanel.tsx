import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DocsPanelProps = {
  lead: string;
  note: string;
  action?: ReactNode;
  className?: string;
};

export default function DocsPanel({
  lead,
  note,
  action,
  className,
}: DocsPanelProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col gap-5 p-[clamp(28px,3vw,44px)] lg:flex-row",
          className,
        )}
      >
        <p className="m-0 font-body text-[clamp(0.95rem,1vw,1.1875rem)] leading-[1.6] tracking-[-0.02em] text-black flex-1">
          {lead}
        </p>
        <p className="m-0 font-body text-[clamp(0.9rem,0.95vw,1.0625rem)] leading-[1.6] tracking-[-0.02em] text-gray flex-1">
          {note}
        </p>
      </div>
      <div className="flex justify-center">{action}</div>
    </div>
  );
}
