import { useEffect, useState } from "react";
import AddButton from "../../components/global/AddButton";
import WorkoutCard from "./components/WorkoutCard";
import ManageWorkout from "./components/ManageWorkout";
import { lockScroll, unlockScroll } from "../../utils/functions";
import { useSelector } from "react-redux";
import Loader from "../../components/global/Loader";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  const [addWorkout, setAddWorkout] = useState(false);
  const { loading, workouts } = useSelector((state) => state.workout);
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!admin || admin.role !== "primary") {
      navigate("*", { replace: true });
    } else {
      setPageLoading(false);
    }
  }, [navigate, admin]);

  if (pageLoading || loading) {
    return <Loader />;
  }

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
      <div className="flex flex-row justify-end">
        <div onClick={openAddWorkout}>
          <AddButton />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
          {workouts.map((workout) => (
            <WorkoutCard key={workout?.docId} workout={workout} />
          ))}
        </div>
      )}
      {addWorkout && (
        <ManageWorkout key="manageWorkout" close={closeAddWorkout} toDo="add" />
      )}
    </div>
  );
};

export default Workouts;
