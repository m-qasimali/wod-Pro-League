import { useLocation, useParams } from "react-router-dom";
import WorkoutCard from "./components/WorkoutCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/global/Loader";
import { getUserWorkouts } from "../../redux/workoutSlice";

const UserWorkouts = () => {
  const location = useLocation();
  const userName = location.state.userName;
  const params = useParams();
  const dispatch = useDispatch();
  const { userWorkouts, gettingUserWorkouts, userWorkoutsError } = useSelector(
    (state) => state.workout
  );

  useEffect(() => {
    dispatch(getUserWorkouts(params.userId));
  }, [dispatch, params.userId]);

  if (gettingUserWorkouts) {
    return <Loader />;
  }

  if (userWorkoutsError) {
    return <p>{userWorkoutsError}</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10">
        <p className="font-bold text-2xl">{`${userName}'s Workouts`}</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
          {userWorkouts.map((userWorkout) => (
            <WorkoutCard key={userWorkout.id} userWorkout={userWorkout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWorkouts;
