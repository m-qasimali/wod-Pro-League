/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers, setSelectedUsers } from "../../redux/userSlice";
import Checkbox from "./Checkbox";

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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    let filteredUsers = users;

    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    if (filters.weight !== "") {
      filteredUsers = filteredUsers.filter((user) => {
        if (filters.weightSize === "=") {
          return +user.weight === +filters.weight;
        } else if (filters.weightSize === ">") {
          return +user.weight > +filters.weight;
        }
        return +user.weight < +filters.weight;
      });
    }

    if (filters.workout !== "") {
      filteredUsers = filteredUsers.filter((user) => {
        return activeWorkouts[filters.workout]?.users?.includes(user?.id);
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
    const newUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    dispatch(setSelectedUsers(newUsers));
  };

  const isAllSelected =
    usersToDisplay.length > 0 && selectedUsers.length === usersToDisplay.length;

  if (loading || loadingActiveWorkouts) {
    return <Loader />;
  }

  return (
    <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-10rem)]">
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
                Weight
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
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                      id={user.id}
                    />
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-full w-full rounded-full"
                          src={user?.profileImage}
                          alt="Profile"
                        />
                      </div>
                      <div className="text-sm font-medium whitespace-nowrap">
                        {user?.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-nowrap">{user?.email}</td>
                  <td className="px-6 py-2 text-nowrap">{user?.weight}</td>
                  <td className="px-6 py-2 text-nowrap">{user?.teamName}</td>
                  <td className="px-6 py-2 text-nowrap flex flex-col gap-2 items-center">
                    <Link
                      to={`/users/${user?.id}/wods`}
                      state={{ userName: user?.name }}
                      className="whitespace-nowrap text-xs underline text-red-400"
                    >
                      View Workouts
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
