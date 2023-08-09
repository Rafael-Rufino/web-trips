"use client";

import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CountryFlag from "@/components/reactCountryFlag";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { status, data } = useSession();

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

      const res = await response.json();

      if (res?.error) {
        return router.push("/");
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    fechTrip();
  }, [status, searchParams, params, router]);

  if (!trip) return null;

  const handleBuyClick = async () => {
    const res = await fetch("http://localhost:3000/api/trips/reservation", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          userId: (data?.user as any)?.id!,
          totalPaid: totalPrice,
        })
      ),
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao realizar a reserva", {
        position: "top-center",
      });
    }

    router.push("/");

    toast.success("Reserva realizada com sucesso", {
      position: "top-center",
    });
  };
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = Number(searchParams.get("guests"));

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

        <div className="flex justify-between">
          <p className="font-medium text-primaryDark">Total:</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDark">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {"-"}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{guests} hóspedes</p>
        </div>
        <Button onClick={handleBuyClick} className="mt-5">
          Finalizar comprar
        </Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
