import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/dashboardSlice";
import Loader from "../../components/global/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalUsers,
    totalTeams,
    singlePersonTeams,
    twoPersonTeams,
    fourPersonTeams,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-text">{error}</p>;
  }

  return (
    <div className="text-text">
      <h1 className="font-semibold text-xl text-black/60">Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-5">
        <div className="flex flex-col gap-4 p-5 w-full border rounded-lg">
          <p className="text-lg text-textSecondary">Total Users</p>
          <p className="font-semibold text-4xl">{totalUsers}</p>
        </div>

        <div className="flex flex-col gap-4 p-5 w-full border rounded-lg">
          <p className="text-lg text-textSecondary">Total Teams</p>
          <p className="font-semibold text-4xl">{totalTeams}</p>
        </div>
        <div className="flex flex-col gap-4 p-5 w-full border rounded-lg">
          <p className="text-lg text-textSecondary">Single Person Teams</p>
          <p className="font-semibold text-4xl">{singlePersonTeams}</p>
        </div>

        <div className="flex flex-col gap-4 p-5 w-full border rounded-lg">
          <p className="text-lg text-textSecondary">Two Person Teams</p>
          <p className="font-semibold text-4xl">{twoPersonTeams}</p>
        </div>
        <div className="flex flex-col gap-4 p-5 w-full border rounded-lg">
          <p className="text-lg text-textSecondary">Four Person Teams</p>
          <p className="font-semibold text-4xl">{fourPersonTeams}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
