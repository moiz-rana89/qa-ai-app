import Api from "../lib/api";

// POST /qa_ai_apis/assign-tickets
//
// `body` must include either { total } OR { per_client } (never both — the
// backend ignores `total` if `per_client` is present). The modal that calls
// this strips zeroes from per_client before invoking.
//
// Backend normalizes both slugs (e.g. "parasolco") and display names
// (e.g. "Parasol") in per_client keys, so either form is accepted.
//
// callback receives (success, data):
//   success=true  → data = { assigned, target_email, target_id, role,
//                            breakdown, ticket_ids }
//   success=false → data is the Error from Api.xhr (.response?.status, .data)
export const assignTickets = (body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/assign-tickets`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error assigning tickets:", err);
    });
};

// GET /qa_ai_apis/assign-tickets/preview?email=...&role=...
//
// Returns the target user's per-client eligible-ticket pool:
//   { by_client: { "Parasol": 32, "Affordable Luxury Group (ALG)": 42 } }
// so the modal can:
//   • show only clients that actually have tickets for this user
//   • cap the per-client input at what's available
//   • surface a total-available count for the "global total" mode
//
// If the backend hasn't shipped this endpoint yet (404), the modal falls
// back to the global client list — no hard failure.
export const getAssignPreview = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/assign-tickets/preview`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching assign-tickets preview:", err);
    });
};
