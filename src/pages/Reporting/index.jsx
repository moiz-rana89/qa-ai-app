"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { getReportingNav, getReportingFilters } from "../../reduxStore/action/reporting";
import { extractApiError } from "../../utils/helperFunctions";
import { resolveReportingScope } from "../../utils/reportingHelpers";
import Skeleton from "../../components/Skeleton";
import ReportingEmptyState from "./components/ReportingEmptyState";
import HubDeskReporting from "./HubDeskReporting";
import AttendanceReporting from "./AttendanceReporting";
import TicketMonitoringReporting from "./TicketMonitoringReporting";
import PerformanceCoachingReporting from "./PerformanceCoachingReporting";

const DEFAULT_RANGE = () => [dayjs().subtract(29, "day"), dayjs()];

const makeInitialState = (extra = {}) => ({
  dateRange: DEFAULT_RANGE(),
  selectedAgents: [],
  selectedTeamLeads: [],
  selectedOms: [],
  selectedClients: [],
  selectedCsms: [],
  sortBy: undefined,
  sortOrder: undefined,
  page: 1,
  size: 25,
  ...extra,
});

const DEFAULT_SUBMENUS = [
  { label: "Helpdesk Reporting", path: "hub-desk", status: "active" },
  { label: "Attendance Reporting", path: "attendance", status: "active" },
  {
    label: "Ticket Monitoring Reporting",
    path: "ticket-monitoring",
    status: "active",
  },
  {
    label: "Performance Coaching Reporting",
    path: "performance-coaching",
    status: "active",
  },
];

export default function ReportingPage() {
  const dispatch = useDispatch();
  const { nav, filters, isLoadingFilters } = useSelector(
    (state) => state.reporting
  );
  const [navLoaded, setNavLoaded] = useState(false);

  const [submenuState, setSubmenuState] = useState({
    "hub-desk": makeInitialState({ cadence: "monthly", view: "client", tpOnly: false }),
    attendance: makeInitialState(),
    "ticket-monitoring": makeInitialState({ groupBy: "agent" }),
    "performance-coaching": makeInitialState({ groupBy: "agent" }),
  });

  const updateSubmenuState = (key, patch) =>
    setSubmenuState((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  useEffect(() => {
    dispatch(
      getReportingNav((success, data) => {
        setNavLoaded(true);
        if (!success) {
          toast.error(extractApiError(data, "Failed to load reporting nav."));
        }
      })
    );
  }, [dispatch]);

  const scope = navLoaded ? resolveReportingScope(nav) : null;

  useEffect(() => {
    if (scope && !scope.blocked) {
      dispatch(
        getReportingFilters((success, data) => {
          if (!success) {
            toast.error(extractApiError(data, "Failed to load filters."));
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope?.blocked]);

  if (!navLoaded) {
    return (
      <div className="m-[25px]">
        <Skeleton className="w-full h-[60vh]" rounded="rounded-[24px]" />
      </div>
    );
  }

  if (scope.blocked) {
    return (
      <div className="m-[25px]">
        <span className="text-xl font-semibold text-[#163143]">Reporting</span>
        <div className="mt-4">
          <ReportingEmptyState variant="blocked" />
        </div>
      </div>
    );
  }

  const submenus = nav?.submenus?.length ? nav.submenus : DEFAULT_SUBMENUS;
  const firstActivePath =
    submenus.find((s) => !s.status || s.status === "active")?.path ||
    submenus[0]?.path ||
    "hub-desk";

  const sharedProps = (key) => ({
    filters,
    isLoadingFilters,
    scope,
    state: submenuState[key],
    setState: (patch) => updateSubmenuState(key, patch),
  });

  return (
    <div className="m-[25px]">
      <Routes>
        <Route index element={<Navigate to={firstActivePath} replace />} />
        <Route
          path="hub-desk"
          element={<HubDeskReporting {...sharedProps("hub-desk")} />}
        />
        <Route
          path="attendance"
          element={<AttendanceReporting {...sharedProps("attendance")} />}
        />
        <Route
          path="ticket-monitoring"
          element={
            <TicketMonitoringReporting {...sharedProps("ticket-monitoring")} />
          }
        />
        <Route
          path="performance-coaching"
          element={
            <PerformanceCoachingReporting
              {...sharedProps("performance-coaching")}
            />
          }
        />
        <Route path="*" element={<Navigate to={firstActivePath} replace />} />
      </Routes>
    </div>
  );
}
