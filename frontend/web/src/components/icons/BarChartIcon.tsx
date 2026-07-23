import React from "react";

interface BarChartIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const BarChartIcon: React.FC<BarChartIconProps> = ({ className, ...props }) => {
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
        d="M20 35V42.5"
        stroke="url(#paint0_linear_117_26661)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5 22.5V42.5"
        stroke="url(#paint1_linear_117_26661)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 12.5V42.5"
        stroke="url(#paint2_linear_117_26661)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.5 52.5H25C16.7504 52.5 12.6256 52.5 10.0628 49.9372C7.5 47.3742 7.5 43.2495 7.5 35V7.5"
        stroke="url(#paint3_linear_117_26661)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_26661"
          x1="20.5"
          y1="35"
          x2="20.5"
          y2="42.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_26661"
          x1="33"
          y1="22.5"
          x2="33"
          y2="42.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_117_26661"
          x1="45.5"
          y1="12.5"
          x2="45.5"
          y2="42.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_117_26661"
          x1="30"
          y1="7.5"
          x2="30"
          y2="52.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BarChartIcon;
