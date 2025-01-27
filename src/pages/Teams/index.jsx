import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import { useDispatch, useSelector } from "react-redux";
import { setTeamSearchQuery, setTeamToEdit } from "../../redux/teamSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/global/Loader";
import TeamsTable from "./components/TeamsTable";
import AddButton from "@/components/global/AddButton";
import { lockScroll, unlockScroll } from "@/utils/functions";
import ManageTeam from "./components/ManageTeam";
import JoinTeamMember from "./components/JoinTeamMember";
import EditTeam from "./components/EditTeam";

const Teams = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);
  const [pageLoading, setPageLoading] = useState(true);
  const [addTeam, setAddTeam] = useState(false);
  const [addTeamMember, setAddTeamMember] = useState(false);
  const { teamToEdit } = useSelector((state) => state.team);

  useEffect(() => {
    if (!admin || admin.role !== "primary") {
      navigate("*", { replace: true });
    } else {
      setPageLoading(false);
    }
  }, [navigate, admin]);

  useEffect(() => {
    dispatch(setTeamSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  const openAddTeam = () => {
    setAddTeam(true);
    lockScroll();
  };

  const closeAddTeam = () => {
    setAddTeam(false);
    unlockScroll();
  };

  const openAddTeamMember = () => {
    setAddTeamMember(true);
    lockScroll();
  };

  const closeAddTeamMember = () => {
    setAddTeamMember(false);
    unlockScroll();
  };

  const closeEditTeam = () => {
    dispatch(setTeamToEdit(null));
    unlockScroll();
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Teams</p>
        <div className="flex flex-row justify-end my-4 gap-4">
          <div className="w-full sm:w-auto">
            <SearchField state={searchValue} setState={setSearchValue} />
          </div>

          <div onClick={openAddTeamMember}>
            <AddButton title="Add Member" />
          </div>

          <div onClick={openAddTeam}>
            <AddButton />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar">
        <TeamsTable />
      </div>

      {addTeam && <ManageTeam close={closeAddTeam} toDo="add" />}

      {addTeamMember && (
        <JoinTeamMember close={closeAddTeamMember} toDo="add" />
      )}

      {teamToEdit && <EditTeam team={teamToEdit} close={closeEditTeam} />}
    </div>
  );
};

export default Teams;
