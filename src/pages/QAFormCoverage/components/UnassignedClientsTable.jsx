"use client";

import { useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";

import { getUnassignedClients } from "../../../reduxStore/action/qaFormCoverage";
import useApiRequest from "../hooks/useApiRequest";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import AntDTable from "../../../components/AntDTable";

// Endpoint 3 — clients with zero QA-form assignments. Shared by the
// Clients drill-down page's "Unassigned" tab and the Overview page's
// own "Unassigned Clients" tab, so both stay in sync with the API spec
// (no sort_by on this endpoint — always sorted by client_name asc
// server-side, so no sortable columns here).
export default function UnassignedClientsTable({ formType, includeArchivedForms }) {
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

  const report = useApiRequest(getUnassignedClients, params, true, [
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
      title: "Helpdesk Client ID",
      dataIndex: "helpdesk_client_id",
      key: "helpdesk_client_id",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
    },
    {
      title: "Helpdesk",
      dataIndex: "cs_helpdesk",
      key: "cs_helpdesk",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
    },
    {
      title: "CSM",
      dataIndex: "csm",
      key: "csm",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
    },
    {
      title: "Team Lead",
      dataIndex: "team_lead",
      key: "team_lead",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
    },
    {
      title: "OM",
      dataIndex: "operations_manager",
      key: "operations_manager",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
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
