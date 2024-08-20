/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../components/global/icons";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { getFreeCouponsUsers } from "../../../redux/couponSlice";

const FreeUsersPopup = ({ close, coupon }) => {
  const { freeUsers, loading, error } = useSelector(
    (state) => state.couponUsers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon) {
      if (freeUsers[coupon]) return;
      dispatch(getFreeCouponsUsers({ couponName: coupon }));
    }
  }, [dispatch, coupon, freeUsers]);

  // Use useEffect to trigger the toast on error after render
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black opacity-50"
      ></div>
      <div className="w-full h-1/2 overflow-auto sm:w-96 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between border-b-2 p-4 pb-2">
          <div className="flex flex-row items-center">
            <h1 className="text-xl font-bold text-gray-800">{coupon}</h1>
            <span className="text-sm">
              ({freeUsers[coupon] && freeUsers[coupon]?.length})
            </span>
          </div>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <HashLoader color="#B6B5FF" size={50} loading={true} />
          </div>
        ) : (
          <div className="p-4 overflow-auto">
            <div className="flex flex-col gap-4">
              {freeUsers[coupon]?.map((user) => (
                <div
                  key={user?.userId}
                  className="flex flex-row items-center gap-4"
                >
                  {user?.profileImage ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={user?.profileImage}
                        className="w-full h-full object-cover"
                        alt="member profile"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  )}
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold">{user?.fullName}</h1>
                    <p className="text-sm text-textSecondary truncate max-w-xs">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FreeUsersPopup;
