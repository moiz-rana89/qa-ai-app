import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  qaSettingsList: { data: [], pagination: {} },
};

const qaSettingsReducer = createReducer(INITIAL_STATE, {
  [types.SET_QA_SETTINGS_LIST](state, action) {
    return {
      ...state,
      qaSettingsList: action.data,
    };
  },
  [types.IS_LOADING_QA_SETTINGS](state, action) {
    return {
      ...state,
      isLoading: action.data,
    };
  },
});

export default qaSettingsReducer;
