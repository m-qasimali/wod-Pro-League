import { Icons } from "@/components/global/icons";
import Loader from "@/components/global/Loader";
import { getUsers, setSelectedUsers, setUserToEdit } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lockScroll } from "@/utils/functions";
import Checkbox from "@/components/global/Checkbox";

const UsersTable = () => {
  const { loading, users, searchQuery, filters } = useSelector(
    (state) => state.user
  );
  const { loadingActiveWorkouts, activeWorkouts } = useSelector(
    (state) => state.workout
  );
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const { selectedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    let filteredUsers = users;

    if (searchQuery) {
      filteredUsers = filteredUsers?.filter(
        (user) =>
          user?.firstName
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters.category) {
      filteredUsers = filteredUsers?.filter((user) => {
        return filters.category
          ?.toLowerCase()
          ?.includes(user?.categoryName?.toLowerCase());
      });
    }

    if (filters.workout !== "") {
      filteredUsers = filteredUsers?.filter((user) => {
        return activeWorkouts[filters?.workout]?.users?.includes(user?.id);
      });
    }

    setUsersToDisplay(filteredUsers);
  }, [searchQuery, users, filters, activeWorkouts, dispatch]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = usersToDisplay.map((user) => user.id);
      dispatch(setSelectedUsers(allUserIds));
    } else {
      dispatch(setSelectedUsers([]));
    }
  };

  const handleCheckboxChange = (userId) => {
    const newUsers = selectedUsers?.includes(userId)
      ? selectedUsers?.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    dispatch(setSelectedUsers(newUsers));
  };

  const openEditUser = (user) => {
    dispatch(setUserToEdit(user));
    lockScroll();
  };

  const isAllSelected =
    usersToDisplay.length > 0 && selectedUsers.length === usersToDisplay.length;

  if (loading || loadingActiveWorkouts) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
        <div className="overflow-x-auto flex-1 custom-scrollbar scrollbar-hide">
          <table className="w-full text-sm text-left relative">
            <thead className="text-lg uppercase text-textSecondary bg-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    id={"selectAll"}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Result
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Team Name
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
                    key={user?.id}
                    className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                  >
                    <td className="px-6 py-2">
                      <Checkbox
                        checked={selectedUsers?.includes(user?.id)}
                        onChange={() => handleCheckboxChange(user?.id)}
                        id={user.id}
                      />
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user?.profileImage ? (
                            <img
                              className="h-full w-full rounded-full"
                              src={user?.profileImage}
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
                    <td className="px-6 py-2 text-nowrap">{user?.email}</td>
                    <td className="px-6 py-2 text-nowrap">
                      {`${user?.totalApprovedWorkouts}/${user?.totalRegisteredWorkouts}`}
                    </td>
                    <td className="px-6 py-2 text-nowrap">{user?.teamName}</td>
                    <td className="px-6 py-2">
                      <div className="flex flex-row items-center gap-2">
                        {admin.role !== "secondary" && (
                          <button
                            onClick={() => openEditUser(user)}
                            className="hover:bg-opacity-80 flex flex-row items-center justify-center p-1 rounded-full  hover:shadow-lg"
                          >
                            <Icons.Edit className="w-5 text-primary" />
                          </button>
                        )}
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

export default UsersTable;
