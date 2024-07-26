import { Link } from "react-router-dom";
import { Icons } from "../../../components/global/icons";

const WorkoutCard = () => {
  const excercises = new Array(10).fill(0);

  return (
    <div className="w-full border bg-secondary border-secondary shadow-md rounded-b-xl">
      <div className="bg-white p-2 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Workout ID</h1>
          <div className="text-[10px]">
            <span>26/02/2024</span> - <span>26/08/2024</span>
          </div>
        </div>
        <p className="text-[#007744] font-bold text-sm">Pending</p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-2">
        <div>
          <p className="font-semibold mb-2">Exercises</p>
          <div className="h-48 overflow-hidden flex flex-col gap-1">
            {excercises.slice(0, 7).map((_, index) => (
              <div
                key={index}
                className="flex flex-row items-start justify-start gap-2"
              >
                <div className="w-5 flex-shrink-0">
                  <Icons.CheckCircle className="w-full text-primary" />
                </div>
                <p className="text-sm text-black text-opacity-65">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            ))}
          </div>

          <Link
            to={"/users/userId/workId/videos"}
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
