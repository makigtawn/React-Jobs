import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Spinner from "./Spinner";

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );
  }

  if (user) return <Navigate to="/jobs" replace />;

  return children;
};

export default PublicOnlyRoute;
