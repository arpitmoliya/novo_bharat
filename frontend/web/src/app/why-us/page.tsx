import type { Metadata } from "next";
import { whyUsPage } from "@/content/figmaPages";
import CircleCheckMarkIcon from "@/components/icons/CircleCheckMarkIcon";
import CircleXMarkIcon from "@/components/icons/CircleXMarkIcon";
import PageCta from "@/components/sections/PageCta";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/why-us");
}

// Why Us — Figma "Why Us" (#117:26596): hero + Six Reasons + compare + banner CTA.
export default function WhyUsPage() {
  const { hero, reasons, compare, cta } = whyUsPage;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/counter-bg.png"
      />

      {/* Six reasons — gradient header (icon + title) over white body */}
      <Container className="px-(--gutter) py-10 md:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 md:mb-12">
          <Eyebrow>{reasons.eyebrow}</Eyebrow>
          <Heading>
            {reasons.titleTop}
            <br />
            {reasons.titleBottom}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reasons.cards.map((r) => {
            const Icon = r.icon;
            return (
              <article key={r.title} className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-4 bg-gradient-soft p-4 rounded-[20px] md:p-5 lg:p-6 md:gap-5">
                  <Icon className="size-7 sm:size-8 md:size-10 lg:size-15" />
                  <h3 className="m-0 font-heading text-lg leading-snug font-semibold tracking-tight text-black sm:text-xl md:text-[1.375rem]">
                    {r.title}
                  </h3>
                </div>
                <div className="flex flex-1 bg-white p-4 md:p-5 lg:p-6 border border-black/10 rounded-[20px]">
                  <p className="m-0 font-body text-sm leading-relaxed tracking-tight text-gray sm:text-base md:text-lg">
                    {r.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <Container className="px-(--gutter) py-10 md:py-16">
        <div className="rounded-2xl bg-(image:--gradient-soft) px-4 py-10 sm:rounded-[30px] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10 md:mb-12">
            <Eyebrow>{compare.eyebrow}</Eyebrow>
            <h2 className="m-0 font-heading text-[clamp(1.75rem,3.4vw,3.5rem)] leading-[1.15] font-bold tracking-[-0.02em]">
              <span className="text-gold">Novo Bharat vs.</span>
              <br />
              <span className="text-black">a Typical API Broker</span>
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-4 sm:rounded-3xl sm:p-6 lg:p-8">
            {/* Desktop / tablet grid */}
            <div className="hidden gap-3 md:grid md:grid-cols-3">
              <div className="flex items-center justify-center rounded-xl bg-f6 px-5 py-3.5 text-center font-heading text-base font-normal tracking-tight text-black md:text-lg">
                Feature
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gold px-5 py-3.5 text-center font-heading text-base font-normal tracking-tight text-white md:text-lg">
                {compare.columns[0]}
              </div>
              <div className="flex items-center justify-center rounded-xl bg-f6 px-5 py-3.5 text-center font-heading text-base font-normal tracking-tight text-black md:text-lg">
                {compare.columns[1]}
              </div>

              {compare.rows.map((row) => (
                <div key={row.feature} className="contents">
                  <div className="flex items-center rounded-xl bg-f6 px-5 py-3.5 font-body text-base font-medium tracking-tight text-black md:text-lg">
                    {row.feature}
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-bluepill px-5 py-3.5 font-body text-base tracking-tight text-black md:text-lg">
                    <CircleCheckMarkIcon className="size-5 shrink-0 sm:size-6" />
                    {row.ours}
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-f6 px-5 py-3.5 font-body text-base tracking-tight text-gray md:text-lg">
                    <CircleXMarkIcon className="size-5 shrink-0 sm:size-6" />
                    {row.theirs}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stacked cards */}
            <div className="flex flex-col gap-4 md:hidden">
              {compare.rows.map((row) => (
                <div
                  key={row.feature}
                  className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-f6/50 p-4"
                >
                  <p className="m-0 font-heading text-base font-medium tracking-tight text-black">
                    {row.feature}
                  </p>
                  <div className="flex items-start gap-2 rounded-full bg-bluepill px-4 py-2.5 text-sm text-black">
                    <CircleCheckMarkIcon className="mt-0.5 size-5 shrink-0" />
                    <span>
                      <span className="font-medium">
                        {compare.columns[0]}:{" "}
                      </span>
                      {row.ours}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 rounded-full bg-white px-4 py-2.5 text-sm text-gray">
                    <CircleXMarkIcon className="mt-0.5 size-5 shrink-0" />
                    <span>
                      <span className="font-medium text-black/70">
                        {compare.columns[1]}:{" "}
                      </span>
                      {row.theirs}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <PageCta content={cta} variant="banner" withPhoto />
    </main>
  );
}
