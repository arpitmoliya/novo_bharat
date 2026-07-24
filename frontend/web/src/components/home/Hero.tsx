import { fxHero } from "@/content/figmaHome";
import ButtonLink from "@/components/ui/ButtonLink";
import { HeroTitle, HeroHeading, Lead } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section className="relative flex min-h-[clamp(540px,50vw,960px)] flex-col justify-end overflow-hidden bg-[image:var(--gradient-hero),url('/figma/img/hero-bg.png')] bg-cover bg-center bg-no-repeat px-5 pt-37.5 pb-20 text-white">
      <div className="mx-auto flex w-[min(1720px,89.58vw)] flex-col gap-[min(48px,2.5vw)]">
        <div className="flex flex-col">
          <HeroHeading>{fxHero.headlineTop}</HeroHeading>
          <HeroTitle>{fxHero.headlineBottom}</HeroTitle>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-10">
          <Lead className="max-w-[min(703px,36.61vw)] text-[clamp(0.9rem,1.0417vw,1.25rem)] text-white">
            {fxHero.body}
          </Lead>
          <div className="flex flex-wrap items-center gap-5">
            <ButtonLink
              href={fxHero.primary.href}
              variant="solid"
              showArrow
              responsiveFullWidth
            >
              {fxHero.primary.label}
            </ButtonLink>
            <ButtonLink
              href={fxHero.secondary.href}
              variant="ghost-light"
              showArrow
              responsiveFullWidth
            >
              {fxHero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        className="absolute right-0 bottom-0 left-0 h-12.5 rounded-t-[30px] bg-white"
        aria-hidden="true"
      />
    </section>
  );
}
