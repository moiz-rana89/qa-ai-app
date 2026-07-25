import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  infractions: null,
};

const attendanceInfractionsReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_INFRACTIONS](state, action) {
    return { ...state, isLoading: action.data };
  },
  [types.FETCH_ATTENDANCE_INFRACTIONS](state, action) {
    return { ...state, infractions: action.data };
  },
});

export default attendanceInfractionsReducer;
