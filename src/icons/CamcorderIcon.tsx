const CamcorderIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.27778 0.5H16.6111C17.3139 0.5 17.8889 1.0625 17.8889 1.75V6.125L23 1.125V14.875L17.8889 9.875V14.25C17.8889 14.9375 17.3139 15.5 16.6111 15.5H1.27778C0.575 15.5 0 14.9375 0 14.25V1.75C0 1.0625 0.575 0.5 1.27778 0.5Z"
        fill="#494949"
      ></path>
    </svg>
  );
};

export default CamcorderIcon;
