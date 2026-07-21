// Compact inner-page hero for the Figma rebuild — dark photo banner with a
// gradient eyebrow, large display heading, lead copy, optional CTAs, and the
// white rounded notch that bridges into the page (matches the Home hero style).
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

type Cta = { label: string; href: string };

export default function FxPageHero({
  eyebrow,
  title,
  body,
  bg = "/figma/img/hero-bg.png",
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  bg?: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section
      className="relative flex min-h-[clamp(360px,30vw,560px)] flex-col justify-end overflow-hidden bg-[image:var(--gradient-hero),var(--subhero-bg)] bg-cover bg-center bg-no-repeat px-5 pt-[clamp(120px,12vw,190px)] pb-[clamp(48px,5vw,90px)] text-white"
      style={{ ["--subhero-bg" as string]: `url("${bg}")` }}
    >
      <div className="mx-auto flex w-[min(1720px,89.58vw)] flex-col gap-[clamp(16px,1.6vw,28px)]">
        <p className="subhero-eyebrow">{eyebrow}</p>
        <h1 className="subhero-title">{title}</h1>
        {body && (
          <p className="lead max-w-none text-[clamp(0.95rem,1.0417vw,1.25rem)] text-white/90 sm:max-w-[min(760px,42vw)]">
            {body}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-4">
            {primary && (
              <a
                href={primary.href}
                className="btn btn-solid w-full justify-between sm:w-auto sm:justify-start"
              >
                {primary.label}
                <ArrowRightIcon />
              </a>
            )}
            {secondary && (
              <a
                href={secondary.href}
                className="btn btn-ghost-light w-full justify-between sm:w-auto sm:justify-start"
              >
                {secondary.label}
                <ArrowRightIcon />
              </a>
            )}
          </div>
        )}
      </div>
      <div
        className="absolute right-0 bottom-0 left-0 h-12.5 rounded-t-[30px] bg-white"
        aria-hidden="true"
      />
    </section>
  );
}
