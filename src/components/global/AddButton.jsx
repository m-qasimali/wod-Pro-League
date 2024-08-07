import { useState } from "react";
import { Icons } from "./icons";

const AddButton = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border-primary hover:bg-primary hover:bg-opacity-20 cursor-pointer px-10 py-1.5 border-4 rounded-full inline-block font-bold text-lg relative"
    >
      Add
      <div className="bg-gradient-to-r from-primary to-[#DFDEEE] rounded-full w-fit p-1 absolute -top-3 -right-3">
        <div
          className={`  rounded-full flex p-1 ${
            hover ? "bg-primary bg-opacity-5" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Icons.AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
