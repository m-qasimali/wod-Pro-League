import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTeams } from "../../redux/teamSlice";
import TeamMemberPopup from "../../pages/Teams/components/TeamMemberPopup";

const TeamsTable = () => {
  const { loading, teams, searchQuery } = useSelector((state) => state.team);
  const [teamsToDisplay, setTeamsToDisplay] = useState([]);
  const [showTeam, setShowTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

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

  const handleShowTeam = (team) => {
    setSelectedTeam(team);
    setShowTeam(true);
  };

  const closeShowTeam = () => {
    setShowTeam(false);
  };

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
                Creator Email
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
                  <td className="px-6 py-2 text-nowrap">
                    <div className="text-sm font-medium whitespace-nowrap">
                      {team?.teamName}
                    </div>
                  </td>
                  <td className="px-6 py-2 text-nowrap">
                    {team?.teamCategory}
                  </td>
                  <td className="px-6 py-2 text-nowrap">{team?.teamOwner}</td>
                  <td className="px-6 py-2 text-nowrap">
                    {team?.teamOwnerEmail}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleShowTeam(team)}
                      className="whitespace-nowrap text-xs underline text-red-400"
                    >
                      View Members
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showTeam && (
        <TeamMemberPopup close={closeShowTeam} team={selectedTeam} />
      )}
    </div>
  );
};

export default TeamsTable;
