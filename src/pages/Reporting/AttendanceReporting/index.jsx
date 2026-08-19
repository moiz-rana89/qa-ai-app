"use client";

import { Tooltip } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import {
  getAttendanceSummary,
  getAttendanceTotals,
} from "../../../reduxStore/action/reporting";
import { extractApiError } from "../../../utils/helperFunctions";
import {
  formatCount,
  formatRate,
  scopedIdParam,
  toApiSortOrder,
} from "../../../utils/reportingHelpers";
import useReport from "../hooks/useReport";
import ReportingFilterBar from "../components/ReportingFilterBar";
import ReportingTable from "../components/ReportingTable";
import ReportingEmptyState from "../components/ReportingEmptyState";
import KpiTiles from "../components/KpiTiles";
import Skeleton from "../../../components/Skeleton";

const dash = (v) => v ?? <span className="text-[#7F8A92]">—</span>;

const columns = [
  {
    title: "Agent",
    dataIndex: "agent_name",
    key: "agent_name",
    disableSort: false,
    render: (v) =>
      v === "Unattributed" ? (
        <Tooltip title="Agent record no longer exists; counts are still included.">
          <span className="italic text-[#9CA3AF]">Unattributed</span>
        </Tooltip>
      ) : (
        dash(v)
      ),
  },
  {
    title: "Team Lead",
    dataIndex: "team_lead",
    key: "team_lead",
    disableSort: false,
    render: dash,
  },
  {
    title: "OM",
    dataIndex: "operations_manager",
    key: "operations_manager",
    disableSort: false,
    render: dash,
  },
  {
    title: "Client",
    dataIndex: "client_name",
    key: "client_name",
    disableSort: false,
    render: dash,
  },
  {
    title: "Late",
    dataIndex: "late",
    key: "late",
    disableSort: false,
    render: formatCount,
  },
  {
    title: "Abandoned",
    dataIndex: "abandoned",
    key: "abandoned",
    disableSort: false,
    render: formatCount,
  },
  {
    title: "Missed",
    dataIndex: "missed",
    key: "missed",
    disableSort: false,
    render: formatCount,
  },
  {
    title: "On Time",
    dataIndex: "ontime",
    key: "ontime",
    disableSort: false,
    render: formatCount,
  },
  {
    title: "Attendance Points",
    dataIndex: "attendance_points",
    key: "attendance_points",
    disableSort: false,
    render: formatCount,
  },
  {
    title: "Green Cards",
    dataIndex: "green_cards",
    key: "green_cards",
    disableSort: false,
    render: formatCount,
  },
];

export default function AttendanceReporting({
  filters,
  isLoadingFilters,
  scope,
  state,
  setState,
}) {
  const buildBaseParams = () => ({
    start_date: state.dateRange?.[0]?.format("YYYY-MM-DD"),
    end_date: state.dateRange?.[1]?.format("YYYY-MM-DD"),
    agent_id: scopedIdParam(scope, "agent_id", state.selectedAgents),
    team_lead_id: scopedIdParam(scope, "team_lead_id", state.selectedTeamLeads),
    om_id: scopedIdParam(scope, "om_id", state.selectedOms),
    client_id: scopedIdParam(scope, "client_id", state.selectedClients),
    csm_id: scopedIdParam(scope, "csm_id", state.selectedCsms),
  });

  const filterDeps = [
    state.dateRange?.[0]?.valueOf(),
    state.dateRange?.[1]?.valueOf(),
    state.selectedAgents,
    state.selectedTeamLeads,
    state.selectedOms,
    state.selectedClients,
    state.selectedCsms,
  ];

  const totalsReport = useReport(
    getAttendanceTotals,
    buildBaseParams(),
    !scope?.blocked,
    filterDeps
  );

  const summaryParams = {
    ...buildBaseParams(),
    page: state.page,
    size: state.size,
    sort_by: state.sortBy || "attendance_points",
    sort_order: toApiSortOrder(state.sortOrder) || "desc",
  };

  const summaryReport = useReport(
    getAttendanceSummary,
    summaryParams,
    !scope?.blocked,
    [...filterDeps, state.page, state.size, state.sortBy, state.sortOrder]
  );

  if (scope?.blocked) {
    return <ReportingEmptyState variant="blocked" />;
  }

  const totals = totalsReport.data?.totals;
  const hasAnyFilters =
    state.selectedAgents.length ||
    state.selectedTeamLeads.length ||
    state.selectedOms.length ||
    state.selectedClients.length ||
    state.selectedCsms.length;

  const clearFilters = () =>
    setState({
      selectedAgents: [],
      selectedTeamLeads: [],
      selectedOms: [],
      selectedClients: [],
      selectedCsms: [],
    });

  const rows = summaryReport.data?.data || [];
  const showEmptyState = !summaryReport.loading && rows.length === 0;

  const tiles = totals
    ? [
        {
          label: "On Time",
          value: `${formatRate(totals.ontime_rate)}`,
          tooltip: `${formatCount(totals.ontime)} of ${formatCount(
            totals.total_scheduled
          )} scheduled shifts`,
        },
        { label: "Late", value: formatCount(totals.late) },
        { label: "Abandoned", value: formatCount(totals.abandoned) },
        { label: "Missed", value: formatCount(totals.missed) },
        { label: "Attendance Points", value: formatCount(totals.attendance_points) },
        { label: "Green Cards", value: formatCount(totals.green_cards) },
      ]
    : [];

  const fetchCsv = (handleResponse) => {
    getAttendanceSummary(
      { ...summaryParams, csv: true, page: undefined, size: undefined },
      (success, result) => {
        if (!success) {
          toast.error(extractApiError(result, "Failed to export CSV."));
          handleResponse(false, result);
          return;
        }
        handleResponse(true, result);
      }
    );
  };

  return (
    <div>
      <ReportingFilterBar
        filters={filters}
        isLoadingFilters={isLoadingFilters}
        scope={scope}
        dateRangeValue={state.dateRange}
        onDateRangeChange={(strDates) =>
          setState({
            dateRange:
              strDates?.[0] && strDates?.[1]
                ? [dayjs(strDates[0]), dayjs(strDates[1])]
                : null,
            page: 1,
          })
        }
        selectedAgents={state.selectedAgents}
        setSelectedAgents={(v) => setState({ selectedAgents: v, page: 1 })}
        selectedTeamLeads={state.selectedTeamLeads}
        setSelectedTeamLeads={(v) => setState({ selectedTeamLeads: v, page: 1 })}
        selectedOms={state.selectedOms}
        setSelectedOms={(v) => setState({ selectedOms: v, page: 1 })}
        selectedClients={state.selectedClients}
        setSelectedClients={(v) => setState({ selectedClients: v, page: 1 })}
        selectedCsms={state.selectedCsms}
        setSelectedCsms={(v) => setState({ selectedCsms: v, page: 1 })}
      />

      {totalsReport.loading ? (
        <Skeleton className="w-full h-[120px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <KpiTiles tiles={tiles} />
      )}

      {showEmptyState ? (
        <ReportingEmptyState
          variant={hasAnyFilters ? "filtered" : "no-data"}
          onClearFilters={hasAnyFilters ? clearFilters : undefined}
        />
      ) : (
        <ReportingTable
          caption="Attendance by agent"
          columns={columns}
          data={rows}
          loading={summaryReport.loading}
          rowKey="agent_id"
          current={summaryReport.data?.page || state.page}
          pageSize={summaryReport.data?.size || state.size}
          total={summaryReport.data?.total || 0}
          sorting={{
            sort_by: state.sortBy || "attendance_points",
            sort_order: state.sortOrder || "descend",
          }}
          onPageChange={(page) => setState({ page })}
          onPageSizeChange={(size) => setState({ size, page: 1 })}
          onSortChange={(field, order) =>
            setState({
              sortBy: order ? field : undefined,
              sortOrder: order || undefined,
              page: 1,
            })
          }
          fetchCsv={fetchCsv}
          csvFilenameFallback="attendance_reporting.csv"
        />
      )}
    </div>
  );
}
