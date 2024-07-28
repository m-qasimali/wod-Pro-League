import { useLoaderData, useLocation } from "react-router-dom";
import WorkoutCard from "./components/WorkoutCard";

const UserWorkouts = () => {
  const { userWorkoutVideos } = useLoaderData();
  const location = useLocation();
  const userName = location.state.userName;
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10">
        <p className="font-bold text-2xl">{`${userName}'s Workouts`}</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
          {userWorkoutVideos.map((userWorkoutVideo) => (
            <WorkoutCard
              key={userWorkoutVideo.id}
              userWorkout={userWorkoutVideo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWorkouts;
