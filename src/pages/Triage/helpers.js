// Vocabulary — never render raw backend enum values, always map through
// these tables. v3: the deadline-tier model (today/48_72h/this_week) was
// replaced by a status workflow (act_today/in_progress/watch/trending_up).

export const WORKFLOW_STATE_ORDER = ["act_today", "in_progress", "watch", "trending_up"];

export const WORKFLOW_STATE_LABELS = {
  act_today: {
    label: "Act today",
    subtitle: "8-hour clock running — needs a status change today.",
    accent: "#FF3434",
  },
  in_progress: {
    label: "In progress",
    subtitle: "Call booked, or held and a plan is running.",
    accent: "#F5A623",
  },
  watch: {
    label: "Watch",
    subtitle: "A pattern to keep an eye on — no conversation needed yet.",
    accent: "#1A56DB",
  },
  trending_up: {
    label: "Trending up",
    subtitle: "Emerging — get ahead of it.",
    accent: "#7F8A92",
  },
};

// 13 signals per v3 (11 carried over + 2 new).
export const SIGNAL_LABELS = {
  sla_compliance: "SLA breach",
  frt_drift: "Response drift",
  agent_caused_backlog: "Agent-caused backlog",
  volume_caused_backlog: "Volume-caused backlog",
  channel_neglect: "Channel neglect",
  coverage_shortfall: "Coverage gap",
  activity_high_output_low: "Low output",
  tickets_per_productive_hour: "Throughput",
  low_csat: "Low CSAT",
  qa_score_decline: "QA score",
  churn_risk: "Churn risk",
  unusual_activity_pattern: "Unusual activity pattern",
  slow_pickup_after_ai_handoff: "Slow pickup after AI handoff",
};

// Lifecycle status — a different axis from workflow_state. open/resolved/
// dismissed/auto_closed are the terminal states; workflow_state (above)
// only matters while status is "open".
export const STATUS_LABELS = {
  open: "Open",
  resolved: "Resolved",
  auto_closed: "Auto-closed",
  dismissed: "Dismissed",
};

export const ESCALATION_LEVEL_LABELS = {
  tl: "Team Lead",
  aom_om: "AOM/OM",
  cm: "CM",
  director: "Director",
};

export const signalLabel = (signal) => SIGNAL_LABELS[signal] || signal;
export const statusLabel = (status) => STATUS_LABELS[status] || status;
export const escalationLevelLabel = (level) => ESCALATION_LEVEL_LABELS[level] || level;

// Source chip labels come from the API's own sourceLabels map (per the
// spec: "render as chips using sourceLabels from the API") — this is
// just a safe fallback for when that map hasn't loaded yet or a source
// key isn't in it.
export const sourceLabel = (sourceLabels, source) => sourceLabels?.[source] || source;

export const formatCount = (value) => (value == null ? "—" : Number(value).toLocaleString());

// Duration formatter for raw-seconds metrics — unlike reportingHelpers'
// formatDuration, this also tiers into days (the spec's own examples
// include "3d 9h"), and always shows the two largest nonzero units.
export const formatSecondsDuration = (seconds) => {
  if (seconds == null || Number.isNaN(Number(seconds))) return "—";
  const total = Math.abs(Math.round(Number(seconds)));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

// metric -> unit/render rules. Matched by suffix where the metric family
// is open-ended (e.g. "email_frt", "chat_frt").
export const formatMetricValue = (metric, value) => {
  if (value == null) return "—";
  if (/(_frt|_resolution|_handle_time)$/.test(metric || "")) {
    return formatSecondsDuration(value);
  }
  if (metric === "qa_score" || metric === "hours_worked_ratio") {
    return `${value}%`;
  }
  if (metric === "csat") {
    return Number(value).toFixed(2);
  }
  if (metric === "tickets_per_productive_hour" || metric === "messages_per_online_hour") {
    return `${Number(value).toFixed(2)} /hr`;
  }
  if (metric === "open_tickets") {
    return formatCount(value);
  }
  return formatCount(value);
};

// Direction matters: for these metrics the target is a floor — actual
// BELOW target is the failure. Everything else is a ceiling — actual
// ABOVE target is the failure. Used only to color/orient a tile's
// "under/over target" indicator; never to hide data.
const MINIMUM_METRICS = ["qa_score", "csat", "tickets_per_productive_hour"];
export const metricDirection = (metric) =>
  MINIMUM_METRICS.includes(metric) ? "min" : "max";

// Human label for a raw metric key, when no friendlier context is
// available (config tables, generic rendering) — snake_case -> Title Case.
export const humanizeMetric = (metric) =>
  (metric || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Countdown to a calendar-time deadline — shared by both clocks (the 8h
// status clock and the resolve clock). These run overnight and through
// weekends by design ("clients don't stop seeing issues just because the
// client is not online"), so this is a plain wall-clock diff, never a
// business-hours calculation. Never renders a negative number — flips to
// an explicit overdue state instead.
export const formatCountdown = (dueAtIso, overdue) => {
  if (!dueAtIso) return "—";
  const diffMs = new Date(dueAtIso).getTime() - Date.now();
  if (overdue || diffMs <= 0) return "Overdue";
  const totalSeconds = Math.floor(diffMs / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
};

// "2× in 7 days · 7× in 90d" — built from a flag's recurrence_* fields.
export const formatRecurrenceLine = (flag) => {
  const d7 = flag?.recurrence_7d;
  const d90 = flag?.recurrence_90d;
  if (d7 == null && d90 == null) return null;
  const parts = [];
  if (d7 != null) parts.push(`${d7}× this week`);
  if (d90 != null) parts.push(`${d90}× in 90d`);
  return parts.join(" · ");
};
