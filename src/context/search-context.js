import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = (props) => {
  const [search, setSearch] = useState({
    districtId: "",
    districtName: "",
  });
  const value = { search, setSearch };
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
