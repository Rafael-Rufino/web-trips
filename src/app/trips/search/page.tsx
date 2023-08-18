"use client";

import TripItems from "@/app/components/tripItems";
import Button from "@/components/button";

import { Trip } from "@prisma/client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Trips = () => {
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const searchParams = useSearchParams();

  const fetchTrips = async () => {
    const response = await fetch(
      `/api/trips/search?text=${
        searchParams.get("text") ?? ""
      }&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
        "budget"
      )}`
    );
    const tripsData = await response.json();
    setTrips(tripsData);
  };

  useEffect(() => {
    fetchTrips();
  }, [searchParams]);

  const hasTrips = trips.length === 0;

  return (
    <div className="container mx-auto p-5 min-h-[400px]">
      {!hasTrips && (
        <>
          <h1 className="font-semibold text-primaryDark text-xl pb-4">
            Viagens Encontradas
          </h1>
          <h2 className="font-medium text-primaryGray text-md pb-5">
            Listamos as melhores viagens para você
          </h2>
        </>
      )}

      <div className="flex gap-8 flex-wrap">
        {trips?.map((trip) => (
          <TripItems key={trip.id} trip={trip} />
        ))}

        {hasTrips && (
          <div className="flex flex-col justify-center items-center w-full ">
            <p className="text-primaryDark text-lg font-medium mt-2">
              Nenhuma viagem encontrada
            </p>

            <Link href="/">
              <Button className="w-full mt-2">
                Refazer a buscar novamente
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
