type TwitterIconProps = { className?: string };

const TwitterIcon = ({ className }: TwitterIconProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M25.5 10.2c.01.2.01.4.01.6 0 6.1-4.65 13.15-13.15 13.15A13.05 13.05 0 0 1 5.5 21.8c.27.03.54.05.82.05a9.24 9.24 0 0 0 5.73-1.97 4.62 4.62 0 0 1-4.31-3.2c.28.05.56.08.86.08.41 0 .81-.05 1.19-.16a4.61 4.61 0 0 1-3.7-4.52v-.06c.62.34 1.33.55 2.09.57a4.6 4.6 0 0 1-2.05-3.83c0-.85.23-1.64.63-2.32a13.1 13.1 0 0 0 9.5 4.82 4.6 4.6 0 0 1 7.84-4.2 9.2 9.2 0 0 0 2.92-1.12 4.63 4.63 0 0 1-2.03 2.55 9.2 9.2 0 0 0 2.65-.72 9.9 9.9 0 0 1-2.3 2.38Z"
      fill="url(#paint0_twitter_icon)"
    />
    <defs>
      <linearGradient
        id="paint0_twitter_icon"
        x1="16"
        y1="7"
        x2="16"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#37DEFC" />
        <stop offset="1" stopColor="#22A3F7" />
      </linearGradient>
    </defs>
  </svg>
);

export default TwitterIcon;
