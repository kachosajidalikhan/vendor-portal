// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/useAuth";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
