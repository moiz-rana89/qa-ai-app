import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  nav: null,
  filters: null,
  isLoadingFilters: false,

  hubDeskSummary: null,
  isLoadingHubDeskSummary: false,
  hubDeskBreakdown: null,
  isLoadingHubDeskBreakdown: false,

  attendanceSummary: null,
  isLoadingAttendanceSummary: false,
  attendanceTotals: null,
  isLoadingAttendanceTotals: false,

  ticketMonitoringSummary: null,
  isLoadingTicketMonitoringSummary: false,
  ticketMonitoringBreakdown: null,
  isLoadingTicketMonitoringBreakdown: false,

  performanceCoachingSummary: null,
  isLoadingPerformanceCoachingSummary: false,
  performanceCoachingBreakdown: null,
  isLoadingPerformanceCoachingBreakdown: false,
};

const reportingReducer = createReducer(INITIAL_STATE, {
  [types.FETCH_REPORTING_NAV](state, action) {
    return { ...state, nav: action.data };
  },
  [types.FETCH_REPORTING_FILTERS](state, action) {
    return { ...state, filters: action.data };
  },
  [types.IS_LOADING_REPORTING_FILTERS](state, action) {
    return { ...state, isLoadingFilters: action.data };
  },
  [types.FETCH_REPORTING_HUB_DESK_SUMMARY](state, action) {
    return { ...state, hubDeskSummary: action.data };
  },
  [types.IS_LOADING_REPORTING_HUB_DESK_SUMMARY](state, action) {
    return { ...state, isLoadingHubDeskSummary: action.data };
  },
  [types.FETCH_REPORTING_HUB_DESK_BREAKDOWN](state, action) {
    return { ...state, hubDeskBreakdown: action.data };
  },
  [types.IS_LOADING_REPORTING_HUB_DESK_BREAKDOWN](state, action) {
    return { ...state, isLoadingHubDeskBreakdown: action.data };
  },
  [types.FETCH_REPORTING_ATTENDANCE_SUMMARY](state, action) {
    return { ...state, attendanceSummary: action.data };
  },
  [types.IS_LOADING_REPORTING_ATTENDANCE_SUMMARY](state, action) {
    return { ...state, isLoadingAttendanceSummary: action.data };
  },
  [types.FETCH_REPORTING_ATTENDANCE_TOTALS](state, action) {
    return { ...state, attendanceTotals: action.data };
  },
  [types.IS_LOADING_REPORTING_ATTENDANCE_TOTALS](state, action) {
    return { ...state, isLoadingAttendanceTotals: action.data };
  },
  [types.FETCH_REPORTING_TICKET_MONITORING_SUMMARY](state, action) {
    return { ...state, ticketMonitoringSummary: action.data };
  },
  [types.IS_LOADING_REPORTING_TICKET_MONITORING_SUMMARY](state, action) {
    return { ...state, isLoadingTicketMonitoringSummary: action.data };
  },
  [types.FETCH_REPORTING_TICKET_MONITORING_BREAKDOWN](state, action) {
    return { ...state, ticketMonitoringBreakdown: action.data };
  },
  [types.IS_LOADING_REPORTING_TICKET_MONITORING_BREAKDOWN](state, action) {
    return { ...state, isLoadingTicketMonitoringBreakdown: action.data };
  },
  [types.FETCH_REPORTING_PERFORMANCE_COACHING_SUMMARY](state, action) {
    return { ...state, performanceCoachingSummary: action.data };
  },
  [types.IS_LOADING_REPORTING_PERFORMANCE_COACHING_SUMMARY](state, action) {
    return { ...state, isLoadingPerformanceCoachingSummary: action.data };
  },
  [types.FETCH_REPORTING_PERFORMANCE_COACHING_BREAKDOWN](state, action) {
    return { ...state, performanceCoachingBreakdown: action.data };
  },
  [types.IS_LOADING_REPORTING_PERFORMANCE_COACHING_BREAKDOWN](state, action) {
    return { ...state, isLoadingPerformanceCoachingBreakdown: action.data };
  },
});

export default reportingReducer;
