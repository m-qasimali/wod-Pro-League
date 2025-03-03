import { useEffect, useState } from "react";
import SearchField from "../../components/global/SearchField";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSearchQuery } from "../../redux/adminsSlice";
import AdminsTable from "../../components/global/AdminsTable";
import AddAdmin from "./components/AddAdmin";
import AddButton from "../../components/global/AddButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/global/Loader";
// import { setTeamSearchQuery } from "../../redux/teamSlice";

const ManageAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [addAdmin, setAddAdmin] = useState(false);
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!admin || admin.role !== "primary") {
      navigate("*", { replace: true });
    } else {
      setPageLoading(false);
    }
  }, [navigate, admin]);

  useEffect(() => {
    dispatch(setAdminSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  if (pageLoading) {
    return <Loader />;
  }

  const openAddAdmin = () => {
    setAddAdmin(true);
  };

  const closeAddAdmin = () => {
    setAddAdmin(false);
  };

  if (admin.role !== "primary") {
    navigate("*");
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Admins</p>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row justify-start my-4">
            <div className="w-full sm:w-auto">
              <SearchField state={searchValue} setState={setSearchValue} />
            </div>
          </div>
          <button onClick={openAddAdmin}>
            <AddButton />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar">
        <AdminsTable />
      </div>

      {addAdmin && <AddAdmin close={closeAddAdmin} />}
    </div>
  );
};

export default ManageAdmin;
