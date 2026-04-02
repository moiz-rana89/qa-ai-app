import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  schedules: null,
  scheduleFilters: null,
  hubstaffOptions: null,
  unmappedCount: null,
  syncIssues: null,
};

const scheduleManagementReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_SCHEDULE](state, action) {
    return { ...state, isLoading: action.data };
  },
  [types.FETCH_SCHEDULES](state, action) {
    return { ...state, schedules: action.data };
  },
  [types.FETCH_SCHEDULE_FILTERS](state, action) {
    return { ...state, scheduleFilters: action.data };
  },
  [types.FETCH_HUBSTAFF_OPTIONS](state, action) {
    return { ...state, hubstaffOptions: action.data };
  },
  [types.FETCH_UNMAPPED_COUNT](state, action) {
    return { ...state, unmappedCount: action.data };
  },
  [types.FETCH_SYNC_ISSUES](state, action) {
    return { ...state, syncIssues: action.data };
  },
});

export default scheduleManagementReducer;
