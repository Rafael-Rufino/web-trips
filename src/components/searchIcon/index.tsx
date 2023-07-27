/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import React, { ReactElement } from "react";

interface searchProps {
  icon: string;
  text: string;
}

const searchIcon = ({ icon, text }: searchProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image src={icon} width={25} height={25} alt={`icone do ${text}`} />
      <p className="text-sm text-primaryGray">{text}</p>
    </div>
  );
};

export default searchIcon;
