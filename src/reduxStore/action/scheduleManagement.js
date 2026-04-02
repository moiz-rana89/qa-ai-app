import Api from "../lib/api";
import * as types from "./types";

// --- Dispatchers ---
function setSchedules(data) {
  return { type: types.FETCH_SCHEDULES, data };
}
function setScheduleFilters(data) {
  return { type: types.FETCH_SCHEDULE_FILTERS, data };
}
function setHubstaffOptions(data) {
  return { type: types.FETCH_HUBSTAFF_OPTIONS, data };
}
function setUnmappedCount(data) {
  return { type: types.FETCH_UNMAPPED_COUNT, data };
}
function setSyncIssues(data) {
  return { type: types.FETCH_SYNC_ISSUES, data };
}
function setScheduleLoading(data) {
  return { type: types.IS_LOADING_SCHEDULE, data };
}

// --- Helper ---
const addParam = (queryParams, key, value) => {
  if (value !== undefined && value !== null && value !== "") {
    if (Array.isArray(value) && value.length === 0) return;
    queryParams[key] = value;
  }
};

// --- READ ---

export const getSchedules = (params = {}) => {
  return (dispatch) => {
    dispatch(setScheduleLoading(true));

    const queryParams = {};
    addParam(queryParams, "member_name", params.member_name);
    addParam(queryParams, "client_name", params.client_name);
    addParam(queryParams, "client_id", params.client_id);
    addParam(queryParams, "project", params.project);
    addParam(queryParams, "team_lead_id", params.team_lead_id);
    addParam(queryParams, "csm_id", params.csm_id);
    addParam(queryParams, "senior_csm_id", params.senior_csm_id);
    addParam(queryParams, "operations_manager_id", params.operations_manager_id);
    addParam(
      queryParams,
      "associate_operations_manager_id",
      params.associate_operations_manager_id
    );
    addParam(
      queryParams,
      "senior_operations_manager",
      params.senior_operations_manager
    );
    addParam(queryParams, "schedule_type", params.schedule_type);
    addParam(queryParams, "status", params.status);
    addParam(queryParams, "mapping_status", params.mapping_status);
    addParam(queryParams, "sync_status", params.sync_status);
    addParam(queryParams, "startdate", params.startdate);
    addParam(queryParams, "enddate", params.enddate);
    addParam(queryParams, "sort_order", params.sort_order);
    addParam(queryParams, "sort_by", params.sort_by);
    addParam(queryParams, "role", params.role);
    addParam(queryParams, "csv", params.csv);

    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.pageSize !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.pageSize));
    }

    Api.get(`/schedules`, queryParams)
      .then(({ data, contentType }) => {
        dispatch(setScheduleLoading(false));
        if (contentType?.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `schedules_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          dispatch(setSchedules(data));
        }
      })
      .catch((err) => {
        dispatch(setSchedules([]));
        dispatch(setScheduleLoading(false));
        console.error("Error fetching schedules:", err);
      });
  };
};

export const getScheduleFilters = () => {
  return (dispatch) => {
    Api.get(`/schedules/filters`)
      .then(({ data }) => {
        dispatch(setScheduleFilters(data));
      })
      .catch((err) => {
        console.error("Error fetching schedule filters:", err);
      });
  };
};

export const getHubstaffOptions = () => {
  return (dispatch) => {
    Api.get(`/schedules/hubstaff-options`)
      .then(({ data }) => {
        dispatch(setHubstaffOptions(data));
      })
      .catch((err) => {
        console.error("Error fetching hubstaff options:", err);
      });
  };
};

export const getUnmappedCount = () => {
  return (dispatch) => {
    Api.get(`/schedules/unmapped-count`)
      .then(({ data }) => {
        dispatch(setUnmappedCount(data));
      })
      .catch((err) => {
        console.error("Error fetching unmapped count:", err);
      });
  };
};

export const getSyncIssuesCount = () => {
  return (dispatch) => {
    Api.get(`/schedules/sync-issues-count`)
      .then(({ data }) => {
        dispatch(setSyncIssues(data));
      })
      .catch((err) => {
        console.error("Error fetching sync issues:", err);
      });
  };
};

// --- CREATE ---

export const createSchedule = (body, handleResponse) => {
  return () => {
    Api.post(`/schedules`, body)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error creating schedule:", err);
      });
  };
};

// --- UPDATE ---

export const updateSchedule = (id, body, handleResponse) => {
  return () => {
    Api.put(`/schedules/${id}`, body)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error updating schedule:", err);
      });
  };
};

export const updateScheduleMapping = (id, body, handleResponse) => {
  return () => {
    Api.patch(`/schedules/${id}/mapping`, body)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error updating mapping:", err);
      });
  };
};

export const deactivateSchedule = (id, handleResponse) => {
  return () => {
    Api.patch(`/schedules/${id}/deactivate`)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error deactivating schedule:", err);
      });
  };
};

export const acknowledgeSync = (id, handleResponse) => {
  return () => {
    Api.patch(`/schedules/${id}/acknowledge-sync`)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error acknowledging sync:", err);
      });
  };
};

// --- DELETE ---

export const deleteSchedule = (id, handleResponse) => {
  return () => {
    Api.delete(`/schedules/${id}`)
      .then(() => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        console.error("Error deleting schedule:", err);
      });
  };
};
