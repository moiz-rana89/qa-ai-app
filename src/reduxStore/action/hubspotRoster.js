import Api from "../lib/api";

// All endpoints for the Remote Members Roster (HubSpot Roster) page.
// Read-only — no Redux state setters needed; each action forwards its
// response to a page-level callback so the page manages local state.

// ─── Filter dropdown sources ──────────────────────────────────────────────
// These reuse the same endpoints the attendance reporting pages use, so
// dropdown contents stay consistent across the app. Each endpoint wraps its
// list in either `.data` or `.results`; we extract the inner array here so
// callers always receive a plain array.

export const getRosterClients = (handleResponse) => () => {
  Api.get(`/reports/get_client_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster client filter:", err);
    });
};

export const getRosterAgents = (handleResponse) => () => {
  Api.get(`/get-team-members-filter`)
    .then(({ data }) => handleResponse?.(true, data?.data || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster agent filter:", err);
    });
};

export const getRosterCsms = (handleResponse) => () => {
  Api.get(`/reports/get_csm_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster CSM filter:", err);
    });
};

// Senior CSM has no dropdown endpoint in the existing attendance APIs, so
// this one continues to use the awd-* endpoint built for endorsement.
export const getRosterSeniorCsms = (handleResponse) => () => {
  Api.get(`/workforce/reports/awd-filter-senior-csm`)
    .then(({ data }) => handleResponse?.(true, data?.data || data || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster senior-CSM filter:", err);
    });
};

export const getRosterOms = (handleResponse) => () => {
  Api.get(`/reports/get_om_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster OM filter:", err);
    });
};

export const getRosterTeamLeads = (handleResponse) => () => {
  Api.get(`/reports/get_teamlead_names`)
    .then(({ data }) => handleResponse?.(true, data?.results || []))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching roster TL filter:", err);
    });
};

// ─── Roster list (JSON) ───────────────────────────────────────────────────

export const getRemoteMembersRoster = (params, handleResponse) => () => {
  Api.get(`/workforce/reports/all-remote-members-roster`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching remote members roster:", err);
    });
};

// ─── CSV download ─────────────────────────────────────────────────────────
// Uses ?csv=true on the same endpoint. Backend returns a text/csv blob; the
// Api wrapper detects `content-type: text/csv` and returns `{ data: Blob, contentType }`.

export const downloadRemoteMembersRosterCsv = (params, handleResponse) => () => {
  const apiParams = { ...params, csv: "true" };
  Api.get(`/workforce/reports/all-remote-members-roster`, apiParams)
    .then(({ data, contentType }) => {
      const blob =
        data instanceof Blob ? data : new Blob([data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Filename pattern matches the spec example.
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      link.setAttribute("download", `all_remote_members_roster_${today}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      handleResponse?.(true);
    })
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error downloading remote members roster CSV:", err);
    });
};
