import Button from "@/components/button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="flex flex-col mt-4">
      <h2 className="mb-5  font-semibold text-primaryDark ">Localização</h2>
      <div className="relative h-[280px] w-full">
        <Image
          src={isMobile ? "/map-mobile.png" : "/map-desktop.png"}
          fill
          alt={location}
          className="object-cover rounded-lg shadow-md"
        />
      </div>
      <h3 className="text-sm font-semibold mt-3 text-primaryDark">
        {location}
      </h3>

      <p className="mt-3 text-xs leading-5 text-primaryDark">
        {locationDescription}
      </p>

      <Button variant="outlined" className="mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
