"use client";

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Tag, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import { getAssignedClients } from "../../reduxStore/action/qaFormCoverage";
import { formatCount } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import useDebouncedSearch from "./hooks/useDebouncedSearch";
import CoverageFiltersBar from "./components/CoverageFiltersBar";
import UnassignedClientsTable from "./components/UnassignedClientsTable";
import AntDTable from "../../components/AntDTable";
import GenericAntdTabs from "../../components/GenericAntdTabs";

export default function QAFormClientsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") === "unassigned" ? "unassigned" : "assigned";
  const formType = searchParams.get("form_type") || "QA";
  const includeArchivedForms = searchParams.get("include_archived_forms") === "true";

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => next.set(key, value));
    setSearchParams(next);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={() => navigate("/qa-form-coverage")}
          className="inline-flex items-center gap-1 text-[13px] text-[#7F8A92] hover:text-[#163143]"
        >
          <Icon icon="mdi:arrow-left" fontSize={16} />
          Overview
        </button>
      </div>
      <div className="mb-2">
        <span className="text-xl font-semibold text-[#163143]">
          QA Form ↔ Client Coverage — Clients
        </span>
      </div>

      <CoverageFiltersBar
        formType={formType}
        onFormTypeChange={(v) => updateParams({ form_type: v })}
        includeArchivedForms={includeArchivedForms}
        onIncludeArchivedFormsChange={(v) =>
          updateParams({ include_archived_forms: String(v) })
        }
      />

      <GenericAntdTabs
        activeKey={tab}
        onChange={(key) => updateParams({ tab: key })}
        items={[
          {
            key: "assigned",
            label: "Assigned",
            content: (
              <AssignedClientsTable
                formType={formType}
                includeArchivedForms={includeArchivedForms}
              />
            ),
          },
          {
            key: "unassigned",
            label: "Unassigned",
            content: (
              <UnassignedClientsTable
                formType={formType}
                includeArchivedForms={includeArchivedForms}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

function AssignedClientsTable({ formType, includeArchivedForms }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const { searchInput, setSearchInput, searchFilter } = useDebouncedSearch(setPage);

  const params = {
    form_type: [formType],
    include_archived_forms: includeArchivedForms,
    search: searchFilter,
    page,
    size,
  };

  const report = useApiRequest(getAssignedClients, params, true, [
    formType,
    includeArchivedForms,
    searchFilter,
    page,
    size,
  ]);

  const columns = [
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      disableSort: true,
    },
    {
      title: "# Forms",
      dataIndex: "form_count",
      key: "form_count",
      disableSort: true,
      render: formatCount,
    },
    {
      title: "Forms",
      key: "forms",
      disableSort: true,
      render: (_, row) => {
        const ids = row.form_ids || [];
        const names = row.form_names || [];
        const pairs = ids.map((id, i) => ({ id, name: names[i] }));
        const visible = pairs.slice(0, 3);
        const rest = pairs.slice(3);
        return (
          <div className="flex flex-wrap gap-1">
            {visible.map((p) => (
              <Tag key={p.id}>{p.name}</Tag>
            ))}
            {rest.length > 0 && (
              <Tooltip title={rest.map((p) => p.name).join(", ")}>
                <Tag>+{rest.length} more</Tag>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search client name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        allowClear
        prefix={<Icon icon="material-symbols:search-rounded" fontSize={16} />}
        style={{ width: 260, height: 38, borderRadius: 20, marginBottom: 12 }}
      />
      <AntDTable
        columns={columns}
        data={report.data?.data || []}
        loading={report.loading}
        rowKey="client_id"
        pagination={true}
        current={report.data?.pagination?.currentPage || page}
        pageSize={report.data?.pagination?.pageSize || size}
        total={report.data?.pagination?.totalRecords || 0}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setSize(s);
          setPage(1);
        }}
      />
    </div>
  );
}
