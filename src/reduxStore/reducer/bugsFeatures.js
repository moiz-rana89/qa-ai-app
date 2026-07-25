import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  reports: null,
};

const bugsFeaturesReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_BUG_FEATURE_REPORTS](state, action) {
    return { ...state, isLoading: action.data };
  },
  [types.FETCH_BUG_FEATURE_REPORTS](state, action) {
    return { ...state, reports: action.data };
  },
});

export default bugsFeaturesReducer;
