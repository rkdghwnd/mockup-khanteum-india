const SideProfileIcon = ({ fill }: { fill?: boolean }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_2035_12898" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
        <rect width="40" height="40" fill="white" />
      </mask>
      <g mask="url(#mask0_2035_12898)">
        <g filter="url(#filter0_d_2035_12898)">
          <path
            d="M19.9214 16.5408C22.7488 16.5408 25.041 14.1812 25.041 11.2704C25.041 8.35964 22.7488 6 19.9214 6C17.0939 6 14.8018 8.35964 14.8018 11.2704C14.8018 14.1812 17.0939 16.5408 19.9214 16.5408Z"
            fill="#464646"
          />
          <path
            d="M31.1345 28.0618L30.5369 22.2142C30.1091 19.3891 28.405 17.1185 26.155 16.0856C25.5649 15.8122 24.8936 16.0097 24.4362 16.5033C23.2706 17.764 21.6846 18.5386 19.9289 18.5386C18.1732 18.5386 16.624 17.7792 15.4584 16.5413C14.9937 16.0477 14.3076 15.8502 13.7175 16.1388C11.5265 17.202 9.8741 19.4423 9.46099 22.2142L8.86345 28.0618C8.39871 31.1678 10.538 34.0005 13.356 34.0005H26.6419C29.4599 34.0005 31.6066 31.1678 31.1345 28.0618Z"
            fill="#464646"
          />
        </g>
      </g>
      <defs>
        <filter id="filter0_d_2035_12898" x="2.7998" y="2" width="34.3999" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_12898" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2035_12898" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
export default SideProfileIcon;
