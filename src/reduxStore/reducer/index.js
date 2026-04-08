import { combineReducers } from "redux";
// import workforceReducer from "./workforcedashboard";
import auth from "./auth";
import formsManagementReducer from "./formsManagement";
import evalute from "./evalute";
import workforceReducer from "./workforcedashboard";
import qaSettingsReducer from "./qaSettings";
import scheduleManagementReducer from "./scheduleManagement";
import performanceReviewReducer from "./performanceReview";
export default combineReducers(
  Object.assign({
    auth: auth,
    formsManagement: formsManagementReducer,
    evalute: evalute,
    workforcedashboard: workforceReducer,
    qaSettings: qaSettingsReducer,
    scheduleManagement: scheduleManagementReducer,
    performanceReview: performanceReviewReducer,
  })
);
