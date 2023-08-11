"use client";

import { Prisma, TripReservation } from "@prisma/client";

import { useEffect, useState, Fragment } from "react";
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

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      );

      const responseData = await response.json();

      setReservations(responseData);
    };

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
