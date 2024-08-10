/* eslint-disable react/prop-types */

import { Icons } from "./icons";

const Checkbox = ({ checked, onChange, id }) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label htmlFor={id}>
        <div className="flex items-center cursor-pointer">
          <div
            className={`w-4 h-4 border ${
              checked ? "border-primary" : "border-gray-400"
            } rounded-sm mr-2`}
          >
            {checked && (
              <div className="w-full h-full bg-primary text-white">
                <Icons.Check />
              </div>
            )}
          </div>
        </div>
      </label>
    </>
  );
};

export default Checkbox;
