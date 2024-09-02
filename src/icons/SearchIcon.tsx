const SearchIcon = ({ fill, strokeColor, className }: { fill?: boolean; strokeColor?: string; className?: string }) => {
  return (
    <svg width="19" height="18" viewBox="0 0 19 18" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6.67006 12.7552C9.90645 12.7552 12.5301 10.1315 12.5301 6.89516C12.5301 3.65877 9.90645 1.03516 6.67006 1.03516C3.43367 1.03516 0.810059 3.65877 0.810059 6.89516C0.810059 10.1315 3.43367 12.7552 6.67006 12.7552Z"
        stroke={strokeColor ? strokeColor : "#919191"}
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path
        d="M6.67006 12.7552C9.90645 12.7552 12.5301 10.1315 12.5301 6.89516C12.5301 3.65877 9.90645 1.03516 6.67006 1.03516C3.43367 1.03516 0.810059 3.65877 0.810059 6.89516C0.810059 10.1315 3.43367 12.7552 6.67006 12.7552Z"
        stroke={strokeColor ? strokeColor : "#919191"}
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path
        d="M11.23 11.085L17.52 16.965"
        stroke={strokeColor ? strokeColor : "#919191"}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
