import React from "react";

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
};

const sizeMap = {
  small: "w-5 h-5",
  medium: "w-8 h-8",
  large: "w-12 h-12",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "#00d4c8",
  className = "",
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-4 border-solid border-t-transparent`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
