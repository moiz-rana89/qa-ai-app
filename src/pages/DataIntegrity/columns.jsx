import { Icon } from "@iconify/react";
import { formatDateTimeEnglish } from "../../utils/helperFunctions";

// Whitelisted sortable fields per the API spec — sending any other
// sort_by value gets a 400 back, so every other column must disable
// its sorter.
export const SORTABLE_FIELDS = [
  "agent_name",
  "team_lead_name",
  "om_name",
  "csm_name",
  "client_name",
  "helpdesk_user_id",
  "helpdesk_user_email",
  "hubstaff_user_id",
  "hubspot_ticket_id",
  "updated_at",
];

const emptyDash = <span className="text-[#7F8A92]">—</span>;

const textColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  disableSort: !SORTABLE_FIELDS.includes(dataIndex),
  render: (value) => value || emptyDash,
});

// Like textColumn, but for numeric fields — falls back to the dash only
// on null/undefined, since a real 0 (e.g. zero schedule rows) is itself
// meaningful and shouldn't render the same as "no data".
const numberColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  disableSort: !SORTABLE_FIELDS.includes(dataIndex),
  render: (value) => (value == null ? emptyDash : value),
});

// Comma-joined list column — for array fields like schedule_clients /
// schedule_projects. Not in SORTABLE_FIELDS (arrays aren't sortable
// server-side), so always disableSort.
const listColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  disableSort: true,
  render: (value) =>
    Array.isArray(value) && value.length ? value.join(", ") : emptyDash,
});

// Same shape as listColumn, but renders each entry as a small tag —
// used for the *_missing_fields arrays so a row's specific gaps (e.g.
// "helpdesk_user_email", "schedule_projects") are visible at a glance
// instead of just a generic "has an issue" flag.
const missingFieldsColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  disableSort: true,
  render: (value) =>
    Array.isArray(value) && value.length ? (
      <div className="flex flex-wrap gap-1">
        {value.map((field) => (
          <span
            key={field}
            className="inline-flex items-center px-2 py-[1px] rounded-full text-[11px] font-medium bg-[#FFF3D8] text-[#B86E00] whitespace-nowrap"
          >
            {field}
          </span>
        ))}
      </div>
    ) : (
      emptyDash
    ),
});

// Shared by Roster and Issues — same page-column mapping. `showIssueFlag`
// adds a read-only "Issue" badge column (Roster only — every Issues row
// is, by definition, already an issue) driven by the row's `has_issue`
// signal so problem rows are visible without a second request.
export const getDataIntegrityColumns = ({ showIssueFlag = false } = {}) => {
  const columns = [
    textColumn("Agent Name", "agent_name"),
    textColumn("Team Lead Name", "team_lead_name"),
    textColumn("OM Name", "om_name"),
    textColumn("CSM Name", "csm_name"),
    textColumn("Client Name", "client_name"),
    textColumn("Helpdesk User ID", "helpdesk_user_id"),
    textColumn("Helpdesk User Email", "helpdesk_user_email"),
    textColumn("Helpdesk Client ID", "helpdesk_client_id"),
    // Hubstaff ids are bigints past Number.MAX_SAFE_INTEGER — the API
    // sends them as strings; render as-is, never coerce with Number()/parseInt.
    textColumn("Hubstaff User ID", "hubstaff_user_id"),
    textColumn("Hubstaff Client ID", "hubstaff_client_id"),
    {
      title: "HubSpot Ticket",
      dataIndex: "hubspot_ticket_id",
      key: "hubspot_ticket",
      disableSort: !SORTABLE_FIELDS.includes("hubspot_ticket_id"),
      render: (_, record) =>
        record.hubspot_ticket_url ? (
          <a
            href={record.hubspot_ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A56DB] underline"
          >
            {record.hubspot_ticket_name || "View Ticket"}
          </a>
        ) : (
          <span className="text-[#7F8A92]">—</span>
        ),
    },
    textColumn("Helpdesk Platform", "cs_helpdesk"),
    missingFieldsColumn("Missing Helpdesk Fields", "missing_fields"),
    textColumn("Agent Status", "agent_status"),
    listColumn("Schedule Client(s)", "schedule_clients"),
    listColumn("Schedule Project(s)", "schedule_projects"),
    numberColumn("Schedule Rows", "schedule_row_count"),
    missingFieldsColumn("Missing Schedule Fields", "schedule_missing_fields"),
    {
      title: "Last Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      disableSort: !SORTABLE_FIELDS.includes("updated_at"),
      render: (value) => (value ? formatDateTimeEnglish(value) : emptyDash),
    },
  ];

  if (showIssueFlag) {
    columns.push({
      title: "Issue",
      key: "has_issue",
      disableSort: true,
      render: (_, record) =>
        record.has_issue ? (
          <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[11px] font-semibold bg-[#FFECEC] text-[#C81E1E] whitespace-nowrap">
            <Icon icon="mdi:alert-circle-outline" /> Missing data
          </span>
        ) : null,
    });
  }

  return columns;
};
