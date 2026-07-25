import { useSelector } from "react-redux";

export const getUserRole = () => {
  try {
    const userDetails = useSelector((state) => state.auth.user);

    if (!userDetails) return null;
    const user = JSON.parse(userDetails);
    return user?.role || null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

export const hasRequiredRole = (requiredRoles) => {
  const userRole = getUserRole();
  return userRole ? requiredRoles.includes(userRole) : false;
};

export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return userRole ? roles.includes(userRole) : false;
};

// A menu entry passes the gate if BOTH:
//   • the user's role is in `roles`, AND
//   • if `emails` is defined on the entry, the user's email is in that list
// If `emails` is undefined, only the role check applies (existing behavior).
const passesAccessGate = (entry, userRole, userEmail) => {
  if (!entry?.roles?.includes(userRole)) return false;
  if (entry?.emails?.length) {
    const lower = userEmail?.toLowerCase();
    if (!lower) return false;
    if (!entry.emails.map((e) => e.toLowerCase()).includes(lower)) return false;
  }
  return true;
};

export const filterMenuByRole = (menuList, userRole, userEmail) => {
  return menuList
    .filter((menu) => passesAccessGate(menu, userRole, userEmail))
    .map((menu) => ({
      ...menu,
      submenu: menu.submenu?.filter((sub) =>
        passesAccessGate(sub, userRole, userEmail)
      ),
    }))
    .filter((menu) => menu.submenu?.length > 0 || !menu.submenu); // Keep items with no submenu
};

export const canAccessRoute = (routeName, requiredRoles) => {
  const userRole = getUserRole();
  return userRole && requiredRoles.includes(userRole);
};

export const getFirstAllowedRoute = (routeRoles) => {
  const userRole = getUserRole();

  if (!userRole) return "/login";

  // Iterate through routes and return the first one the user has access to
  for (const [route, roles] of Object.entries(routeRoles)) {
    if (roles.includes(userRole)) {
      return `/${route}`;
    }
  }

  // Fallback to login if no routes are accessible
  return "/login";
};

export const getFirstAllowedSidebarRoute = (menuList, userRole) => {
  if (!userRole) return "/login";

  // Flatten menu to find first accessible route (main menu or submenu)
  for (const menu of menuList) {
    if (menu.roles.includes(userRole)) {
      // If menu has submenu, get first accessible submenu route
      if (menu.submenu && menu.submenu.length > 0) {
        const firstAccessibleSubmenu = menu.submenu.find((sub) =>
          sub.roles.includes(userRole)
        );
        if (firstAccessibleSubmenu) {
          return `/${firstAccessibleSubmenu.route}`;
        }
      }
      // Otherwise return main menu route
      return `/${menu.route}`;
    }
  }

  return "/login";
};

export const ROLE_DEFAULT_ROUTES = {
  dev: "/workforce-remote-team-attendance",
  admin: "/workforce-remote-team-attendance",
  wfa: "/wfa-remote-team-attendance",
  tl: "/workforce-remote-team-attendance",
  dtl: "/workforce-remote-team-attendance",
  itl: "/workforce-internal-team-attendance",
  dd: "/workforce-internal-team-attendance",
  dm: "/workforce-internal-team-attendance",
  om: "/workforce-remote-team-attendance",
  som: "/workforce-remote-team-attendance",
  aom: "/workforce-remote-team-attendance",
  csm: "/workforce-remote-team-attendance",
  cstm: "/workforce-remote-team-attendance",
  qas: "/evaluate-tickets",
  qa: "/evaluate-tickets",
  "qa-dm": "/evaluate-tickets",
  "qa-tl": "/evaluate-tickets",
};

export const getDefaultRouteForRole = (userRole) => {
  if (!userRole) return "/login";
  return ROLE_DEFAULT_ROUTES[userRole] || "/evaluate-tickets";
};
