import { fxFooter } from "@/content/figmaHome";
import Container from "@/components/ui/Container";
import { GradientText } from "@/components/ui/Typography";
import Image from "next/image";

const footerLinkClass =
  "m-0 font-body text-[clamp(1rem,1.05vw,1.25rem)] leading-normal tracking-[-0.02em] whitespace-pre-line text-white transition-colors duration-[180ms] hover:text-gold";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 pb-0 sm:pt-28 md:pt-32">
      <Container className="flex flex-col gap-12 px-(--gutter) sm:gap-16 md:gap-20">
        <div
          className="absolute top-0 right-0 left-0 h-10 rounded-b-[30px] bg-white sm:h-12.5"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-full lg:max-w-139.25">
            <a href="/" aria-label="Novo Bharat Global Export — home">
              <Image
                src={fxFooter.logo}
                alt="Novo Bharat Global Export"
                className="h-14 w-auto object-contain sm:h-16"
                width={100}
                height={100}
              />
            </a>
            <GradientText className="font-body text-[clamp(1rem,1.05vw,1.125rem)] leading-normal font-medium">
              {fxFooter.tagline}
            </GradientText>
            <p className="m-0 font-body text-[clamp(0.9rem,0.95vw,1rem)] leading-normal text-footerbody opacity-50">
              {fxFooter.blurb}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row lg:gap-10">
            <nav
              className="flex-1 flex flex-col gap-4 sm:gap-5"
              aria-label="Footer"
            >
              {fxFooter.nav.map((link) => (
                <a key={link.href} href={link.href} className={footerLinkClass}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex-1 flex flex-col gap-4 sm:gap-5">
              <a href={fxFooter.phoneHref} className={footerLinkClass}>
                {fxFooter.phone}
              </a>
              <a href={`mailto:${fxFooter.email}`} className={footerLinkClass}>
                {fxFooter.email}
              </a>
              <a href={`mailto:${fxFooter.email2}`} className={footerLinkClass}>
                {fxFooter.email2}
              </a>
              <p className={footerLinkClass}>{fxFooter.address}</p>
            </div>

            <div className="flex-1 flex flex-col gap-4 sm:gap-5">
              {fxFooter.social.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${footerLinkClass} inline-flex items-center gap-3`}
                >
                  <Icon className="size-7 sm:size-8" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer word mark */}
        <svg
          className="m-0 block w-full"
          viewBox="0 0 1000 135"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={fxFooter.wordmark}
        >
          <defs>
            <linearGradient
              id="footer-wordmark-gradient"
              x1="500"
              y1="0"
              x2="500"
              y2="135"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#37DEFC" />
              <stop offset="1" stopColor="#22A3F7" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="112"
            fill="url(#footer-wordmark-gradient)"
            fontSize="108"
            fontWeight="800"
            letterSpacing="-0.04em"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-heading uppercase"
          >
            {fxFooter.wordmark}
          </text>
        </svg>
      </Container>
    </footer>
  );
}
