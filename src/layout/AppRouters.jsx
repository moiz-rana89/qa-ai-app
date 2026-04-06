"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "../pages/LoginPage";
import EvaluateTickets from "../pages/EvaluateTickets";
import { EvaluteForm } from "../pages/EvaluateTickets/EvaluteForm";
import FormsManagement from "../pages/FormsManagement";
import QASettings from "../pages/QASettings";
import MainLayout from "./MainLayout";
import FullWidthLayout from "./FullWidthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { getDefaultRouteForRole } from "../utils/roleHelpers";
import { setIsAuthAction } from "../reduxStore/action/auth";
import RemoteTeamManagement from "../pages/WorkForceTeamDashboard/RemoteTeamManagement";
import UnauthorizedPage from "./UnauthorizedPage";
import RemoteTeamReporting from "../pages/WorkForceTeamDashboard/RemoteTeamReporting";
import InternalTeamManagement from "../pages/WorkForceTeamDashboard/InternalTeamManagement";
import InternalTeamReporting from "../pages/WorkForceTeamDashboard/InternalTeamReporting";
import WFARemoteTeam from "../pages/WFAAttendanceManagement/WFARemoteTeam";
import WFAInternalTeam from "../pages/WFAAttendanceManagement/WFAInternalTeam";
import WFAAttendanceReporting from "../pages/WFAAttendanceManagement/WFAAttendanceReporting";
import { DownloadReport } from "../pages/DownloadReport";
import { TicketMonitoringForm } from "../pages/TicketMonitoringForm";
import { PerformanceMonitoringForm } from "../pages/PerformanceMonitoringForm";
import { CustomMonitoringForm } from "../pages/CustomMonitoringForm";
import { OtherCoachingTypes } from "../pages/OtherCoachingTypes";
import AdvanceNoticeSubmission from "../pages/AdvanceNoticeSubmission";
import { DownloadClientFormReport } from "../pages/DownloadClientFormReport";
import { QAAIReport } from "../pages/QAAIReport";
import AuthProvider from "./AuthProvider";
// admin download = wfa,om
const ROUTE_ROLES = {
  "evaluate-tickets": [
    "admin",
    "dev",
    "qas",
    "tl",
    "dtl",
    "qa",
    "qa-dm",
    "qa-tl",
  ],
  "forms-management": ["admin", "dev", "qa", "qa-dm", "qa-tl", "qas"],
  "qa-settings": ["admin", "dev", "om", "qa", "qa-dm", "qa-tl"],
  "shadowing-form": ["admin", "dev", "qas", "tl", "qa", "qa-dm", "qa-tl"],
  "evalute-form": ["admin", "dev", "tl", "dtl", "qa", "qa-dm", "qa-tl"],
  "workforce-remote-team-attendance": [
    "dev",
    "csm",
    "cstm",
    "tl",
    "om",
    "som",
    "aom",
    "admin",
    "itl",
    "dd",
    "dm",
    "dtl",
  ],
  "download-report": ["admin", "dev", "qa-tl", "tl", "aom", "dtl", "wfa", "om", "qas"],
  "download-client-specific-report": [
    "admin",
    "dev",
    "dtl",
    "tl",
    "qa-tl",
    "aom",
    "wfa",
    "om",
    "qas",
  ],
  "qa-ai-report": ["admin", "dev", "qa-tl", "tl", "aom", "dtl", "wfa", "om", "qas"],
  "ticket-monitoring-form": [
    "dev",
    "qa-tl",
    "tl",
    "om",
    "admin",
    "csm",
    "cstm",
    "som",
    "aom",
    "dtl",
    "qas",
  ],
  "performance-monitoring-form": [
    "om",
    "som",
    "aom",
    "admin",
    "dev",
    "csm",
    "cstm",
    "tl",
    "qa-tl",
    "dtl",
    "qas",
  ],
  "custom-monitoring-form": ["admin", "dev", "dtl", "om", "aom"],
  "other-coaching-types": [
    "om",
    "som",
    "aom",
    "admin",
    "dev",
    "csm",
    "cstm",
    "tl",
    "qa-tl",
    "dtl",
    "qas",
  ],
  "advance-notice": ["admin", "dev", "tl"],
  "workforce-remote-team-attendance-report": [
    "dev",
    "csm",
    "om",
    "som",
    "aom",
    "admin",
    "tl",
    "dtl",
  ],
  "workforce-internal-team-attendance": [
    "dev",
    "om",
    "som",
    "aom",
    "admin",
    "itl",
    "dm",
    "dd",
    "qa-dm",
    "qa-tl",
  ],
  "workforce-internal-team-attendance-report": [
    "dev",
    "om",
    "som",
    "aom",
    "admin",
    "itl",
    "dm",
    "dd",
    "qa-dm",
    "qa-tl",
  ],
  "wfa-remote-team-attendance": ["dev", "wfa", "admin"],
  "wfa-internal-team-attendance": ["dev", "wfa", "admin"],
  "wfa-attendance-reporting": ["dev", "wfa", "admin"],
  "schedule-management": ["dev", "admin"],
};

function DefaultRedirect() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const defaultRoute = getDefaultRouteForRole(user?.role);
  return <Navigate to={defaultRoute} replace />;
}

export default function AppRouter() {
  // const dispatch = useDispatch();
  // const { isAuthInitialized } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   const user = localStorage.getItem("user_details");

  //   dispatch(setIsAuthAction(!!(token && user)));
  // }, [dispatch]);

  // // Prevent route evaluation before auth init
  // if (!isAuthInitialized) {
  //   return null; // or loader
  // }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* WITH SIDEBAR */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/evaluate-tickets"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["evaluate-tickets"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <EvaluateTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms-management"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["forms-management"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <FormsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/qa-settings"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["qa-settings"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <QASettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shadowing-form"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["shadowing-form"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <div />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workforce-remote-team-attendance"
              element={
                <ProtectedRoute
                  requiredRoles={
                    ROUTE_ROLES["workforce-remote-team-attendance"]
                  }
                  routeRoles={ROUTE_ROLES}
                >
                  <RemoteTeamManagement />
                  {/* <></> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/workforce-remote-team-attendance-report"
              element={
                <ProtectedRoute
                  requiredRoles={
                    ROUTE_ROLES["workforce-remote-team-attendance-report"]
                  }
                  routeRoles={ROUTE_ROLES}
                >
                  <RemoteTeamReporting />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workforce-internal-team-attendance"
              element={
                <ProtectedRoute
                  requiredRoles={
                    ROUTE_ROLES["workforce-internal-team-attendance"]
                  }
                  routeRoles={ROUTE_ROLES}
                >
                  <InternalTeamManagement />
                  <></>
                </ProtectedRoute>
              }
            />

            <Route
              path="/workforce-internal-team-attendance-report"
              element={
                <ProtectedRoute
                  requiredRoles={
                    ROUTE_ROLES["workforce-internal-team-attendance-report"]
                  }
                  routeRoles={ROUTE_ROLES}
                >
                  <InternalTeamReporting />
                  <></>
                </ProtectedRoute>
              }
            />

            <Route
              path="/wfa-remote-team-attendance"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["wfa-remote-team-attendance"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <WFARemoteTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wfa-internal-team-attendance"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["wfa-internal-team-attendance"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <WFAInternalTeam />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wfa-attendance-reporting"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["wfa-attendance-reporting"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <WFAAttendanceReporting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-report"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["download-report"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <DownloadReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-client-specific-report"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["download-client-specific-report"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <DownloadClientFormReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/qa-ai-report"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["qa-ai-report"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <QAAIReport />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ticket-monitoring-form"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["ticket-monitoring-form"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <TicketMonitoringForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/performance-monitoring-form"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["performance-monitoring-form"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <PerformanceMonitoringForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/custom-monitoring-form"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["custom-monitoring-form"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <CustomMonitoringForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/other-coaching-types"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["other-coaching-types"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <OtherCoachingTypes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/advance-notice"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["advance-notice"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <AdvanceNoticeSubmission />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* WITHOUT SIDEBAR */}
          <Route
            element={
              <ProtectedRoute>
                <FullWidthLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/evalute-form"
              element={
                <ProtectedRoute
                  requiredRoles={ROUTE_ROLES["evalute-form"]}
                  routeRoles={ROUTE_ROLES}
                >
                  <EvaluteForm />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<DefaultRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
