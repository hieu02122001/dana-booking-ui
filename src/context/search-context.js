import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = (props) => {
  const [filter, setFilter] = useState({
    cityId: "",
    cityName: "",
    animal: false,
    minPrice: 0,
    maxPrice: 500,
    maxQuantityPeople: 0,
    typeRoomId: "",
    roomTypeName: "",
  });
  const value = { filter, setFilter };
  return (
    <SearchContext.Provider {...props} value={value}></SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (typeof context === "undefined")
    throw new Error("useSearch must be used within SearchProvider");
  return context;
};
export { SearchProvider, useSearch };
