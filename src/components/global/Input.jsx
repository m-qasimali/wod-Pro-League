/* eslint-disable react/prop-types */
import { toCamelCase } from "../../utils/functions";

const Input = ({
  labelValue,
  type,
  value,
  onChange,
  disabled = false,
  min = 0,
  max = 0,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={toCamelCase(labelValue)}>
        {labelValue}
      </label>
      <input
        type={type}
        id={toCamelCase(labelValue)}
        value={value}
        onChange={onChange}
        name={toCamelCase(labelValue)}
        disabled={disabled}
        className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
        {...(type === "number" && { min, max })}
        {...(placeholder && { placeholder })}
      />
    </div>
  );
};

export default Input;
