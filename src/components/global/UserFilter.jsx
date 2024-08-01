import { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserFilters } from "../../redux/userSlice";
import { getActiveWorkouts } from "../../redux/workoutSlice";

const initialState = {
  weightSize: "=",
  weight: "",
  workout: "",
};

const UserFilter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState(initialState);
  const [appliedFilters, setAppliedFilters] = useState(0);
  const filterBoxRef = useRef(null);
  const { activeWorkouts } = useSelector((state) => state.workout);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterBoxRef.current && !filterBoxRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getActiveWorkouts());
  }, [dispatch]);

  const applyFilters = () => {
    setShowFilter(false);
    if (data.weight === "" && data.workout === "") return;

    dispatch(setUserFilters(data));

    const count = (data.weight !== "" ? 1 : 0) + (data.workout !== "" ? 1 : 0);
    setAppliedFilters(count);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClearFilter = (target) => {
    const updatedData = { ...data, [target]: "" };
    setData(updatedData);
    dispatch(setUserFilters(updatedData));

    const count =
      (updatedData.weight !== "" ? 1 : 0) +
      (updatedData.workout !== "" ? 1 : 0);
    setAppliedFilters(count);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(true)}
        className="border h-full flex flex-row items-center justify-between px-6 rounded-full gap-1 bg-white border-black border-opacity-10 text-black text-opacity-50 cursor-pointer"
      >
        {appliedFilters > 0 ? (
          <div className="bg-primary rounded-full w-5 text-sm text-white">
            {appliedFilters}
          </div>
        ) : (
          <Icons.Filter className="h-5 mr-2 w-5" />
        )}
        <p className="font-semibold">Filters</p>
      </button>

      {showFilter && (
        <div
          ref={filterBoxRef}
          className="absolute bg-white z-10 mt-1 rounded-lg shadow-xl border border-primary p-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-end justify-between">
                <span className="text-lg font-semibold text-black text-opacity-70">
                  Weight
                </span>
                <button
                  onClick={() => handleClearFilter("weight")}
                  className="text-sm"
                >
                  clear
                </button>
              </div>
              <div className="flex flex-row border border-primary p-0.5 rounded-lg gap-1">
                <select
                  className="w-28 text-xs rounded-none outline-none cursor-pointer"
                  name="weightSize"
                  id="weightSize"
                  value={data.weightSize}
                  onChange={handleChange}
                >
                  <option value="<">less than</option>
                  <option value="=">equal to</option>
                  <option value=">">greater than</option>
                </select>

                <input
                  type="number"
                  className="p-1.5 outline-none w-24 border-s-2"
                  placeholder="50"
                  name="weight"
                  id="weight"
                  value={data.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-end justify-between">
                <span className="text-lg font-semibold text-black text-opacity-70">
                  Workouts
                </span>
                <button
                  onClick={() => handleClearFilter("workout")}
                  className="text-sm"
                >
                  clear
                </button>
              </div>
              <select
                className="w-full px-2 py-3 text-xs outline-none cursor-pointer border border-primary rounded-lg"
                name="workout"
                id="workout"
                value={data.workout}
                onChange={handleChange}
              >
                <option value="" disabled>
                  workout
                </option>
                {Object.keys(activeWorkouts).map((workout) => (
                  <option key={workout} value={workout}>
                    {activeWorkouts[workout].workoutNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row justify-end mt-2">
              <button
                onClick={applyFilters}
                className="bg-primary px-4 py-1 text-white rounded-full hover:bg-opacity-80"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilter;
