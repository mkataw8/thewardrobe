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
  // const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
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
      <div className="flex h-[500px] w-[800px] items-center justify-center bg-slate-800">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }
  if (wardrobe === undefined) {
    return (
      <div className="m-10 flex h-[500px] w-[800px] flex-wrap items-center justify-center overflow-x-auto bg-slate-800 text-4xl text-white fade-in">
        Start A Wardrobe
      </div>
    );
  }
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (wardrobe.length === 0)
    return (
      <div className="m-10 flex h-[500px] w-[800px] flex-wrap items-center justify-center overflow-x-auto bg-slate-800 text-4xl text-white fade-in">
        Start A Wardrobe
      </div>
    );

  return (
    <div className="flex text-black">
      <div className="m-10 flex h-[500px] w-[800px] flex-wrap overflow-x-auto bg-white">
        {wardrobe.map((item, index) => (
          <div
            key={index}
            className="flex h-auto w-[200px] flex-col items-center p-2"
          >
            <a href={item.link}>
              <img
                src={item.img}
                alt={`Item ${index + 1}`}
                className="h-[200px] w-full object-cover"
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
