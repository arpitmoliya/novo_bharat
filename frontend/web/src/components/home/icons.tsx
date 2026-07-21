/*
 * Thin-line SVG icon set for the home sections. Paths carry no stroke/fill
 * colour so the surrounding CSS controls colour per context (gold trust badges,
 * accent-blue feature cards, gold checkmarks, etc.).
 */
import type { JSX } from "react";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const CertificateIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
  </svg>
);

export const GlobeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
);

export const MoleculeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="18" r="2.4" />
    <circle cx="19" cy="18" r="2.4" />
    <path d="M12 7.4 6.5 16M12 7.4 17.5 16M7 18h10" />
  </svg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 11.5 2 2 4-4" />
  </svg>
);

export const VerifiedIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="m12 2 2.4 1.8 3 .2.2 3L19.4 9.6 21 12l-1.6 2.4.2 3-3 .2L14.4 19 12 20.6 9.6 19l-3-.2.2-3L5 14.4 3.4 12 5 9.6l-.2-3 3-.2L9.6 3.8Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const DocsIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="m5 12 5 5 9-11" />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.19 1.06 0 11.25l.75.75L10.94 1.81v7.05H12V0H3.14v1.06h7.05Z"
    />
  </svg>
);

export const TargetIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" />
  </svg>
);

export const EyeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

export const StarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6-4.5-4.2 6.1-.7Z" />
  </svg>
);

export const FactoryIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M3 21V9l6 4V9l6 4V5h6v16Z" />
    <path d="M7 21v-4M12 21v-4M17 21v-4" />
  </svg>
);

export const BoxIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const ChatIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
  </svg>
);

export const BeakerIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
    <path d="M7.5 14h9" />
  </svg>
);

export const LeafIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
    <path d="M8 17c4-4 6-6 9-7" />
  </svg>
);

export const ICON_MAP: Record<string, (p: IconProps) => JSX.Element> = {
  certificate: CertificateIcon,
  globe: GlobeIcon,
  molecule: MoleculeIcon,
  shield: ShieldIcon,
  verified: VerifiedIcon,
  docs: DocsIcon,
  check: CheckIcon,
  target: TargetIcon,
  eye: EyeIcon,
  star: StarIcon,
  factory: FactoryIcon,
  box: BoxIcon,
  clock: ClockIcon,
  chat: ChatIcon,
  beaker: BeakerIcon,
  leaf: LeafIcon,
};
