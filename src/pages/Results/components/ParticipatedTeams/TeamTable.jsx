import Checkbox from "@/components/global/Checkbox";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const TeamTable = () => {
  const { workoutId } = useParams();
  const { workoutTeams } = useSelector((state) => state.results);
  return (
    <>
      <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
        <div className="overflow-x-auto flex-1 custom-scrollbar scrollbar-hide">
          <table className="w-full text-sm text-left relative">
            <thead className="text-lg uppercase text-textSecondary bg-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <Checkbox
                    // checked={isAllSelected}
                    // onChange={handleSelectAll}
                    id={"selectAll"}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  UploadedBy
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Points
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {workoutTeams[workoutId]?.map((user) => {
                return (
                  <tr
                    key={user?.userId}
                    className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                  >
                    <td className="px-6 py-2">
                      <Checkbox
                        // checked={selectedUsers?.includes(user?.id)}
                        // onChange={() => handleCheckboxChange(user?.id)}
                        id={user.id}
                      />
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user?.teamBanner ? (
                            <img
                              className="h-full w-full rounded-full"
                              src={user?.profilePicture}
                              alt="Profile"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap">
                          {user?.teamName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-nowrap">{user?.category}</td>
                    <td className="px-6 py-2 text-nowrap">
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td className="px-6 py-2 text-nowrap">{user?.points}</td>
                    <td className="px-6 py-2 text-nowrap">{user?.rank}</td>
                    <td className="px-6 py-2 text-nowrap">
                      {user?.video?.status === "approved" ? (
                        <span className="text-green-500">Approved</span>
                      ) : (
                        user?.video?.status === "pending" && (
                          <span className="text-yellow-500">Pending</span>
                        )
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {user?.video?.docId && (
                        <div className="flex flex-row items-center gap-2">
                          <Link
                            to={`${user?.video?.docId}`}
                            className="whitespace-nowrap text-xs underline text-red-400"
                          >
                            View Videos
                          </Link>
                        </div>
                      )}
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

export default TeamTable;
