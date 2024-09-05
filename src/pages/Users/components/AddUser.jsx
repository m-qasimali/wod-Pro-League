/* eslint-disable react/prop-types */
import { Icons } from "@/components/global/icons";
import AddUserForm from "./AddUserForm";

const AddUser = ({ close, toDo }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-screen fixed top-0 right-0 z-50 bg-white p-4 drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {toDo === "add" ? "Add User" : "Update User"}
          </h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <AddUserForm />
      </div>
    </>
  );
};

export default AddUser;
