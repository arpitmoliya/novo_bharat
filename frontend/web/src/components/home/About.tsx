// Figma "About Us" (#117:1490) — 2-column: eyebrow + heading + two paragraphs on
// the left; three stacked cards (gradient icon tile + gradient text panel) right.
import { fxAbout } from "@/content/figmaHome";

export default function About() {
  return (
    <section className="container-fx bg-white pt-[clamp(44px,4.5vw,72px)] pb-[clamp(56px,2.5vw,32px)] px-(--gutter)">
      <div className="flex flex-col items-start gap-12 lg:flex-row">
        <div className="flex min-w-0 shrink grow-[1.3] basis-0 flex-col gap-6 lg:max-w-217.25">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{fxAbout.eyebrow}</p>
            <h2 className="heading">
              {fxAbout.titleTop}
              <br />
              {fxAbout.titleBottom}
            </h2>
          </div>
          <p className="lead text-ink">{fxAbout.para1}</p>
          <p className="lead text-gray">{fxAbout.para2}</p>
        </div>

        <div className="flex min-w-0 shrink grow basis-0 flex-col gap-6">
          {fxAbout.cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="flex items-stretch">
                <div className="flex w-[clamp(96px,9.5vw,200px)] flex-none items-center justify-center rounded-[20px] bg-(image:--gradient-soft)">
                  <Icon className="h-auto w-1/2 max-w-25" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 rounded-[20px] bg-(image:--gradient-soft) p-6">
                  <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                    {card.title}
                  </h3>
                  <p className="m-0 font-body text-[clamp(0.95rem,0.95vw,1.125rem)] leading-normal tracking-[-0.02em] text-gray">
                    {card.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
