/* eslint-disable react/prop-types */
import { Icons } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Input from "./Input";
import { useState } from "react";
import { updateUserWeight } from "../../redux/userSlice";

const UpdateWeightPopup = ({ close, item }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(item?.weight || 0);
  const { updatingUserWeight } = useSelector((state) => state.user);

  const handleUpdate = async () => {
    if (weight === item?.weight) return;
    await dispatch(
      updateUserWeight({
        userId: item.id,
        weight,
      })
    ).unwrap();
    setWeight(item?.weight || 0);
    close();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:h-auto w-80 sm:w-96 bg-white border border-primary z-50 rounded-xl shadow-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">
            Update {item?.name} Weight
          </h1>

          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="border"></div>

        <div className="p-6 flex flex-col gap-4 h-auto sm:max-h-96 overflow-auto scrollbar-hide">
          <Input
            labelValue="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={updatingUserWeight}
          />

          <div className="flex flex-row gap-4">
            <button
              onClick={handleUpdate}
              disabled={updatingUserWeight}
              className="bg-primary hover:bg-opacity-80 p-2 rounded-lg text-white w-full flex items-center justify-center"
            >
              {updatingUserWeight ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateWeightPopup;
