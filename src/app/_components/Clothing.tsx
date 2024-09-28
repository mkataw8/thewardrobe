"use client";
import { useState } from "react";
import { AddItem } from "./addItem";
import Content from "./Content";
import MainNav from "./MainNav";
import NavBar from "./NavBar"; // Ensure the correct filename casing
import SearchBar from "./SearchBar";
export const Clothing = () => {
  const [count, setCount] = useState(0);

  const [selectedPart, setSelectedPart] = useState("default");

  return (
    <div>
      <MainNav />
      <div className="flex justify-center">
        <div className="">
          <div className="mt-[-110px] flex-col"></div>
          <NavBar setSelectedPart={setSelectedPart} />
        </div>
        <div className="mt-[40px] flex-col"></div>
        <div className="mt-[40px] flex-col">
          <Content
            selectedPart={selectedPart}
            hats={[]}
            jackets={[]}
            shirts={[]}
            pants={[]}
            shoes={[]}
          />
          <SearchBar />
          <AddItem />
        </div>
      </div>
    </div>
  );
};
