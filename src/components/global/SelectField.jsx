import { useState } from "react";
import { Icons } from "./icons";
import { provinces, spain_cities } from "@/constant/provinces";

/* eslint-disable react/prop-types */

const SelectField = ({
  state,
  handleChange,
  options,
  disabled = false,
  placeholder,
  toSelect = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    handleChange({ target: { value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`w-full flex flex-row items-center justify-between rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 cursor-pointer border border-gray-300 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)} // Disable click if disabled
      >
        <p className={`${disabled ? "text-gray-500" : ""}`}>
          {state
            ? toSelect === "city"
              ? spain_cities.find((city) => city.id === state)?.nm
              : toSelect === "province"
              ? provinces.find((province) => province.id === state)?.nm
              : state
            : placeholder}
        </p>
        <Icons.ArrowDown
          className={`h-5 w-5 ${disabled ? "text-gray-500" : "text-gray-500"}`}
        />
      </div>

      {!disabled && isOpen && (
        <div
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto shadow-lg scrollbar-hide custom-scrollbar"
          style={{ zIndex: 1000 }}
        >
          {options?.map((option) => (
            <div
              key={option?.id ? option.id : option}
              className="px-4 py-2 text-sm hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() =>
                handleOptionClick(option?.id ? option?.id : option)
              }
            >
              {option?.nm ? option.nm : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
