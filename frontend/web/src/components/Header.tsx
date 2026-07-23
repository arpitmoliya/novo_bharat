"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fxBrand, fxNav } from "@/content/figmaHome";
import ButtonLink from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const navLinkClass =
  "relative font-body text-[clamp(1rem,1.05vw,1.25rem)] font-medium tracking-[-0.02em] text-[rgba(255,255,255,0.92)] transition-colors duration-[180ms] hover:text-white";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={cn(
        "fixed top-5 right-5 left-5 z-1000 mx-auto flex max-w-[1880px] items-center justify-between gap-6 rounded-[20px] border border-white/20 bg-ink p-3 pl-5 transition-shadow lg:p-[14px] lg:pl-8",
        scrolled && "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
      )}
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
            className={cn(
              navLinkClass,
              isActive(pathname, link.href) &&
                "bg-(image:--gradient-full) bg-clip-text text-transparent",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden shrink-0 lg:block">
        <ButtonLink href="/contact" variant="solid" showArrow>
          Contact Us
        </ButtonLink>
      </div>

      <button
        type="button"
        className="flex h-11.5 w-11.5 cursor-pointer flex-col justify-center gap-1.25 rounded-[10px] border-0 bg-transparent lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            "mx-auto block h-0.5 w-6 bg-white transition-all duration-250",
            open && "translate-y-1.75 rotate-45",
          )}
        />
        <span
          className={cn(
            "mx-auto block h-0.5 w-6 bg-white transition-all duration-250",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "mx-auto block h-0.5 w-6 bg-white transition-all duration-250",
            open && "-translate-y-1.75 -rotate-45",
          )}
        />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-1100 flex flex-col bg-[#0a0f1a] px-8 pt-24 pb-10 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          type="button"
          className="absolute top-6.5 right-6.5 h-11 w-11 cursor-pointer border-0 bg-transparent text-[32px] leading-none text-white"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {fxNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "border-b border-b-[rgba(255,255,255,0.12)] py-4 font-heading text-[22px] text-white",
              isActive(pathname, link.href) && "text-gold",
            )}
          >
            {link.label}
          </a>
        ))}
        <ButtonLink href="/contact" variant="solid" showArrow className="mt-7">
          Contact Us
        </ButtonLink>
      </div>
    </header>
  );
}
