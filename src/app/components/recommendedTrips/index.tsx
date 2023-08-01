import React from "react";
import TitleSection from "@/components/titleSection";

import { Trip } from "@prisma/client";
import TripItems from "../tripItems";
import { prisma } from "@/lib/prisma";

async function getTrips() {
  const trips = await prisma.trip.findMany({});

  return trips;
}

const RecommendedTrips = async () => {
  //const data = await getTrips();
  const tripsData = await fetch("http://localhost:3000/trips", {
    next: {
      revalidate: 60 * 60 * 60,
    },
  }).then((res) => res.json());
  return (
    <div className="container mx-auto p-5">
      <TitleSection title="Destinos recomendadas" />

      <div className="flex justify-center  items-center  gap-6 mt-5 flex-wrap">
        {tripsData.map((trip: Trip) => (
          <TripItems key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
