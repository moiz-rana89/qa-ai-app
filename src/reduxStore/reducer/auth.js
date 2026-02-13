import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoadingAuth: false,
  isAuthenticated: false,
  isAuthInitialized: false,
  user: null, // 👈 ADD THIS
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
      // isAuthenticated: action.data,
      // isAuthInitialized: true,
      isAuthenticated: action.data.isAuthenticated,
      user: action.data.user || null,
      isAuthInitialized: true,
    };
  },
  [types.LOGOUT](state, action) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isAuthInitialized: true,
    };
  },
  // [types.SESSION_EXPIRE](state, action) {
  //   return {
  //     ...state,
  //     sessionExpire: action.data,
  //   };
  // },
});

export default auth;
