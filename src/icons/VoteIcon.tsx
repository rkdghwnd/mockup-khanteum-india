const VoteIcon = ({ fill }: { fill?: boolean }) => {
  return (
    <svg width="39" height="35" viewBox="0 0 39 35" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2035_13158)">
        <path d="M29 10C30.6569 10 32 8.65685 32 7C32 5.34315 30.6569 4 29 4C27.3431 4 26 5.34315 26 7C26 8.65685 27.3431 10 29 10Z" fill="#464646" />
        <path
          d="M30.3388 13.179L20.3965 6.44442C19.2485 5.66821 17.6718 5.93434 16.8681 7.04321L7.34685 20.1575C6.5432 21.2664 6.81873 22.7893 7.9668 23.5655L8.49491 23.9203H25.6241L30.9511 16.5795C31.7547 15.4707 31.4792 13.9478 30.3311 13.1716L30.3388 13.179ZM25.1419 14.2287L19.1107 21.0077C18.9806 21.1481 18.8046 21.2368 18.6056 21.2442C18.5979 21.2442 18.5902 21.2442 18.5826 21.2442C18.3989 21.2442 18.2229 21.1703 18.0928 21.0446L14.2046 17.2892C13.9291 17.0231 13.9291 16.6017 14.2046 16.3356C14.4802 16.0695 14.9164 16.0695 15.192 16.3356L18.5443 19.5735L24.0857 13.349C24.3382 13.0681 24.7822 13.0311 25.073 13.2751C25.3638 13.519 25.4021 13.9404 25.1495 14.2287H25.1419Z"
          fill="#464646"
        />
        <path
          d="M31.1274 24.5928H7.00264C6.44392 24.5928 6 25.0289 6 25.5612C6 26.0935 6.45157 26.5296 7.00264 26.5296H31.1274C31.6861 26.5296 32.13 26.0935 32.13 25.5612C32.13 25.0289 31.6784 24.5928 31.1274 24.5928Z"
          fill="#464646"
        />
      </g>
      <defs>
        <filter id="filter0_d_2035_13158" x="0" y="0" width="38.1299" height="34.5298" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2035_13158" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2035_13158" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
export default VoteIcon;
