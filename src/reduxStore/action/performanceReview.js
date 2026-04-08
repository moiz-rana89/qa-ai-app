import Api from "../lib/api";
import * as types from "./types";

// --- Dispatchers ---
function setPerformanceData(data) {
  return { type: types.FETCH_PERFORMANCE_REVIEW, data };
}
function setLoading(data) {
  return { type: types.IS_LOADING_PERFORMANCE_REVIEW, data };
}
function setPRClients(data) {
  return { type: types.FETCH_PR_CLIENTS, data };
}
function setPRAgents(data) {
  return { type: types.FETCH_PR_AGENTS, data };
}
function setPRChannels(data) {
  return { type: types.FETCH_PR_CHANNELS, data };
}
function setPRCoachingForm(data) {
  return { type: types.FETCH_PR_COACHING_FORM, data };
}

// --- Filter Data ---

export const getPRClients = (setLoader) => {
  return (dispatch) => {
    setLoader?.(true);
    Api.get(`/quality-assurance/client-names`)
      .then(({ data }) => {
        dispatch(setPRClients(data));
        setLoader?.(false);
      })
      .catch((err) => {
        setLoader?.(false);
        console.error("Error fetching PR clients:", err);
      });
  };
};

export const getPRAgents = (clientId, setLoader) => {
  return (dispatch) => {
    setLoader?.(true);
    Api.get(`/quality-assurance/agent-names`, { client_id: clientId })
      .then(({ data }) => {
        dispatch(setPRAgents(data));
        setLoader?.(false);
      })
      .catch((err) => {
        dispatch(setPRAgents([]));
        setLoader?.(false);
        console.error("Error fetching PR agents:", err);
      });
  };
};

export const getPRChannels = (setLoader) => {
  return (dispatch) => {
    setLoader?.(true);
    Api.get(`/quality-assurance/channels`)
      .then(({ data }) => {
        dispatch(setPRChannels(data));
        setLoader?.(false);
      })
      .catch((err) => {
        setLoader?.(false);
        console.error("Error fetching PR channels:", err);
      });
  };
};

// --- Session ---

export const createPerformanceReviewSession = (params, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Api.post(
      `/quality-assurance/performance-review/sessions?created_by=${params.created_by}&agent_hubstaff_user_id=${params.agent_hubstaff_user_id}&agent_helpdesk_user_id=${params.agent_helpdesk_user_id}&client_hubstaff_id=${params.client_hubstaff_id}&review_start_date=${params.review_start_date}&review_end_date=${params.review_end_date}&${params.channels.map((c) => `channel=${c}`).join("&")}`
    )
      .then(({ data }) => {
        dispatch(setPerformanceData(data));
        dispatch(setLoading(false));
        handleResponse?.(true, data);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        handleResponse?.(false);
        console.error("Error creating session:", err);
      });
  };
};

// --- Coaching Form ---

export const getCoachingForm = (sessionId) => {
  return (dispatch) => {
    Api.get(`/quality-assurance/performance-review-coaching-form/${sessionId}`)
      .then(({ data }) => {
        dispatch(setPRCoachingForm(data));
      })
      .catch((err) => {
        dispatch(setPRCoachingForm({}));
        console.error("Error fetching coaching form:", err);
      });
  };
};

export const saveCoachingForm = (body, handleResponse) => {
  return () => {
    Api.post(`/quality-assurance/performance-review-coaching-form`, body)
      .then(() => handleResponse?.(true))
      .catch((err) => {
        handleResponse?.(false);
        console.error("Error saving coaching form:", err);
      });
  };
};

// --- Resolutions ---

export const submitResolutions = (body, handleResponse) => {
  return () => {
    Api.post(`/quality-assurance/performance-review-resolutions`, body)
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false);
        console.error("Error submitting resolutions:", err);
      });
  };
};

export const getResolution = (sessionId, metricType, handleResponse) => {
  return () => {
    Api.get(
      `/quality-assurance/performance-review-resolutions/${sessionId}/${metricType}`
    )
      .then(({ data }) => handleResponse?.(true, data))
      .catch((err) => {
        handleResponse?.(false);
        console.error("Error fetching resolution:", err);
      });
  };
};
