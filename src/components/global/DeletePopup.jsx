import React from "react";
import { Icons } from "./icons";

const DeletePopup = ({ close, title, item }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:h-auto w-80 sm:w-96 bg-white border border-primary z-50 rounded-xl shadow-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-gray-800">Delete {title}</h1>

          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="border"></div>

        <div className="p-6 flex flex-col gap-4 h-auto sm:max-h-96 overflow-auto scrollbar-hide">
          <p className="text-lg">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{item}</span> {title}?
          </p>
          <div className="flex flex-row gap-4">
            <button
              onClick={close}
              className="bg-primary hover:bg-opacity-80 p-2 rounded-lg text-white w-full"
            >
              Yes
            </button>
            <button
              onClick={close}
              className="bg-red-400 hover:bg-opacity-80 p-2 rounded-lg text-white w-full"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
