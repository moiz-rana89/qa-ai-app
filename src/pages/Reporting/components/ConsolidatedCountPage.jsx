"use client";

import { Segmented } from "antd";
import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import dayjs from "dayjs";

import useReport from "../hooks/useReport";
import ReportingFilterBar from "./ReportingFilterBar";
import ReportingTable from "./ReportingTable";
import ReportingEmptyState from "./ReportingEmptyState";
import Skeleton from "../../../components/Skeleton";
import { extractApiError } from "../../../utils/helperFunctions";
import {
  formatCount,
  scopedIdParam,
  toApiSortOrder,
  GROUP_BY_LABELS,
} from "../../../utils/reportingHelpers";
import toast from "react-hot-toast";

const GROUP_BY_OPTIONS = Object.entries(GROUP_BY_LABELS).map(
  ([value, label]) => ({ label, value })
);

// Shared "unique count + per-source strip + overlap + group_by breakdown"
// page, used by both Ticket Monitoring and Performance Coaching — same
// layout, different labels/field names/sources, per the spec's own
// reusability requirement.
export default function ConsolidatedCountPage({
  headlineLabel,
  totalLabel,
  headlineTooltip,
  uniqueKey,
  totalKey,
  perSourceCountKey,
  sourceLabels,
  dateRangeLabel = "Date range",
  summaryThunk,
  breakdownThunk,
  extraBreakdownColumns = [],
  pinUnattributedToBottom = false,
  csvFilenamePrefix,
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

  const summaryDeps = [
    state.dateRange?.[0]?.valueOf(),
    state.dateRange?.[1]?.valueOf(),
    state.selectedAgents,
    state.selectedTeamLeads,
    state.selectedOms,
    state.selectedClients,
    state.selectedCsms,
  ];

  const summary = useReport(
    summaryThunk,
    buildBaseParams(),
    !scope?.blocked,
    summaryDeps
  );

  const breakdownParams = {
    ...buildBaseParams(),
    group_by: state.groupBy,
    page: state.page,
    size: state.size,
    sort_by: state.sortBy,
    sort_order: toApiSortOrder(state.sortOrder),
  };

  const breakdown = useReport(
    breakdownThunk,
    breakdownParams,
    !scope?.blocked,
    [...summaryDeps, state.groupBy, state.page, state.size, state.sortBy, state.sortOrder]
  );

  if (scope?.blocked) {
    return <ReportingEmptyState variant="blocked" />;
  }

  const totals = summary.data?.totals;
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

  let breakdownRows = breakdown.data?.data || [];
  if (pinUnattributedToBottom) {
    const unattributed = breakdownRows.filter(
      (r) => r.dimension_id == null || r.dimension_name === "Unattributed"
    );
    const rest = breakdownRows.filter(
      (r) => !(r.dimension_id == null || r.dimension_name === "Unattributed")
    );
    breakdownRows = [...rest, ...unattributed];
  }

  const dimensionTitle =
    GROUP_BY_OPTIONS.find((o) => o.value === state.groupBy)?.label || "Dimension";

  const breakdownColumns = [
    {
      title: dimensionTitle,
      dataIndex: "dimension_name",
      key: "dimension_name",
      disableSort: false,
      render: (value) =>
        value === "Unattributed" || value == null ? (
          <Tooltip title="Source records carry no agent identity">
            <span className="italic text-[#9CA3AF]">Unattributed</span>
          </Tooltip>
        ) : (
          value
        ),
    },
    {
      title: "Unique",
      dataIndex: uniqueKey,
      key: uniqueKey,
      disableSort: false,
      render: (v) => formatCount(v),
    },
    {
      title: "Total (incl. duplicates)",
      dataIndex: totalKey,
      key: totalKey,
      disableSort: true,
      render: (v) => formatCount(v),
    },
    ...Object.keys(sourceLabels).map((sourceKey) => ({
      title: sourceLabels[sourceKey],
      dataIndex: sourceKey,
      key: sourceKey,
      disableSort: true,
      render: (v) => formatCount(v),
    })),
    ...extraBreakdownColumns,
  ];

  const fetchCsv = (handleResponse) => {
    breakdownThunk(
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

  const showTableEmptyState =
    !breakdown.loading && breakdownRows.length === 0;

  return (
    <div>
      <ReportingFilterBar
        filters={filters}
        isLoadingFilters={isLoadingFilters}
        scope={scope}
        dateRangeLabel={dateRangeLabel}
        dateRangeValue={state.dateRange}
        onDateRangeChange={(strDates) =>
          setState({
            dateRange: strDates?.[0] && strDates?.[1]
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

      {summary.loading ? (
        <Skeleton className="w-full h-[100px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-[28px] font-semibold text-[#163143]">
              {formatCount(totals?.[uniqueKey])}
            </span>
            <span className="text-[14px] text-[#7F8A92]">{headlineLabel}</span>
            {headlineTooltip && (
              <Tooltip title={headlineTooltip}>
                <Icon
                  icon="mdi:information-outline"
                  className="text-[#9CA3AF] cursor-help"
                  fontSize={16}
                />
              </Tooltip>
            )}
          </div>
          <div className="text-[12px] text-[#7F8A92] mt-1">
            {formatCount(totals?.[totalKey])} {totalLabel}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.keys(sourceLabels).map((sourceKey) => {
              const entry = summary.data?.bySource?.find(
                (s) => s.source === sourceKey
              );
              return (
                <div
                  key={sourceKey}
                  className="px-3 py-2 rounded-[10px] bg-[#F8FAFA] border border-[#EBF3F4]"
                >
                  <div className="text-[12px] text-[#7F8A92]">
                    {sourceLabels[sourceKey]}
                  </div>
                  <div className="text-[14px] font-semibold text-[#163143]">
                    {formatCount(entry?.[uniqueKey])} unique /{" "}
                    {formatCount(entry?.[perSourceCountKey])} total
                  </div>
                </div>
              );
            })}
            {totals?.overlap != null && (
              <div className="px-3 py-2 rounded-[10px] bg-[#FFF7D8] border border-[#F5E7A8]">
                <div className="text-[12px] text-[#7F8A92]">Overlap</div>
                <div className="text-[14px] font-semibold text-[#163143]">
                  {formatCount(totals.overlap)} graded on more than one surface
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-semibold text-[#163143]">
          Breakdown by
        </div>
        <Segmented
          options={GROUP_BY_OPTIONS}
          value={state.groupBy}
          onChange={(v) => setState({ groupBy: v, page: 1, sortBy: undefined, sortOrder: undefined })}
        />
      </div>

      {showTableEmptyState ? (
        <ReportingEmptyState
          variant={hasAnyFilters ? "filtered" : "no-data"}
          onClearFilters={hasAnyFilters ? clearFilters : undefined}
        />
      ) : (
        <ReportingTable
          caption={`${dimensionTitle} breakdown`}
          columns={breakdownColumns}
          data={breakdownRows}
          loading={breakdown.loading}
          rowKey="dimension_id"
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
          csvFilenameFallback={`${csvFilenamePrefix}_${
            state.dateRange?.[0]?.format("YYYY-MM-DD") || "export"
          }.csv`}
        />
      )}
    </div>
  );
}
