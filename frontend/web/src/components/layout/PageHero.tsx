import ButtonLink from "@/components/ui/ButtonLink";
import { Lead } from "@/components/ui/Typography";

type PageHeroAction = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  bg?: string;
  primary?: PageHeroAction;
  secondary?: PageHeroAction;
};

export default function PageHero({
  eyebrow,
  title,
  body,
  bg = "/figma/img/hero-bg.png",
  primary,
  secondary,
}: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[clamp(360px,30vw,560px)] flex-col justify-end overflow-hidden bg-[image:var(--gradient-hero),var(--page-hero-bg)] bg-cover bg-center bg-no-repeat px-5 pt-[clamp(120px,12vw,190px)] pb-[clamp(48px,5vw,90px)] text-white"
      style={{ ["--page-hero-bg" as string]: `url("${bg}")` }}
    >
      <div className="mx-auto flex w-[min(1720px,89.58vw)] flex-col gap-[clamp(16px,1.6vw,28px)]">
        <p className="m-0 w-max bg-(image:--gradient-full) bg-clip-text font-body text-[clamp(0.85rem,1.05vw,1.25rem)] font-medium tracking-[0.08em] text-transparent uppercase">
          {eyebrow}
        </p>
        <h1 className="m-0 font-heading text-[clamp(2rem,3.85vw,4.625rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {body ? (
          <Lead className="max-w-none text-[clamp(0.95rem,1.0417vw,1.25rem)] text-white/90 sm:max-w-[min(760px,42vw)]">
            {body}
          </Lead>
        ) : null}
        {primary || secondary ? (
          <div className="mt-1.5 flex flex-wrap items-center gap-4">
            {primary ? (
              <ButtonLink
                href={primary.href}
                variant="solid"
                showArrow
                responsiveFullWidth
              >
                {primary.label}
              </ButtonLink>
            ) : null}
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                variant="ghost-light"
                showArrow
                responsiveFullWidth
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className="absolute right-0 bottom-0 left-0 h-12.5 rounded-t-[30px] bg-white"
        aria-hidden="true"
      />
    </section>
  );
}
