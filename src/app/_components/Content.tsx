"use client";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/clerk-react";
import { ItemType } from "@prisma/client";
import { useState } from "react";
import "./content.css";

interface WardrobeItem {
  name: string;
  link: string;
  img: string;
  price: string;
  userId: string; // Ensure this matches the user ID type
  type: ItemType;
}

interface ContentProps {
  selectedPart: ItemType | undefined;
}

const Content: React.FC<ContentProps> = ({ selectedPart }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const userID = user?.id ?? "";

  const { data: wardrobe, isLoading } = api.item.get.useQuery(
    {
      type: selectedPart ?? "hats",
      userId: userID,
    },
    {
      enabled: !!userID && !!selectedPart,
    },
  );

  if (isLoading) {
    return (
      <div className="m-5 flex h-[500px] w-full items-center justify-center overflow-x-auto bg-slate-800 text-4xl text-white fade-in md:w-[700px] lg:w-[800px]">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }
  if (wardrobe === undefined) {
    return (
      <div className="m-10 flex h-[500px] w-full items-center justify-center overflow-x-auto bg-slate-800 text-4xl text-white fade-in md:w-[700px] lg:w-[800px]">
        Start A Wardrobe
      </div>
    );
  }
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (wardrobe.length === 0) {
    return (
      <div className="m-5 flex h-[500px] w-full items-center justify-center overflow-x-auto bg-slate-800 text-4xl text-white fade-in md:w-[700px] lg:w-[800px]">
        Start A Wardrobe
      </div>
    );
  }

  return (
    <div className="flex justify-center text-black">
      <div className="flex h-[500px] w-full max-w-[800px] flex-wrap justify-center overflow-y-auto bg-white">
        {wardrobe.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:h-[250px] sm:w-[200px] md:h-[250px] md:w-[200px] lg:h-[250px] lg:w-[200px]" // Set padding to 0
          >
            <a href={item.link}>
              <img
                src={item.img}
                alt={`Item ${index + 1}`}
                className="h-[210px] w-full object-cover"
              />
            </a>
            <div className="text-center">
              <p className="w-full truncate text-sm font-semibold">
                {item.name}
              </p>
              <p className="text-sm text-gray-600">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
