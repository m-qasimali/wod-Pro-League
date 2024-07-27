/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.admin);

  if (user.uid) {
    return <Navigate to="/workouts" />;
  } else {
    return children;
  }
};

export default PublicRoute;
