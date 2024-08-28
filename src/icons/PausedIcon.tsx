const PausedIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      color="white"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
    </svg>
  );
};

export default PausedIcon;
