import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTeams, setTeamToEdit } from "../../../redux/teamSlice";
import { Icons } from "../../../components/global/icons";
import TeamMemberPopup from "./TeamMemberPopup";
import Loader from "../../../components/global/Loader";
import CategoryEditPopup from "./CategoryEditPopup";
import { lockScroll } from "@/utils/functions";

const TeamsTable = () => {
  const { loading, teams, searchQuery } = useSelector((state) => state.team);
  const [teamsToDisplay, setTeamsToDisplay] = useState([]);
  const [showTeam, setShowTeam] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = teams.filter(
        (team) =>
          team?.category?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
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

  const handleShowEditCategory = (team) => {
    setSelectedTeam(team);
    setShowEditCategory(true);
  };

  const closeShowEditCategory = () => {
    setShowEditCategory(false);
  };

  const closeShowTeam = () => {
    setShowTeam(false);
  };

  const openEditTeam = (team) => {
    dispatch(setTeamToEdit(team));
    lockScroll();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative sm:rounded-lg bg-white border-2 border-black border-opacity-20 overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-13rem)] custom-scrollbar scrollbar-hide">
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
                  <td className="px-6 py-2">
                    <div className="flex flex-row gap-2">
                      <img
                        src={Icons.EditIcon}
                        className="w-6 h-6 bg-primary p-1 rounded-full cursor-pointer"
                        alt="edit category"
                        onClick={() => handleShowEditCategory(team)}
                      />
                      <p className="text-nowrap">{team?.teamCategory}</p>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-nowrap">{team?.teamOwner}</td>
                  <td className="px-6 py-2 text-nowrap">
                    {team?.teamOwnerEmail}
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row items-center gap-2">
                      <button
                        onClick={() => openEditTeam(team)}
                        className="hover:bg-opacity-80 flex flex-row items-center justify-center p-1 rounded-full  hover:shadow-lg"
                      >
                        <Icons.Edit className="w-5 text-primary" />
                      </button>
                      <button
                        onClick={() => handleShowTeam(team)}
                        className="whitespace-nowrap text-xs underline text-red-400"
                      >
                        View Members
                      </button>
                    </div>
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

      {showEditCategory && (
        <CategoryEditPopup close={closeShowEditCategory} team={selectedTeam} />
      )}
    </div>
  );
};

export default TeamsTable;
