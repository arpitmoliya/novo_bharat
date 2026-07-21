"use client";

import React, { useId } from "react";

interface CircleXMarkIconProps {
  className?: string;
}

const CircleXMarkIcon: React.FC<CircleXMarkIconProps> = ({ className }) => {
  const uid = useId().replace(/:/g, "");
  const paintId = `paint0_circle_x_${uid}`;
  const clipId = `clip0_circle_x_${uid}`;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M14 2.332C20.443 2.332 25.667 7.556 25.667 14S20.443 25.666 14 25.666 2.333 20.442 2.333 14 7.557 2.332 14 2.332Zm4.243 7.425a.875.875 0 0 0-1.238 0L14 12.762l-3.005-3.005a.875.875 0 1 0-1.238 1.238L12.762 14l-3.005 3.005a.875.875 0 1 0 1.238 1.238L14 15.238l3.005 3.005a.875.875 0 0 0 1.238-1.238L15.238 14l3.005-3.005a.875.875 0 0 0 0-1.238Z"
          fill={`url(#${paintId})`}
        />
      </g>
      <defs>
        <linearGradient
          id={paintId}
          x1="14"
          y1="2.332"
          x2="14"
          y2="25.666"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8A8A" />
          <stop offset="1" stopColor="#E54848" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircleXMarkIcon;
