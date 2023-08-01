import React from "react";
import Image from "next/image";

import { Trip } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px]  w-full">
        <Image
          src={trip?.coverImage!}
          alt={trip?.name!}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex items-start justify-start flex-col">
        <h1 className="tetx-sm text-primaryDark font-medium mt-2">
          {trip?.name}
        </h1>
        <div className="flex items-center gap-2 my-1">
          <ReactCountryFlag countryCode={trip?.countryCode!} svg />
          <span className="text-xs text-primaryGray">{trip?.location}</span>
        </div>

        <p className="text-xs text-primaryGray items-center">
          <span className="text-primary font-medium">
            R$
            {trip?.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
