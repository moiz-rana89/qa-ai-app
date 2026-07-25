import Api from "../lib/api";
import * as types from "./types";

function setReports(data) {
  return { type: types.FETCH_BUG_FEATURE_REPORTS, data };
}
function setLoading(data) {
  return { type: types.IS_LOADING_BUG_FEATURE_REPORTS, data };
}

export const getReports = (params = {}, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    const queryParams = {};
    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams[key] = value;
      }
    };

    addParam("report_type", params.report_type);
    addParam("resolved_by_eng", params.resolved_by_eng);
    addParam("decision_by_stakeholder", params.decision_by_stakeholder);
    addParam("submitted_by", params.submitted_by);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    Api.get(`/qa_ai_apis/reports`, queryParams)
      .then(({ data }) => {
        dispatch(setReports(data));
        dispatch(setLoading(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setReports({ data: [], pagination: {} }));
        dispatch(setLoading(false));
        handleResponse?.(false, err);
        console.error("Error fetching bug/feature reports:", err);
      });
  };
};

export const resolveReport = (id, handleResponse) => {
  return () => {
    Api.patch(`/qa_ai_apis/reports/${id}/resolve`, {})
      .then(() => handleResponse?.(true))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error resolving report:", err);
      });
  };
};

export const stakeholderDecisionReport = (id, decision, handleResponse) => {
  return () => {
    Api.patch(`/qa_ai_apis/reports/${id}/decision`, { decision })
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error setting stakeholder decision:", err);
      });
  };
};
