import { Icons } from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const WorkoutCard = ({ workout }) => {
  console.log("workout: ", workout);

  return (
    <div className="w-full border bg-secondary border-secondary shadow-md rounded-b-xl">
      <div className="bg-white p-2 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {workout?.wod}
          </h1>
          <div className="text-[10px]">
            <span>Wod-{workout?.wodNumber}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-2">
        <div>
          <p className="font-semibold mb-2">Exercises</p>
          <div className="h-48 overflow-hidden flex flex-col gap-1">
            {workout?.exercises?.slice(0, 7).map((exercise, index) => (
              <div
                key={index}
                className="flex flex-row items-start justify-start gap-2"
              >
                <div className="w-5 flex-shrink-0">
                  <Icons.CheckCircle className="w-full text-primary" />
                </div>
                <p className="text-sm text-black text-opacity-65">{exercise}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center justify-between gap-5">
            <Link to={`Users/${workout.docId}`} className="w-full">
              <Button className="bg-primary hover:bg-primary/70 w-full">
                Users
              </Button>
            </Link>
            <Link to={`Teams/${workout.docId}`} className="w-full">
              <Button className="bg-primary hover:bg-primary/70 w-full">
                Teams
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
