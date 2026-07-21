type FacebookIconProps = { className?: string };

const FacebookIcon = ({ className }: FacebookIconProps) => (
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
      d="M18.5 17.5h3.1l.5-3.2h-3.6v-1.7c0-.9.3-1.6 1.6-1.6H22V8.2c-.4-.05-1.5-.15-2.9-.15-2.9 0-4.8 1.75-4.8 4.95v2.3H11.5v3.2h2.8V26h3.5V17.5h.7Z"
      fill="url(#paint0_facebook_icon)"
    />
    <defs>
      <linearGradient
        id="paint0_facebook_icon"
        x1="16"
        y1="8"
        x2="16"
        y2="26"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#37DEFC" />
        <stop offset="1" stopColor="#22A3F7" />
      </linearGradient>
    </defs>
  </svg>
);

export default FacebookIcon;
