import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TeamsTable = () => {
  const { loading, teams, searchQuery } = useSelector((state) => state.team);
  const [teamsToDisplay, setTeamsToDisplay] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = teams.filter(
        (team) =>
          team?.categor?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          team?.teamName?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      setTeamsToDisplay(filteredUsers);
    } else {
      setTeamsToDisplay(teams);
    }
  }, [searchQuery, teams]);

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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Creator Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {teamsToDisplay?.map((team) => {
              return (
                <tr
                  key={team?.id}
                  className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                >
                  <td className="px-6 py-2">
                    <div className="text-sm font-medium whitespace-nowrap">
                      {team?.teamName}
                    </div>
                  </td>
                  <td className="px-6 py-2">{team?.teamCategory}</td>
                  <td className="px-6 py-2">{team?.teamOwner}</td>
                  {/* <td className="px-6 py-2">
                    <Link
                      to={`/users/${user?.id}/wods`}
                      state={{ userName: user?.name }}
                      className="whitespace-nowrap text-xs underline text-red-400"
                    >
                      View Workouts
                    </Link>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsTable;
