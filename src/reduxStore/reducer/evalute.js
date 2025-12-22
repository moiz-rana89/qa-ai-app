import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

const evalute = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.data,
    };
  },
  [types.GET_ALL_FORMS_TICKETS](state, action) {
    return {
      ...state,
      allFormsTickets: action.data,
    };
  },
});

export default evalute;
