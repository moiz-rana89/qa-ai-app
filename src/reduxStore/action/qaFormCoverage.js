import Api from "../lib/api";

const BASE = "/qa_ai_new/analytics";

// Shared query-param builder for the analytics endpoints — omits
// undefined/null/empty values, and passes arrays straight through
// (Api's querystring builder already emits repeated keys for arrays,
// e.g. form_type=QA&form_type=RCA — matches the spec's own example).
const buildParams = (params = {}) => {
  const queryParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value) && value.length === 0) return;
    queryParams[key] = value;
  });
  return queryParams;
};

// Generic thunk factory — every analytics endpoint is a plain GET that
// forwards (success, data) to the caller. Nothing here is written to a
// redux reducer; callers keep the fetched data in local component state
// (same split used by the Reporting module's useReport hook).
const makeAnalyticsThunk = (buildRoute) => {
  return (params = {}, handleResponse, signal) => {
    return () => {
      const { route, query } = buildRoute(params);
      Api.get(route, query, { signal })
        .then(({ data }) => handleResponse?.(true, data))
        .catch((err) => {
          if (err?.name === "AbortError") return;
          handleResponse?.(false, err);
        });
    };
  };
};

// Endpoint 1 — coverage summary tiles.
export const getClientsCoverage = makeAnalyticsThunk((params) => ({
  route: `${BASE}/clients/coverage`,
  query: buildParams(params),
}));

// Endpoint 2 — assigned clients list (paginated).
export const getAssignedClients = makeAnalyticsThunk((params) => ({
  route: `${BASE}/clients/assigned`,
  query: buildParams(params),
}));

// Endpoint 3 — unassigned clients list (paginated).
export const getUnassignedClients = makeAnalyticsThunk((params) => ({
  route: `${BASE}/clients/unassigned`,
  query: buildParams(params),
}));

// Endpoint 4 — forms by client count (paginated, sortable).
export const getFormsClientCounts = makeAnalyticsThunk((params) => ({
  route: `${BASE}/forms/client-counts`,
  query: buildParams(params),
}));

// Endpoint 5 — forms by ticket grading throughput (paginated, sortable).
// Not real-time — backed by a materialized view refreshed every 15-30min.
// Never poll this faster than a few minutes.
export const getFormsTicketGradingStats = makeAnalyticsThunk((params) => ({
  route: `${BASE}/forms/ticket-grading-stats`,
  query: buildParams(params),
}));

// Endpoint 6 — single form detail (form_id is a path param, not a query
// param). A "not found" result is still a 200 with an `error` key in the
// body — callers must check `data?.error`, not the HTTP status.
export const getFormStats = makeAnalyticsThunk((params) => ({
  route: `${BASE}/forms/${params.form_id}/stats`,
  query: {},
}));
