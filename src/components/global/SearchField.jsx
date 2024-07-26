import { Icons } from "./icons";

const SearchField = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full border border-black border-opacity-10 rounded-full p-2 outline-none focus-within:border-primary ps-10"
        placeholder="Search"
      />
      <Icons.Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black text-opacity-10 w-7" />
    </div>
  );
};

export default SearchField;
