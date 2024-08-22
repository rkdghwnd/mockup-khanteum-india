const ProfileIcon = ({ fill, className }: { fill?: boolean; className?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="9.5" stroke="#919191" />
      <circle cx="10" cy="7" r="3.5" stroke="#919191" fill={fill ? "#909090" : "none"} />
      <mask id="mask0_157_67253" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="9.5" fill="#D9D9D9" stroke="#919191" />
      </mask>
      <g mask="url(#mask0_157_67253)" fill={fill ? "#909090" : "none"}>
        <path
          d="M21.5 22C21.5 27.1652 16.4405 31.5 10 31.5C3.5595 31.5 -1.5 27.1652 -1.5 22C-1.5 16.8348 3.5595 12.5 10 12.5C16.4405 12.5 21.5 16.8348 21.5 22Z"
          stroke="#919191"
        />
      </g>
    </svg>
  );
};

export default ProfileIcon;
