import { prisma } from "@/lib/prisma";

import React from "react";

import TripHeader from "./components/tripHeader";
import TripReservation from "./components/tripReservation";
import TripDescription from "./components/tripDescription";
import TripHighlights from "./components/tripHighlights";
import TripLocation from "./components/tripLocation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  return (
    <div className="container mx-auto mb-12 p-5">
      <h1 className="mb-6">Detalhes da viagem</h1>
      <TripHeader trip={trip!} />
      <TripReservation
        tripId={trip?.id!}
        pricePerDay={trip?.pricePerDay as any}
        tripEndDate={trip?.endDate!}
        tripStartDate={trip?.startDate!}
        maxGuests={trip?.maxGuests!}
      />
      <TripDescription description={trip?.description!} />
      <TripHighlights highlights={trip?.highlights!} />
      <TripLocation
        locationDescription={trip?.locationDescription!}
        location={trip?.location!}
      />
    </div>
  );
};

export default TripDetails;
