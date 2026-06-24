import Api from "../lib/api";

// All endpoints for the QA Sandbox.
// Read-only / store-less — actions forward `(success, data)` to a page-level
// callback so each page manages its own local state.

// 1. List sandbox tickets — trainee picks from here
export const getSandboxTickets = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/sandbox/tickets`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching sandbox tickets:", err);
    });
};

// 2. Flag / unflag a ticket as sandbox (admin / curator)
export const toggleSandboxTicket = (ticketId, body, handleResponse) => () => {
  Api.patch(`/qa_ai_apis/sandbox/tickets/${ticketId}`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error toggling sandbox flag:", err);
    });
};

// 3. Submit a sandbox evaluation (trainee — main workflow)
export const submitSandboxEvaluation = (body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/sandbox/evaluate`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error submitting sandbox evaluation:", err);
    });
};

// 4. List the trainee's past sandbox submissions
export const getSandboxEvaluations = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/sandbox/evaluations`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching sandbox evaluations:", err);
    });
};
