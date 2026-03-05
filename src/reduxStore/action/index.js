// import * as workforcedashboard from "./workforcedashboard";
import * as auth from "./auth";
import * as formsManagement from "./formsManagement";
import * as evalute from "./evalute";
import * as workforcedashboard from "./workforcedashboard";
import * as qaSettings from "./qaSettings";

const ActionCreators = Object.assign(
  {},
  auth,
  formsManagement,
  evalute,
  workforcedashboard,
  qaSettings
);

export default ActionCreators;
