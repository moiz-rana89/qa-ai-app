import Api from "../lib/api";

const BASE = "/api/triage";

// Shared query-param builder — omits undefined/null/empty, passes arrays
// through as repeated keys (Api's querystring builder already does this).
const buildParams = (params = {}) => {
  const queryParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value) && value.length === 0) return;
    queryParams[key] = value;
  });
  return queryParams;
};

// Generic GET thunk factory — every read endpoint below is a plain GET
// that forwards (success, data) to the caller. Nothing is written to a
// redux reducer; callers keep fetched data in local component state via
// the local useApiRequest hook (same split as the Reporting/QA Form
// Coverage modules).
const makeGetThunk = (buildRoute) => {
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

// Generic POST/mutation thunk factory. Always attaches a real .catch()
// (a prior bug elsewhere in this app — a bare try/catch around an async
// call — silently swallowed failures and never told the caller; never
// repeat that here).
const makePostThunk = (buildRoute) => {
  return (params = {}, body, handleResponse) => {
    return () => {
      Api.post(buildRoute(params), body)
        .then(({ data }) => handleResponse?.(true, data))
        .catch((err) => handleResponse?.(false, err));
    };
  };
};

const makePatchThunk = (buildRoute) => {
  return (params = {}, body, handleResponse) => {
    return () => {
      Api.patch(buildRoute(params), body)
        .then(({ data }) => handleResponse?.(true, data))
        .catch((err) => handleResponse?.(false, err));
    };
  };
};

// --- Reads ---

// v3 primary screen — agent-grouped, replaces the old flag-grouped /feed.
export const getTriageAgents = makeGetThunk((params) => ({
  route: `${BASE}/agents`,
  query: buildParams(params),
}));

export const getTriageSummary = makeGetThunk(() => ({
  route: `${BASE}/summary`,
  query: {},
}));

export const getTriageFlag = makeGetThunk((params) => ({
  route: `${BASE}/flags/${params.id}`,
  query: {},
}));

export const getTriageEscalated = makeGetThunk((params) => ({
  route: `${BASE}/escalated`,
  query: buildParams(params),
}));

export const getTriageGaps = makeGetThunk((params) => ({
  route: `${BASE}/gaps`,
  query: buildParams(params),
}));

export const getTriageFilters = makeGetThunk(() => ({
  route: `${BASE}/filters`,
  query: {},
}));

export const getTriageConfig = makeGetThunk(() => ({
  route: `${BASE}/config`,
  query: {},
}));

export const getAgentRecurrence = makeGetThunk((params) => ({
  route: `${BASE}/agents/${params.user_id}/recurrence`,
  query: {},
}));

// upcoming_only=true lists booked calls with seconds_until and flag_count.
export const getTriageCalls = makeGetThunk((params) => ({
  route: `${BASE}/calls`,
  query: buildParams(params),
}));

// --- Mutations ---

export const resolveTriageFlag = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/resolve`
);
export const dismissTriageFlag = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/dismiss`
);

// body: { flag_ids: [...], scheduled_for: isoString } — scheduled_for must
// be within the next callBookingMaxHours (24h); API 422s outside that
// window, in the past, or with an empty flag_ids list. All flag_ids must
// belong to the same agent — mixing agents also 422s.
export const scheduleTriageCall = makePostThunk(() => `${BASE}/calls`);

// body: { fathom_link?, call_summary, action_plan, expected_resolution_date? }
// call_summary and action_plan are required (422 otherwise). Does NOT
// resolve the flags — they stay in_progress until someone resolves them.
// Completing an already-completed call 422s.
export const completeTriageCall = makePostThunk(
  (params) => `${BASE}/calls/${params.id}/complete`
);

// body: { workflow_state: "act_today" | "watch" | "trending_up" } — moving
// to act_today starts a fresh 8h status clock. "resolved"/"dismissed" via
// this endpoint 422s; use resolveTriageFlag/dismissTriageFlag instead.
export const moveTriageFlagState = makePatchThunk(
  (params) => `${BASE}/flags/${params.id}/state`
);
