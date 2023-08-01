"use client";
import React from "react";
import Input from "../../../components/input";

import Button from "../../../components/button";
import DatePickerComponent from "../../../components/datePicker";
import CurrencyInput from "../../../components/currencyInput";

const TripSearch = () => {
  return (
    <div className="container mx-auto p-5  bg-search-background  h-[400px]   bg-cover bg-center bg-no-repeat">
      <div className=" flex flex-col h-full  justify-center items-center">
        <h1 className="font-semibold  text-2xl text-primaryDark text-center ">
          Encontrar sua próxima <span className="text-primary">viagem!</span>
        </h1>

        <div className="flex flex-col gap-4 mt-5 lg:flex-row  w-full">
          <div className="flex flex-col lg:flex-row  gap-4 w-full">
            <Input placeholder="Onde Você quer ir?" />
            <DatePickerComponent
              placeholderText="Data de Ida"
              onChange={() => {}}
              className="w-full"
            />
            <CurrencyInput placeholder="Orçamento" />
          </div>
          <Button className="lg:w-[25%]">Buscar</Button>
        </div>
      </div>
    </div>
  );
};

export default TripSearch;
