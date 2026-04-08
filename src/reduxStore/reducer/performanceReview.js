import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  performanceData: null,
};

const performanceReviewReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_PERFORMANCE_REVIEW](state, action) {
    return { ...state, isLoading: action.data };
  },
  [types.FETCH_PERFORMANCE_REVIEW](state, action) {
    return { ...state, performanceData: action.data };
  },
});

export default performanceReviewReducer;
