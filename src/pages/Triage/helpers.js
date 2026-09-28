// Vocabulary — never render raw backend enum values, always map through
// these tables.

export const URGENCY_ORDER = ["today", "48_72h", "this_week"];

export const URGENCY_LABELS = {
  today: {
    label: "Act today",
    subtitle: "Churn, breaches, and rising backlog — resolve within hours.",
    accent: "#FF3434",
  },
  "48_72h": {
    label: "This shift",
    subtitle:
      "Quality, coverage, throughput, and integrity — acknowledge today, resolve in 48–72h.",
    accent: "#F5A623",
  },
  this_week: {
    label: "This week",
    subtitle: "Patterns, coaching, and planning.",
    accent: "#7F8A92",
  },
};

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
};

export const STATUS_LABELS = {
  open: "Open",
  acknowledged: "Acknowledged",
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

// metric -> unit/render rules (§4). Matched by suffix where the metric
// family is open-ended (e.g. "email_frt", "chat_frt").
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

// Direction matters (§4): for these metrics the target is a floor —
// actual BELOW target is the failure. Everything else is a ceiling —
// actual ABOVE target is the failure. Used only to color/orient a
// tile's "under/over target" indicator; never to hide data.
const MINIMUM_METRICS = ["qa_score", "csat", "tickets_per_productive_hour"];
export const metricDirection = (metric) =>
  MINIMUM_METRICS.includes(metric) ? "min" : "max";

// Human label for a raw metric key, when no friendlier context is
// available (evidence blocks, config tables) — snake_case -> Title Case.
export const humanizeMetric = (metric) =>
  (metric || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Countdown to a calendar-time deadline (resolve_due_at / ack_due_at) —
// these run overnight and through weekends by design, so this is a
// plain wall-clock diff, not a business-hours calculation.
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
