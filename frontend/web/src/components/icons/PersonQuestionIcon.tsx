import React from "react";

interface PersonQuestionIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const PersonQuestionIcon: React.FC<PersonQuestionIconProps> = ({
  className,
  ...props
}) => {
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
        d="M38.5 18.749H38.375M46.75 18.7494H46.625M38.625 18.749C38.625 18.8871 38.513 18.999 38.375 18.999C38.237 18.999 38.125 18.8871 38.125 18.749C38.125 18.611 38.237 18.499 38.375 18.499C38.513 18.499 38.625 18.611 38.625 18.749ZM46.875 18.7494C46.875 18.8875 46.763 18.9994 46.625 18.9994C46.487 18.9994 46.375 18.8875 46.375 18.7494C46.375 18.6113 46.487 18.4994 46.625 18.4994C46.763 18.4994 46.875 18.6113 46.875 18.7494Z"
        stroke="url(#paint0_linear_117_26679)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.5 31.4167C49.4028 31.4167 55 26.0624 55 19.4584C55 12.8544 49.4028 7.5 42.5 7.5C35.5972 7.5 30 12.8544 30 19.4584C30 22.6314 31.2917 25.5144 33.3985 27.6539C33.8625 28.1249 34.1723 28.7684 34.0473 29.4309C33.841 30.5139 33.3735 31.5242 32.689 32.3662C34.49 32.7012 36.3627 32.3994 37.9688 31.5454C38.5355 31.2439 38.8205 31.0924 39.0208 31.0619C39.221 31.0314 39.508 31.0852 40.0817 31.1929C40.879 31.3427 41.6883 31.4177 42.5 31.4167Z"
        stroke="url(#paint1_linear_117_26679)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 32.5C25 36.6423 21.6421 40 17.5 40C13.3579 40 10 36.6423 10 32.5C10 28.358 13.3579 25 17.5 25C21.6421 25 25 28.358 25 32.5Z"
        stroke="url(#paint2_linear_117_26679)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 52.5C30 45.5965 24.4036 40 17.5 40C10.5964 40 5 45.5965 5 52.5"
        stroke="url(#paint3_linear_117_26679)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_26679"
          x1="42.5"
          y1="18.499"
          x2="42.5"
          y2="18.9994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_117_26679"
          x1="42.5"
          y1="7.5"
          x2="42.5"
          y2="32.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_117_26679"
          x1="17.5"
          y1="25"
          x2="17.5"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37DEFC" />
          <stop offset="1" stopColor="#22A3F7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_117_26679"
          x1="17.5"
          y1="40"
          x2="17.5"
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

export default PersonQuestionIcon;
