import React from "react";
import Logo from "../../../public/img/logo";

const Footer = () => {
  return (
    <div className="bg-whaterWhile p-5 justify-center flex flex-col items-center">
      <Logo />
      <p className="text-sm font-medium text-primaryDark pt-2">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
