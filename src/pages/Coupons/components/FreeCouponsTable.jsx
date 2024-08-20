import { useState } from "react";
import { FreeCoupons } from "../../../utils/coupons";
import FreeUsersPopup from "./FreeUsersPopup";

const FreeCouponsTable = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleShowUser = (coupon) => {
    setSelectedCoupon(coupon);
    setShowUsers(true);
  };

  const closeShowUsers = () => {
    setShowUsers(false);
  };

  return (
    <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-10rem)]">
        <table className="w-full text-sm text-left relative">
          <thead className="text-lg uppercase text-textSecondary bg-white sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coupon
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {FreeCoupons?.map((coupon) => {
              return (
                <tr
                  key={coupon}
                  className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                >
                  <td className="px-6 py-2 text-nowrap">
                    <div className="text-sm font-medium whitespace-nowrap">
                      {coupon}
                    </div>
                  </td>

                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleShowUser(coupon)}
                      className="whitespace-nowrap text-xs underline text-red-400"
                    >
                      View Users
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showUsers && (
        <FreeUsersPopup close={closeShowUsers} coupon={selectedCoupon} />
      )}
    </div>
  );
};

export default FreeCouponsTable;
