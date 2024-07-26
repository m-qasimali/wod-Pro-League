import { useState } from "react";
import AddButton from "../../components/global/AddButton";
import WorkoutCard from "./components/WorkoutCard";
import ManageWorkout from "./components/ManageWorkout";
import { lockScroll, unlockScroll } from "../../utils/functions";

const Workouts = () => {
  const [addWorkout, setAddWorkout] = useState(false);

  const openAddWorkout = () => {
    setAddWorkout(true);
    lockScroll();
  };

  const closeAddWorkout = () => {
    setAddWorkout(false);
    unlockScroll();
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-end" onClick={openAddWorkout}>
        <AddButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </div>
      {addWorkout && <ManageWorkout close={closeAddWorkout} toDo="add" />}
    </div>
  );
};

export default Workouts;
