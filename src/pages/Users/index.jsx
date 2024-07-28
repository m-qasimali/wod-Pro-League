import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import Table from "../../components/global/Table";
import { useDispatch } from "react-redux";
import { setUserSearchQuery } from "../../redux/userSlice";

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Users</p>
        <div className="flex flex-row justify-end my-4">
          <div className="w-full sm:w-auto">
            <SearchField state={searchValue} setState={setSearchValue} />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar">
        <Table />
      </div>
    </div>
  );
};

export default Users;
