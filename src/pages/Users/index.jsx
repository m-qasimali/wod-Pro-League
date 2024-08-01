import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import { useDispatch } from "react-redux";
import { setUserFilters, setUserSearchQuery } from "../../redux/userSlice";
import UsersTable from "../../components/global/UsersTable";
import UserFilter from "../../components/global/UserFilter";
import UpdateWeightPopup from "../../components/global/EditWeightPopup";

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showEditWeightPopup, setShowEditWeightPopup] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    return () => {
      dispatch(
        setUserFilters({
          weightSize: "=",
          weight: "",
          workout: "",
        })
      );
    };
  }, [dispatch]);

  const handleCloseEditWeightPopup = () => {
    setShowEditWeightPopup(null);
  };

  const handleUpdate = (user) => {
    setShowEditWeightPopup(user);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Users</p>
        <div className="flex flex-row justify-between my-4">
          <UserFilter />
          <div className="w-full sm:w-auto">
            <SearchField state={searchValue} setState={setSearchValue} />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0">
        <UsersTable handleUpdate={handleUpdate} />
      </div>

      {showEditWeightPopup && (
        <UpdateWeightPopup
          item={showEditWeightPopup}
          close={handleCloseEditWeightPopup}
        />
      )}
    </div>
  );
};

export default Users;
