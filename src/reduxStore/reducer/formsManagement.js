import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  isLoadingClients: false,
};

const formsManagementReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.data,
    };
  },
  [types.IS_LOADING_CLIENTS](state, action) {
    return {
      ...state,
      isLoadingClients: action.data,
    };
  },
  [types.FETCH_CLIENTS_NAME](state, action) {
    return {
      ...state,
      clientNames: action.data,
    };
  },
  [types.ACTIVE_FORMS](state, action) {
    return {
      ...state,
      activeForms: action.data,
    };
  },
  [types.SET_ALL_FORMS](state, action) {
    return {
      ...state,
      allForms: action.data,
    };
  },
  [types.FETCH_CATEGORY_BY_FORM](state, action) {
    return {
      ...state,
      formCategories: action.data,
    };
  },
  [types.SET_QAS_NAME](state, action) {
    return {
      ...state,
      qasNames: action.data,
    };
  },
  [types.IS_LOADING_QAS](state, action) {
    return {
      ...state,
      isLoadingQas: action.data,
    };
  },
  [types.IS_ADDING_QUESTION](state, action) {
    return {
      ...state,
      isAddingQuestion: action.data,
    };
  },
  [types.IS_DELETING](state, action) {
    return {
      ...state,
      isDeleting: action.data,
    };
  },
  [types.SET_FORMS_NAMES_FILTER](state, action) {
    return {
      ...state,
      formNames: action.data,
    };
  },
  [types.SET_AGENT_NAME](state, action) {
    return {
      ...state,
      agentNames: action.data,
    };
  },
  [types.SET_TEAMLEAD_NAME](state, action) {
    return {
      ...state,
      teamLeadNames: action.data,
    };
  },
  [types.SELECTED_FORM_TO_EVALUATE](state, action) {
    return {
      ...state,
      selectedFormToEvaluate: action.data,
    };
  },
});

export default formsManagementReducer;
