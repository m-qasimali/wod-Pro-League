import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/dashboardSlice";
import Loader from "../../components/global/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalUsers, totalTeams, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-text">Something went wrong...</p>;
  }

  return (
    <div className="text-text">
      <h1 className="font-semibold text-xl text-black/60">Stats</h1>
      <div className="flex flex-row gap-6 mt-5">
        <div className="flex flex-col gap-4 p-5 w-52 border rounded-lg">
          <p className="text-lg text-textSecondary">Total Users</p>
          <p className="font-semibold text-4xl">{totalUsers}</p>
        </div>

        <div className="flex flex-col gap-4 p-5 w-52 border rounded-lg">
          <p className="text-lg text-textSecondary">Total Teams</p>
          <p className="font-semibold text-4xl">{totalTeams}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
