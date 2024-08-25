const CirclePlusIcon = ({ fill, className }: { fill?: boolean; className?: string }) => {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill={fill ? "#909090" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4498 20.8801C16.9064 20.8801 21.3298 16.4567 21.3298 11.0001C21.3298 5.54354 16.9064 1.12012 11.4498 1.12012C5.99326 1.12012 1.56982 5.54354 1.56982 11.0001C1.56982 16.4567 5.99326 20.8801 11.4498 20.8801Z"
        stroke="#919191"
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path d="M11.4497 6.07031V15.9203" stroke={fill ? "#fff" : "#919191"} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M16.3798 11H6.52979" stroke={fill ? "#fff" : "#919191"} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
};

export default CirclePlusIcon;
