/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Icons } from "../../../components/global/icons";
import Spinner from "../../../components/global/Spinner";
import { useState } from "react";
import Input from "../../../components/global/Input";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  body: "",
};

const ManageNotification = ({ close }) => {
  const [data, setData] = useState(initialState);
  const { users, selectedUsers } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (data.title === "" || data.body === "") {
      toast.error("Please fill all fields");
      return;
    }

    const filteredUsers = [];
    if (selectedUsers.length !== users.length) {
      selectedUsers.forEach((user) => {
        users.forEach((u) => {
          console.log(u);
          if (u.id === user) {
            if (u?.token?.trim()) {
              filteredUsers.push(u?.token.trim());
            }
          }
        });
      });

      if (filteredUsers.length === 0) {
        toast.error("No notification token found");
        return;
      }
    }

    try {
      setLoading(true);
      let res = null;
      if (selectedUsers.length === users.length) {
        res = await fetch(
          `${
            import.meta.env.VITE_NODE_SERVER_URL
          }/user/send-topic-notification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.title,
              body: data.body,
            }),
          }
        );
      } else {
        res = await fetch(
          `${import.meta.env.VITE_NODE_SERVER_URL}/user/sendNotification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: filteredUsers,
              title: data.title,
              body: data.body,
            }),
          }
        );
      }

      if (res.status === 200) {
        toast.success("Notification sent successfully");
        close();
      } else {
        toast.error("Error sending notification");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error sending notification");
    } finally {
      setData(initialState);
    }
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
            Manage Send Notification
          </h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <Input
            labelValue={"Title"}
            type={"text"}
            value={data.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Notification Title"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="font-semibold">
              Notification Body
            </label>
            <textarea
              name="body"
              id="body"
              value={data.body}
              onChange={handleChange}
              className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary resize-none"
              rows={8}
              disabled={loading}
              placeholder="Notification Body"
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
        >
          {loading ? <Spinner /> : "Send"}
        </button>
      </div>
    </>
  );
};

export default ManageNotification;
