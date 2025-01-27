/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  if (!admin.id) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
