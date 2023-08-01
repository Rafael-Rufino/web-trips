"use client";

import CountryFlag from "@/components/reactCountryFlag";
import { Trip } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Confirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fechTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });
      const { trip } = await response.json();
      setTrip(trip);
    };
    fechTrip();
  }, [trip, params.tripId, searchParams]);

  if (!trip) return null;
  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDark">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border-lighterGray border-solid shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-solid border-lighterGray">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip?.coverImage}
              fill
              className="object-cover rounded-lg"
              alt={trip.name}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primary font-semibold">{trip.name}</h2>
            <CountryFlag trip={trip} />
          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDark mt-3">
          Informações sobre o preço
        </h3>
      </div>
    </div>
  );
};

export default Confirmation;
