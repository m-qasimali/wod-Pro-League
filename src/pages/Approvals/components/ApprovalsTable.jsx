import { Icons } from "@/components/global/icons";
import Loader from "@/components/global/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Checkbox from "@/components/global/Checkbox";
import { approveRequest, getApprovals } from "@/redux/approvalSlice";
import { formatDate, formatTimeStamp } from "@/utils/functions";
import toast from "react-hot-toast";

const ApprovalsTable = () => {
  const { approvals, gettingApprovals } = useSelector(
    (state) => state.approvals
  );
  const [approving, setApproving] = useState({
    id: "",
    loading: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApprovals());
  }, []);

  const handleApprove = async (id) => {
    try {
      setApproving({ id, loading: true });
      await dispatch(approveRequest(id)).unwrap();
      toast.success("Request approved successfully");
    } catch (error) {
      toast.error("Error approving request");
    } finally {
      setApproving({ id: "", loading: false });
    }
  };

  if (gettingApprovals) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
        <div className="overflow-x-auto flex-1 custom-scrollbar scrollbar-hide">
          <table className="w-full text-sm text-left relative">
            <thead className="text-lg uppercase text-textSecondary bg-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Workout
                </th>
                <th scope="col" className="px-6 py-3 text-wrap">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Requested At
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {approvals?.map((approval) => {
                return (
                  <tr
                    key={approval?.id}
                    className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                  >
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 h-10 w-10">
                          {approval?.user?.profilePicture ? (
                            <img
                              className="h-full w-full rounded-full"
                              src={approval?.user?.profilePicture}
                              alt="Profile"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm  whitespace-nowrap">
                            {approval?.user?.firstName}{" "}
                            {approval?.user?.lastName}
                          </div>
                          <div className="text-sm  whitespace-nowrap">
                            {approval?.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-2 text-nowrap">
                      {approval?.workout?.wodNumber}
                    </td>
                    <td className="px-6 py-2 text-wrap">
                      {approval?.description}
                    </td>
                    <td className="px-6 py-2 text-nowrap">
                      {approval?.user?.teamName || "N/A"}
                    </td>
                    <td className="px-6 py-2 text-nowrap">
                      {approval?.requestTime
                        ? formatTimeStamp(approval?.requestTime)
                        : "N/A"}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => handleApprove(approval?.id)}
                          className="bg-primary text-white p-2 rounded-md hover:bg-primary/50"
                          disabled={approving.id === approval?.id}
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApprovalsTable;
