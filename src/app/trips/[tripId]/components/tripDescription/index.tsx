import React from "react";
interface TripDescriptionProps {
  description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col mt-4">
      <h1 className="pb-2  font-semibold text-primaryDark ">Sobre a Viagem</h1>
      <p className="text-xs leading-5 text-primaryDark">{description}</p>
    </div>
  );
};

export default TripDescription;
