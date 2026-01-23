import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

const workforceReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.data,
    };
  },
  [types.FETCH_ATTENDANCE_MANAGEMENT](state, action) {
    return {
      ...state,
      attendanceRecords: action.data,
    };
  },
  [types.FETCH_DEPARTMENTS](state, action) {
    return {
      ...state,
      departmentList: action.data,
    };
  },
  [types.FETCH_TEAM_LEAD](state, action) {
    return {
      ...state,
      teamLeadList: action.data,
    };
  },
  [types.FETCH_DEPARTMENT_DIRECTOR](state, action) {
    return {
      ...state,
      departmentDirectorList: action.data,
    };
  },
  [types.FETCH_DEPARTMENT_MANAGER](state, action) {
    return {
      ...state,
      departmentManagerList: action.data,
    };
  },
  [types.FETCH_AOM](state, action) {
    return {
      ...state,
      aomList: action.data,
    };
  },
  [types.FETCH_SOM](state, action) {
    return {
      ...state,
      somList: action.data,
    };
  },
  [types.FETCH_CLIENT_NAME_TMF](state, action) {
    return {
      ...state,
      clientNameTMF: action.data,
    };
  },
  [types.FETCH_MEMBER_FILTER_DATA](state, action) {
    return {
      ...state,
      memberFilterData: action.data,
    };
  },

  [types.FETCH_OPSTL_FILTER_DATA](state, action) {
    return {
      ...state,
      opsTLFilterData: action.data,
    };
  },
  [types.FETCH_OM_FILTER_DATA](state, action) {
    return {
      ...state,
      omFilterData: action.data,
    };
  },
  [types.FETCH_AOM_FILTER_DATA](state, action) {
    return {
      ...state,
      aomFilterData: action.data,
    };
  },
  [types.FETCH_CLIENTS_FILTER_DATA](state, action) {
    return {
      ...state,
      clientsList: action.data,
    };
  },
  [types.FETCH_TEAM_FILTER_DATA](state, action) {
    return {
      ...state,
      teamList: action.data,
    };
  },
  [types.FETCH_CSM_DATA](state, action) {
    return {
      ...state,
      csmList: action.data,
    };
  },
  [types.FETCH_AGENT_DATA](state, action) {
    return {
      ...state,
      agentList: action.data,
    };
  },
  [types.FETCH_OM_DATA](state, action) {
    return {
      ...state,
      omList: action.data,
    };
  },
});

export default workforceReducer;
