import React from "react";

interface IndustryIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const IndustryIcon: React.FC<IndustryIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M7.5 52.5C11.25 45 13.75 35 13.75 20H31.25C31.25 35 33.75 45 37.5 52.5"
        stroke="url(#paint0_linear_117_26633)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 10.6624C32.926 6.56987 36.6695 6.56987 39.5955 10.6624C41.3597 13.1737 43.6403 13.0807 45.4475 10.5694C48.3305 6.47687 52.074 6.47687 55 10.5694"
        stroke="url(#paint1_linear_117_26633)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.124 30.1787H41.009C41.361 34.774 40.9748 42.7915 49.2378 52.0505"
        stroke="url(#paint2_linear_117_26633)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 52.5H52.5"
        stroke="url(#paint3_linear_117_26633)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_26633"
          x1="22.5"
          y1="20"
          x2="22.5"
          y2="52.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_26633"
          x1="42.5"
          y1="7.5"
          x2="42.5"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_117_26633"
          x1="40.6809"
          y1="30.1787"
          x2="40.6809"
          y2="52.0505"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_117_26633"
          x1="28.75"
          y1="52.5"
          x2="28.75"
          y2="53.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IndustryIcon;
