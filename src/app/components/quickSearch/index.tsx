import React from "react";
import SearchIcon from "../../../components/searchIcon";
import TitleSection from "@/components/titleSection";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <TitleSection title="Tente pesquisar por" />
      <div className="grid grid-cols-3 items-center gap-4 mt-4 flex-wrap ">
        <Link href={`/trips/search?text=hotel`}>
          <SearchIcon icon="/hotel-icon.png" text="Hotéis" />
        </Link>

        <Link href={`/trips/search?text=fazenda`}>
          <SearchIcon icon="/farm-icon.png" text="Fazendas" />
        </Link>

        <Link href={`/trips/search?text=chale`}>
          <SearchIcon icon="/cottage-icon.png" text="Chalés" />
        </Link>
        <Link href={`/trips/search?text=pousada`}>
          <SearchIcon icon="/inns-icon.png" text="Pousadas" />
        </Link>
        <Link href={`/trips/search?text=resorts`}>
          <SearchIcon icon="/resorts-icon.png" text="Resorts" />
        </Link>
        <Link href={`/trips/search?text=pontoturistico`}>
          <SearchIcon icon="/attractions-icon.png" text="P.turísticos" />
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
