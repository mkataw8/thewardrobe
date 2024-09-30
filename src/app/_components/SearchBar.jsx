import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mt-5 flex items-center justify-center">
      <form className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          // onChange={handleInputChange}
          placeholder="Search for Product"
          className="rounded-lg border border-gray-300 px-[260px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
