/*
 * Home page content — transcribed verbatim from the Figma design
 * "Novo Bharat Global Export" (frame "Home" #30:6). Copy, asset paths, and
 * section order all mirror the Figma. Assets live under /public/figma/.
 *
 * Known Figma content quirks preserved / corrected (see notes inline):
 *  - Header nav 6th item reads "Certifications" twice in Figma; corrected to
 *    "Contact Us" here (footer nav confirms this is the intended 6th link).
 *  - The "Our Products" section heading in Figma re-uses the About heading
 *    ("India's Trusted API Export Partner / for Global Pharma"). Kept faithful.
 */

import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import DocumentAttachIcon from "@/components/icons/DocumentAttachIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export const fxHero = {
  bg: "/figma/img/hero-bg.png",
  pill1: "/figma/img/hero-pill-1.png",
  pill2: "/figma/img/hero-bg.png",
  headlineTop: "Supplying the World with India's Finest",
  headlineBottom: "Active Pharmaceutical Ingredients",
  body: "Premium bulk API exports backed by GMP-certified India's leading manufacturers — delivered to 20+ countries.",
  primary: { label: "Explore Our APIs", href: "/products" },
  secondary: { label: "Request a Quote", href: "/contact" },
} as const;

export const fxAbout = {
  eyebrow: "Who We Are",
  titleTop: "India's Trusted API Export Partner",
  titleBottom: "for Global Pharma",
  para1:
    "Novo Bharat Global Export is a Gujarat-based pharmaceutical API manufacturing, sourcing, and export company dedicated to supplying high-quality Active Pharmaceutical Ingredients (APIs) to customers worldwide.",
  para2:
    "Leveraging our manufacturing capabilities and strategic partnerships with GMP-certified facilities, we offer a comprehensive portfolio of cardiovascular, anti-diabetic, antibiotic, CNS, and specialty APIs. We are committed to consistent quality, regulatory compliance, competitive pricing, and seamless export support — from product sourcing and documentation to global logistics and delivery.",
  cards: [
    {
      icon: CheckMarkIcon,
      title: "Verified Manufacturers",
      desc: "We manufacture and source exclusively from USFDA, WHO-GMP, and EU-GMP certified India's manufacturers.",
    },
    {
      icon: DocumentAttachIcon,
      title: "Full Documentation Support",
      desc: "COA, MSDS, DMF, pharmacopoeia certificates, shipping documents — we handle it all.",
    },
    {
      icon: GlobeIcon,
      title: "Global Reach",
      desc: "From India to Africa, Southeast Asia, Chile, and regulated European markets — we deliver worldwide.",
    },
  ],
} as const;

export const fxCounter = {
  bg: "/figma/img/counter-bg.png",
  stats: [
    { value: "100%", label: "GMP Certified Sources" },
    { value: "20+", label: "Export Markets" },
    { value: "50+", label: "API Molecules" },
    { value: "11+", label: "Years Pharma Expertise" },
  ],
} as const;

export const fxProducts = {
  // Figma re-uses the About heading here; kept faithful to the design.
  eyebrow: "Who We Are",
  titleTop: "India's Trusted API Export Partner",
  titleBottom: "for Global Pharma",
  // 6 product cards in a wrapping grid. Cards have a white "header" (name + tag
  // chips) over a light-gray "body" (spec rows + Request Quote). Card 2 is elevated.
  items: [
    {
      name: "Metformin HCl",
      tags: [{ label: "Anti-Diabetic", color: "gold" }],
      specs: [
        { label: "CAS :", value: "1115-70-4" },
        { label: "Purity:", value: "99.5% min" },
        { label: "Pharmacopoeia:", value: "BP / USP / IP" },
      ],
      featured: false,
    },
    {
      name: "Amlodipine Besylate",
      tags: [{ label: "Cardiovascular", color: "gold" }],
      specs: [
        { label: "CAS :", value: "111470-99-6" },
        { label: "Purity:", value: "99.0% min" },
        { label: "Pharmacopoeia:", value: "BP / USP / EP" },
      ],
      featured: true,
    },
    {
      name: "Atorvastatin Calcium",
      tags: [{ label: "Cardiovascular", color: "gold" }],
      specs: [
        { label: "CAS :", value: "134523-03-8" },
        { label: "Purity:", value: "98.5% min" },
        { label: "Pharmacopoeia:", value: "BP / USP / EP" },
      ],
      featured: false,
    },
    {
      name: "Imatinib Mesylate",
      tags: [
        { label: "Oncology", color: "gold" },
        { label: "WHO-GMP", color: "blue" },
      ],
      specs: [
        { label: "CAS No :", value: "220127-57-1" },
        { label: "Pack Size:", value: "5 kg HDPE Drum" },
      ],
      featured: false,
    },
    {
      name: "Cefixime",
      tags: [
        { label: "Antibiotic APIs", color: "gold" },
        { label: "WHO-GMP", color: "blue" },
        { label: "Available", color: "green" },
      ],
      specs: [
        { label: "CAS No :", value: "79350-37-1" },
        { label: "Pack Size:", value: "25 kg HDPE Drum" },
      ],
      featured: false,
    },
    {
      name: "Azithromycin",
      tags: [
        { label: "Antibiotic APIs", color: "gold" },
        { label: "WHO-GMP", color: "blue" },
        { label: "Available", color: "green" },
      ],
      specs: [
        { label: "CAS No :", value: "83905-01-5" },
        { label: "Pack Size:", value: "25 kg HDPE Drum" },
      ],
      featured: false,
    },
  ],
  cta: { label: "View Complete Product Catalogue", href: "/products" },
} as const;

export const fxWhyUs = {
  eyebrow: "Why Us",
  titleTop: "Why Importers Choose Novo",
  titleBottom: "Bharat Global Export",
  image: "/figma/img/whyus-photo.png",
  bullets: [
    "We disclose GMP certificates and audit reports.",
    "Every batch tested and verified before shipment. Retest certificates available.",
    "Direct manufacturer pricing — no middlemen markups.",
    "Complete dossier support: COA, DMF, MSDS, REACH, TGA, Pharmacopoeia certificates.",
    "From 1 kg research samples to 1000+ kg bulk commercial orders.",
    "Dedicated export manager. WhatsApp / Email support within 24 hours.",
  ],
} as const;

export const fxFootprint = {
  eyebrow: "Global Footprint",
  titleTop: "Serving Pharmaceutical",
  titleBottom: "Markets Worldwide",
  countries: [
    { name: "Nigeria", flag: "/figma/flags/nigeria.svg" },
    { name: "Kenya", flag: "/figma/flags/kenya.svg" },
    { name: "Vietnam", flag: "/figma/flags/vietnam.svg" },
    { name: "Philippines", flag: "/figma/flags/philippines.svg" },
    { name: "Mauritius", flag: "/figma/flags/mauritius.svg" },
    { name: "Ghana", flag: "/figma/flags/ghana.svg" },
    { name: "Chile", flag: "/figma/flags/chile.svg" },
    { name: "Ukraine", flag: "/figma/flags/ukraine.svg" },
    { name: "Colombia", flag: "/figma/flags/colombia.svg" },
    { name: "Egypt", flag: "/figma/flags/egypt.svg" },
    { name: "Sri Lanka", flag: "/figma/flags/srilanka.svg" },
    { name: "Australia", flag: "/figma/flags/australia.svg" },
    { name: "Germany", flag: "/figma/flags/germany.svg" },
    {
      name: "Netherlands",
      flag: "/figma/flags/netherlands.svg",
      note: "(In Progress)",
    },
  ],
} as const;

export const fxCompliance = {
  eyebrow: "Compliance",
  title: "Certifications & Compliance",
  // 8 cert cards, each with a real logo + description (verbatim from Figma).
  // NOTE: a couple of Figma entries look like placeholders — "TAG" (likely TGA)
  // reuses the EU-GMP description, and "COFA / ISP" pairs a Coface logo with a
  // Chile ANAMED description. Left verbatim; flag to client for correct copy.
  items: [
    {
      name: "WHO-GMP",
      desc: "World Health Organization — Good Manufacturing Practice",
      logo: "/figma/certs/who.svg",
    },
    {
      name: "USFDA",
      desc: "US Food & Drug Administration — Manufacturer Approved",
      logo: "/figma/certs/usfda.svg",
    },
    {
      name: "EU-GMP",
      desc: "European Union Good Manufacturing Practice",
      logo: "/figma/certs/eu-gmp.png",
    },
    {
      name: "TAG",
      desc: "European Union Good Manufacturing Practice",
      logo: "/figma/certs/tga.svg",
    },
    {
      name: "COFA / ISP",
      desc: "Chile ANAMED — Regulatory Approval",
      logo: "/figma/certs/coface.svg",
    },
    {
      name: "ISO 9001:2015",
      desc: "Quality Management System",
      logo: "/figma/certs/iso9001.svg",
    },
    {
      name: "Pharmacopoeia",
      desc: "BP · USP · IP · EP · JP standards",
      logo: "/figma/certs/pharmacopoeia.png",
    },
    {
      name: "REACH",
      desc: "European Chemicals Compliance",
      logo: "/figma/certs/reach.svg",
    },
  ],
} as const;

export const fxCta = {
  eyebrow: "Start Business",
  titleLines: [
    "Ready to Source APIs from",
    "India's Most Trusted",
    "Export Partner?",
  ],
  body: "Premium bulk API exports backed by GMP-certified India's leading manufacturers — delivered to 20+ countries.",
  primary: { label: "Send Your Requirement", href: "/contact" },
  secondary: {
    label: "Download Product Catalogue",
    href: "/catalogue/NovoBharat.pdf",
  },
  image: "/figma/img/start-cta.png",
} as const;

export const BrandLogo = "/figma/img/brand-ondark.png";

// Header nav — 5 items in the updated Figma (Contact Us is the button, not a link).
export const fxNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Certifications", href: "/certifications" },
] as const;

export const fxFooter = {
  logo: "/figma/img/brand-ondark.png",
  tagline:
    "Supplying the World with India's Finest Active Pharmaceutical Ingredients",
  blurb:
    "India-based pharmaceutical API export company supplying GMP-certified bulk Active Pharmaceutical Ingredients to regulated and emerging markets worldwide.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/products" },
    { label: "Why Us", href: "/why-us" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact Us", href: "/contact" },
  ],
  phone: "+91 98988 49899",
  phoneHref: "tel:+919898849899",
  email: "info@novobharat.com",
  email2: "novobharat@gmail.com",
  address:
    "219, Spire 2, Near Shital Park Chowk,\n150 ft Ring Road, Rajkot - 360007",
  social: [
    { Icon: LinkedInIcon, label: "LinkedIn", href: "#" },
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      href: "https://wa.me/919898849899",
    },
    { Icon: TwitterIcon, label: "Twitter", href: "#" },
    { Icon: FacebookIcon, label: "Facebook", href: "#" },
  ],
  wordmark: "Novo Bharat",
} as const;
