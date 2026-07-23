import ProcessArrowIcon, {
  type ProcessArrowVariant,
} from "@/components/icons/ProcessArrowIcon";
import { cn } from "@/lib/cn";

type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
  /** Arrow variant pointing to the next card. Omit on the final step. */
  connector?: ProcessArrowVariant | null;
  className?: string;
};

/**
 * A single step in the "sourcing & export process" timeline.
 * The card design is left untouched; the connector swaps between the decorative
 * hand-drawn arrow (horizontal row on lg+) and a simple down arrow (stacked
 * layout on mobile).
 */
export default function ProcessStep({
  step,
  title,
  description,
  connector,
  className,
}: ProcessStepProps) {
  return (
    <li
      // Earlier cards stack above later ones so each card's connector arrow
      // paints on top of the next card instead of being hidden behind it.
      style={{ zIndex: 20 - step }}
      className={cn("relative flex flex-col bg-transparent", className)}
    >
      <div className="relative font-heading bg-white text-[clamp(1.75rem,2.4vw,2.5rem)] leading-none font-light tracking-[-0.02em] text-black p-6 rounded-[20px] text-center border border-black/10">
        0{step}
        {connector && (
          <ProcessArrowIcon
            variant={connector}
            className={cn(
              "pointer-events-none absolute  z-50 top-9 hidden h-auto w-[clamp(80px,7vw,130px)] -translate-y-1/2 text-gray lg:block",
              step % 2 === 1
                ? "lg:rotate-6 left-[calc(100%-16px)]"
                : "lg:-rotate-6 left-[calc(100%-25px)]",
            )}
          />
        )}
      </div>
      <div className="bg-white flex flex-col gap-5 p-6 rounded-[20px] border border-black/10">
        <h3 className="font-heading text-[clamp(1.05rem,1.2vw,1.25rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-blue">
          {title}
        </h3>
        <p className="font-body text-[clamp(0.85rem,0.9vw,1rem)] leading-[1.55] tracking-[-0.02em] text-gray">
          {description}
        </p>
      </div>

      {connector && (
        <>
          {/* Mobile: simple down arrow between stacked cards. */}
          <DownArrow className="mx-auto my-1 lg:hidden" />
        </>
      )}
    </li>
  );
}

function DownArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 text-black/30", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v16" />
      <path d="M6 14l6 6 6-6" />
    </svg>
  );
}
