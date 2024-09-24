import { Navigate } from "react-router-dom";

export const ProtectedRouteUser = ({ element }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export const ProtectedRouteEmployee = ({ element }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/employee/login" replace />;
  }

  return element;
};
