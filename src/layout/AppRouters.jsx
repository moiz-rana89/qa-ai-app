"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "../pages/LoginPage";
import EvaluateTickets from "../pages/EvaluateTickets";
import { EvaluteForm } from "../pages/EvaluateTickets/EvaluteForm";
import FormsManagement from "../pages/FormsManagement";
import MainLayout from "./MainLayout";
import FullWidthLayout from "./FullWidthLayout";
import ProtectedRoute from "./ProtectedRoute";
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

const ROUTE_ROLES = {
  "evaluate-tickets": ["admin", "dev", "qas", "tl"],
  "forms-management": ["admin", "dev", "qas", "tl"],
  "shadowing-form": ["admin", "dev", "qas", "tl"],
  "evalute-form": ["admin", "dev", "tl"],
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
  "download-report": ["admin", "dev", "tl", "aom"],
  "download-client-specific-report": ["admin", "dev", "dtl", "aom", "om"],
  "ticket-monitoring-form": [
    "dev",
    "tl",
    "om",
    "admin",
    "csm",
    "cstm",
    "som",
    "aom",
    "dtl",
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
    "dtl",
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
    "dtl",
  ],
  "advance-notice": ["admin", "dev", "tl"],
};

export default function AppRouter() {
  const dispatch = useDispatch();
  const { isAuthInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_details");

    dispatch(setIsAuthAction(!!(token && user)));
  }, [dispatch]);

  // Prevent route evaluation before auth init
  if (!isAuthInitialized) {
    return null; // or loader
  }

  return (
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
                requiredRoles={ROUTE_ROLES["workforce-remote-team-attendance"]}
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

        <Route path="*" element={<Navigate to="/forms-management" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
