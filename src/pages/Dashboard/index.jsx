import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDashboardStats } from "../../redux/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return <div>Dashboard</div>;
};

export default Dashboard;
