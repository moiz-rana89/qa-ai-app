import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getDefaultRouteForRole } from "../utils/roleHelpers";

export default function ProtectedRoute({
  children,
  requiredRoles,
  // Optional fine-grained gate. If provided, the user's email must also be
  // in the list — on top of any role check. Used for pages that are
  // restricted to specific people (e.g. stakeholder-only views).
  requiredEmails,
}) {
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

  if (requiredEmails?.length) {
    const userEmail = user?.email?.toLowerCase();
    const allowed = requiredEmails.map((e) => e.toLowerCase());
    if (!userEmail || !allowed.includes(userEmail)) {
      const defaultRoute = getDefaultRouteForRole(user?.role);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return children;
}
