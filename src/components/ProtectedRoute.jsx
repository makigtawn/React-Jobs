import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  const userRole = user.app_metadata?.role || "user";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
