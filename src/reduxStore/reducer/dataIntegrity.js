import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoadingRoster: false,
  roster: null,
  isLoadingIssues: false,
  issues: null,
  summary: null,
  isLoadingFilters: false,
  filters: null,
  isLoadingAudit: false,
  audit: null,
  isSaving: false,
};

const dataIntegrityReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_DI_ROSTER](state, action) {
    return { ...state, isLoadingRoster: action.data };
  },
  [types.FETCH_DI_ROSTER](state, action) {
    return { ...state, roster: action.data };
  },
  [types.IS_LOADING_DI_ISSUES](state, action) {
    return { ...state, isLoadingIssues: action.data };
  },
  [types.FETCH_DI_ISSUES](state, action) {
    return { ...state, issues: action.data };
  },
  [types.FETCH_DI_SUMMARY](state, action) {
    return { ...state, summary: action.data };
  },
  [types.IS_LOADING_DI_FILTERS](state, action) {
    return { ...state, isLoadingFilters: action.data };
  },
  [types.FETCH_DI_FILTERS](state, action) {
    return { ...state, filters: action.data };
  },
  [types.IS_LOADING_DI_AUDIT](state, action) {
    return { ...state, isLoadingAudit: action.data };
  },
  [types.FETCH_DI_AUDIT](state, action) {
    return { ...state, audit: action.data };
  },
  [types.IS_LOADING_DI_SAVE](state, action) {
    return { ...state, isSaving: action.data };
  },
});

export default dataIntegrityReducer;
