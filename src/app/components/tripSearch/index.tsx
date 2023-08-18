"use client";
import React from "react";
import Input from "../../../components/input";

import Button from "../../../components/button";
import DatePicker from "../../../components/datePicker";
import CurrencyInput from "../../../components/currencyInput";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface TripSearchProps {
  text: string;
  startDate: Date | null;
  budget: string;
}

const TripSearch = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchProps>();

  const onSubmit = (data: TripSearchProps) => {
    router.push(
      `/trips/search?text=${data.text}&startDate=${data.startDate?.toDateString}&budget=${data.budget}`
    );
  };
  return (
    <div className="container mx-auto p-5  bg-search-background  h-[400px]   bg-cover bg-center bg-no-repeat">
      <div className=" flex flex-col h-full  justify-center items-center">
        <h1 className="font-semibold  text-2xl text-primaryDark text-center ">
          Encontrar sua próxima <span className="text-primary">viagem!</span>
        </h1>

        <div className="flex flex-col gap-4 mt-5 lg:flex-row  w-full">
          <div className="flex flex-col lg:flex-row  gap-4 w-full">
            <Input
              placeholder="Onde Você quer ir?"
              error={!!errors.text}
              errorMessage={errors.text?.message}
              {...register("text", {
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Data final"
                  onChange={field.onChange}
                  selected={field.value}
                  className="w-full"
                  minDate={new Date()}
                />
              )}
            />
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  placeholder="Orçamento"
                  className="w-full"
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            onClick={() => handleSubmit(onSubmit)()}
            className="lg:w-[25%]"
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripSearch;
