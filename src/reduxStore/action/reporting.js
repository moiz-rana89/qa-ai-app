import Api from "../lib/api";
import * as types from "./types";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Shared by every /reporting/* GET endpoint per the API spec. Array values
// go through as real arrays — Api.xhr's query-param builder already emits
// repeated keys (team_lead_id=1&team_lead_id=2), matching the spec's own
// literal example, so no special array serialization is needed here.
export const buildReportingParams = (params = {}) => {
  const queryParams = {};
  const addParam = (key, value) => {
    if (Array.isArray(value)) {
      if (value.length > 0) queryParams[key] = value;
    } else if (value !== undefined && value !== null && value !== "") {
      queryParams[key] = value;
    }
  };

  addParam("start_date", params.start_date);
  addParam("end_date", params.end_date);
  addParam("agent_id", params.agent_id);
  addParam("agent_name", params.agent_name);
  addParam("team_lead_id", params.team_lead_id);
  addParam("om_id", params.om_id);
  addParam("client_id", params.client_id);
  addParam("client_name", params.client_name);
  addParam("csm_id", params.csm_id);
  if (params.page !== undefined) {
    queryParams.page = Math.max(1, params.page);
  }
  if (params.size !== undefined) {
    queryParams.size = clamp(params.size, 1, 500);
  }
  addParam("sort_by", params.sort_by);
  addParam("sort_order", params.sort_order);
  addParam("cadence", params.cadence);
  addParam("tp_only", params.tp_only);
  addParam("group_by", params.group_by);
  if (params.csv) {
    queryParams.csv = true;
  }

  return queryParams;
};

function setLoading(type, data) {
  return { type, data };
}

// Generic list-endpoint thunk factory — every /reporting/* report endpoint
// follows the same shape: build params, GET, dispatch data + loading,
// forward (success, data) to the caller for toasts/empty-state decisions.
// `signal` (an AbortController's signal) lets a caller cancel a stale
// request when filters change before the response lands.
const makeReportThunk = (route, fetchType, loadingType) => {
  return (params = {}, handleResponse, signal) => {
    return (dispatch) => {
      dispatch(setLoading(loadingType, true));
      Api.get(route, buildReportingParams(params), { signal })
        .then(({ data, contentType, headers }) => {
          dispatch(setLoading(loadingType, false));
          if (contentType?.includes("text/csv")) {
            handleResponse?.(true, { blob: data, headers });
            return;
          }
          dispatch(setLoading(fetchType, data));
          handleResponse?.(true, data);
        })
        .catch((err) => {
          if (err?.name === "AbortError") return;
          dispatch(setLoading(loadingType, false));
          handleResponse?.(false, err);
        });
    };
  };
};

export const getReportingNav = (handleResponse, signal) => {
  return (dispatch) => {
    Api.get(`/reporting/nav`, undefined, { signal })
      .then(({ data }) => {
        dispatch({ type: types.FETCH_REPORTING_NAV, data });
        handleResponse?.(true, data);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        handleResponse?.(false, err);
      });
  };
};

export const getReportingFilters = (handleResponse, signal) => {
  return (dispatch) => {
    dispatch(setLoading(types.IS_LOADING_REPORTING_FILTERS, true));
    Api.get(`/reporting/filters`, undefined, { signal })
      .then(({ data }) => {
        dispatch({ type: types.FETCH_REPORTING_FILTERS, data });
        dispatch(setLoading(types.IS_LOADING_REPORTING_FILTERS, false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        dispatch(setLoading(types.IS_LOADING_REPORTING_FILTERS, false));
        handleResponse?.(false, err);
      });
  };
};

export const getHubDeskSummary = makeReportThunk(
  `/reporting/hub-desk/summary`,
  types.FETCH_REPORTING_HUB_DESK_SUMMARY,
  types.IS_LOADING_REPORTING_HUB_DESK_SUMMARY
);
export const getHubDeskBreakdown = makeReportThunk(
  `/reporting/hub-desk/breakdown`,
  types.FETCH_REPORTING_HUB_DESK_BREAKDOWN,
  types.IS_LOADING_REPORTING_HUB_DESK_BREAKDOWN
);
export const getAttendanceSummary = makeReportThunk(
  `/reporting/attendance/summary`,
  types.FETCH_REPORTING_ATTENDANCE_SUMMARY,
  types.IS_LOADING_REPORTING_ATTENDANCE_SUMMARY
);
export const getAttendanceTotals = makeReportThunk(
  `/reporting/attendance/totals`,
  types.FETCH_REPORTING_ATTENDANCE_TOTALS,
  types.IS_LOADING_REPORTING_ATTENDANCE_TOTALS
);
export const getTicketMonitoringSummary = makeReportThunk(
  `/reporting/ticket-monitoring/summary`,
  types.FETCH_REPORTING_TICKET_MONITORING_SUMMARY,
  types.IS_LOADING_REPORTING_TICKET_MONITORING_SUMMARY
);
export const getTicketMonitoringBreakdown = makeReportThunk(
  `/reporting/ticket-monitoring/breakdown`,
  types.FETCH_REPORTING_TICKET_MONITORING_BREAKDOWN,
  types.IS_LOADING_REPORTING_TICKET_MONITORING_BREAKDOWN
);
export const getPerformanceCoachingSummary = makeReportThunk(
  `/reporting/performance-coaching/summary`,
  types.FETCH_REPORTING_PERFORMANCE_COACHING_SUMMARY,
  types.IS_LOADING_REPORTING_PERFORMANCE_COACHING_SUMMARY
);
export const getPerformanceCoachingBreakdown = makeReportThunk(
  `/reporting/performance-coaching/breakdown`,
  types.FETCH_REPORTING_PERFORMANCE_COACHING_BREAKDOWN,
  types.IS_LOADING_REPORTING_PERFORMANCE_COACHING_BREAKDOWN
);
