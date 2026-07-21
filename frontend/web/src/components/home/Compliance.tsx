// Figma "Certifications & Compliance" (#117:25929) — gradient panel, centered
// eyebrow+heading, then a grid of 8 cert cards (real logo + name + description).
import { fxCompliance } from "@/content/figmaHome";

export default function Compliance() {
  return (
    <section className="container-fx py-20 px-(--gutter-sm)">
      <div className="flex flex-col items-center gap-12 rounded-[30px] bg-(image:--gradient-soft) py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,60px)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{fxCompliance.eyebrow}</p>
          <h2 className="heading">{fxCompliance.title}</h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 mx-auto max-w-75 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fxCompliance.items.map((cert) => (
            <article
              key={cert.name}
              className="flex flex-col gap-8 rounded-[20px] border border-black/10 bg-white p-6"
            >
              <div className="flex h-14 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.logo}
                  alt={`${cert.name} logo`}
                  className="h-full w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                  {cert.name}
                </h3>
                <p className="m-0 font-body text-[clamp(0.95rem,0.95vw,1.125rem)] leading-normal tracking-[-0.02em] text-gray">
                  {cert.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
