import Api from "../lib/api";
import * as types from "./types";

function setInfractions(data) {
  return { type: types.FETCH_ATTENDANCE_INFRACTIONS, data };
}
function setLoading(data) {
  return { type: types.IS_LOADING_INFRACTIONS, data };
}

export const getAttendanceInfractions = (params = {}, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    const queryParams = {};
    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams[key] = value;
      }
    };

    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.per_page !== undefined) {
      queryParams.per_page = Math.min(100, Math.max(1, params.per_page));
    }
    addParam("user_id", params.user_id);
    addParam("archived", params.archived);
    addParam("approved_by_wfa", params.approved_by_wfa);
    addParam("sort_by", params.sort_by);
    addParam("sort_order", params.sort_order);

    Api.get(`/workforce/reports/automations/all`, queryParams)
      .then(({ data }) => {
        dispatch(setInfractions(data));
        dispatch(setLoading(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setInfractions({ data: [], total: 0 }));
        dispatch(setLoading(false));
        handleResponse?.(false, err);
        console.error("Error fetching infractions:", err);
      });
  };
};

export const getInfractionById = (id, handleResponse) => {
  return () => {
    Api.get(`/workforce/reports/automations/${id}`)
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error fetching infraction:", err);
      });
  };
};

export const updateInfraction = (id, body, handleResponse) => {
  return () => {
    Api.put(`/workforce/reports/automations/${id}`, body)
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error updating infraction:", err);
      });
  };
};

export const approveInfraction = (id, handleResponse) => {
  return () => {
    Api.patch(`/workforce/reports/automations/${id}/approve-wfa`, {})
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false, err);
        console.error("Error approving infraction:", err);
      });
  };
};
