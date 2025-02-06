import Loader from "@/components/global/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatTimeStamp } from "@/utils/functions";
import { getReports } from "@/redux/features/report/reportThunk";

const ReportsTable = () => {
  const { reports, gettingReports } = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReports());
  }, []);

  if (gettingReports) {
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
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  subject
                </th>
                <th scope="col" className="px-6 py-3 text-wrap">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Reported At
                </th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report) => {
                return (
                  <tr
                    key={report?.id}
                    className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                  >
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <div className="text-sm  whitespace-nowrap">
                            {report?.name} {report?.sirName}
                          </div>
                          <div className="text-sm  whitespace-nowrap">
                            {report?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-2 text-nowrap">
                      {report?.phoneNumber}
                    </td>
                    <td className="px-6 py-2">{report?.subject}</td>
                    <td className="px-6 py-2 text-wrap">
                      {report?.description}
                    </td>

                    <td className="px-6 py-2 text-nowrap">
                      {report?.createdAt
                        ? formatTimeStamp(report?.createdAt)
                        : "N/A"}
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

export default ReportsTable;
