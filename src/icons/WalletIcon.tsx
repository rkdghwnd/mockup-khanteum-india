const WalletIcon = ({ fill }: { fill?: boolean }) => {
  return (
    <svg width="38" height="36" viewBox="0 0 38 36" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2035_12948)">
        <path
          d="M20.6613 20.7196V16.6592C20.6613 15.8276 21.3393 15.1534 22.1756 15.1534H30.3498V11.7074C30.3498 11.0931 29.8526 10.5986 29.2348 10.5986H7.98171C7.36393 10.5986 6.8667 11.0931 6.8667 11.7074V26.0909C6.8667 26.7052 7.36393 27.1996 7.98171 27.1996H29.2348C29.8526 27.1996 30.3498 26.7052 30.3498 26.0909V22.2253H22.1756C21.3393 22.2253 20.6613 21.5511 20.6613 20.7196Z"
          fill="#464646"
        />
        <path
          d="M30.3726 15.9023H22.1833C21.7614 15.9023 21.4224 16.2395 21.4224 16.659V20.7193C21.4224 21.1389 21.7614 21.476 22.1833 21.476H30.3726C30.7945 21.476 31.1335 21.1389 31.1335 20.7193V16.659C31.1335 16.2395 30.7945 15.9023 30.3726 15.9023ZM23.901 19.6331C23.3736 19.6331 22.9517 19.2136 22.9517 18.6892C22.9517 18.1648 23.3736 17.7452 23.901 17.7452C24.4284 17.7452 24.8503 18.1648 24.8503 18.6892C24.8503 19.2136 24.4284 19.6331 23.901 19.6331Z"
          fill="#464646"
        />
        <path
          d="M20.7515 6.92802L19.9002 5.56458C19.4557 4.85289 18.5817 4.59069 17.9564 4.98025L10.0835 9.84967H12.7128L20.7515 6.93551V6.92802Z"
          fill="#464646"
        />
        <path
          d="M26.1233 7.14572C25.837 6.35912 25.0384 5.92462 24.3453 6.17933L22.2584 6.93596L14.2197 9.85013H27.1178L26.1233 7.14572Z"
          fill="#464646"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2035_12948"
          x="0.866699"
          y="0.799805"
          width="36.2671"
          height="34.3994"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_12948" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2035_12948" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
export default WalletIcon;
