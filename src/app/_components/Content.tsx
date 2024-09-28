import { ItemType } from "@prisma/client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";

interface WardrobeItem {
  name: string;
  link: string;
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
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset error state

      try {
        if (
          !["hats", "jackets", "shirts", "pants", "shoes"].includes(
            selectedPart,
          )
        ) {
          setWardrobe([]); // Handle invalid types
        } else {
          // Fetch from Supabase if part is not in predefined categories
          const { data, error } = await supabase
            .from("Item")
            .select("*")
            .eq("type", selectedPart);

          if (error) {
            throw new Error(error.message); // Throw an error to be caught in the catch block
          }

          console.log("Data fetched from Supabase:", data);
          setWardrobe(data); // Set data fetched from Supabase
          console.log(wardrobe);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Set error state
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    // Fetch or update wardrobe when selectedPart changes
    fetchData();
  }, [selectedPart, hats, jackets, shirts, pants, shoes]);

  if (loading) {
    return <div className="text-white">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Display error message
  }

  return (
    <div className="text-white">
      <div className="h-[500px] w-[800px] bg-white">
        <div className="flex flex-wrap text-black">
          {wardrobe.map((item, index) => (
            <div
              key={index}
              className="flex h-[250px] w-[200px] flex-col items-center"
            >
              <img
                src={item.link}
                alt={`Item ${index + 1}`}
                className="animate-fadeIn h-[250px] w-[200px] object-cover"
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
