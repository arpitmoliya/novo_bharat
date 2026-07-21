import React from "react";

interface CircleCheckMarkIconProps {
  className?: string;
}

const CircleCheckMarkIcon: React.FC<CircleCheckMarkIconProps> = ({
  className,
}) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_117_1653)">
        <path
          d="M14 2.33203C20.4433 2.33204 25.667 7.55571 25.667 13.999C25.6669 20.4422 20.4432 25.666 14 25.666C7.5567 25.666 2.33305 20.4423 2.33301 13.999C2.33301 7.5557 7.55667 2.33203 14 2.33203ZM19.1729 9.94629C18.8675 9.66664 18.3931 9.68693 18.1133 9.99219L12.2256 16.4141L9.86328 14.0518C9.57042 13.7592 9.09554 13.7591 8.80273 14.0518C8.5101 14.3446 8.51021 14.8194 8.80273 15.1123L11.7197 18.0293C11.8642 18.1737 12.0614 18.2533 12.2656 18.249C12.4701 18.2446 12.6645 18.1566 12.8027 18.0059L19.2188 11.0059C19.4986 10.7005 19.4782 10.2262 19.1729 9.94629Z"
          fill="url(#paint0_linear_117_1653)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_117_1653"
          x1="14"
          y1="2.33228"
          x2="14"
          y2="25.6656"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <clipPath id="clip0_117_1653">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircleCheckMarkIcon;
