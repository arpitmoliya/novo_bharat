import React from "react";

interface DocumentAttachIconProps {
  className?: string;
}

const DocumentAttachIcon: React.FC<DocumentAttachIconProps> = ({
  className,
}) => {
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
        d="M85.4163 43.7497V41.6663C85.4163 25.9528 85.4163 18.0961 80.535 13.2145C75.6534 8.33301 67.7967 8.33301 52.083 8.33301H47.9167C32.2035 8.33301 24.3468 8.33301 19.4653 13.2145C14.5838 18.096 14.5837 25.9527 14.5835 41.666L14.5834 60.4163C14.5833 74.1138 14.5832 80.963 18.3662 85.5726C19.0589 86.4168 19.8328 87.1905 20.6768 87.8834C25.2866 91.6663 32.1354 91.6663 45.833 91.6663"
        stroke="url(#paint0_linear_117_1513)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.25 29.167H68.75"
        stroke="url(#paint1_linear_117_1513)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.25 50H56.25"
        stroke="url(#paint2_linear_117_1513)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M85.4166 83.333V70.833C85.4166 64.8772 79.8204 58.333 72.9166 58.333C66.0129 58.333 60.4166 64.8772 60.4166 70.833V85.4163C60.4166 88.868 63.215 91.6663 66.6666 91.6663C70.1183 91.6663 72.9166 88.868 72.9166 85.4163V70.833"
        stroke="url(#paint3_linear_117_1513)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_1513"
          x1="49.9998"
          y1="8.33301"
          x2="49.9998"
          y2="91.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_1513"
          x1="50"
          y1="29.167"
          x2="50"
          y2="30.167"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_117_1513"
          x1="43.75"
          y1="50"
          x2="43.75"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_117_1513"
          x1="72.9166"
          y1="58.333"
          x2="72.9166"
          y2="91.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DocumentAttachIcon;
