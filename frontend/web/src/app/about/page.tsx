import type { Metadata } from "next";
import { aboutPage } from "@/content/figmaPages";
import { ICON_MAP } from "@/components/home/icons";
import Counter from "@/components/home/Counter";
import FxCta from "@/components/pages/FxCta";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/about");
}

// About — Figma "About Us" design language, built on the fx- system.
export default function AboutPage() {
  const { hero, story, mvv, process, cta } = aboutPage;

  return (
    <main className="bg-white overflow-x-clip">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/counter-bg.png"
      />

      {/* Our Story — text + photo */}
      <section className="section">
        <div className="grid grid-cols-1 items-stretch gap-[clamp(32px,3.5vw,64px)] lg:grid-cols-[1.15fr_1fr]">
          <div className="story-text flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">{story.eyebrow}</p>
              <h2 className="heading">{story.title}</h2>
            </div>
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="story-media min-h-85 lg:min-h-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.image} alt="Novo Bharat Global Export team" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <Counter />

      {/* Mission, Vision & Values */}
      <section className="section">
        <div className="section-head flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{mvv.eyebrow}</p>
          <h2 className="heading">{mvv.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-140 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {mvv.cards.map((card) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <article key={card.title} className="feature-card">
                <div className="feature-icon">{Icon && <Icon />}</div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-desc">{card.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Our Process */}
      <section className="section">
        <div className="section-head flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="heading">{process.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {process.steps.map((step, i) => (
            <div key={step.title} className="step">
              <div className="step-num">{i + 1}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FxCta content={cta} />
    </main>
  );
}
