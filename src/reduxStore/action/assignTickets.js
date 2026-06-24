import Api from "../lib/api";

// POST /qa_ai_apis/assign-tickets
//
// `body` must include either { total } OR { per_client } (never both — the
// backend ignores `total` if `per_client` is present). The modal that calls
// this strips zeroes from per_client before invoking.
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
