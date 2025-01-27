/* eslint-disable react/prop-types */
import { Icons } from "../../../components/global/icons";

const ViewWorkout = ({ close, workout }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sm:h-auto sm:max-w-lg bg-white border border-primary z-50 rounded-xl shadow-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {workout?.id}{" "}
              <span className="text-primary text-sm">
                {workout.status === "active" ? "(Active)" : "(InActive)"}
              </span>
            </h1>
            <div className="text-[10px]">
              <span>{workout.startDate}</span> - <span>{workout.endDate}</span>
            </div>
          </div>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="border"></div>

        <div className="p-6 flex flex-col gap-4 h-auto sm:max-h-96 overflow-auto scrollbar-hide">
          <div>
            <p className="text-lg font-semibold">Max Duration</p>
            <p className="text-textSecondary">{workout?.maxDuration} mins</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Result Type</p>
            <p className="text-textSecondary">{workout?.resultType}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Wod Number</p>
            <p className="text-textSecondary">{workout?.wodNumber}</p>
          </div>

          <div>
            <p className="text-lg font-semibold">Description</p>
            <p className="text-textSecondary">{workout?.description}</p>
          </div>

          <div>
            <p className="text-lg font-semibold">Exercises</p>
            <div className="flex flex-col gap-1.5 ps-2 mt-2">
              {workout?.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start justify-start gap-2"
                >
                  <div className="w-5 flex-shrink-0">
                    <Icons.CheckCircle className="w-full text-primary" />
                  </div>
                  <p className="text-textSecondary">{exercise}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkout;
