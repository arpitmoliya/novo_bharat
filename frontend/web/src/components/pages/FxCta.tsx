// Shared inner-page CTA. `panel` = white card + photo (default, About/Products).
// `banner` = dark photo strip with left headline + right copy/buttons (Why Us).
import type { FxCtaContent } from "@/content/figmaPages";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function FxCta({
  content,
  variant = "panel",
}: {
  content: FxCtaContent;
  variant?: "panel" | "banner";
}) {
  const { eyebrow, titleLines, body, primary, secondary, image } = content;

  if (variant === "banner") {
    return (
      <section className="container-fx px-(--gutter) py-10 md:py-16">
        <div
          className="relative overflow-hidden rounded-[20px] bg-[image:linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),var(--banner-cta-bg)] bg-cover bg-center px-5 py-10 sm:rounded-[30px] sm:px-10 sm:py-14 md:px-14 md:py-16"
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
                <a
                  href={primary.href}
                  className="btn btn-solid w-full justify-between sm:w-auto sm:justify-start"
                  {...(primary.download ? { download: true } : {})}
                >
                  {primary.label}
                  <ArrowRightIcon />
                </a>
                {secondary && (
                  <a
                    href={secondary.href}
                    className="btn btn-ghost-light w-full justify-between sm:w-auto sm:justify-start"
                    {...(secondary.download ? { download: true } : {})}
                  >
                    {secondary.label}
                    <ArrowRightIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-fx px-(--gutter) py-20">
      <div className="grid grid-cols-1 gap-12 rounded-[20px] border border-black/10 bg-white p-12 shadow-[0_30px_80px_rgba(0,0,0,0.05)] md:grid-cols-2 lg:grid-cols-[1fr_860px]">
        <div className="flex flex-col justify-center gap-6">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="heading flex flex-col gap-2">
            {titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="lead max-w-175.75 text-gray">{body}</p>
          <div className="flex flex-col items-start gap-5">
            <a
              href={primary.href}
              className="btn btn-solid w-full justify-between sm:w-auto sm:justify-start"
              {...(primary.download ? { download: true } : {})}
            >
              {primary.label}
              <ArrowRightIcon />
            </a>
            {secondary && (
              <a
                href={secondary.href}
                className="btn btn-ghost w-full justify-between sm:w-auto sm:justify-start"
                {...(secondary.download ? { download: true } : {})}
              >
                {secondary.label}
                <ArrowRightIcon />
              </a>
            )}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cta-photo -order-1 min-h-75 md:order-0 md:min-h-105"
          src={image}
          alt="Novo Bharat global API export"
        />
      </div>
    </section>
  );
}
