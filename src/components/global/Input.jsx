/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
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
  smallText = false,
  name = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className={cn("font-semibold", smallText ? "text-xs" : "")}
        htmlFor={toCamelCase(labelValue)}
      >
        {labelValue}
      </label>
      <input
        type={type}
        id={toCamelCase(labelValue)}
        value={value}
        onChange={onChange}
        name={name || toCamelCase(labelValue)}
        disabled={disabled}
        className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
        {...(type === "number" && { min, max })}
        {...(placeholder && { placeholder })}
      />
    </div>
  );
};

export default Input;
