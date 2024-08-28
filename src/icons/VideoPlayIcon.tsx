const VideoPlayIcon = ({ className }: { className?: string }) => {
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
      <path d="M8 5v14l11-7z"></path>
    </svg>
  );
};

export default VideoPlayIcon;
