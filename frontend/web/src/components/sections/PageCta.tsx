import type { PageCtaContent } from "@/content/figmaPages";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";

type PageCtaProps = {
  content: PageCtaContent;
  variant?: "panel" | "banner";
  withPhoto?: boolean;
};

export default function PageCta({
  content,
  variant = "panel",
  withPhoto = false,
}: PageCtaProps) {
  const { eyebrow, titleLines, body, primary, secondary, image } = content;

  if (variant === "banner") {
    if (withPhoto) {
      return (
        <Container className="px-(--gutter) py-10 md:py-16">
          <div
            className="relative flex min-h-70 flex-col justify-between gap-10 overflow-hidden rounded-[20px] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.55)),var(--banner-cta-bg)] bg-cover bg-center px-5 py-8 sm:min-h-80 sm:rounded-[30px] sm:px-10 sm:py-10 md:min-h-90 md:px-14 md:py-12"
            style={{ ["--banner-cta-bg" as string]: `url("${image}")` }}
          >
            <div className="flex max-w-xl flex-col gap-3 self-start sm:gap-4">
              <p className="m-0 font-body text-sm tracking-[0.08em] text-white uppercase sm:text-base">
                {eyebrow}
              </p>
              <h2 className="m-0 font-heading text-[clamp(1.75rem,3vw,3rem)] leading-[1.2] font-bold tracking-tight text-white">
                {titleLines.join(" ")}
              </h2>
            </div>

            <div className="flex max-w-md flex-col items-stretch gap-5 self-end sm:items-end">
              <p className="m-0 font-body text-base leading-relaxed tracking-tight text-white/90 sm:text-right">
                {body}
              </p>
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-end">
                <ButtonLink
                  href={primary.href}
                  variant="solid"
                  showArrow
                  responsiveFullWidth
                  {...(primary.download ? { download: true } : {})}
                >
                  {primary.label}
                </ButtonLink>
                {secondary ? (
                  <ButtonLink
                    href={secondary.href}
                    variant="ghost-light"
                    showArrow
                    responsiveFullWidth
                    {...(secondary.download ? { download: true } : {})}
                  >
                    {secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      );
    }

    return (
      <Container className="px-(--gutter) py-10 md:py-16">
        <div
          className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),var(--banner-cta-bg)] bg-cover bg-center px-5 py-10 sm:rounded-[30px] sm:px-10 sm:py-14 md:px-14 md:py-16"
          style={{ ["--banner-cta-bg" as string]: `url("${image}")` }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="m-0 font-body text-sm tracking-[0.08em] text-gold uppercase sm:text-base">
                {eyebrow}
              </p>
              <h2 className="m-0 font-heading text-[clamp(1.75rem,3vw,3rem)] leading-[1.2] font-bold tracking-tight text-white">
                {titleLines.join(" ")}
              </h2>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <p className="m-0 max-w-md font-body text-base leading-relaxed tracking-tight text-white/90 lg:text-right">
                {body}
              </p>
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-start lg:items-end">
                <ButtonLink
                  href={primary.href}
                  variant="solid"
                  showArrow
                  responsiveFullWidth
                  {...(primary.download ? { download: true } : {})}
                >
                  {primary.label}
                </ButtonLink>
                {secondary ? (
                  <ButtonLink
                    href={secondary.href}
                    variant="ghost-light"
                    showArrow
                    responsiveFullWidth
                    {...(secondary.download ? { download: true } : {})}
                  >
                    {secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-(--gutter) py-20">
      <div className="grid grid-cols-1 gap-12 rounded-[20px] border border-black/10 bg-white p-12 shadow-[0_30px_80px_rgba(0,0,0,0.05)] md:grid-cols-2 lg:grid-cols-[1fr_860px]">
        <div className="flex flex-col justify-center gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading className="flex flex-col gap-2">
            {titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </Heading>
          <Lead className="max-w-175.75 text-gray">{body}</Lead>
          <div className="flex flex-col items-start gap-5">
            <ButtonLink
              href={primary.href}
              variant="solid"
              showArrow
              responsiveFullWidth
              {...(primary.download ? { download: true } : {})}
            >
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                variant="ghost"
                showArrow
                responsiveFullWidth
                {...(secondary.download ? { download: true } : {})}
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="-order-1 h-full min-h-75 w-full rounded-[20px] object-cover md:order-0 md:min-h-105"
          src={image}
          alt="Novo Bharat global API export"
        />
      </div>
    </Container>
  );
}
