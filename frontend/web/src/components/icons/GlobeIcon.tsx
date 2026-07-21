import React from "react";

interface GlobeIconProps {
  className?: string;
}

const GlobeIcon: React.FC<GlobeIconProps> = ({ className }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 91.6664C73.0119 91.6664 91.6667 73.0115 91.6667 49.9997C91.6667 26.9878 73.0119 8.33301 50 8.33301C26.9882 8.33301 8.33337 26.9878 8.33337 49.9997C8.33337 73.0115 26.9882 91.6664 50 91.6664Z"
        stroke="url(#paint0_linear_117_1523)"
        strokeWidth="3"
      />
      <path
        d="M33.3334 49.9997C33.3334 74.9997 50 91.6663 50 91.6663C50 91.6663 66.6667 74.9997 66.6667 49.9997C66.6667 24.9997 50 8.33301 50 8.33301C50 8.33301 33.3334 24.9997 33.3334 49.9997Z"
        stroke="url(#paint1_linear_117_1523)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M87.5 62.5H12.5"
        stroke="url(#paint2_linear_117_1523)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M87.5 37.5H12.5"
        stroke="url(#paint3_linear_117_1523)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_1523"
          x1="50"
          y1="8.33301"
          x2="50"
          y2="91.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_1523"
          x1="50"
          y1="8.33301"
          x2="50"
          y2="91.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_117_1523"
          x1="50"
          y1="62.5"
          x2="50"
          y2="63.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_117_1523"
          x1="50"
          y1="37.5"
          x2="50"
          y2="38.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GlobeIcon;
