import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoadingAuth: false,
  isAuthenticated: false,
};

const auth = createReducer(INITIAL_STATE, {
  [types.IS_LOADING_AUTH](state, action) {
    return {
      ...state,
      isLoadingAuth: action.data,
    };
  },
  [types.IS_AUTHENTICATED](state, action) {
    return {
      ...state,
      isAuthenticated: action.data,
    };
  },
});

export default auth;
