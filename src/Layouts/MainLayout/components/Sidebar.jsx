/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Icons } from "../../../components/global/icons";
import Logo from "../../../assets/images/Logo.png";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { clearRole } from "../../../utils/functions";
import { useSelector } from "react-redux";

const Sidebar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const { role } = useSelector((state) => state.admin.admin);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    clearRole();
    window.location.replace("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 w-72 h-screen transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white sm:translate-x-0 shadow-custom-lg`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col">
        {/* Fixed Header */}
        <div className="px-6 pt-16 md:pt-5 pb-5">
          <div className="flex flex-row items-center justify-center w-32 rounded-lg">
            <img src={Logo} className="w-full h-full rounded-full" alt="Logo" />
          </div>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 px-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-2">
            {role === "primary" && (
              <>
                <MenuItem
                  Icon={Icons.Dashboard}
                  menuName={"Dashboard"}
                  activeMenu={activeMenu}
                />
                <MenuItem
                  Icon={Icons.WorkoutIcon}
                  menuName={"Workouts"}
                  activeMenu={activeMenu}
                />
              </>
            )}

            <MenuItem
              Icon={Icons.Users}
              menuName={"Users"}
              activeMenu={activeMenu}
            />

            <MenuItem
              Icon={Icons.Results}
              menuName={"Results"}
              activeMenu={activeMenu}
            />

            {role === "primary" && (
              <>
                <MenuItem
                  Icon={Icons.Teams}
                  menuName={"Teams"}
                  activeMenu={activeMenu}
                />
                <MenuItem
                  Icon={Icons.Admins}
                  menuName={"Admins"}
                  activeMenu={activeMenu}
                />
                <MenuItem
                  Icon={Icons.Coupon}
                  menuName={"Coupons"}
                  activeMenu={activeMenu}
                />
                <MenuItem
                  Icon={Icons.Approvals}
                  menuName={"Approvals"}
                  activeMenu={activeMenu}
                />
                <MenuItem
                  Icon={Icons.Reports}
                  menuName={"Reports"}
                  activeMenu={activeMenu}
                />
              </>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 pb-4">
          <button
            onClick={handleLogout}
            className="flex flex-row w-full items-center gap-3 p-3 rounded-lg hover:bg-primary hover:bg-opacity-15 focus:bg-primary focus:bg-opacity-15 cursor-pointer"
          >
            <div className="h-7">
              <Icons.Logout className="w-full h-full" />
            </div>
            <p className="text-xl">Logout</p>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
