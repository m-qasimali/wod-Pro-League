/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { toCamelCase } from "../../utils/functions";
import { Icons } from "./icons";
import { useState } from "react";

const ListInput = ({ labelValue, onChange, state }) => {
  const [add, setAdd] = useState(true);
  const [value, setValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [items, setItems] = useState(state);

  const handleToggle = () => {
    setAdd(!add);
    setShowInput(!showInput);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setItems([...items, value]);
      onChange([...items, value]);
      setValue("");
    }
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={`${toCamelCase(labelValue)}`}>
        {labelValue}
      </label>

      {items.length > 0 && (
        <div className="flex flex-col gap-3 border p-2 rounded-lg">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-start gap-2"
            >
              <p className="text-sm">{item}</p>
              <button
                onClick={() => handleDelete(index)}
                className="flex-shrink-0"
              >
                <Icons.Delete className="w-5 text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
      {showInput && (
        <input
          type={"text"}
          onKeyDown={handleSubmit}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
        />
      )}
      <div className="flex flex-row justify-end">
        <button
          onClick={handleToggle}
          className="bg-gradient-to-r from-primary to-transparent rounded-full text-white p-1"
        >
          {add ? (
            <Icons.AddIcon className="w-5 h-5" />
          ) : (
            showInput && <Icons.CloseSidebarIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

ListInput.propTypes = {
  labelValue: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ListInput;
