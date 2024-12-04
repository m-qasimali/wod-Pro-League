import Checkbox from "@/components/global/Checkbox";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const UserTable = () => {
  const { workoutId } = useParams();
  const { workoutUsers, searchQuery, filters } = useSelector(
    (state) => state.results
  );
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  useEffect(() => {
    let filteredUsers = workoutUsers[workoutId];

    if (searchQuery) {
      filteredUsers = filteredUsers?.filter((user) =>
        `${user?.firstName} ${user?.lastName}`
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters.category) {
      filteredUsers = filteredUsers?.filter((user) => {
        return filters.category
          ?.toLowerCase()
          ?.includes(user?.category?.toLowerCase());
      });
    }

    if (filters.status !== "") {
      filteredUsers = filteredUsers?.filter((user) => {
        if (filters.status === "approved") {
          return user?.video?.status === "approved";
        } else if (filters.status === "pending") {
          return user?.video?.status === "pending";
        } else if (filters.status === "not submitted") {
          return !user?.video?.status;
        }
      });
    }

    setUsersToDisplay(filteredUsers);
  }, [searchQuery, workoutUsers, workoutId, filters]);

  return (
    <>
      <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
        <div className="overflow-x-auto flex-1 custom-scrollbar scrollbar-hide">
          <p className="text-xs mx-5">Total: {usersToDisplay?.length}</p>
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
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Category
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
              {usersToDisplay?.map((user) => {
                return (
                  <tr
                    key={user?.docId}
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
                          {user?.profilePicture ? (
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
                          {user?.firstName} {user?.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-nowrap">{user?.category}</td>
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

export default UserTable;
