const AnnounceIcon = ({ fill }: { fill?: boolean }) => {
  return (
    <svg width="36" height="33" viewBox="0 0 36 33" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2035_13196)">
        <path
          d="M29.4329 9.80421L28.3675 9.49708C28.3675 9.18994 28.3675 9.00713 28.3675 9.00713V5.87729C28.3675 4.78039 27.5015 3.9248 26.5052 4.00524L22.4662 5.46047L21.2782 5.64329L12.8707 6.82794C13.2846 7.47877 13.5298 8.23929 13.5298 9.051C13.5298 11.4276 11.5142 13.3509 9.02333 13.3509C8.29523 13.3509 7.60546 13.1827 7 12.8902V16.3856C7 17.2412 7.68211 17.9506 8.57881 18.0164L10.5025 18.2869V24.4589C10.5025 24.7587 10.7554 25 11.0696 25H13.5222C13.8364 25 14.0893 24.7587 14.0893 24.4589V18.7915L21.2782 19.808L22.4662 20.1371L26.5052 21.5923C27.5092 21.68 28.3675 20.8171 28.3675 19.7275V16.5977C28.3675 16.5977 28.3599 16.4222 28.3522 16.1078L29.4329 15.7933C29.7701 15.6982 30 15.3984 30 15.0694V10.5282C30 10.1918 29.7701 9.89928 29.4329 9.80421Z"
          fill="#464646"
        />
        <path
          d="M9.49134 11.5595C10.9066 11.5595 12.054 10.4313 12.054 9.03953C12.054 7.64777 10.9066 6.51953 9.49134 6.51953C8.07604 6.51953 6.92871 7.64777 6.92871 9.03953C6.92871 10.4313 8.07604 11.5595 9.49134 11.5595Z"
          fill="#464646"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2035_13196"
          x="0.928711"
          y="0"
          width="35.0713"
          height="33"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_13196" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2035_13196" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
export default AnnounceIcon;
