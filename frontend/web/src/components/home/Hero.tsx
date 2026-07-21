// Figma "Home" hero (#30:7) — full-bleed background photo under a bottom-weighted
// gradient, a two-line display headline flanked by rounded "pill" photos, body
// copy + CTAs, and a white rounded notch bridging into the About section.
import { fxHero } from "@/content/figmaHome";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function Hero() {
  return (
    <section className="relative flex min-h-[clamp(540px,50vw,960px)] flex-col justify-end overflow-hidden bg-[image:var(--gradient-hero),url('/figma/img/hero-bg.png')] bg-cover bg-center bg-no-repeat px-5 pt-[150px] pb-20 text-white">
      <div className="mx-auto flex w-[min(1720px,89.58vw)] flex-col gap-[min(48px,2.5vw)]">
        <div className="flex flex-col">
          <h1 className="hero-title">{fxHero.headlineTop}</h1>
          <p className="hero-title">{fxHero.headlineBottom}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-10">
          <p className="lead max-w-[min(703px,36.61vw)] text-[clamp(0.9rem,1.0417vw,1.25rem)] text-white">
            {fxHero.body}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={fxHero.primary.href}
              className="btn btn-solid w-full justify-between sm:w-auto sm:justify-start"
            >
              {fxHero.primary.label}
              <ArrowRightIcon />
            </a>
            <a
              href={fxHero.secondary.href}
              className="btn btn-ghost-light w-full justify-between sm:w-auto sm:justify-start"
            >
              {fxHero.secondary.label}
              <ArrowRightIcon />
            </a>
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
