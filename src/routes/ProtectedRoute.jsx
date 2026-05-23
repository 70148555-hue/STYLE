import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;

  const { currentUser } = auth;

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;