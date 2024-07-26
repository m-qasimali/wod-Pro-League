/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const MenuItem = ({ activeMenu, icon, menuName }) => {
  return (
    <Link
      to={`/${menuName?.toLowerCase()}`}
      className={`flex flex-row items-center gap-3 p-3 rounded-lg hover:bg-primary hover:bg-opacity-15 focus:bg-primary focus:bg-opacity-15 cursor-pointer ${
        activeMenu?.includes(`/${menuName?.toLowerCase()}`)
          ? "bg-primary bg-opacity-15"
          : ""
      }`}
    >
      <div className="h-7">
        <img src={icon} alt={`${menuName} icon`} className="w-full h-full" />
      </div>
      <p
        className={`text-xl ${
          activeMenu?.includes(`${menuName?.toLowerCase()}`)
            ? "font-semibold"
            : ""
        }`}
      >
        {capitalize(menuName)}
      </p>
    </Link>
  );
};

export default MenuItem;
