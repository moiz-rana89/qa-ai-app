import Api from "../lib/api";

// All actions for the "Need Help" reports system.
// Endpoints under /qa_ai_apis/ — same cookie auth as the rest of the app.
//
// Every action forwards (success, dataOrError) to a page-level callback so
// the page manages its own local state — no Redux store coupling.

// ─── Stats (badge counts) ──────────────────────────────────────────────
// GET /qa_ai_apis/reports/stats?scope=mine|team|all
export const getReportsStats = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/reports/stats`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching reports stats:", err);
    });
};

// ─── List reports (paginated) ───────────────────────────────────────────
// GET /qa_ai_apis/reports?scope=&report_type=&resolved_by_eng=&decision_by_stakeholder=&submitted_by=&page=&size=
export const getReportsList = (params, handleResponse) => () => {
  Api.get(`/qa_ai_apis/reports`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching reports list:", err);
    });
};

// ─── Single report + its comments ───────────────────────────────────────
// GET /qa_ai_apis/reports/{report_id}
export const getReportById = (reportId, handleResponse) => () => {
  Api.get(`/qa_ai_apis/reports/${reportId}`)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error fetching report:", err);
    });
};

// ─── Edit own report ────────────────────────────────────────────────────
// PATCH /qa_ai_apis/reports/{report_id}
// body should be the diff only — backend blocks if report is resolved.
export const updateReport = (reportId, body, handleResponse) => () => {
  Api.patch(`/qa_ai_apis/reports/${reportId}`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error updating report:", err);
    });
};

// ─── Retract (soft delete) own report ──────────────────────────────────
// DELETE /qa_ai_apis/reports/{report_id}
export const deleteReport = (reportId, handleResponse) => () => {
  Api.delete(`/qa_ai_apis/reports/${reportId}`)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error deleting report:", err);
    });
};

// ─── Add comment ────────────────────────────────────────────────────────
// POST /qa_ai_apis/reports/{report_id}/comments  body: { body }
export const addReportComment = (reportId, body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/reports/${reportId}/comments`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error adding report comment:", err);
    });
};

// ─── Mark resolved (engineer / admin) ──────────────────────────────────
// PATCH /qa_ai_apis/reports/{report_id}/resolve
export const resolveReport = (reportId, handleResponse) => () => {
  Api.patch(`/qa_ai_apis/reports/${reportId}/resolve`, {})
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error resolving report:", err);
    });
};

// ─── Stakeholder decision (OM / admin) ─────────────────────────────────
// PATCH /qa_ai_apis/reports/{report_id}/decision  body: { decision: bool }
export const decideReport = (reportId, decision, handleResponse) => () => {
  Api.patch(`/qa_ai_apis/reports/${reportId}/decision`, { decision })
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error setting report decision:", err);
    });
};
