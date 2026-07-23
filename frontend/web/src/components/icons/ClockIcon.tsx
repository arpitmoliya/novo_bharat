import React from "react";

interface ClockIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({ className, ...props }) => {
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
        d="M6.25 30C6.25 18.8041 6.25 13.2062 9.7281 9.7281C13.2062 6.25 18.8041 6.25 30 6.25C41.1958 6.25 46.7938 6.25 50.272 9.7281C53.75 13.2062 53.75 18.8041 53.75 30C53.75 41.1958 53.75 46.7938 50.272 50.272C46.7938 53.75 41.1958 53.75 30 53.75C18.8041 53.75 13.2062 53.75 9.7281 50.272C6.25 46.7938 6.25 41.1958 6.25 30Z"
        stroke="url(#paint0_linear_117_26671)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M30.0195 26.27C27.9485 26.27 26.2695 27.949 26.2695 30.02C26.2695 32.091 27.9485 33.77 30.0195 33.77C32.0905 33.77 33.7695 32.091 33.7695 30.02C33.7695 27.949 32.0905 26.27 30.0195 26.27ZM30.0195 26.27V17.4971M37.5368 37.549L32.6653 32.6775"
        stroke="url(#paint1_linear_117_26671)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_26671"
          x1="30"
          y1="6.25"
          x2="30"
          y2="53.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_26671"
          x1="31.9032"
          y1="17.4971"
          x2="31.9032"
          y2="37.549"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ClockIcon;
