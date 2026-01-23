import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getDefaultRouteForRole } from "../utils/roleHelpers";

export default function ProtectedRoute({ children, requiredRoles }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const userDetails = localStorage.getItem("user_details");

    if (!userDetails) {
      return (
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      );
    }

    try {
      const user = JSON.parse(userDetails);
      const userRole = user?.role;

      if (!userRole || !requiredRoles.includes(userRole)) {
        const defaultRoute = getDefaultRouteForRole(userRole);
        return (
          <Navigate
            to={defaultRoute}
            replace
            state={{ from: location.pathname }}
          />
        );
      }
    } catch (error) {
      console.error("Error parsing user details:", error);
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}
