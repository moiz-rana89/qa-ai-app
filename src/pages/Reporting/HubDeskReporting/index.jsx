"use client";

import { useState } from "react";
import { Segmented, Switch, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import {
  getHubDeskSummary,
  getHubDeskBreakdown,
} from "../../../reduxStore/action/reporting";
import { extractApiError } from "../../../utils/helperFunctions";
import {
  formatCount,
  formatCsat,
  formatDateOnly,
  formatDuration,
  scopedIdParam,
  toApiSortOrder,
  CADENCE_OPTIONS,
} from "../../../utils/reportingHelpers";
import useReport from "../hooks/useReport";
import ReportingFilterBar from "../components/ReportingFilterBar";
import ReportingTable from "../components/ReportingTable";
import ReportingEmptyState from "../components/ReportingEmptyState";
import KpiTiles from "../components/KpiTiles";
import GenericAntdTabs from "../../../components/GenericAntdTabs";
import Skeleton from "../../../components/Skeleton";

const periodLabel = (row) =>
  `${formatDateOnly(row.period_start)} – ${formatDateOnly(row.period_end)}`;

const CLIENT_SORTABLE = [
  "period_start",
  "client_name",
  "tickets_created",
  "tickets_closed",
  "avg_csat",
];
const AGENT_SORTABLE = [
  "period_start",
  "agent_name",
  "closed_tickets",
  "messages_sent",
  "tickets_replied",
  "avg_csat",
  "aom",
];

export default function HubDeskReporting({
  filters,
  isLoadingFilters,
  scope,
  state,
  setState,
}) {
  const [unsupportedDismissed, setUnsupportedDismissed] = useState(false);

  const buildBaseParams = () => ({
    start_date: state.dateRange?.[0]?.format("YYYY-MM-DD"),
    end_date: state.dateRange?.[1]?.format("YYYY-MM-DD"),
    agent_id: scopedIdParam(scope, "agent_id", state.selectedAgents),
    team_lead_id: scopedIdParam(scope, "team_lead_id", state.selectedTeamLeads),
    om_id: scopedIdParam(scope, "om_id", state.selectedOms),
    client_id: scopedIdParam(scope, "client_id", state.selectedClients),
    csm_id: scopedIdParam(scope, "csm_id", state.selectedCsms),
    // AOM names, not ids — sent through as-is (see reporting.js addParam).
    aom: state.selectedAoms,
    cadence: state.cadence,
  });

  const filterDeps = [
    state.dateRange?.[0]?.valueOf(),
    state.dateRange?.[1]?.valueOf(),
    state.selectedAgents,
    state.selectedTeamLeads,
    state.selectedOms,
    state.selectedClients,
    state.selectedCsms,
    state.selectedAoms,
    state.cadence,
  ];

  const summaryParams = {
    ...buildBaseParams(),
    page: state.page,
    size: state.size,
    sort_by: state.sortBy,
    sort_order: toApiSortOrder(state.sortOrder),
  };
  const summary = useReport(
    getHubDeskSummary,
    summaryParams,
    !scope?.blocked && state.view === "client",
    [...filterDeps, state.view, state.page, state.size, state.sortBy, state.sortOrder]
  );

  const breakdownParams = {
    ...buildBaseParams(),
    tp_only: state.tpOnly,
    page: state.page,
    size: state.size,
    sort_by: state.sortBy,
    sort_order: toApiSortOrder(state.sortOrder),
  };
  const breakdown = useReport(
    getHubDeskBreakdown,
    breakdownParams,
    !scope?.blocked && state.view === "agent",
    [
      ...filterDeps,
      state.view,
      state.tpOnly,
      state.page,
      state.size,
      state.sortBy,
      state.sortOrder,
    ]
  );

  if (scope?.blocked) {
    return <ReportingEmptyState variant="blocked" />;
  }

  const hasAnyFilters =
    state.selectedAgents.length ||
    state.selectedTeamLeads.length ||
    state.selectedOms.length ||
    state.selectedClients.length ||
    state.selectedCsms.length ||
    state.selectedAoms.length;

  const clearFilters = () =>
    setState({
      selectedAgents: [],
      selectedTeamLeads: [],
      selectedOms: [],
      selectedClients: [],
      selectedCsms: [],
      selectedAoms: [],
    });

  const includesToday =
    state.dateRange?.[1] && !state.dateRange[1].isBefore(dayjs(), "day");

  const filterBar = (
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
      aomOptions={filters?.aoms}
      selectedAoms={state.selectedAoms}
      setSelectedAoms={(v) => setState({ selectedAoms: v, page: 1 })}
      extra={
        <Segmented
          options={CADENCE_OPTIONS}
          value={state.cadence}
          onChange={(v) =>
            setState({ cadence: v, page: 1, sortBy: undefined, sortOrder: undefined })
          }
        />
      }
    />
  );

  const cadenceHint =
    state.cadence === "daily" ? (
      <div className="text-[12px] text-[#7F8A92] mb-3">
        Daily data trails real time by 1-2 days.
      </div>
    ) : includesToday ? (
      <div className="text-[12px] text-[#7F8A92] mb-3">
        The current {state.cadence === "monthly" ? "month" : "week"} is still
        in progress and is excluded — its numbers would lag the live
        helpdesk and would not reconcile.
      </div>
    ) : null;

  const clientView = () => {
    const totals = summary.data?.totals;
    const rows = summary.data?.data || [];
    const showEmpty = !summary.loading && rows.length === 0;
    const unsupported = summary.data?.unsupportedClients || [];
    const unsupportedTotal = unsupported.reduce((a, u) => a + (u.clients || 0), 0);

    const columns = [
      {
        title: "Client",
        dataIndex: "client_name",
        key: "client_name",
        disableSort: !CLIENT_SORTABLE.includes("client_name"),
      },
      { title: "Account", dataIndex: "account", key: "account", disableSort: true },
      { title: "Platform", dataIndex: "platform", key: "platform", disableSort: true },
      {
        title: "Period",
        dataIndex: "period_start",
        key: "period_start",
        disableSort: !CLIENT_SORTABLE.includes("period_start"),
        render: (_, row) => periodLabel(row),
      },
      {
        title: "Tickets Created",
        dataIndex: "tickets_created",
        key: "tickets_created",
        disableSort: !CLIENT_SORTABLE.includes("tickets_created"),
        render: formatCount,
      },
      {
        title: "Tickets Closed",
        dataIndex: "tickets_closed",
        key: "tickets_closed",
        disableSort: !CLIENT_SORTABLE.includes("tickets_closed"),
        render: formatCount,
      },
      {
        title: "Tickets Replied",
        dataIndex: "tickets_replied",
        key: "tickets_replied",
        disableSort: true,
        render: formatCount,
      },
      {
        title: "Messages Sent",
        dataIndex: "messages_sent",
        key: "messages_sent",
        disableSort: true,
        render: formatCount,
      },
      {
        title: "Median Response",
        dataIndex: "median_response_time",
        key: "median_response_time",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "Median First Response",
        dataIndex: "median_first_response_time",
        key: "median_first_response_time",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "Median Resolution",
        dataIndex: "median_resolution_time",
        key: "median_resolution_time",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "CSAT",
        dataIndex: "avg_csat",
        key: "avg_csat",
        disableSort: !CLIENT_SORTABLE.includes("avg_csat"),
        render: formatCsat,
      },
    ];

    const fetchCsv = (handleResponse) => {
      getHubDeskSummary(
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
        {summary.loading ? (
          <Skeleton className="w-full h-[100px] mb-4" rounded="rounded-[16px]" />
        ) : (
          <KpiTiles
            titleTooltip={summary.data?.rateMetricsNote}
            tiles={[
              { label: "Clients", value: formatCount(totals?.clients) },
              { label: "Periods", value: formatCount(totals?.periods) },
              { label: "Tickets Created", value: formatCount(totals?.tickets_created) },
              { label: "Tickets Closed", value: formatCount(totals?.tickets_closed) },
              { label: "Tickets Replied", value: formatCount(totals?.tickets_replied) },
              { label: "Messages Sent", value: formatCount(totals?.messages_sent) },
            ]}
          />
        )}

        {cadenceHint}

        {!unsupportedDismissed && unsupported.length > 0 && (
          <div className="flex items-start justify-between gap-3 bg-[#FFF7D8] border border-[#F5E7A8] rounded-[10px] px-3 py-2 mb-3 text-[12px] text-[#163143]">
            <span>
              {formatCount(unsupportedTotal)} clients have no Helpdesk data (
              {unsupported.map((u) => `${u.platform_label} ${u.clients}`).join(", ")})
            </span>
            <button
              type="button"
              onClick={() => setUnsupportedDismissed(true)}
              className="text-[#7F8A92]"
              aria-label="Dismiss"
            >
              <Icon icon="mdi:close" fontSize={16} />
            </button>
          </div>
        )}

        {showEmpty ? (
          <ReportingEmptyState
            variant={hasAnyFilters ? "filtered" : "no-data"}
            onClearFilters={hasAnyFilters ? clearFilters : undefined}
          />
        ) : (
          <ReportingTable
            caption="Helpdesk — Client view"
            columns={columns}
            data={rows}
            loading={summary.loading}
            rowKey="client_id"
            current={summary.data?.page || state.page}
            pageSize={summary.data?.size || state.size}
            total={summary.data?.total || 0}
            sorting={{ sort_by: state.sortBy, sort_order: state.sortOrder }}
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
            csvFilenameFallback={`helpdesk_client_${state.cadence}.csv`}
          />
        )}
      </div>
    );
  };

  const agentView = () => {
    const totals = breakdown.data?.totals;
    const rows = breakdown.data?.data || [];
    const showEmpty = !breakdown.loading && rows.length === 0;

    const columns = [
      {
        title: "Client",
        dataIndex: "client_name",
        key: "client_name",
        disableSort: true,
      },
      {
        title: "Agent",
        dataIndex: "agent_name",
        key: "agent_name",
        disableSort: !AGENT_SORTABLE.includes("agent_name"),
        render: (v, row) => (
          <span className="flex items-center gap-2">
            {v}
            {row.is_tp_agent === false && (
              <Tooltip title="Only ~1 in 5 helpdesk agents matches a TalentPop identity. This one is external.">
                <span className="px-2 py-[1px] rounded-full text-[10px] font-semibold bg-[#F1F5F5] text-[#7F8A92]">
                  external
                </span>
              </Tooltip>
            )}
          </span>
        ),
      },
      { title: "Team Lead", dataIndex: "team_lead", key: "team_lead", disableSort: true, render: (v) => v ?? "—" },
      {
        title: "OM",
        dataIndex: "operations_manager",
        key: "operations_manager",
        disableSort: true,
        render: (v) => v ?? "—",
      },
      {
        title: "AOM",
        dataIndex: "aom",
        key: "aom",
        // Nullable — populated for only some agents, not an "issue" to filter.
        disableSort: !AGENT_SORTABLE.includes("aom"),
        render: (v) => v ?? "—",
      },
      {
        title: "Period",
        dataIndex: "period_start",
        key: "period_start",
        disableSort: !AGENT_SORTABLE.includes("period_start"),
        render: (_, row) => periodLabel(row),
      },
      {
        title: "Closed Tickets",
        dataIndex: "closed_tickets",
        key: "closed_tickets",
        disableSort: !AGENT_SORTABLE.includes("closed_tickets"),
        render: formatCount,
      },
      {
        title: "Messages Sent",
        dataIndex: "messages_sent",
        key: "messages_sent",
        disableSort: !AGENT_SORTABLE.includes("messages_sent"),
        render: formatCount,
      },
      {
        title: "Tickets Replied",
        dataIndex: "tickets_replied",
        key: "tickets_replied",
        disableSort: !AGENT_SORTABLE.includes("tickets_replied"),
        render: formatCount,
      },
      {
        title: "First Response",
        dataIndex: "first_agent_response",
        key: "first_agent_response",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "Resolution Time",
        dataIndex: "resolution_time",
        key: "resolution_time",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "Handle Time",
        dataIndex: "handle_time",
        key: "handle_time",
        disableSort: true,
        render: formatDuration,
      },
      {
        title: "CSAT",
        dataIndex: "avg_csat",
        key: "avg_csat",
        disableSort: !AGENT_SORTABLE.includes("avg_csat"),
        render: formatCsat,
      },
    ];

    const fetchCsv = (handleResponse) => {
      getHubDeskBreakdown(
        { ...breakdownParams, csv: true, page: undefined, size: undefined },
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
        <div className="text-[12px] text-[#7F8A92] mb-3">
          Gorgias clients only. Zendesk has no per-agent metrics.
        </div>

        {breakdown.loading ? (
          <Skeleton className="w-full h-[100px] mb-4" rounded="rounded-[16px]" />
        ) : (
          <KpiTiles
            tiles={[
              {
                label: "TalentPop Agents",
                value: `${formatCount(totals?.tp_rows)} / ${formatCount(totals?.rows)}`,
              },
              { label: "Agents", value: formatCount(totals?.agents) },
              { label: "Closed Tickets", value: formatCount(totals?.closed_tickets) },
              { label: "Messages Sent", value: formatCount(totals?.messages_sent) },
              { label: "Tickets Replied", value: formatCount(totals?.tickets_replied) },
            ]}
          />
        )}

        {cadenceHint}

        <div className="flex items-center gap-2 mb-3">
          <Switch
            checked={state.tpOnly}
            onChange={(v) => setState({ tpOnly: v, page: 1 })}
          />
          <span className="text-[13px] text-[#163143]">
            TalentPop agents only
          </span>
        </div>

        {showEmpty ? (
          <ReportingEmptyState
            variant={hasAnyFilters ? "filtered" : "no-data"}
            onClearFilters={hasAnyFilters ? clearFilters : undefined}
          />
        ) : (
          <ReportingTable
            caption="Helpdesk — Agent view"
            columns={columns}
            data={rows}
            loading={breakdown.loading}
            rowKey="agent_id"
            current={breakdown.data?.page || state.page}
            pageSize={breakdown.data?.size || state.size}
            total={breakdown.data?.total || 0}
            sorting={{ sort_by: state.sortBy, sort_order: state.sortOrder }}
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
            csvFilenameFallback={`helpdesk_agent_${state.cadence}.csv`}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {filterBar}
      <GenericAntdTabs
        activeKey={state.view}
        onChange={(v) => setState({ view: v, page: 1, sortBy: undefined, sortOrder: undefined })}
        items={[
          { key: "client", label: "Client View", content: clientView() },
          { key: "agent", label: "Agent View", content: agentView() },
        ]}
      />
    </div>
  );
}
