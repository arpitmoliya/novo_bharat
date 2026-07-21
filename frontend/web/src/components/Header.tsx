"use client";

// Figma "Home" header (#30:8) — a floating glass bar over the hero that docks to
// a solid white bar once the user scrolls, so nav text stays readable over the
// light sections below. The logo swaps white→navy to match. Mobile: slide-in panel.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fxBrand, fxNav } from "@/content/figmaHome";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dock the header (solid white) after a small scroll past the hero top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile panel is open; close on route change.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`container-fx fixed top-5 right-5 left-5 z-1000 flex max-w-[1880px] items-center justify-between gap-6 rounded-[20px] border border-white/20 bg-ink p-3 pl-5 transition-shadow lg:p-[14px] lg:pl-8 ${
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <a
        href="/"
        className="inline-flex shrink-0 items-center leading-none"
        aria-label="Novo Bharat Global Export — home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fxBrand.logoOnDark}
          alt="Novo Bharat Global Export"
          className="h-11 w-auto object-contain"
        />
      </a>

      <nav
        className="hidden items-center gap-[clamp(20px,2.9vw,56px)] lg:flex"
        aria-label="Primary"
      >
        {fxNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`header-link${isActive(pathname, link.href) ? " is-active" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="/contact"
        className="btn btn-solid hidden shrink-0 lg:inline-flex"
      >
        Contact Us
        <ArrowRightIcon />
      </a>

      <button
        type="button"
        className={`hamburger lg:hidden ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu${open ? " is-open" : ""}`}>
        <button
          type="button"
          className="mobile-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {fxNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={isActive(pathname, link.href) ? "is-active" : ""}
          >
            {link.label}
          </a>
        ))}
        <a href="/contact" className="btn btn-solid">
          Contact Us
          <ArrowRightIcon />
        </a>
      </div>
    </header>
  );
}
