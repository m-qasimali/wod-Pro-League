/* eslint-disable react/prop-types */
import { Icons } from "./icons";

const ResultChoose = ({ labelValue, state, onChange, disabled }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{labelValue}</label>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => onChange("time")}
          disabled={disabled}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "time" ? (
            <Icons.CheckedBox id="time" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox id="time" className="text-3xl text-primary" />
          )}
          <label htmlFor="time" className="text-sm text-black">
            Time Only
          </label>
        </button>

        <button
          onClick={() => onChange("weight")}
          disabled={disabled}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "weight" ? (
            <Icons.CheckedBox id="weight" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox id="weight" className="text-3xl text-primary" />
          )}
          <label htmlFor="inactive" className="text-sm text-black">
            Weight Only
          </label>
        </button>

        <button
          onClick={() => onChange("both")}
          disabled={disabled}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "both" ? (
            <Icons.CheckedBox id="both" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox id="both" className="text-3xl text-primary" />
          )}
          <label htmlFor="inactive" className="text-sm text-black">
            Both
          </label>
        </button>
      </div>
    </div>
  );
};

export default ResultChoose;
