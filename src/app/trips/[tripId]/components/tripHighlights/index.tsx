import Image from "next/image";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col mt-4">
      <h1 className="pb-2  font-semibold text-primaryDark ">Destaques</h1>
      <div className="flex flex-wrap gap-y-3">
        {highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 w-1/2">
            <Image
              src="/check-icon.png"
              width={15}
              height={15}
              alt={highlight}
              className="items-start"
            />
            <span className="text-primaryGray text-xs">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
