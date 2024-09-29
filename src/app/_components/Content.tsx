import { ItemType } from "@prisma/client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";

interface WardrobeItem {
  name: string;
  link: string;
  img: string;
  price: string;
  type: ItemType;
}

interface ContentProps {
  selectedPart: ItemType;
  jackets: WardrobeItem[];
  shoes: WardrobeItem[];
  shirts: WardrobeItem[];
  pants: WardrobeItem[];
  hats: WardrobeItem[];
}

const Content: React.FC<ContentProps> = ({
  selectedPart,
  jackets,
  shoes,
  shirts,
  pants,
  hats,
}) => {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(5); // Initially show 5 items
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const validTypes = ["hats", "jackets", "shirts", "pants", "shoes"];
        if (!validTypes.includes(selectedPart)) {
          setWardrobe([]);
        } else {
          const { data, error } = await supabase
            .from("Item")
            .select("*")
            .eq("type", selectedPart);

          if (error) throw new Error(error.message);

          console.log("Data fetched from Supabase:", data);
          if (data) setWardrobe(data); // Ensure data is not null
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPart]);

  useEffect(() => {
    console.log(wardrobe); // Log updated wardrobe state
  }, [wardrobe]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex text-black">
      <div className="m-10 flex h-[500px] w-[800px] flex-wrap overflow-x-auto bg-white">
        {wardrobe.slice().map((item, index) => (
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
