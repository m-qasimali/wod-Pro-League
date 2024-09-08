/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../../../components/global/icons";
import Input from "../../../components/global/Input";
import TextArea from "../../../components/global/TextArea";
import ListInput from "../../../components/global/ListInput";
import Choose from "../../../components/global/Choose";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/global/Spinner";
import { addWorkout, updateWorkout } from "../../../redux/workoutSlice";
import toast from "react-hot-toast";
import ResultChoose from "../../../components/global/ResultChoose";

const initialState = {
  id: "",
  description: "",
  startDate: "",
  endDate: "",
  maxDuration: "",
  exercises: [],
  status: "active",
  wodNumber: 1,
  resultType: "time",
};

const ManageWorkout = ({ close, toDo, existingWorkout = initialState }) => {
  const [data, setData] = useState(existingWorkout);
  const dispatch = useDispatch();
  const { loading, workouts } = useSelector((state) => state.workout);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateExercises = (value) => {
    setData({ ...data, exercises: value });
  };

  const checkValidSpan = () => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate > endDate) {
      toast.error("End date should be greater than start date");
      return false;
    }
    return true;
  };

  const validDuration = () => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    for (const workout of workouts) {
      const workoutStartDate = new Date(workout.startDate);
      const workoutEndDate = new Date(workout.endDate);

      if (data?.docId === workout.docId) {
        if (
          (data.startDate === workout.startDate &&
            data.endDate === workout.endDate) ||
          (startDate >= workoutStartDate && endDate <= workoutEndDate) ||
          (startDate <= workoutStartDate && endDate >= workoutEndDate)
        ) {
          return true;
        }
      }
      if (
        (startDate >= workoutStartDate && startDate <= workoutEndDate) ||
        (endDate >= workoutStartDate && endDate <= workoutEndDate) ||
        (startDate <= workoutStartDate && endDate >= workoutEndDate)
      ) {
        toast.error(
          "Workout duration should not overlap with existing workouts"
        );
        return false;
      }
    }

    return true;
  };

  const validWodNumber = () => {
    if (data.wodNumber < 1 || data.wodNumber > 11) {
      toast.error("Workout number should be between 1 and 11");
      return false;
    }

    for (const workout of workouts) {
      if (data?.docId === workout?.docId) {
        continue;
      }

      if (data.wodNumber === workout.wodNumber) {
        toast.error("Workout number should be unique");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (
      !data.id ||
      !data.startDate ||
      !data.endDate ||
      !data.description ||
      data.exercises.length === 0 ||
      !data.status ||
      !data.wodNumber ||
      !data.resultType ||
      !data.maxDuration
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!checkValidSpan() || !validDuration() || !validWodNumber()) {
      return;
    }

    try {
      if (toDo === "add") {
        await dispatch(addWorkout(data)).unwrap();
        toast.success(`${data.id} added successfully`);
        setData(initialState);
        close();
      } else {
        await dispatch(updateWorkout(data)).unwrap();
        toast.success(`${data.id} updated successfully`);
        close();
      }
    } catch (error) {
      toast.error("Failed to add/update workout");
      close();
    }
  };

  const changeStatus = (value) => {
    setData({ ...data, status: value });
  };

  const changeResultType = (value) => {
    setData({ ...data, resultType: value });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-screen fixed top-0 right-0 z-50 bg-white p-4 drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {toDo === "add" ? "Add Workout" : "Update Workout"}
          </h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <Input
            labelValue="ID"
            type="text"
            name="id"
            value={data.id}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            labelValue="Wod Number"
            type="number"
            name="wodNumber"
            value={data.wodNumber}
            onChange={handleChange}
            disabled={loading}
            min={1}
            max={11}
          />

          <Input
            labelValue="Start Date"
            type="datetime-local"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            labelValue="End Date"
            type="datetime-local"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            labelValue="Max Duration"
            placeholder="In minutes"
            type="number"
            name="maxDuration"
            value={data.maxDuration}
            onChange={handleChange}
            disabled={loading}
            min={0}
            max={1200}
          />

          <TextArea
            labelValue="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
            disabled={loading}
          />

          <ListInput
            labelValue="Exercises"
            state={data.exercises}
            onChange={updateExercises}
            disabled={loading}
          />

          <Choose
            labelValue="Status"
            state={data.status}
            onChange={changeStatus}
            disabled={loading}
          />

          <ResultChoose
            labelValue="Result Type"
            state={data.resultType}
            onChange={changeResultType}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
        >
          {loading ? (
            <Spinner />
          ) : toDo === "add" ? (
            "Add Workout"
          ) : (
            "Update Workout"
          )}
        </button>
      </div>
    </>
  );
};

export default ManageWorkout;
