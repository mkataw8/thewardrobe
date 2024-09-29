import { ItemType } from "@prisma/client";
import React from "react";

interface NavBarProps {
  setSelectedPart: (part: ItemType) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setSelectedPart }) => {
  return (
    <div className="mr-[30px] flex h-screen items-center">
      <ul className="flex h-[500px] flex-col justify-between text-white">
        <li>
          <button onClick={() => setSelectedPart(ItemType.hats)}>
            <img
              src="/assets/button.png"
              className="h-[60px] w-[60px]"
              alt="Hats"
            />
          </button>
        </li>
        <li>
          <button onClick={() => setSelectedPart(ItemType.jackets)}>
            <img
              src="/assets/button.png"
              className="h-[60px] w-[60px]"
              alt="Jackets"
            />
          </button>
        </li>
        <li>
          <button onClick={() => setSelectedPart(ItemType.shirts)}>
            <img
              src="/assets/button.png"
              className="h-[60px] w-[60px]"
              alt="Shirts"
            />
          </button>
        </li>
        <li>
          <button onClick={() => setSelectedPart(ItemType.pants)}>
            <img
              src="/assets/button.png"
              className="h-[60px] w-[60px]"
              alt="Pants"
            />
          </button>
        </li>
        <li>
          <button onClick={() => setSelectedPart(ItemType.shoes)}>
            <img
              src="/assets/button.png"
              className="h-[60px] w-[60px]"
              alt="Shoes"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
