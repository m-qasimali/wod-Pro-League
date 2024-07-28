import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Table = () => {
  const { loading, users, searchQuery } = useSelector((state) => state.user);
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = users.filter(
        (user) =>
          user?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      setUsersToDisplay(filteredUsers);
    } else {
      setUsersToDisplay(users);
    }
  }, [searchQuery, users]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-10rem)]">
        <table className="w-full text-sm text-left relative">
          <thead className="text-lg uppercase text-textSecondary bg-white sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
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
                  <td className="px-6 py-2">{user?.email}</td>
                  <td className="px-6 py-2">
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

export default Table;
