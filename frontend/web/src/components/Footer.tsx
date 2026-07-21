// Figma "Home" footer (#30:24548) — black panel with a white rounded top notch:
// brand column (logo, gradient tagline, blurb), nav + contact + social columns,
// and a giant gradient "Novo Bharat" wordmark.
import { fxFooter } from "@/content/figmaHome";

export default function Footer() {
  return (
    <footer className="container-fx relative flex flex-col gap-[clamp(56px,7vw,100px)] overflow-hidden bg-ink px-(--gutter) pt-[clamp(80px,9vw,130px)] pb-0">
      <div
        className="absolute top-0 right-0 left-0 h-12.5 rounded-b-[30px] bg-white"
        aria-hidden="true"
      />

      <div className="flex flex-wrap justify-between gap-10">
        <div className="flex max-w-139.25 flex-col gap-4">
          <a href="/" aria-label="Novo Bharat Global Export — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fxFooter.logo}
              alt="Novo Bharat Global Export"
              className="h-16 w-auto object-contain"
            />
          </a>
          <p className="footer-tagline">{fxFooter.tagline}</p>
          <p className="footer-blurb">{fxFooter.blurb}</p>
        </div>

        <div className="flex flex-wrap gap-[clamp(40px,5vw,80px)]">
          <nav className="flex flex-col gap-5" aria-label="Footer">
            {fxFooter.nav.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-5">
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

          <div className="flex flex-col gap-5">
            {fxFooter.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-link inline-flex items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8"
                />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="footer-wordmark">{fxFooter.wordmark}</p>
    </footer>
  );
}
