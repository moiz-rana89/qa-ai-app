import Api from "../lib/api";
import * as types from "./types";

function setLoadingRoster(data) {
  return { type: types.IS_LOADING_DI_ROSTER, data };
}
function setRoster(data) {
  return { type: types.FETCH_DI_ROSTER, data };
}
function setLoadingIssues(data) {
  return { type: types.IS_LOADING_DI_ISSUES, data };
}
function setIssues(data) {
  return { type: types.FETCH_DI_ISSUES, data };
}
function setSummary(data) {
  return { type: types.FETCH_DI_SUMMARY, data };
}
function setLoadingFilters(data) {
  return { type: types.IS_LOADING_DI_FILTERS, data };
}
function setFilters(data) {
  return { type: types.FETCH_DI_FILTERS, data };
}
function setLoadingAudit(data) {
  return { type: types.IS_LOADING_DI_AUDIT, data };
}
function setAudit(data) {
  return { type: types.FETCH_DI_AUDIT, data };
}
function setSaving(data) {
  return { type: types.IS_LOADING_DI_SAVE, data };
}

// Shared by /roster and /issues — same param shape per the API spec.
const buildListParams = (params = {}) => {
  const queryParams = {};
  const addParam = (key, value) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams[key] = value;
    }
  };

  if (params.page !== undefined) {
    queryParams.page = Math.max(1, params.page);
  }
  if (params.page_size !== undefined) {
    queryParams.page_size = Math.min(200, Math.max(1, params.page_size));
  }
  addParam("sort_by", params.sort_by);
  addParam("sort_order", params.sort_order);
  addParam("search", params.search);
  addParam("team_lead_id", params.team_lead_id);
  addParam("operations_manager_id", params.operations_manager_id);
  addParam("csm_id", params.csm_id);
  addParam("client_name", params.client_name);
  addParam("missing_field", params.missing_field);
  addParam("agent_status", params.agent_status);

  return queryParams;
};

export const getRoster = (params = {}, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoadingRoster(true));

    Api.get(`/api/data-integrity/roster`, buildListParams(params))
      .then(({ data }) => {
        dispatch(setRoster(data));
        dispatch(setLoadingRoster(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setRoster({ data: [], total: 0, page: 1, total_pages: 0 }));
        dispatch(setLoadingRoster(false));
        handleResponse?.(false, err);
        console.error("Error fetching data integrity roster:", err);
      });
  };
};

export const getIssues = (params = {}, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoadingIssues(true));

    Api.get(`/api/data-integrity/issues`, buildListParams(params))
      .then(({ data }) => {
        dispatch(setIssues(data));
        dispatch(setLoadingIssues(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setIssues({ data: [], total: 0, page: 1, total_pages: 0 }));
        dispatch(setLoadingIssues(false));
        handleResponse?.(false, err);
        console.error("Error fetching data integrity issues:", err);
      });
  };
};

export const getDISummary = (handleResponse) => {
  return (dispatch) => {
    Api.get(`/api/data-integrity/summary`)
      .then(({ data }) => {
        dispatch(setSummary(data));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error fetching data integrity summary:", err);
      });
  };
};

export const getDIFilters = (handleResponse) => {
  return (dispatch) => {
    dispatch(setLoadingFilters(true));

    Api.get(`/api/data-integrity/filters`)
      .then(({ data }) => {
        dispatch(setFilters(data));
        dispatch(setLoadingFilters(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setLoadingFilters(false));
        handleResponse?.(false, err);
        console.error("Error fetching data integrity filters:", err);
      });
  };
};

export const getDIMember = (memberId, handleResponse) => {
  return () => {
    Api.get(`/api/data-integrity/members/${memberId}`)
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error fetching data integrity member:", err);
      });
  };
};

export const updateDIMember = (memberId, body, handleResponse) => {
  return (dispatch) => {
    dispatch(setSaving(true));

    Api.patch(`/api/data-integrity/members/${memberId}`, body)
      .then(({ data }) => {
        dispatch(setSaving(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setSaving(false));
        handleResponse?.(false, err);
        console.error("Error updating data integrity member:", err);
      });
  };
};

export const getDIMemberAudit = (memberId, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoadingAudit(true));

    Api.get(`/api/data-integrity/members/${memberId}/audit`)
      .then(({ data }) => {
        dispatch(setAudit(data));
        dispatch(setLoadingAudit(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setLoadingAudit(false));
        handleResponse?.(false, err);
        console.error("Error fetching data integrity audit:", err);
      });
  };
};
