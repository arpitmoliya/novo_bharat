// Figma "CTA" (#30:24520) — white panel split into a copy column (eyebrow,
// three-line heading, body, two stacked CTAs) and a tall photo on the right.
import { fxCta } from "@/content/figmaHome";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function Cta() {
  return (
    <section className="container-fx py-20 px-(--gutter)">
      <div className="grid grid-cols-1 gap-12 rounded-[20px] border border-black/10 bg-white p-12 shadow-[0_30px_80px_rgba(0,0,0,0.05)] md:grid-cols-2 lg:grid-cols-[1fr_860px]">
        <div className="flex flex-col justify-center gap-6">
          <p className="eyebrow">{fxCta.eyebrow}</p>
          <h2 className="heading flex flex-col gap-2">
            {fxCta.titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < fxCta.titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="lead max-w-175.75 text-gray">{fxCta.body}</p>
          <div className="flex flex-col items-start gap-5">
            <a
              href={fxCta.primary.href}
              className="btn btn-solid w-full justify-between sm:w-auto sm:justify-start"
            >
              {fxCta.primary.label}
              <ArrowRightIcon />
            </a>
            <a
              href={fxCta.secondary.href}
              className="btn btn-ghost w-full justify-between sm:w-auto sm:justify-start"
            >
              {fxCta.secondary.label}
              <ArrowRightIcon />
            </a>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cta-photo -order-1 min-h-75 md:order-0 md:min-h-105"
          src={fxCta.image}
          alt="Novo Bharat global API export"
        />
      </div>
    </section>
  );
}
