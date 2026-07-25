import Api from "../lib/api";

// All endpoints for the Endorsement Report page.
// Read-only stakeholder view — no Redux state setters needed; each action
// is a thin wrapper that calls the API and forwards the response (or error)
// to the page-level callback so the page can manage its own local state.

// ─── Filter dropdown sources ──────────────────────────────────────────────
// These reuse the same endpoints the attendance reporting pages already use,
// so dropdown contents are consistent across the app. Each endpoint wraps
// its list in either `.data` or `.results`; we extract the inner array here
// so callers always receive a plain array.

export const getEndorsementAgents = (handleResponse) => () => {
  Api.get(`/get-team-members-filter`)
    .then(({ data }) => handleResponse?.(true, data?.data || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement agent filter:", err);
    });
};

export const getEndorsementClients = (handleResponse) => () => {
  Api.get(`/reports/get_client_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement client filter:", err);
    });
};

export const getEndorsementTeamLeads = (handleResponse) => () => {
  Api.get(`/reports/get_teamlead_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement TL filter:", err);
    });
};

export const getEndorsementCsms = (handleResponse) => () => {
  Api.get(`/reports/get_csm_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement CSM filter:", err);
    });
};

export const getEndorsementOms = (handleResponse) => () => {
  Api.get(`/reports/get_om_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement OM filter:", err);
    });
};

// Senior CSM has no dropdown endpoint in the existing attendance APIs, so
// this one continues to use the awd-* endpoint built for endorsement.
export const getEndorsementSeniorCsms = (handleResponse) => () => {
  Api.get(`/workforce/reports/awd-filter-senior-csm`)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement senior-CSM filter:", err);
    });
};

// ─── Section data fetches ─────────────────────────────────────────────────

export const getEndorsementAttendanceOverview = (params, handleResponse) => () => {
  Api.get(`/endorsement/attendance-overview`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement attendance overview:", err);
    });
};

export const getEndorsementActivityOverview = (params, handleResponse) => () => {
  Api.get(`/endorsement/activity-overview`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement activity overview:", err);
    });
};

export const getEndorsementHubspotProperties = (params, handleResponse) => () => {
  Api.get(`/endorsement/hubspot-properties`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching endorsement hubspot properties:", err);
    });
};
