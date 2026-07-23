import React from "react";

interface LinerChartIconProps {
  className?: string;
}

const LinerChartIcon: React.FC<LinerChartIconProps> = ({ className }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M52.5 52.5H25C16.7504 52.5 12.6256 52.5 10.0628 49.9372C7.5 47.3742 7.5 43.2495 7.5 35V7.5"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44.262 23.3333L37.0778 34.9612C36.0308 36.6557 34.8422 39.215 32.6872 38.836C30.1527 38.39 28.9355 34.6122 26.7565 33.3612C24.9821 32.3427 23.6993 33.5702 22.6619 35M52.5 10L47.8662 17.5M12.5 50L18.8158 40.6668"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinerChartIcon;
