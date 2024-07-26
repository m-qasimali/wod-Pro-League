/* eslint-disable react/prop-types */
import { Icons } from "../../../components/global/icons";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-white shadow-custom-lg">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-background focus:outline-none"
            >
              {isSidebarOpen ? (
                <Icons.CloseSidebarIcon className="w-6 h-6" />
              ) : (
                <Icons.OpenSidebarIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-primary"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
