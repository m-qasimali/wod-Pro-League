/* eslint-disable react/prop-types */
import { Icons } from "./icons";

const Choose = ({ labelValue, state, onChange, disabled }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{labelValue}</label>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => onChange("active")}
          disabled={disabled}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "active" ? (
            <Icons.CheckedBox id="active" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox id="active" className="text-3xl text-primary" />
          )}
          <label htmlFor="active" className="text-sm text-black">
            Active
          </label>
        </button>

        <button
          onClick={() => onChange("inactive")}
          disabled={disabled}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "inactive" ? (
            <Icons.CheckedBox id="inactive" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox
              id="inactive"
              className="text-3xl text-primary"
            />
          )}
          <label htmlFor="inactive" className="text-sm text-black">
            InActive
          </label>
        </button>
      </div>
    </div>
  );
};

export default Choose;
