/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Icons } from "../../../components/global/icons";
import { capitalize, lowercase } from "../../../utils/functions";

const colors = {
  pending: "text-orange-500",
  declined: "text-red-500",
  approved: "text-green-500",
};

const WorkoutCard = ({ userWorkout }) => {
  return (
    <div className="w-full border bg-secondary border-secondary shadow-md rounded-b-xl">
      <div className="bg-white p-2 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {userWorkout?.workout?.wod}
          </h1>
          <div className="text-[10px]">
            <span>{userWorkout?.workout?.startDate}</span> -{" "}
            <span>{userWorkout?.workout?.endDate}</span>
          </div>
        </div>
        <p
          className={`${
            colors[lowercase(userWorkout?.status)]
          } font-bold text-sm`}
        >
          {`${capitalize(userWorkout?.status)}`}
        </p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-2">
        <div>
          <p className="font-semibold mb-2">Exercises</p>
          <div className="h-48 overflow-hidden flex flex-col gap-1">
            {userWorkout?.workout?.exercises
              ?.slice(0, 7)
              .map((exercise, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start justify-start gap-2"
                >
                  <div className="w-5 flex-shrink-0">
                    <Icons.CheckCircle className="w-full text-primary" />
                  </div>
                  <p className="text-sm text-black text-opacity-65">
                    {exercise}
                  </p>
                </div>
              ))}
          </div>

          <Link
            to={`/users/${userWorkout.userId}/${userWorkout.workoutId}/videos`}
            state={{ videos: userWorkout }}
            className="text-primary underline font-semibold"
          >
            Check Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
