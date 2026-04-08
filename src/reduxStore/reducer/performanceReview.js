import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  performanceData: null,
  prClients: [],
  prAgents: [],
  prChannels: [],
  coachingForm: {},
};

const performanceReviewReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_PERFORMANCE_REVIEW](state, action) {
    return { ...state, isLoading: action.data };
  },
  [types.FETCH_PERFORMANCE_REVIEW](state, action) {
    return { ...state, performanceData: action.data };
  },
  [types.FETCH_PR_CLIENTS](state, action) {
    return { ...state, prClients: action.data };
  },
  [types.FETCH_PR_AGENTS](state, action) {
    return { ...state, prAgents: action.data };
  },
  [types.FETCH_PR_CHANNELS](state, action) {
    return { ...state, prChannels: action.data };
  },
  [types.FETCH_PR_COACHING_FORM](state, action) {
    return { ...state, coachingForm: action.data };
  },
});

export default performanceReviewReducer;
