import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-screen min-h-screen bg-background">
      {viewWidth < 768 && (
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className={`sm:ml-72 px-3 sm:px-6 ${viewWidth < 768 ? "pt-20" : "pt-5"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
