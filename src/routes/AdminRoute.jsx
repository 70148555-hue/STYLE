import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;

  const { currentUser } = auth;

  // assuming role stored in user object
  return currentUser?.role === "admin"
    ? children
    : <Navigate to="/dashboard" />;
};

export default AdminRoute;