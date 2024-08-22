const BookmarkIcon = ({ fill, className }: { fill?: boolean; className?: string }) => {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg" className={className}>
      <g filter="url(#filter0_d_2035_13024)">
        <path
          d="M6 5C6 4.44772 6.44772 4 7 4H23C23.5523 4 24 4.44772 24 5V24.3473C24 25.099 23.2018 25.5819 22.536 25.2331L15.464 21.5288C15.1734 21.3765 14.8266 21.3765 14.536 21.5288L7.46401 25.2331C6.79817 25.5819 6 25.099 6 24.3473V5Z"
          fill="#464646"
        />
      </g>
      <defs>
        <filter id="filter0_d_2035_13024" x="0" y="0" width="30" height="33.3486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_13024" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2035_13024" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default BookmarkIcon;
