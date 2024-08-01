/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../components/global/icons";
import { useEffect } from "react";
import { getTeamMembers } from "../../../redux/teamSlice";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const TeamMemberPopup = ({ close, team }) => {
  const { teamMembers, loadingMembers, teamMembersError } = useSelector(
    (state) => state.team
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (team) {
      dispatch(getTeamMembers(team.id));
    }
  }, [team, dispatch]);

  if (teamMembersError) {
    toast.error(teamMembersError);
    return;
  }

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black opacity-50"
      ></div>
      <div className="w-full sm:w-96 h-1/2 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between border-b-2 p-4 pb-2">
          <h1 className="text-xl font-bold text-gray-800">{team?.teamName}</h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        {loadingMembers ? (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <HashLoader color="#B6B5FF" size={50} loading={true} />
          </div>
        ) : (
          <div className="p-4 overflow-auto scrollbar-hide">
            <div className="flex flex-col gap-4">
              {teamMembers[team.id]?.map((member) => (
                <div
                  key={member?.id}
                  className="flex flex-row items-center gap-4"
                >
                  {member?.profileImage ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={member?.profileImage}
                        className="w-full h-full"
                        alt="member profile"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  )}
                  <div>
                    <h1 className="text-lg font-bold">{member?.name}</h1>
                    <p className="text-sm text-textSecondary">
                      {member?.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamMemberPopup;
