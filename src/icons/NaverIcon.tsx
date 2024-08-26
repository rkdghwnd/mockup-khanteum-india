const NaverIcon = ({ fill, className }: { fill?: boolean; className?: string }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill={fill ? "#03C75A" : "#464646"} xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 0H0V24H24V0ZM10.1053 5.05289H5.05266V18.9476H10.1053V12.6952L13.8947 18.9478V11.6138L10.1053 5.05312V5.05289ZM18.9477 5.05304H13.8951V18.9478H18.9477V5.05304Z"
      />
    </svg>
  );
};

export default NaverIcon;
