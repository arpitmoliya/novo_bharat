import { fxCta } from "@/content/figmaHome";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import Image from "next/image";

export default function Cta() {
  return (
    <Container className="py-20 px-(--gutter)">
      <div className="flex flex-col gap-12 bg-white lg:flex-row">
        <div className="flex flex-col justify-center gap-6">
          <Eyebrow>{fxCta.eyebrow}</Eyebrow>
          <Heading className="flex flex-col gap-2">
            {fxCta.titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < fxCta.titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </Heading>
          <Lead className="max-w-175.75 text-gray">{fxCta.body}</Lead>
          <div className="flex flex-col items-start gap-5">
            <ButtonLink
              href={fxCta.primary.href}
              variant="solid"
              showArrow
              responsiveFullWidth
            >
              {fxCta.primary.label}
            </ButtonLink>
            <ButtonLink
              href={fxCta.secondary.href}
              variant="ghost"
              showArrow
              responsiveFullWidth
            >
              {fxCta.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-square h-full max-h-105 w-full overflow-hidden rounded-[20px] lg:max-h-225">
          <Image
            className="h-full w-full object-cover"
            src={fxCta.image}
            alt="Novo Bharat global API export"
            width={860}
            height={900}
          />
        </div>
      </div>
    </Container>
  );
}
