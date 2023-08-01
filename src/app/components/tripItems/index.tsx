import CountryFlag from "@/components/reactCountryFlag";
import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TripItemsProps {
  trip: Trip;
}

const TripItems = ({ trip }: TripItemsProps) => {
  return (
    <Link
      href={`/trips/${trip.id}`}
      className="cursor-pointer hover:shadow-xl hover:opacity-95 hover:transition-all duration-500"
    >
      <div className="flex flex-col shadow-lg shadow-primaryLight p-2  ">
        <div className="relative h-[280px] w-[280px]">
          <Image
            src={trip.coverImage}
            alt={trip.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-start justify-start flex-col">
          <h1 className="tetx-sm text-primaryDark font-medium mt-2">
            {trip.name}
          </h1>
          <CountryFlag trip={trip} />

          <p className="text-xs text-primaryGray items-center">
            <span className="text-primary font-medium">
              R$
              {trip.pricePerDay.toString()}
            </span>{" "}
            por dia
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripItems;
