import WorkoutCard from "./components/WorkoutCard";

const UserWorkouts = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10">
        <p className="font-bold text-2xl">{"Qasim's Workouts"}</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 xl:gap-10">
          <WorkoutCard />
        </div>
      </div>
    </div>
  );
};

export default UserWorkouts;
