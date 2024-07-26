import PropTypes from "prop-types";
import { toCamelCase } from "../../utils/functions";

const TextArea = ({ labelValue, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={`${toCamelCase(labelValue)}`}>
        {labelValue}
      </label>
      <textarea
        type={type}
        id={`${toCamelCase(labelValue)}`}
        value={value}
        onChange={onChange}
        name={`${toCamelCase(labelValue)}`}
        rows={4}
        className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
      />
    </div>
  );
};

TextArea.propTypes = {
  labelValue: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
