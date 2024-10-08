"use client";
import { ItemType } from "@prisma/client";
import { useState } from "react";
import { AddItem } from "./addItem";
import Content from "./Content";
import MainNav from "./MainNav";
import NavBar from "./NavBar"; // Ensure the correct filename casing

export const Clothing = () => {
  const [selectedPart, setSelectedPart] = useState<ItemType | undefined>(
    undefined,
  );

  const handleTypeChange = (type: ItemType) => {
    setSelectedPart(type);
  };

  return (
    <div className="p-4">
      <MainNav />
      <div className="flex justify-center">
        <div className="">
          <div className="mt-[-110px] flex-col"></div>
          <NavBar setSelectedPart={handleTypeChange} />{" "}
        </div>
        <div className="mt-[40px] flex-col"></div>
        <div className="mt-[40px] flex-col">
          <Content selectedPart={selectedPart} />
          {/* <SearchBar /> */}
          <AddItem />
        </div>
      </div>
    </div>
  );
};
