import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAdmins } from "../../redux/adminsSlice";
import DeleteAdminPopup from "./DeleteAdminPopup";

const AdminsTable = () => {
  const { admins, loadingAdmins, loadingAdminsError, searchQuery } =
    useSelector((state) => state.admins);
  const [adminsToDisplay, setAdminsToDisplay] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filteredAdmins = admins.filter(
        (admin) =>
          admin?.fullName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          admin?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      setAdminsToDisplay(filteredAdmins);
    } else {
      setAdminsToDisplay(admins);
    }
  }, [admins, searchQuery]);

  const handleDeleteAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowDeletePopup(true);
  };

  const closeDeleteAdmin = () => {
    setShowDeletePopup(false);
  };

  if (loadingAdmins) {
    return <Loader />;
  }

  if (loadingAdminsError) {
    console.log(loadingAdminsError);

    return <div>Error loading admins</div>;
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adminsToDisplay?.map((admin) => {
              return (
                <tr
                  key={admin?.id}
                  className="bg-white border-b hover:bg-primary hover:bg-opacity-15"
                >
                  <td className="px-6 py-2 text-nowrap">
                    <div className="text-sm font-medium whitespace-nowrap">
                      {admin?.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-2 text-nowrap">{admin?.email}</td>
                  <td className="px-6 py-2 text-nowrap">{admin?.createdAt}</td>

                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="whitespace-nowrap text-xs underline text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showDeletePopup && (
        <DeleteAdminPopup
          close={closeDeleteAdmin}
          title="Admin"
          item={selectedAdmin.fullName}
          id={selectedAdmin?.id}
        />
      )}
    </div>
  );
};

export default AdminsTable;
