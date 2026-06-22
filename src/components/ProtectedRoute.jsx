// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import Spinner from "./Spinner";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="flex min-h-[50vh] items-center justify-center">
//         <Spinner loading={loading} />
//       </div>
//     );
//   }

//   if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

//   return children;
// };

// export default ProtectedRoute;
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

  // 1. If the user is not logged in, redirect to login page
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // 2. Extract the role from Supabase app_metadata (fall back to 'user' if not found)
  const userRole = user.app_metadata?.role || "user";

  // 3. If specific roles are required, and the user doesn't have them, block access
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
