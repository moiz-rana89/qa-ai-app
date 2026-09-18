// Only valid form_type values per the API spec — the backend silently
// falls back to ["QA"] for anything else, so the picker only ever offers
// these three.
export const FORM_TYPE_OPTIONS = [
  { label: "QA", value: "QA" },
  { label: "RCA", value: "RCA" },
  { label: "Shadowing", value: "Shadowing" },
];

// Allowed sort_by values per endpoint — the API silently falls back to
// its own default on an unrecognized value, so these are enforced
// client-side too (matches the spec's "validate allowed values" note).
export const CLIENT_COUNT_SORT_FIELDS = ["client_count", "form_name", "created_at"];
export const GRADING_STATS_SORT_FIELDS = [
  "total_count",
  "graded_count",
  "ungraded_count",
  "form_name",
];

// Percent fields are already rounded to 2dp server-side — never re-round,
// just guard against null/undefined and append "%".
export const formatPct = (value) => `${value ?? 0}%`;

export const formatCount = (value) => (value == null ? "—" : value.toLocaleString());

// Ant Design Select "tri-state" options for the is_archived / is_enabled
// filters — "All" omits the param entirely (both true and false counted).
export const TRI_STATE_OPTIONS = (yesLabel, noLabel) => [
  { label: "All", value: undefined },
  { label: yesLabel, value: true },
  { label: noLabel, value: false },
];
