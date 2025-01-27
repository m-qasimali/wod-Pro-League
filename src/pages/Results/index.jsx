import Loader from "@/components/global/Loader";
import { getWorkouts } from "@/redux/workoutSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "./components/WorkoutCard";
import toast from "react-hot-toast";

const Results = () => {
  const { loading, workouts } = useSelector((state) => state.workout);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      await dispatch(getWorkouts()).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (workouts.length === 0) {
      getData();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.docId} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
