import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserFilters,
  setUserSearchQuery,
  setUserToEdit,
} from "../../redux/userSlice";
import UserFilter from "../../components/global/UserFilter";
import CustomButton from "../../components/global/CustomButton";
import ManageNotification from "./components/ManageNotification";
import ManageEmail from "./components/ManageEmail";
import AddButton from "@/components/global/AddButton";
import { lockScroll, unlockScroll } from "@/utils/functions";
import AddUser from "./components/AddUser";
import UsersTable from "./components/UsersTable";
import EditUser from "./components/EditUser";
import ExportButton from "./components/ExportButton";

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.user);
  const [sendNotification, setSendNotification] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const { userToEdit } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUserSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    return () => {
      dispatch(
        setUserFilters({
          category: "",
          workout: "",
        })
      );
    };
  }, [dispatch]);

  const handleSendNotification = () => {
    setSendNotification(true);
  };

  const handleSendEmail = () => {
    setSendEmail(true);
  };

  const closeSendNotification = () => {
    setSendNotification(false);
  };

  const closeSendEmail = () => {
    setSendEmail(false);
  };

  const openAddUser = () => {
    setAddUser(true);
    lockScroll();
  };

  const closeAddUser = () => {
    setAddUser(false);
    unlockScroll();
  };

  const closeEditUser = () => {
    dispatch(setUserToEdit(null));
    unlockScroll();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Users</p>
        <div className="flex flex-col sm:flex-row justify-between my-4 gap-2">
          <div className="flex flex-row gap-2">
            <div className="w-full sm:w-auto">
              <SearchField state={searchValue} setState={setSearchValue} />
            </div>
            <UserFilter />
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex flex-row gap-2">
              <CustomButton
                title="Send Notification"
                onClick={handleSendNotification}
              />
              <CustomButton title="Send Email" onClick={handleSendEmail} />
            </div>
          )}

          <div className="flex flex-row gap-2">
            <ExportButton />

            <div onClick={openAddUser}>
              <AddButton />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0">
        <UsersTable />
      </div>

      {sendNotification && <ManageNotification close={closeSendNotification} />}
      {sendEmail && <ManageEmail close={closeSendEmail} />}
      {addUser && <AddUser close={closeAddUser} toDo="add" />}
      {userToEdit && (
        <EditUser selectedUser={userToEdit} close={closeEditUser} toDo="edit" />
      )}
    </div>
  );
};

export default Users;
