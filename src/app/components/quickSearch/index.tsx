import React from "react";
import SearchIcon from "../../../components/searchIcon";
import TitleSection from "@/components/titleSection";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <TitleSection title="Tente pesquisar por" />
      <div className="grid grid-cols-3 items-center gap-4 mt-4 flex-wrap ">
        <SearchIcon icon="/hotel-icon.png" text="Hotéis" />
        <SearchIcon icon="/farm-icon.png" text="Fazendas" />
        <SearchIcon icon="/cottage-icon.png" text="Chalés" />
        <SearchIcon icon="/inns-icon.png" text="Pousadas" />
        <SearchIcon icon="/resorts-icon.png" text="Resorts" />
        <SearchIcon icon="/attractions-icon.png" text="P. turísticos" />
      </div>
    </div>
  );
};

export default QuickSearch;
