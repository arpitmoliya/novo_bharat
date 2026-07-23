import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type ContactDetailRow = {
  label: string;
  /** Single string, or multiple lines (e.g. two emails). */
  value: string | readonly string[];
  href?: string | readonly string[];
  /** Optional per-row icon. Falls back to a placeholder if omitted. */
  icon?: ElementType;
};

type ContactInfoCardProps = {
  eyebrow: string;
  title: string;
  rows: readonly ContactDetailRow[];
  className?: string;
};

export default function ContactInfoCard({
  eyebrow,
  title,
  rows,
  className,
}: ContactInfoCardProps) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col gap-6 rounded-[20px] bg-white p-[clamp(24px,3vw,48px)]",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="m-0 font-body text-[clamp(0.7rem,0.8vw,0.8125rem)] font-medium tracking-[0.12em] text-gray uppercase">
          {eyebrow}
        </p>
        <h2 className="m-0 font-heading text-[clamp(1.5rem,2vw,2.25rem)] leading-[1.2] font-bold tracking-[-0.02em] text-black">
          {title}
        </h2>
      </div>

      <dl className="m-0 flex flex-col">
        {rows.map((row) => {
          const Icon = row.icon ?? PlaceholderIcon;
          const values = Array.isArray(row.value) ? row.value : [row.value];
          const hrefs = Array.isArray(row.href)
            ? row.href
            : row.href
              ? [row.href]
              : [];

          return (
            <div
              key={row.label}
              className="flex items-start gap-4 border-b border-black/10 py-4 last:border-b-0 sm:gap-5 sm:py-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef6fb] text-blue sm:size-11">
                <Icon className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                <dt className="font-body text-[clamp(0.8rem,0.85vw,0.9375rem)] leading-normal tracking-[-0.01em] text-gray">
                  {row.label}
                </dt>
                <dd className="m-0 flex flex-col gap-0.5 font-body text-[clamp(0.95rem,1vw,1.125rem)] leading-[1.45] tracking-[-0.02em] wrap-break-word text-black">
                  {values.map((value, i) => {
                    const href = hrefs[i];
                    return href ? (
                      <a
                        key={value}
                        href={href}
                        className="text-black transition-colors duration-180 hover:text-blue"
                      >
                        {value}
                      </a>
                    ) : (
                      <span key={value}>{value}</span>
                    );
                  })}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

/** Neutral placeholder — replace per-row via the `icon` field later. */
function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
  );
}
