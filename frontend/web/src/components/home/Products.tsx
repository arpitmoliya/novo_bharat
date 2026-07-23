import { fxProducts } from "@/content/figmaHome";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export default function Products() {
  return (
    <Container className="py-13.75 px-(--gutter-sm)">
      <div className="flex flex-col items-center gap-12 px-[clamp(20px,3vw,60px)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{fxProducts.eyebrow}</Eyebrow>
          <Heading>
            {fxProducts.titleTop}
            <br />
            {fxProducts.titleBottom}
          </Heading>
        </div>

        <div className="mx-auto grid w-full max-w-140 grid-cols-1 gap-6 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {fxProducts.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-[20px] bg-transparent transition-shadow duration-300 hover:shadow-(--shadow-card) overflow-hidden"
            >
              <div className="flex flex-col gap-3 rounded-[20px] border border-b-[0.5px] border-black/20 bg-white p-5 overflow-hidden">
                <h3 className="m-0 font-heading text-[clamp(1.4rem,2vw,2rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag.label} color={tag.color}>
                      {tag.label}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 rounded-[20px] border border-t-[0.5px] border-black/10 bg-f6 p-5 overflow-hidden">
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
                <ButtonLink
                  href="/contact"
                  variant="ghost"
                  showArrow
                  className="self-start"
                >
                  Request Quote
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>

        <ButtonLink href={fxProducts.cta.href} variant="solid" showArrow>
          {fxProducts.cta.label}
        </ButtonLink>
      </div>
    </Container>
  );
}
