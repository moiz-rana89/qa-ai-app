import Api from "../lib/api";

// Per the updated API spec, sandbox endpoints are NOT scoped per-client.
// Routes are flat:
//   GET   /qa_ai_apis/sandbox/tickets
//   GET   /qa_ai_apis/sandbox/evaluations
//   POST  /qa_ai_apis/sandbox/evaluate
//   PATCH /qa_ai_apis/sandbox/tickets/{ticket_id}

// 1. List sandbox-flagged tickets
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

// 3. Submit a sandbox evaluation. Body accepts:
//   { ticket_id, source?, form_id?, draft_criteria_overrides? }
export const submitSandboxEvaluation = (body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/sandbox/evaluate`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error submitting sandbox evaluation:", err);
    });
};

// 4. Current user's past sandbox submissions
export const getSandboxEvaluations = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/sandbox/evaluations`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching sandbox evaluations:", err);
    });
};
