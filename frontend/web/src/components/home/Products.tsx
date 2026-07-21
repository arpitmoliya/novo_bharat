// Figma "Our Products" (#117:1547) — centered eyebrow+heading, then a wrapping
// grid of 6 two-tone product cards (white header w/ name + tag chips over a
// light-gray body w/ spec rows + Request Quote). Card 2 is elevated.
import { fxProducts } from "@/content/figmaHome";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function Products() {
  return (
    <section className="container-fx py-13.75 px-(--gutter-sm)">
      <div className="flex flex-col items-center gap-12 px-[clamp(20px,3vw,60px)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{fxProducts.eyebrow}</p>
          <h2 className="heading">
            {fxProducts.titleTop}
            <br />
            {fxProducts.titleBottom}
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 mx-auto max-w-140 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {fxProducts.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-[20px] bg-transparent transition-shadow duration-300 hover:shadow-(--shadow-card)"
            >
              <div className="flex flex-col gap-3 rounded-[20px] border border-b-[0.5px] border-black/20 bg-white p-5">
                <h3 className="m-0 font-heading text-[clamp(1.4rem,2vw,2rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag.label} className={`tag tag-${tag.color}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 rounded-[20px] border border-t-[0.5px] border-black/10 bg-f6 p-5">
                <div className="flex flex-col">
                  {item.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 border-b border-b-black/10 py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-gray">
                        {spec.label}
                      </span>
                      <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-right text-blue">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
                <a href="/contact" className="btn btn-ghost self-start">
                  Request Quote
                  <ArrowRightIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        <a href={fxProducts.cta.href} className="btn btn-solid">
          {fxProducts.cta.label}
          <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
