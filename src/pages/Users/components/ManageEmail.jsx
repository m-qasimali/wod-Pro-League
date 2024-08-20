/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../../../components/global/icons";
import Spinner from "../../../components/global/Spinner";
import { useSelector } from "react-redux";
import Input from "../../../components/global/Input";
import toast from "react-hot-toast";
import { sendMails } from "../../../utils/DBFunctions";

const initialState = {
  subject: "",
  body: "",
};

const ManageEmail = ({ close }) => {
  const [data, setData] = useState(initialState);
  const { users, selectedUsers } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (data.subject === "" || data.body === "") {
      toast.error("Please fill all fields");
      return;
    }
    const filteredUsers = [];
    selectedUsers.forEach((user) => {
      users.forEach((u) => {
        if (u.id === user) {
          if (u?.email?.trim()) {
            filteredUsers.push(u.email.trim());
          }
        }
      });
    });

    try {
      setLoading(true);
      const res = await sendMails({
        emails: filteredUsers,
        subject: data.subject,
        body: data.body,
      });

      if (res.status === 200) {
        toast.success("Email sent successfully");
        close();
      } else {
        toast.error("Error sending email");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error sending email");
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
            Manage Send Email
          </h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <Input
            labelValue={"Subject"}
            type={"text"}
            value={data.subject}
            onChange={handleChange}
            disabled={loading}
            placeholder="Email Subject"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="font-semibold">
              Email Body
            </label>
            <textarea
              name="body"
              id="body"
              value={data.body}
              onChange={handleChange}
              className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary resize-none"
              rows={8}
              disabled={loading}
              placeholder="Email Body"
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

export default ManageEmail;
