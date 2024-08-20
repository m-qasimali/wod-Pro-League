import React, { useState } from "react";
import { Icons } from "./icons";

/* eslint-disable react/prop-types */

const SelectField = ({ state, handleChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    handleChange({ target: { value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="w-full flex flex-row items-center justify-between rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 cursor-pointer border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{state ? state : "Choose Category"}</p>
        <Icons.ArrowDown className="h-5 w-5 text-gray-500" />
      </div>

      {isOpen && (
        <div
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto shadow-lg"
          style={{ zIndex: 1000 }} // Ensures dropdown appears on top
        >
          {options?.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-sm hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
