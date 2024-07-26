/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../../../components/global/icons";
import Input from "../../../components/global/Input";
import TextArea from "../../../components/global/TextArea";
import ListInput from "../../../components/global/ListInput";
import Choose from "../../../components/global/Choose";

const initialState = {
  id: "",
  description: "",
  startDate: "",
  endDate: "",
  exercises: [],
  status: "active",
};

const ManageWorkout = ({ close, toDo, existingWorkout = initialState }) => {
  const [data, setData] = useState(existingWorkout);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateExercises = (value) => {
    setData({ ...data, exercises: value });
  };

  const handleSubmit = () => {
    console.log(data);
    close();
  };

  const changeStatus = (value) => {
    setData({ ...data, status: value });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-screen fixed top-0 right-0 z-50 bg-white p-4 drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add Workout</h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <Input
            labelValue="ID"
            type="text"
            value={data.id}
            onChange={handleChange}
          />

          <Input
            labelValue="Start Date"
            type="date"
            value={data.startDate}
            onChange={handleChange}
          />

          <Input
            labelValue="End Date"
            type="date"
            value={data.endDate}
            onChange={handleChange}
          />

          <TextArea
            labelValue="Description"
            type="text"
            value={data.description}
            onChange={handleChange}
          />

          <ListInput
            labelValue="Exercises"
            state={data.exercises}
            onChange={updateExercises}
          />

          <Choose
            labelValue={"Status"}
            state={data.status}
            onChange={changeStatus}
          />
        </div>

        {toDo === "add" ? (
          <button
            onClick={handleSubmit}
            className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5"
          >
            Add Workout
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5"
          >
            Update Workout
          </button>
        )}
      </div>
    </>
  );
};

export default ManageWorkout;
