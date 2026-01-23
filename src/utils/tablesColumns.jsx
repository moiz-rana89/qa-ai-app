import { formateToLA, formatSecondsToHHMMSS } from "./helperFunctions";

/* =========================
   Remote Team
========================= */
export const ColumnDataRemoteTeam = [
  {
    title: "Agent Name",
    width: 150,
    dataIndex: "agent_name",
    key: "agent_name",
    fixed: "left",
  },
  {
    title: "Client Name",
    width: 150,
    dataIndex: "client_name",
    key: "client_name",
    fixed: "left",
  },
  {
    title: "TL Name",
    width: 150,
    dataIndex: "team_lead",
    key: "team_lead",
  },
  {
    title: "Status",
    width: 150,
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <div className="flex items-center justify-center">
        <div
          className={`capitalize flex items-center justify-center rounded-full px-2 py-1 ${
            item.status === "late"
              ? "bg-[#FFF7D8]"
              : item.status === "missed"
              ? "bg-[#FFECEC]"
              : item.status === "abandoned" || item.status === "unknown"
              ? "bg-[#FFE8CC]"
              : ""
          }`}
        >
          {item.status}
        </div>
      </div>
    ),
  },
  {
    title: "Scheduled Start Time",
    width: 150,
    dataIndex: "start_time",
    key: "start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Start Time",
    width: 150,
    dataIndex: "actual_start_time",
    key: "actual_start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Stop Time",
    width: 150,
    dataIndex: "actual_stop_time",
    key: "actual_stop_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Scheduled Duration",
    width: 150,
    dataIndex: "duration",
    key: "duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Minimum Time",
    width: 150,
    dataIndex: "minimum_time",
    key: "minimum_time",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Actual Duration",
    width: 150,
    dataIndex: "actual_duration",
    key: "actual_duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Resolution Reason",
    width: 150,
    dataIndex: "attendance_reason",
    key: "attendance_reason",
  },
  {
    title: "Resolution Type",
    width: 150,
    dataIndex: "reason_type",
    key: "reason_type",
    render: (value) =>
      value ? (
        <div className="flex items-center justify-center">
          <div
            className={`capitalize rounded-full px-4 py-1 ${
              value === "INVALID" ? "bg-[#FFECEC]" : "bg-[#E4FAED]"
            }`}
          >
            {value}
          </div>
        </div>
      ) : (
        "-"
      ),
  },
  {
    title: "Green Card?",
    width: 150,
    dataIndex: "green_card",
    key: "green_card",
    render: (value) => (
      <div className="flex items-center justify-center">
        <div
          className={`capitalize rounded-full px-4 py-1 ${
            value ? "bg-[#E4FAED]" : "bg-[#FFECEC]"
          }`}
        >
          {value ? "YES" : "NO"}
        </div>
      </div>
    ),
  },
  {
    title: "Green Card Count",
    width: 150,
    dataIndex: "green_card_count",
    key: "green_card_count",
  },
  {
    title: "Notes By WFA",
    width: 450,
    dataIndex: "notes_wfa",
    key: "notes_wfa",
  },
  {
    title: "Notes By TL",
    width: 450,
    dataIndex: "notes",
    key: "notes",
  },
  {
    title: "Resolved by WFA",
    width: 150,
    dataIndex: "status_resolved",
    key: "status_resolved",
  },
  {
    title: "Resolved by TL",
    width: 150,
    dataIndex: "status_resolved_tl",
    key: "status_resolved_tl",
  },
  {
    title: "Updated by TL",
    width: 150,
    dataIndex: "updated_by_tl",
    key: "updated_by_tl",
  },
  {
    title: "TL Updated Time",
    width: 150,
    dataIndex: "db_updated_at_tl",
    key: "db_updated_at_tl",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Attachments",
    width: 150,
    dataIndex: "attachments",
    key: "attachments",
    render: (value) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", textDecoration: "underline" }}
        >
          Attachment
        </a>
      ) : (
        "-"
      ),
  },
  {
    title: "OM Name",
    width: 150,
    dataIndex: "om",
    key: "om",
  },
  {
    title: "CSM Name",
    width: 150,
    dataIndex: "csm",
    key: "csm",
  },
  {
    title: "AOM Name",
    width: 150,
    dataIndex: "aom_name",
    key: "aom_name",
  },
  {
    title: "SOM Name",
    width: 150,
    dataIndex: "som_name",
    key: "som_name",
  },
  {
    title: "Date",
    width: 150,
    dataIndex: "date",
    key: "date",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
];

/* =========================
   Internal Team
========================= */
export const ColumnDataInternalTeam = [
  {
    title: "Member Name",
    width: 150,
    dataIndex: "agent_name",
    key: "agent_name",
    fixed: "left",
  },
  {
    title: "Department",
    width: 150,
    dataIndex: "department",
    key: "department",
    fixed: "left",
  },
  {
    title: "TL Name",
    width: 150,
    dataIndex: "team_lead",
    key: "team_lead",
  },
  {
    title: "Status",
    width: 150,
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <div className="flex items-center justify-center">
        <div
          className={`capitalize rounded-full px-2 py-1 ${
            item.status === "late"
              ? "bg-[#FFF7D8]"
              : item.status === "missed"
              ? "bg-[#FFECEC]"
              : item.status === "abandoned" || item.status === "unknown"
              ? "bg-[#FFE8CC]"
              : ""
          }`}
        >
          {item.status}
        </div>
      </div>
    ),
  },
  {
    title: "Scheduled Start Time",
    width: 150,
    dataIndex: "start_time",
    key: "start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Start Time",
    width: 150,
    dataIndex: "actual_start_time",
    key: "actual_start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Stop Time",
    width: 150,
    dataIndex: "actual_stop_time",
    key: "actual_stop_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Scheduled Duration",
    width: 150,
    dataIndex: "duration",
    key: "duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Minimum Time",
    width: 150,
    dataIndex: "minimum_time",
    key: "minimum_time",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Actual Duration",
    width: 150,
    dataIndex: "actual_duration",
    key: "actual_duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Resolution Reason",
    width: 150,
    dataIndex: "attendance_reason",
    key: "attendance_reason",
  },
  {
    title: "Resolution Type",
    width: 150,
    dataIndex: "reason_type",
    key: "reason_type",
    render: (value) =>
      value ? (
        <div className="flex items-center justify-center">
          <div
            className={`capitalize rounded-full px-4 py-1 ${
              value === "INVALID" ? "bg-[#FFECEC]" : "bg-[#E4FAED]"
            }`}
          >
            {value}
          </div>
        </div>
      ) : (
        "-"
      ),
  },
  {
    title: "Green Card?",
    width: 150,
    dataIndex: "green_card",
    key: "green_card",
    render: (value) => (
      <div className="flex items-center justify-center">
        <div
          className={`capitalize rounded-full px-4 py-1 ${
            value ? "bg-[#E4FAED]" : "bg-[#FFECEC]"
          }`}
        >
          {value ? "YES" : "NO"}
        </div>
      </div>
    ),
  },
  {
    title: "Green Card Count",
    width: 150,
    dataIndex: "green_card_count",
    key: "green_card_count",
  },
  {
    title: "Notes By WFA",
    width: 450,
    dataIndex: "notes_wfa",
    key: "notes_wfa",
  },
  {
    title: "Notes By TL",
    width: 450,
    dataIndex: "notes",
    key: "notes",
  },
  {
    title: "Resolved by WFA",
    width: 150,
    dataIndex: "status_resolved",
    key: "status_resolved",
  },
  {
    title: "Resolved by TL",
    width: 150,
    dataIndex: "status_resolved_tl",
    key: "status_resolved_tl",
  },
  {
    title: "Updated by TL",
    width: 150,
    dataIndex: "updated_by_tl",
    key: "updated_by_tl",
  },
  {
    title: "TL Updated Time",
    width: 150,
    dataIndex: "db_updated_at_tl",
    key: "db_updated_at_tl",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Attachments",
    width: 150,
    dataIndex: "attachments",
    key: "attachments",
    render: (value) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", textDecoration: "underline" }}
        >
          Attachment
        </a>
      ) : (
        "-"
      ),
  },
  {
    title: "Dept. Manager",
    width: 150,
    dataIndex: "om",
    key: "om",
  },
  {
    title: "Dept. Director",
    width: 150,
    dataIndex: "csm",
    key: "csm",
  },
  {
    title: "Date",
    width: 150,
    dataIndex: "date",
    key: "date",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
];

/* =========================
   Remote Team TL
========================= */
export const ColumnDataRemoteTeamTL = [
  {
    title: "Agent Name",
    width: 150,
    dataIndex: "agent_name",
    key: "agent_name",
    fixed: "left",
  },
  {
    title: "Client Name",
    width: 150,
    dataIndex: "client_name",
    key: "client_name",
    fixed: "left",
  },
  {
    title: "TL Name",
    width: 150,
    dataIndex: "team_lead",
    key: "team_lead",
  },
  {
    title: "Status",
    width: 150,
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <div className="flex items-center justify-center">
        <div
          className={`capitalize rounded-full px-2 py-1 ${
            item.status === "late"
              ? "bg-[#FFF7D8]"
              : item.status === "missed"
              ? "bg-[#FFECEC]"
              : item.status === "abandoned" || item.status === "unknown"
              ? "bg-[#FFE8CC]"
              : ""
          }`}
        >
          {item.status}
        </div>
      </div>
    ),
  },
  {
    title: "Scheduled Start Time",
    width: 150,
    dataIndex: "start_time",
    key: "start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Start Time",
    width: 150,
    dataIndex: "actual_start_time",
    key: "actual_start_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Actual Stop Time",
    width: 150,
    dataIndex: "actual_stop_time",
    key: "actual_stop_time",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
  {
    title: "Scheduled Duration",
    width: 150,
    dataIndex: "duration",
    key: "duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Minimum Time",
    width: 150,
    dataIndex: "minimum_time",
    key: "minimum_time",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Actual Duration",
    width: 150,
    dataIndex: "actual_duration",
    key: "actual_duration",
    render: (value) => (value ? formatSecondsToHHMMSS(value) : "-"),
  },
  {
    title: "Resolution Reason",
    width: 150,
    dataIndex: "attendance_reason",
    key: "attendance_reason",
  },
  {
    title: "OM Name",
    width: 150,
    dataIndex: "om",
    key: "om",
  },
  {
    title: "CSM Name",
    width: 150,
    dataIndex: "csm",
    key: "csm",
  },
  {
    title: "AOM Name",
    width: 150,
    dataIndex: "aom_name",
    key: "aom_name",
  },
  {
    title: "SOM Name",
    width: 150,
    dataIndex: "som_name",
    key: "som_name",
  },
  {
    title: "Date",
    width: 150,
    dataIndex: "date",
    key: "date",
    render: (value) => (value ? formateToLA(value) : "-"),
  },
];
