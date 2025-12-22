import { combineReducers } from "redux";
// import workforceReducer from "./workforcedashboard";
import auth from "./auth";
import formsManagementReducer from "./formsManagement";
import evalute from "./evalute";
export default combineReducers(
  Object.assign({
    auth: auth,
    formsManagement: formsManagementReducer,
    evalute: evalute,
  })
);
