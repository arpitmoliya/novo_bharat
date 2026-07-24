import type { ProcessArrowVariant } from "@/components/icons/ProcessArrowIcon";
import PageHero from "@/components/layout/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ProcessStep from "@/components/ui/ProcessStep";
import Section, { SectionHeader } from "@/components/ui/Section";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import { aboutPage } from "@/content/figmaPages";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/about");
}

export default function AboutPage() {
  const { hero, story, mvv, process, cta } = aboutPage;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/about-us-bg.png"
      />

      {/* Story */}
      <Section>
        <div className="flex flex-col items-stretch rounded-[20px] bg-gradient-soft p-5 lg:flex-row">
          <div className="relative min-h-105 flex-1 overflow-hidden rounded-[20px] lg:min-h-0">
            <Image
              src={story.image}
              alt="Novo Bharat Global Export team"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <Image
              src={"/figma/img/logo-white.png"}
              alt="Novo Bharat Global Export team"
              fill
              className="object-cover bg-black/60"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6 rounded-[20px] bg-white p-6 lg:p-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <Heading className="max-w-97.25">{story.title}</Heading>
            </div>
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className={`m-0 font-body text-[clamp(0.90rem,1.05vw,1.25rem)] leading-[1.6] tracking-[-0.02em] text-gray`}
              >
                {paragraph}
              </p>
            ))}

            <ButtonLink
              href="/contact"
              variant="solid"
              showArrow
              className="w-fit"
            >
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* MVV */}
      <Section>
        <SectionHeader className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{mvv.eyebrow}</Eyebrow>
          <Heading>{mvv.title}</Heading>
        </SectionHeader>
        <div className="mx-auto grid max-w-140 grid-cols-1 gap-6 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {mvv.cards.map((card) => {
            return (
              <FeatureCard
                key={card.desc}
                title={card.title}
                icon={card.icon}
                description={card.desc}
              />
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="rounded-3xl bg-gradient-soft px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <SectionHeader className="flex flex-col items-center gap-4 text-center">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <Heading>{process.title}</Heading>
          </SectionHeader>
          <ol className="mx-auto flex max-w-md list-none flex-col items-center gap-4 p-0 lg:max-w-none lg:flex-row lg:items-start lg:gap-10 xl:gap-13">
            {process.steps.map((step, index) => {
              const isLast = index === process.steps.length - 1;
              return (
                <ProcessStep
                  key={step.title}
                  step={index + 1}
                  title={step.title}
                  description={step.desc}
                  connector={
                    isLast ? null : ((index + 1) as ProcessArrowVariant)
                  }
                  className={cn(
                    "lg:flex-1",
                    // Cards are slightly tilted on desktop; arrows tilt with them.
                    index % 2 === 1 ? "lg:rotate-6" : "lg:-rotate-6",
                  )}
                />
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Page CTA */}
      <Container className="py-20 px-(--gutter)">
        <div className="flex flex-col gap-12 bg-white lg:flex-row">
          <div className="flex-1 flex flex-col justify-center gap-6">
            <Eyebrow>{cta.eyebrow}</Eyebrow>
            <Heading className="flex flex-col gap-2">
              {cta.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < cta.titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </Heading>
            <Lead className="max-w-175.75 text-gray">{cta.body}</Lead>

            <ButtonLink
              href={cta.primary.href}
              variant="solid"
              showArrow
              className="w-fit"
            >
              {cta.primary.label}
            </ButtonLink>
          </div>

          <div className="relative aspect-square h-full max-h-105 w-full flex-1 overflow-hidden rounded-[20px] lg:max-h-225">
            <Image
              className="h-full w-full object-cover"
              src={cta.image}
              alt="Novo Bharat global API export"
              width={860}
              height={900}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
