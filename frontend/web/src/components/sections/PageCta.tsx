import type { PageCtaContent } from "@/content/figmaPages";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

type PageCtaProps = {
  content: PageCtaContent;
};

export default function PageCta({ content }: PageCtaProps) {
  const { eyebrow, titleLines, body, primary, secondary, image } = content;

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
