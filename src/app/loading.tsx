import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large" | "xlarge";
  label?: string;
  borderColor?: "primary" | "secondary";
}

const Loading = ({
  size = "xlarge",
  label,
  borderColor = "primary",
}: LoadingProps) => {
  const sizes = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-16 w-16",
    xlarge: "h-32 w-32",
  };

  const borderColors = {
    primary: "border-primary",
    secondary: "border-gray-900",
  };
  return (
    <div className={`flex items-center justify-center ${!label && "h-screen"}`}>
      <div className="relative flex justify-center items-center">
        <div
          className={`absolute z-20 flex justify-center items-center animate-spin rounded-full ${sizes[size]} border-t-2 border-b-2 ${borderColors[borderColor]} }`}
        />
        {label && <span className="relative z-10">{label}</span>}
      </div>
    </div>
  );
};

export default Loading;
