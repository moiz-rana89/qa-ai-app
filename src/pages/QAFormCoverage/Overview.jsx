"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Tag, Progress, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import {
  getClientsCoverage,
  getFormsClientCounts,
  getFormsTicketGradingStats,
} from "../../reduxStore/action/qaFormCoverage";
import { formatDateTimeEnglish } from "../../utils/helperFunctions";
import {
  CLIENT_COUNT_SORT_FIELDS,
  GRADING_STATS_SORT_FIELDS,
  TRI_STATE_OPTIONS,
  formatCount,
  formatPct,
} from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import CoverageFiltersBar from "./components/CoverageFiltersBar";
import FormDetailDrawer from "./components/FormDetailDrawer";
import UnassignedClientsTable from "./components/UnassignedClientsTable";
import AntDTable from "../../components/AntDTable";
import GenericAntdTabs from "../../components/GenericAntdTabs";
import Skeleton from "../../components/Skeleton";

const toApiSortOrder = (antdOrder) => {
  if (antdOrder === "ascend") return "asc";
  if (antdOrder === "descend") return "desc";
  return undefined;
};

export default function QAFormCoverageOverview() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("QA");
  const [includeArchivedForms, setIncludeArchivedForms] = useState(false);

  const coverageParams = {
    form_type: [formType],
    include_archived_forms: includeArchivedForms,
  };
  const coverage = useApiRequest(
    getClientsCoverage,
    coverageParams,
    true,
    [formType, includeArchivedForms]
  );

  const goToClients = (tab) => {
    const params = new URLSearchParams({
      tab,
      form_type: formType,
      include_archived_forms: String(includeArchivedForms),
    });
    navigate(`/qa-form-coverage/clients?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-2">
        <span className="text-xl font-semibold text-[#163143]">
          QA Form ↔ Client Coverage
        </span>
      </div>

      <CoverageFiltersBar
        formType={formType}
        onFormTypeChange={setFormType}
        includeArchivedForms={includeArchivedForms}
        onIncludeArchivedFormsChange={setIncludeArchivedForms}
      />

      {coverage.loading ? (
        <Skeleton className="w-full h-[100px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[180px] bg-white rounded-[16px] border border-[#D7E6E7] p-4">
            <div className="text-[12px] text-[#7F8A92]">Total Clients</div>
            <div className="text-[28px] font-semibold text-[#163143]">
              {formatCount(coverage.data?.total_clients)}
            </div>
          </div>
          <div
            onClick={() => goToClients("assigned")}
            className="flex-1 min-w-[180px] bg-white rounded-[16px] border border-[#D7E6E7] p-4 cursor-pointer hover:border-[#69C920] transition-colors"
          >
            <div className="text-[12px] text-[#7F8A92]">Assigned</div>
            <div className="text-[28px] font-semibold text-[#163143]">
              {formatCount(coverage.data?.clients_assigned)}{" "}
              <span className="text-[16px] text-[#69C920] font-medium">
                ({formatPct(coverage.data?.assigned_pct)})
              </span>
            </div>
          </div>
          <div
            onClick={() => goToClients("unassigned")}
            className="flex-1 min-w-[180px] bg-white rounded-[16px] border border-[#D7E6E7] p-4 cursor-pointer hover:border-[#FF5546] transition-colors"
          >
            <div className="text-[12px] text-[#7F8A92]">Unassigned</div>
            <div className="text-[28px] font-semibold text-[#163143]">
              {formatCount(coverage.data?.clients_unassigned)}{" "}
              <span className="text-[16px] text-[#FF5546] font-medium">
                ({formatPct(coverage.data?.unassigned_pct)})
              </span>
            </div>
          </div>
        </div>
      )}

      <GenericAntdTabs
        defaultActiveKey="client-count"
        items={[
          {
            key: "unassigned-clients",
            label: "Unassigned Clients",
            content: (
              <UnassignedClientsTable
                formType={formType}
                includeArchivedForms={includeArchivedForms}
              />
            ),
          },
          {
            key: "client-count",
            label: "Forms by Client Count",
            content: (
              <FormsByClientCount
                formType={formType}
                includeArchivedForms={includeArchivedForms}
              />
            ),
          },
          {
            key: "grading-throughput",
            label: "Forms by Grading Throughput",
            content: <FormsByGradingThroughput formType={formType} />,
          },
        ]}
      />
    </div>
  );
}

function FormsByClientCount({ formType }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [sorting, setSorting] = useState({
    sort_by: "client_count",
    sort_order: "descend",
  });
  const [isArchived, setIsArchived] = useState(undefined);
  const [isEnabled, setIsEnabled] = useState(undefined);
  const [viewFormId, setViewFormId] = useState(null);

  const params = {
    form_type: [formType],
    is_archived: isArchived,
    is_enabled: isEnabled,
    sort_by: CLIENT_COUNT_SORT_FIELDS.includes(sorting.sort_by)
      ? sorting.sort_by
      : "client_count",
    sort_order: toApiSortOrder(sorting.sort_order) || "desc",
    page,
    size,
  };

  const report = useApiRequest(getFormsClientCounts, params, true, [
    formType,
    isArchived,
    isEnabled,
    sorting.sort_by,
    sorting.sort_order,
    page,
    size,
  ]);

  const columns = [
    {
      title: "Form Name",
      dataIndex: "form_name",
      key: "form_name",
      disableSort: false,
    },
    {
      title: "Type",
      dataIndex: "form_type",
      key: "form_type",
      disableSort: true,
      render: (v) => <Tag>{v}</Tag>,
    },
    {
      title: "Enabled",
      dataIndex: "is_enabled",
      key: "is_enabled",
      disableSort: true,
      render: (v) => <Tag color={v ? "green" : "default"}>{v ? "Yes" : "No"}</Tag>,
    },
    {
      title: "Archived",
      dataIndex: "is_archived",
      key: "is_archived",
      disableSort: true,
      render: (v) => <Tag color={v ? "orange" : "default"}>{v ? "Yes" : "No"}</Tag>,
    },
    {
      title: "Client Count",
      dataIndex: "client_count",
      key: "client_count",
      disableSort: false,
      render: formatCount,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Select
          placeholder="Enabled?"
          allowClear
          value={isEnabled}
          onChange={(v) => {
            setIsEnabled(v);
            setPage(1);
          }}
          options={TRI_STATE_OPTIONS("Enabled", "Disabled")}
          style={{ width: 160 }}
        />
        <Select
          placeholder="Archived?"
          allowClear
          value={isArchived}
          onChange={(v) => {
            setIsArchived(v);
            setPage(1);
          }}
          options={TRI_STATE_OPTIONS("Archived", "Active")}
          style={{ width: 160 }}
        />
      </div>
      <AntDTable
        columns={columns}
        data={report.data?.data || []}
        loading={report.loading}
        rowKey="form_id"
        pagination={true}
        current={report.data?.pagination?.currentPage || page}
        pageSize={report.data?.pagination?.pageSize || size}
        total={report.data?.pagination?.totalRecords || 0}
        sorting={sorting}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setSize(s);
          setPage(1);
        }}
        onSortChange={(field, order) => {
          setSorting({
            sort_by: order ? field : "client_count",
            sort_order: order || "descend",
          });
          setPage(1);
        }}
        onEdit={(row) => setViewFormId(row.form_id)}
        editIcon="mdi:eye-outline"
      />
      <FormDetailDrawer
        formId={viewFormId}
        open={!!viewFormId}
        onClose={() => setViewFormId(null)}
      />
    </div>
  );
}

function FormsByGradingThroughput({ formType }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  // Defaults to ungraded_count desc per the spec's own UI suggestion
  // ("surface the biggest backlogs") — differs from the API's own
  // default sort (total_count desc) when sort_by is omitted.
  const [sorting, setSorting] = useState({
    sort_by: "ungraded_count",
    sort_order: "descend",
  });
  const [isArchived, setIsArchived] = useState(undefined);
  const [isEnabled, setIsEnabled] = useState(undefined);
  const [viewFormId, setViewFormId] = useState(null);

  const params = {
    form_type: [formType],
    is_archived: isArchived,
    is_enabled: isEnabled,
    sort_by: GRADING_STATS_SORT_FIELDS.includes(sorting.sort_by)
      ? sorting.sort_by
      : "ungraded_count",
    sort_order: toApiSortOrder(sorting.sort_order) || "desc",
    page,
    size,
  };

  const report = useApiRequest(getFormsTicketGradingStats, params, true, [
    formType,
    isArchived,
    isEnabled,
    sorting.sort_by,
    sorting.sort_order,
    page,
    size,
  ]);

  const rows = report.data?.data || [];
  const refreshedAt = rows[0]?.stats_refreshed_at;

  const columns = [
    {
      title: "Form Name",
      dataIndex: "form_name",
      key: "form_name",
      disableSort: false,
    },
    {
      title: "Type",
      dataIndex: "form_type",
      key: "form_type",
      disableSort: true,
      render: (v) => <Tag>{v}</Tag>,
    },
    {
      title: "Graded",
      dataIndex: "graded_count",
      key: "graded_count",
      disableSort: false,
      render: formatCount,
    },
    {
      title: "Ungraded",
      dataIndex: "ungraded_count",
      key: "ungraded_count",
      disableSort: false,
      render: formatCount,
    },
    {
      title: "Total",
      dataIndex: "total_count",
      key: "total_count",
      disableSort: false,
      render: formatCount,
    },
    {
      title: "% Graded",
      dataIndex: "pct_graded",
      key: "pct_graded",
      disableSort: true,
      width: 180,
      render: (v) => <Progress percent={v ?? 0} size="small" />,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Select
            placeholder="Enabled?"
            allowClear
            value={isEnabled}
            onChange={(v) => {
              setIsEnabled(v);
              setPage(1);
            }}
            options={TRI_STATE_OPTIONS("Enabled", "Disabled")}
            style={{ width: 160 }}
          />
          <Select
            placeholder="Archived?"
            allowClear
            value={isArchived}
            onChange={(v) => {
              setIsArchived(v);
              setPage(1);
            }}
            options={TRI_STATE_OPTIONS("Archived", "Active")}
            style={{ width: 160 }}
          />
        </div>
        {refreshedAt && (
          <Tooltip title="This throughput data comes from a periodically-refreshed snapshot, not a live query.">
            <span className="text-[12px] text-[#7F8A92] flex items-center gap-1">
              <Icon icon="mdi:clock-outline" fontSize={14} />
              Stats as of {formatDateTimeEnglish(refreshedAt)}
            </span>
          </Tooltip>
        )}
      </div>
      <AntDTable
        columns={columns}
        data={rows}
        loading={report.loading}
        rowKey="form_id"
        pagination={true}
        current={report.data?.pagination?.currentPage || page}
        pageSize={report.data?.pagination?.pageSize || size}
        total={report.data?.pagination?.totalRecords || 0}
        sorting={sorting}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setSize(s);
          setPage(1);
        }}
        onSortChange={(field, order) => {
          setSorting({
            sort_by: order ? field : "ungraded_count",
            sort_order: order || "descend",
          });
          setPage(1);
        }}
        onEdit={(row) => setViewFormId(row.form_id)}
        editIcon="mdi:eye-outline"
      />
      <FormDetailDrawer
        formId={viewFormId}
        open={!!viewFormId}
        onClose={() => setViewFormId(null)}
      />
    </div>
  );
}
