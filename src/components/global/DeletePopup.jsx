/* eslint-disable react/prop-types */
import { Icons } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout } from "../../redux/workoutSlice";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const DeletePopup = ({ close, title, item, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.workout);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWorkout(id)).unwrap();
      toast.success(`${item} ${title} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${item} ${title}`);
    } finally {
      close();
    }
  };

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
              onClick={handleDelete}
              disabled={loading}
              className="bg-primary hover:bg-opacity-80 p-2 rounded-lg text-white w-full"
            >
              {loading ? <Spinner /> : "Yes"}
            </button>
            <button
              onClick={close}
              disabled={loading}
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
