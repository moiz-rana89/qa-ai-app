import Api from "../lib/api";
import * as types from "./types";

function setPerformanceData(data) {
  return { type: types.FETCH_PERFORMANCE_REVIEW, data };
}
function setLoading(data) {
  return { type: types.IS_LOADING_PERFORMANCE_REVIEW, data };
}

// Placeholder — replace with real API endpoint when ready
export const getPerformanceReview = (params, handleResponse) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    // TODO: Replace with real API call
    // Api.get(`/performance-review`, params)
    //   .then(({ data }) => {
    //     dispatch(setPerformanceData(data));
    //     dispatch(setLoading(false));
    //     handleResponse?.(true);
    //   })
    //   .catch((err) => {
    //     dispatch(setLoading(false));
    //     handleResponse?.(false);
    //   });

    // Placeholder: simulate API response
    setTimeout(() => {
      dispatch(setPerformanceData(null));
      dispatch(setLoading(false));
      handleResponse?.(true);
    }, 500);
  };
};

// Placeholder — replace with real API endpoint when ready
export const submitResolve = (body, handleResponse) => {
  return () => {
    // TODO: Replace with real API call
    // Api.post(`/performance-review/resolve`, body)
    //   .then(() => handleResponse(true))
    //   .catch(() => handleResponse(false));

    // Placeholder
    setTimeout(() => {
      handleResponse(true);
    }, 500);
  };
};
