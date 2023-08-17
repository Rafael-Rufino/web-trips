"use client";

import { Prisma } from "@prisma/client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import UserReservationCard from "./components/userReservationCard";
import Button from "@/components/button";

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

  const hasReservations = reservations.length > 0;

  return (
    <div className="container mx-auto p-5">
      <h1 className=" font-semibold text-primaryDark text-xl">
        Minhas Viagens
      </h1>
      <div className=" flex flex-col w-full h-full min-h-[500px] justify-center">
        {hasReservations ? (
          reservations?.map((reservation) => (
            <UserReservationCard
              key={reservation.id}
              reservation={reservation}
              fetchReservations={() => ({})}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full ">
            <p className="text-primaryDark text-lg font-medium mt-2">
              Você ainda não possui nenhuma viagem
            </p>

            <Link href="/my-trips">
              <Button className="w-full mt-2">Fazer reserva</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
