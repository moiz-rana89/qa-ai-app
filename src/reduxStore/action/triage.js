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

// --- Reads ---

export const getTriageFeed = makeGetThunk((params) => ({
  route: `${BASE}/feed`,
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

export const getTriageOverrides = makeGetThunk((params) => ({
  route: `${BASE}/overrides`,
  query: buildParams(params),
}));

export const getTriagePlaybook = makeGetThunk(() => ({
  route: `${BASE}/playbook`,
  query: {},
}));

export const getTriageRuns = makeGetThunk((params) => ({
  route: `${BASE}/runs`,
  query: buildParams(params),
}));

// --- Mutations ---

export const addTriageFlagNote = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/notes`
);
export const acknowledgeTriageFlag = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/acknowledge`
);
export const resolveTriageFlag = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/resolve`
);
export const dismissTriageFlag = makePostThunk(
  (params) => `${BASE}/flags/${params.id}/dismiss`
);
export const createTriagePlaybookEntry = makePostThunk(() => `${BASE}/playbook`);
export const approveTriagePlaybookEntry = makePostThunk(
  (params) => `${BASE}/playbook/${params.id}/approve`
);
export const createTriageRun = makePostThunk(() => `${BASE}/runs`);
