/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Icons } from "../../../components/global/icons";
import Spinner from "../../../components/global/Spinner";
import { useState } from "react";

const initialState = {
  content: "",
};

const ManageNotification = ({ close }) => {
  const loading = false;
  const [data, setData] = useState(initialState);
  const { users, selectedUsers } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const filteredUsers = [];
    selectedUsers.forEach((user) => {
      users.forEach((u) => {
        if (u.id === user) {
          filteredUsers.push(u);
        }
      });
    });

    console.log(filteredUsers);
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
            Send Notification
          </h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold">
              Notification Content
            </label>
            <textarea
              name="content"
              id="content"
              className="w-full outline-none border border-black focus:border-primary rounded-md resize-none p-2"
              rows={8}
              value={data.content}
              onChange={handleChange}
              //   disabled={loading}
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          //   disabled={loading}
          className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
        >
          {loading ? <Spinner /> : "Send"}
        </button>
      </div>
    </>
  );
};

export default ManageNotification;
