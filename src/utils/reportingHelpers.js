// Roles the backend's own scope rules mention explicitly — matched here even
// though today's ROUTE_ROLES for /reporting only lets tl/om (+ admin/dev)
// reach the page at all, so this stays correct if that's ever loosened.
const TEAM_LEAD_ROLES = ["tl", "itl", "qa-tl", "dtl"];
const OM_ROLES = ["om", "aom"];
const CSM_ROLES = ["csm"];

// GET /reporting/nav returns { scope: { role, unrestricted, ownerId } }.
// The backend does NOT enforce scope itself — it accepts whatever
// team_lead_id/om_id/csm_id is sent — so this resolver is the actual
// enforcement point. Every reporting request must honor `lockedField`.
export const resolveReportingScope = (nav) => {
  const scope = nav?.scope || {};
  if (scope.unrestricted) {
    return { unrestricted: true, lockedField: null, lockedValue: null, blocked: false };
  }
  if (scope.ownerId == null) {
    return { unrestricted: false, lockedField: null, lockedValue: null, blocked: true };
  }
  const role = scope.role;
  if (TEAM_LEAD_ROLES.includes(role)) {
    return {
      unrestricted: false,
      lockedField: "team_lead_id",
      lockedValue: scope.ownerId,
      blocked: false,
    };
  }
  if (OM_ROLES.includes(role)) {
    return {
      unrestricted: false,
      lockedField: "om_id",
      lockedValue: scope.ownerId,
      blocked: false,
    };
  }
  if (CSM_ROLES.includes(role)) {
    return {
      unrestricted: false,
      lockedField: "csm_id",
      lockedValue: scope.ownerId,
      blocked: false,
    };
  }
  // Unknown role, not flagged unrestricted, has an ownerId — fail closed
  // rather than silently showing everything.
  return { unrestricted: false, lockedField: null, lockedValue: null, blocked: true };
};

// AntDTable's sorting state (and the `sorting` prop that drives its arrow
// display) uses antd's own "ascend"/"descend"/null — the API wants
// "asc"/"desc". Keep component state in antd's format and only convert at
// the point of building request params.
export const toApiSortOrder = (antdOrder) => {
  if (antdOrder === "ascend") return "asc";
  if (antdOrder === "descend") return "desc";
  return undefined;
};

// A locked field always sends the scoped owner id, ignoring whatever (empty)
// local selection exists for it — this is the actual enforcement point for
// "a TL can only ever query their own team_lead_id."
export const scopedIdParam = (scope, field, selectedList) => {
  if (scope?.lockedField === field) return [scope.lockedValue];
  return (selectedList || []).map((item) => item.id);
};

// All hub-desk/coaching duration fields are SECONDS. Never show raw seconds
// in the UI (CSV keeps raw seconds).
export const formatDuration = (seconds) => {
  if (seconds == null || Number.isNaN(Number(seconds))) return "—";
  const total = Math.round(Number(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

// Dates from the API are plain YYYY-MM-DD strings with no timezone.
// new Date("2026-07-01") parses as UTC midnight and renders a day early for
// anyone behind UTC — so this never touches the Date constructor.
export const formatDateOnly = (value) => {
  if (!value) return "—";
  const str = String(value).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (!match) return str;
  const [, y, m, d] = match;
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[Number(m) - 1]} ${Number(d)}, ${y}`;
};

export const formatCount = (n) => {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return Number(n).toLocaleString("en-US");
};

// ontime_rate arrives already as a percent (90.38 means 90.38%) — never
// multiply by 100.
export const formatRate = (n) => {
  if (n == null) return "—";
  return `${Number(n).toFixed(2)}%`;
};

export const formatCsat = (n) => {
  if (n == null) return "—";
  return `${Number(n).toFixed(1)} / 5`;
};

// Parses a `Content-Disposition: attachment; filename="foo.csv"` (or
// filename*=UTF-8''foo.csv) header. `headers` is the Headers object Api.xhr
// now returns alongside `data`.
export const parseContentDispositionFilename = (headers, fallback) => {
  const raw = headers?.get?.("Content-Disposition") || headers?.get?.("content-disposition");
  if (!raw) return fallback;
  const starMatch = /filename\*=UTF-8''([^;]+)/i.exec(raw);
  if (starMatch) {
    try {
      return decodeURIComponent(starMatch[1]);
    } catch {
      return fallback;
    }
  }
  const plainMatch = /filename="?([^";]+)"?/i.exec(raw);
  if (plainMatch) return plainMatch[1];
  return fallback;
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Hub Desk client-view platform / Ticket Monitoring & Performance Coaching
// source labels, straight from the backend spec's literal tables.
export const TICKET_MONITORING_SOURCE_LABELS = {
  custom_form: "Custom Form",
  ticket_monitoring_form: "Ticket Monitoring Simple Form",
  qai_app: "QAI App",
};

export const PERFORMANCE_COACHING_SOURCE_LABELS = {
  og_form: "Performance Coaching Form (original)",
  pc_dashboard: "Performance Coaching Dashboard",
};

export const GROUP_BY_LABELS = {
  agent: "Agent",
  team_lead: "Team Lead",
  om: "OM",
  client: "Client",
};

export const CADENCE_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];
