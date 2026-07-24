/*
 * Inner-page content for the Figma "Novo Bharat Global Export" rebuild
 * (About, Products, Why Us, Certifications, Contact). Copy is transcribed from
 * the previous `nb-` pages and structured for the new `fx-` design system so
 * the inner pages match the pixel-faithful Home rebuild. Assets live under
 * /public/figma/. Icon keys map to the inline SVG set in components/home/icons.tsx.
 */

import TargetIcon from "@/components/icons/TargetIcon";
import LinerChartIcon from "@/components/icons/LinerChartIcon";
import ScanEyeIcon from "@/components/icons/ScanEyeIcon";
import IndustryIcon from "@/components/icons/IndustryIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import PersonQuestionIcon from "@/components/icons/PersonQuestionIcon";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import DocumentAttachIcon from "@/components/icons/DocumentAttachIcon";
import BarChartIcon from "@/components/icons/BarChartIcon";
import {
  BuildingIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ResponseClockIcon,
} from "@/components/icons/ContactDetailIcons";

// Shared CTA shape reused by every inner page (mirrors the Home CTA visual).
export type PageCtaContent = {
  eyebrow: string;
  titleLines: string[];
  body: string;
  primary: { label: string; href: string; download?: boolean };
  secondary?: { label: string; href: string; download?: boolean };
  image: string;
};

// ============================================================ ABOUT
export const aboutPage = {
  hero: {
    eyebrow: "About Us",
    title: "About Novo Bharat Global Export",
    body: "Built on pharma expertise. Driven by the vision of making India's APIs accessible to the world.",
  },
  story: {
    eyebrow: "Our Story",
    title: "India’s Bridge to World-Class APIs",
    image: "/figma/img/cta-photo.png",
    paragraphs: [
      "Novo Bharat Global Export was founded by M.Pharm professionals with over 11+ years of experience in the Indian pharmaceutical industry — working with leading companies in cardiovascular and anti-diabetic therapy segments.",
      "Having witnessed the complexities of pharmaceutical distribution firsthand, we identified a critical gap: quality Indian API manufacturers needed a reliable bridge to global markets. Novo Bharat Global Export was built to be that bridge — combining deep pharmaceutical knowledge, export expertise, and a network of verified GMP-certified manufacturers in India.",
      "Our mission is simple: to deliver pharmaceutical ingredients that meet global quality standards, at competitive prices, backed by comprehensive regulatory documentation support.",
    ],
  },
  mvv: {
    eyebrow: "What Drives Us",
    title: "Mission, Vision & Values",
    cards: [
      {
        icon: TargetIcon,
        title: "Our Mission",
        desc: "To be the most reliable pharmaceutical API export partner for global buyers seeking quality, transparency, and competitive pricing from India.",
      },
      {
        icon: ScanEyeIcon,
        title: "Our Vision",
        desc: "To place Gujarat-manufactured APIs in 50+ countries by 2030, supporting affordable medicine access worldwide.",
      },
      {
        icon: LinerChartIcon,
        title: "Our Values",
        desc: "Integrity in sourcing · Scientific precision · Regulatory compliance · Global partnership mindset.",
      },
    ],
  },
  process: {
    eyebrow: "How We Work",
    title: "Our Sourcing & Export Process",
    steps: [
      {
        title: "Requirement",
        desc: "Buyer sends requirement — molecule, quantity, specs, target country.",
      },
      {
        title: "Sourcing",
        desc: "We source from a verified GMP manufacturer in Gujarat.",
      },
      {
        title: "Documentation",
        desc: "Quality documents compiled — COA, MSDS, DMF, certificates.",
      },
      {
        title: "Pricing",
        desc: "Pricing & proforma invoice sent to the buyer.",
      },
      {
        title: "Delivery",
        desc: "Order confirmed → shipment → export documentation → delivery.",
      },
    ],
  },
  cta: {
    eyebrow: "Start Business",
    titleLines: [
      "Have questions about our",
      "capabilities or sourcing",
      "process?",
    ],
    body: "Let’s talk — our export team responds within 24 business hours.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Explore Our APIs", href: "/products" },
    image: "/figma/img/start-cta.png",
  } satisfies PageCtaContent,
} as const;

// ============================================================ PRODUCTS
export const productsPage = {
  hero: {
    eyebrow: "Product",
    title: "Our Pharmaceutical API Portfolio",
    body: "50+ bulk API molecules · Cardiovascular · Anti-Diabetic · CNS · Antibiotics · GMP-Certified Sources · Global Pharmacopoeia Standards.",
  },
  cta: {
    eyebrow: "Start Business",
    titleLines: ["Can’t find your molecule?"],
    body: "We source 200+ APIs on request. Send us your requirement — we respond within 24 hours.",
    primary: {
      label: "Download PDF Catalogue",
      href: "/catalogue/NovoBharat.pdf",
      download: true,
    },
    secondary: { label: "Send Custom Requirement", href: "/contact" },
    image: "/figma/img/start-cta.png",
  } satisfies PageCtaContent,
} as const;

// ============================================================ WHY US
export const whyUsPage = {
  hero: {
    eyebrow: "Why Us",
    title: "Why Global Buyers Choose Novo Bharat",
    body: "We don't just supply APIs — we deliver confidence, compliance, and consistency.",
  },
  reasons: {
    eyebrow: "Six Reasons",
    titleTop: "Built to Earn Importer Trust",
    titleBottom: "for Global Pharma",
    cards: [
      {
        icon: IndustryIcon,
        title: "Direct Manufacturer Access",
        desc: "We work directly with Gujarat-based GMP manufacturers — cutting out intermediaries and reducing costs by 15–25%.",
      },
      {
        icon: CheckMarkIcon,
        title: "Deep Pharma Expertise",
        desc: "Founded by pharma professionals with 11+ years in cardiovascular & anti-diabetic therapy. We understand your molecular requirements.",
      },
      {
        icon: DocumentAttachIcon,
        title: "Complete Documentation",
        desc: "The full export documentation package — COA, MSDS, DMF, COO, pharmacopoeia certs. You receive everything in one folder.",
      },
      {
        icon: BarChartIcon,
        title: "Flexible Volumes",
        desc: "Research samples from 1 kg, commercial batches up to 1000+ kg. Best pricing at every volume level.",
      },
      {
        icon: ClockIcon,
        title: "Fast Lead Times",
        desc: "Typical lead time of 5–15 business days from order confirmation. Air and sea freight options available.",
      },
      {
        icon: PersonQuestionIcon,
        title: "Direct, Responsive Support",
        desc: "Dedicated export manager. Direct WhatsApp line. No hold music, no waiting — real answers within 24 hours.",
      },
    ],
  },
  compare: {
    eyebrow: "The Difference",
    title: "Novo Bharat vs. a Typical API Broker",
    columns: ["Novo Bharat Global Export", "Typical API Broker"],
    rows: [
      {
        feature: "GMP-Certified Sources",
        ours: "Always verified",
        theirs: "Often unverified",
      },
      {
        feature: "Direct Manufacturer Access",
        ours: "Yes — Gujarat direct",
        theirs: "Multiple middlemen",
      },
      {
        feature: "Full Documentation Package",
        ours: "Included with every order",
        theirs: "Extra charge or incomplete",
      },
      {
        feature: "Minimum Order Quantity",
        ours: "Flexible from 1 kg",
        theirs: "Often 25 kg+ minimums",
      },
      {
        feature: "Response Time",
        ours: "Within 24 hours",
        theirs: "2–5 days typical",
      },
      {
        feature: "Pharma Domain Expertise",
        ours: "11+ years in pharma",
        theirs: "Generic trading",
      },
    ],
  },
  cta: {
    eyebrow: "Start Business",
    titleLines: ["Ready to work with a partner who gets pharma?"],
    body: "Send your requirement today — pricing and availability within 24 hours.",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Browse the Catalogues", href: "/products" },
    image: "/figma/img/start-cta.png",
  } satisfies PageCtaContent,
} as const;

// ============================================================ CERTIFICATIONS
export const certificationsPage = {
  hero: {
    eyebrow: "Compliance",
    title: "Regulatory Compliance & Certifications",
    body: "Every API we export is backed by verified manufacturer certifications, pharmacopoeia-grade quality, and complete documentation.",
  },
  // Reuses the Home compliance card grid + the 8 cert logos in /public/figma/certs.
  certs: {
    eyebrow: "Verified Sources",
    title: "Manufacturer Certifications",
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
        name: "TGA",
        desc: "Therapeutic Goods Administration (Australia)",
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
  },
  docs: {
    eyebrow: "Export Compliance",
    title: "Documents We Provide With Every Shipment",
    items: [
      {
        name: "Certificate of Analysis (COA)",
        desc: "Batch-specific quality results",
      },
      {
        name: "Material Safety Data Sheet (MSDS/SDS)",
        desc: "Safety & handling information",
      },
      { name: "Drug Master File (DMF)", desc: "Regulatory filing document" },
      { name: "Certificate of Origin (COO)", desc: "Country of manufacture" },
      {
        name: "Packing List & Commercial Invoice",
        desc: "Export documentation",
      },
      { name: "Shipping Bill", desc: "Indian customs document" },
      {
        name: "Re-test Certificate",
        desc: "On request, for shelf-life extension",
      },
      {
        name: "Pharmacopoeia Reference Standard Certificate",
        desc: "Conformance to pharmacopoeia grade",
      },
    ],
    lead: "Complete, audit-ready documentation accompanies every consignment. Whether you are clearing customs in a regulated market or filing for product registration, our paperwork is prepared to meet international due-diligence requirements.",
    note: "Country-specific documents and additional regulatory support can be arranged on request — just tell us your target market when you send your enquiry.",
    action: { label: "Request Documentation", href: "/contact" },
  },
  statements: [
    "All APIs exported by Novo Bharat Global Export are manufactured and sourced exclusively from facilities holding valid WHO-GMP, USFDA, or EU-GMP certifications at the time of export.",
    "We maintain a complete documentation trail for every shipment — available for regulatory audits, import clearance, and buyer due-diligence requirements.",
  ],
} as const;

// ============================================================ CONTACT
export const contactPage = {
  hero: {
    eyebrow: "Contact Us",
    title: "Start Your API Sourcing Journey",
    body: "Send us your requirements — molecules, quantity, target market, and delivery timeline. We respond within 24 business hours.",
  },
  form: {
    eyebrow: "Contact Form",
    title: "Send Your Requirement",
  },
  details: {
    title: "Contact Details",
    rows: [
      {
        label: "Company",
        value: "Novo Bharat Global Export",
        icon: BuildingIcon,
      },
      {
        label: "WhatsApp",
        value: "+91 98988 49899",
        href: "https://wa.me/919898849899",
        icon: PhoneIcon,
      },
      {
        label: "Address",
        value:
          "219, Spire 2, Near Shital Park Chowk, 150 ft Ring Road, Rajkot - 360007",
        icon: MapPinIcon,
      },
      {
        label: "Email",
        value: ["info@novobharat.com", "novobharat@gmail.com"],
        href: ["mailto:info@novobharat.com", "mailto:novobharat@gmail.com"],
        icon: MailIcon,
      },
      {
        label: "Response Time",
        value: "Within 24 Business Hours",
        icon: ResponseClockIcon,
      },
    ],
  },
  map: {
    title:
      "Novo Bharat Global Export — Spire 2, 150ft Ring Road, Rajkot 360007",
    src: "https://www.google.com/maps?q=Spire%202%2C%20Near%20Shital%20Park%20Chowk%2C%20150ft%20Ring%20Road%2C%20Rajkot%20360007&output=embed",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What is your minimum order quantity?",
        a: "We offer flexible MOQs starting from 1 kg for research/sample purposes. Commercial orders typically start at 25 kg.",
      },
      {
        q: "Can you provide samples before a bulk order?",
        a: "Yes. We provide samples (500 g to 2 kg) at nominal cost. COA and MSDS are provided with all samples.",
      },
      {
        q: "Which pharmacopoeia standards do you follow?",
        a: "We supply APIs conforming to BP, USP, IP, EP, and JP standards as required by the buyer's target market.",
      },
      {
        q: "How do you ensure API quality?",
        a: "All APIs are sourced from WHO-GMP / USFDA certified manufacturers. We verify batch COA and can arrange third-party testing on request.",
      },
      {
        q: "Do you support regulatory filings in our country?",
        a: "We provide all standard documentation. For country-specific regulatory filings (DMF, etc.), we can recommend regulatory consultants.",
      },
    ],
  },
} as const;
