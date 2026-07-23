// Compact inner-page hero for the Figma rebuild — dark photo banner with a
// gradient eyebrow, large display heading, lead copy, optional CTAs, and the
// white rounded notch that bridges into the page (matches the Home hero style).

import ButtonLink from "../ui/ButtonLink";

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
        <p className="m-0 w-max bg-(image:--gradient-full) bg-clip-text font-body text-[clamp(0.85rem,1.05vw,1.25rem)] font-medium tracking-[0.08em] text-transparent uppercase">
          {eyebrow}
        </p>
        <h1 className="m-0 max-w-[20ch] font-heading text-[clamp(2rem,3.85vw,4.625rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {body && (
          <p className="lead max-w-none text-[clamp(0.95rem,1.0417vw,1.25rem)] text-white/90 sm:max-w-[min(760px,42vw)]">
            {body}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-4">
            {primary && (
              <ButtonLink
                href={primary.href}
                variant="solid"
                showArrow
                responsiveFullWidth
              >
                {primary.label}
              </ButtonLink>
            )}
            {secondary && (
              <ButtonLink
                href={secondary.href}
                variant="ghost-light"
                showArrow
                responsiveFullWidth
              >
                {secondary.label}
              </ButtonLink>
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
