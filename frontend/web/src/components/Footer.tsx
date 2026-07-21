// Figma "Home" footer (#30:24548) — black panel with a white rounded top notch:
// brand column (logo, gradient tagline, blurb), nav + contact + social columns,
// and a giant gradient "Novo Bharat" wordmark.
import { fxFooter } from "@/content/figmaHome";

export default function Footer() {
  return (
    <footer className="container-fx relative flex flex-col gap-12 overflow-hidden bg-ink px-(--gutter) pt-24 pb-0 sm:gap-16 sm:pt-28 md:gap-20 md:pt-32">
      <div
        className="absolute top-0 right-0 left-0 h-10 rounded-b-[30px] bg-white sm:h-12.5"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <a href="/" aria-label="Novo Bharat Global Export — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fxFooter.logo}
              alt="Novo Bharat Global Export"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </a>
          <p className="footer-tagline">{fxFooter.tagline}</p>
          <p className="footer-blurb">{fxFooter.blurb}</p>
        </div>

        <nav className="flex flex-col gap-4 sm:gap-5" aria-label="Footer">
          {fxFooter.nav.map((link) => (
            <a key={link.href} href={link.href} className="footer-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 sm:gap-5">
          <a href={fxFooter.phoneHref} className="footer-link">
            {fxFooter.phone}
          </a>
          <a href={`mailto:${fxFooter.email}`} className="footer-link">
            {fxFooter.email}
          </a>
          <a href={`mailto:${fxFooter.email2}`} className="footer-link">
            {fxFooter.email2}
          </a>
          <p className="footer-link">{fxFooter.address}</p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {fxFooter.social.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-link inline-flex items-center gap-3"
            >
              <Icon className="size-7 sm:size-8" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <svg
        className="footer-wordmark"
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
    </footer>
  );
}
