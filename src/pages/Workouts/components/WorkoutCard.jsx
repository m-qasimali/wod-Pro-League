import { useState } from "react";
import { Icons } from "../../../components/global/icons";
import ManageWorkout from "./ManageWorkout";
import { lockScroll, unlockScroll } from "../../../utils/functions";
import ViewWorkout from "./ViewWorkout";
import DeletePopup from "../../../components/global/DeletePopup";

const existingWorkout = {
  id: "1",
  description: "hello",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  exercises: ["exercise 1", "exercise 2", "exercise 3"],
  status: "inactive",
};

const WorkoutCard = () => {
  const excercises = new Array(10).fill(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewWorkout, setShowViewWorkout] = useState(false);
  const [showDeleteWorkout, setShowDeleteWorkout] = useState(false);

  const handleEditForm = () => {
    setShowEditForm(true);
    lockScroll();
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    unlockScroll();
  };

  const handleViewWorkout = () => {
    setShowViewWorkout(true);
    lockScroll();
  };

  const handleCloseViewWorkout = () => {
    setShowViewWorkout(false);
    unlockScroll();
  };

  const handleDeleteWorkout = () => {
    setShowDeleteWorkout(true);
    lockScroll();
  };

  const handleCloseDeleteWorkout = () => {
    setShowDeleteWorkout(false);
    unlockScroll();
  };

  return (
    <div className="w-full border bg-secondary border-secondary shadow-md rounded-b-xl">
      <div className="bg-white p-2 flex flex-row items-center justify-between">
        <p className="font-semibold text-2xl">title</p>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleDeleteWorkout}
            className="bg-red-400 p-1.5 hover:bg-opacity-80 rounded-full hover:shadow-lg"
          >
            <Icons.Delete className="w-4 text-white" />
          </button>

          <button
            onClick={handleEditForm}
            className="bg-primary  hover:bg-opacity-80 p-1.5 rounded-full  hover:shadow-lg"
          >
            <img src={Icons.EditIcon} className="w-4" alt="" />
          </button>

          <button
            onClick={handleViewWorkout}
            className="bg-textSecondary p-1.5 hover:bg-opacity-80 rounded-full hover:shadow-lg"
          >
            <Icons.View className="w-4 text-white" />
          </button>
        </div>
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
        </div>

        <div className="flex flex-row justify-between">
          <div>
            <p className="font-semibold mb-2">Duration</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-1">
                <Icons.DateStart className="w-5 text-primary" />
                <p className="text-xs text-black text-opacity-65">
                  {"12/02/2024"}
                </p>
              </div>

              <div className="flex flex-row gap-1">
                <Icons.DateEnd className="w-5 text-primary" />
                <p className="text-xs text-black text-opacity-65">
                  {"12/08/2024"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Status</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-1 items-center">
                <Icons.CheckedBox className="text-xl text-primary" />
                <p className="text-xs text-black text-opacity-65">Active</p>
              </div>

              <div className="flex flex-row gap-1 items">
                <Icons.UnCheckedBox className="text-xl text-primary" />
                <p className="text-xs text-black text-opacity-65">InActive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <ManageWorkout
          close={handleCloseEditForm}
          toDo="update"
          existingWorkout={existingWorkout}
        />
      )}

      {showViewWorkout && <ViewWorkout close={handleCloseViewWorkout} />}

      {showDeleteWorkout && (
        <DeletePopup
          close={handleCloseDeleteWorkout}
          title="Workout"
          item="WOD1"
        />
      )}
    </div>
  );
};

export default WorkoutCard;
