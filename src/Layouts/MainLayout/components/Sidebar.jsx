import { useEffect, useState } from "react";
import { Icons } from "../../../components/global/icons";
import Logo from "../../../assets/images/Logo.png";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const Sidebar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <aside
      className={`fixed top-0 left-0 z-30 w-72 pt-16 h-screen transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white sm:translate-x-0 shadow-custom-lg`}
      aria-label="Sidebar"
    >
      <div className="h-full mx-6 pb-4 overflow-y-auto flex flex-col items-center">
        <div className="flex flex-row items-center justify-center w-52">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="w-full flex flex-col gap-2 mt-10">
          <MenuItem
            icon={Icons.WorkoutIcon}
            menuName={"Workouts"}
            activeMenu={activeMenu}
          />
          <MenuItem
            icon={Icons.VideoIcon}
            menuName={"Users"}
            activeMenu={activeMenu}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
