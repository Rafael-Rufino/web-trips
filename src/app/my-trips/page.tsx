"use client";

import { Prisma } from "@prisma/client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserReservationCard from "./components/userReservationCard";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
    );

    const responseData = await response.json();

    setReservations(responseData);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDark text-xl">Minhas Viagens</h1>

      {reservations?.map((reservation) => (
        <UserReservationCard
          key={reservation.id}
          reservation={reservation}
          fetchReservations={() => ({})}
        />
      ))}
    </div>
  );
};

export default MyTrips;
