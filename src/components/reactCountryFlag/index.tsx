import { Trip } from "@prisma/client";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface CountryFlagProps {
  trip: Trip;
}

const CountryFlag = ({ trip }: CountryFlagProps) => {
  return (
    <div className="flex items-center gap-2 my-1">
      <ReactCountryFlag countryCode={trip.countryCode} svg />
      <span className="text-xs text-primaryGray underline">
        {trip.location}
      </span>
    </div>
  );
};

export default CountryFlag;
