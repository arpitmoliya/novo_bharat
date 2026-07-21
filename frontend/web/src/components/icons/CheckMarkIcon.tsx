import React from "react";

interface CheckMarkIconProps {
  className?: string;
}

const CheckMarkIcon: React.FC<CheckMarkIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <path
        d="M79.1271 79.1663H79.1667M79.1271 79.1663C76.5325 81.7393 71.8305 81.0984 68.533 81.0984C64.4855 81.0984 62.5363 81.8901 59.6475 84.7788C57.188 87.2388 53.8905 91.6663 50 91.6663C46.1096 91.6663 42.8121 87.2388 40.3524 84.7788C37.4637 81.8901 35.5146 81.0984 31.467 81.0984C28.1695 81.0984 23.4675 81.7393 20.8729 79.1663C18.2576 76.573 18.9012 71.8513 18.9012 68.5326C18.9012 64.3388 17.984 62.4105 14.9975 59.4238C10.5548 54.9813 8.33346 52.7597 8.33337 49.9997C8.33342 47.2393 10.5547 45.018 14.9973 40.5754C17.6634 37.9093 18.9012 35.2675 18.9012 31.4666C18.9012 28.1691 18.2604 23.4669 20.8334 20.8723C23.4268 18.2571 28.1484 18.9008 31.467 18.9008C35.2678 18.9008 37.9097 17.663 40.5757 14.997C45.0184 10.5543 47.2396 8.33301 50 8.33301C52.7605 8.33301 54.9817 10.5543 59.4242 14.997C62.0896 17.6625 64.7313 18.9008 68.533 18.9008C71.8305 18.9008 76.533 18.26 79.1275 20.833C81.7425 23.4265 81.0988 28.148 81.0988 31.4666C81.0988 35.6604 82.0163 37.5887 85.0025 40.5754C89.4455 45.018 91.6667 47.2393 91.6667 49.9997C91.6667 52.7597 89.4455 54.9813 85.0025 59.4238C82.0159 62.4105 81.0988 64.3388 81.0988 68.5326C81.0988 71.8513 81.7425 76.573 79.1271 79.1663Z"
        stroke="url(#paint0_linear_117_1505)"
        strokeWidth="3"
      />
      <path
        d="M37.5 53.7201L45 60.4163L62.5 39.583"
        stroke="url(#paint1_linear_117_1505)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_1505"
          x1="50"
          y1="8.33301"
          x2="50"
          y2="91.6664"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_1505"
          x1="50"
          y1="39.583"
          x2="50"
          y2="60.4163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CheckMarkIcon;
