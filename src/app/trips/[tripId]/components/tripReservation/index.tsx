"use client";

import React from "react";

import Button from "@/components/button";
import DatePicker from "@/components/datePicker";
import Input from "@/components/input";

import { Controller, useForm } from "react-hook-form";
import { differenceInDays, set } from "date-fns";
import { useRouter } from "next/navigation";

interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}
interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  tripId,
  tripEndDate,
  tripStartDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("http://localhost:3000/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId,
          startDate: data.startDate,
          endDate: data.endDate,
        })
      ),
    });
    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Data de início já reservada",
      });
      return setError("endDate", {
        type: "manual",
        message: "Data final já reservada",
      });
    }
    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data de início inválida",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data final inválida",
      });
    }
    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      } `
    );
    console.log({ res });
  };
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className=" flex flex-col gap-4 mt-5  ">
      <div className="flex  gap-4 w-full">
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Data de início é obrigatória",
            },
          }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Inicio"
              onChange={field.onChange}
              className="w-full"
              error={!!errors?.startDate}
              selected={field.value}
              errorMessage={errors?.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória",
            },
          }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}`,
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        type="number"
      />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between my-4">
          <p className="text-primaryDark font-medium  text-sm">
            Total: R$ 1.000,00
          </p>

          <p className="text-primaryGray font-medium  text-sm">
            {startDate && endDate
              ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1
              : "R$0"}
          </p>
        </div>

        <div className=" mt-3 pb-10 border-b border-b-lighterGray">
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            className=" w-full lg:w-44"
          >
            Reservar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripReservation;
