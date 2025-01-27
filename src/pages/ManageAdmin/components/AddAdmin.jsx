/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../../../components/global/icons";
import Spinner from "../../../components/global/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/global/Input";
import toast from "react-hot-toast";
import PasswordInput from "../../../components/global/PasswordInput";
import { isValidEmail } from "../../../utils/functions";
import { addNewAdmin } from "../../../redux/adminsSlice";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};

const AddAdmin = ({ close }) => {
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const { addingNewAdmin, addingNewAdminError } = useSelector(
    (state) => state.admins
  );

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!data.fullName || !data.email || !data.password) {
      return toast.error("All fields are required");
    }

    if (!isValidEmail(data.email)) {
      return toast.error("Invalid email address");
    }

    if (data.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      await dispatch(addNewAdmin(data)).unwrap();
      toast.success("New admin added successfully");
      close();
    } catch (error) {
      console.log(addingNewAdminError);

      toast.error(error);
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
          <h1 className="text-2xl font-bold text-gray-800">Add New Admin</h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4">
          <Input
            labelValue={"Full Name"}
            type={"text"}
            value={data.fullName}
            onChange={handleChange}
            disabled={addingNewAdmin}
            placeholder="Full Name"
          />

          <Input
            labelValue={"Email"}
            type={"text"}
            value={data.email}
            onChange={handleChange}
            disabled={addingNewAdmin}
            placeholder="Email"
          />

          <PasswordInput
            state={data.password}
            handleChange={handleChange}
            loading={addingNewAdmin}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={addingNewAdmin}
          className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
        >
          {addingNewAdmin ? <Spinner /> : "Add Admin"}
        </button>
      </div>
    </>
  );
};

export default AddAdmin;
