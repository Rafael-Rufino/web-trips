import React from "react";

interface TitleSectionProps {
  title: string;
}

const TitleSection = ({ title }: TitleSectionProps) => {
  return (
    <div className="flex items-center gap-2 py-6">
      <div className="w-full h-[1px] bg-lighterGray" />
      <h2 className="font-medium text-primaryGray whitespace-nowrap px-5">
        {title}
      </h2>
      <div className="w-full h-[1px] bg-lighterGray" />
    </div>
  );
};

export default TitleSection;
