"use client";
import { ItemType } from "@prisma/client";
import { useState } from "react";
import { AddItem } from "./addItem";
import Content from "./Content";
import MainNav from "./MainNav";
import NavBar from "./NavBar"; // Ensure the correct filename casing

export const Clothing = () => {
  const [count, setCount] = useState(0);

  // Initialize with a valid item type, e.g., undefined or a default ItemType
  const [selectedPart, setSelectedPart] = useState<ItemType | undefined>(
    undefined,
  );

  const handleTypeChange = (type: ItemType) => {
    setSelectedPart(type);
  };

  return (
    <div>
      <MainNav />
      <div className="flex justify-center">
        <div className="">
          <div className="mt-[-110px] flex-col"></div>
          <NavBar setSelectedPart={handleTypeChange} />{" "}
          {/* Pass handleTypeChange */}
        </div>
        <div className="mt-[40px] flex-col"></div>
        <div className="mt-[40px] flex-col">
          <Content
            selectedPart={selectedPart || ItemType.hats} // Pass the valid selected part
            hats={[]}
            jackets={[]}
            shirts={[]}
            pants={[]}
            shoes={[]}
          />
          {/* <SearchBar /> */}
          <AddItem />
        </div>
      </div>
    </div>
  );
};
