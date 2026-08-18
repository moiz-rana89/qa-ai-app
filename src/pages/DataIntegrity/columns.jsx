import { Icon } from "@iconify/react";

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

const textColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  key: dataIndex,
  disableSort: !SORTABLE_FIELDS.includes(dataIndex),
  render: (value) => value || <span className="text-[#7F8A92]">—</span>,
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
    textColumn("Hub Desk User ID", "helpdesk_user_id"),
    textColumn("Hub Desk User Email", "helpdesk_user_email"),
    textColumn("Hub Desk Client ID", "helpdesk_client_id"),
    // Hub Staff ids are bigints past Number.MAX_SAFE_INTEGER — the API
    // sends them as strings; render as-is, never coerce with Number()/parseInt.
    textColumn("Hub Staff User ID", "hubstaff_user_id"),
    textColumn("Hub Staff Client ID", "hubstaff_client_id"),
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
            View Ticket
          </a>
        ) : (
          <span className="text-[#7F8A92]">—</span>
        ),
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
