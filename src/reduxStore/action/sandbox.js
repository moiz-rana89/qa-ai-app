import Api from "../lib/api";

// All Sandbox endpoints are scoped per-client. The actual BE routes are:
//   GET   /qa_ai_apis/sandbox/{client_id}/tickets
//   GET   /qa_ai_apis/sandbox/{client_id}/evaluations
//   POST  /qa_ai_apis/sandbox/{client_id}/evaluate
//   PATCH /qa_ai_apis/sandbox/{client_id}/tickets/{ticket_id}
//
// Each action takes `clientId` as the first argument. The pages enforce
// that a client has been picked before calling.

// 1. List sandbox tickets for a client
export const getSandboxTickets = (clientId, params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/sandbox/${clientId}/tickets`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching sandbox tickets:", err);
    });
};

// 2. Flag / unflag a ticket as sandbox (admin / curator)
export const toggleSandboxTicket = (
  clientId,
  ticketId,
  body,
  handleResponse
) => () => {
  Api.patch(`/qa_ai_apis/sandbox/${clientId}/tickets/${ticketId}`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error toggling sandbox flag:", err);
    });
};

// 3. Submit a sandbox evaluation (trainee — main workflow)
export const submitSandboxEvaluation = (clientId, body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/sandbox/${clientId}/evaluate`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error submitting sandbox evaluation:", err);
    });
};

// 4. List the trainee's past sandbox submissions for a client
export const getSandboxEvaluations = (
  clientId,
  params,
  handleResponse
) => () => {
  Api.get(`/qa_ai_apis/sandbox/${clientId}/evaluations`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching sandbox evaluations:", err);
    });
};
