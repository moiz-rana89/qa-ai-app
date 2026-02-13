import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getDefaultRouteForRole } from "../utils/roleHelpers";

export default function ProtectedRoute({ children, requiredRoles }) {
  const { isAuthenticated, user, isAuthInitialized } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (!isAuthInitialized) return null; // show loader if needed

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRoles?.length) {
    const userRole = user?.role;

    if (!userRole || !requiredRoles.includes(userRole)) {
      const defaultRoute = getDefaultRouteForRole(userRole);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return children;
}
