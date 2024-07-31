import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import { useDispatch } from "react-redux";
import { setTeamSearchQuery } from "../../redux/teamSlice";
import TeamsTable from "../../components/global/TeamsTable";

const Teams = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTeamSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Teams</p>
        <div className="flex flex-row justify-end my-4">
          <div className="w-full sm:w-auto">
            <SearchField state={searchValue} setState={setSearchValue} />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar">
        <TeamsTable />
      </div>
    </div>
  );
};

export default Teams;
