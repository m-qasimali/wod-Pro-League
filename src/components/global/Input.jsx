/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { toCamelCase } from "../../utils/functions";

const Input = ({ labelValue, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={`${toCamelCase(labelValue)}`}>
        {labelValue}
      </label>
      <input
        type={type}
        id={`${toCamelCase(labelValue)}`}
        value={value}
        onChange={onChange}
        name={`${toCamelCase(labelValue)}`}
        className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
      />
    </div>
  );
};

Input.propTypes = {
  labelValue: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
