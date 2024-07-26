/* eslint-disable react/prop-types */
import { Icons } from "./icons";

const Choose = ({ labelValue, state, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{labelValue}</label>
      <div className="flex flex-row gap-4">
        <div
          onClick={() => onChange("active")}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          {state === "active" ? (
            <Icons.CheckedBox id="active" className="text-3xl text-primary" />
          ) : (
            <Icons.UnCheckedBox id="active" className="text-3xl text-primary" />
          )}
          <lable htmlFor="active" className="text-sm text-black">
            Active
          </lable>
        </div>

        <div
          onClick={() => onChange("inactive")}
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
        </div>
      </div>
    </div>
  );
};

export default Choose;
