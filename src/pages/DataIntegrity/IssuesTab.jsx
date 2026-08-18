"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import { getIssues } from "../../reduxStore/action/dataIntegrity";
import { extractApiError } from "../../utils/helperFunctions";
import { getDataIntegrityColumns } from "./columns";
import DataIntegrityFilters from "./DataIntegrityFilters";
import EditMemberDrawer from "./EditMemberDrawer";

const toApiSortOrder = (antdOrder) => {
  if (antdOrder === "ascend") return "asc";
  if (antdOrder === "descend") return "desc";
  return undefined;
};

export default function IssuesTab({ filters, isLoadingFilters, canEdit }) {
  const dispatch = useDispatch();
  const { issues, isLoadingIssues } = useSelector((state) => state.dataIntegrity);

  const [pagination, setPagination] = useState({ page: 1, size: 25 });
  const [sorting, setSorting] = useState({ sort_by: undefined, sort_order: undefined });
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedTL, setSelectedTL] = useState([]);
  const [selectedOM, setSelectedOM] = useState([]);
  const [selectedCSM, setSelectedCSM] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedMissingField, setSelectedMissingField] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== searchFilter) {
        setSearchFilter(trimmed);
        setPagination((prev) => ({ ...prev, page: 1 }));
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [selectedTL, selectedOM, selectedCSM, selectedClient, selectedMissingField]);

  const fetchIssues = () => {
    dispatch(
      getIssues(
        {
          page: pagination.page,
          page_size: pagination.size,
          sort_by: sorting.sort_by,
          sort_order: toApiSortOrder(sorting.sort_order),
          search: searchFilter,
          team_lead_id: selectedTL?.[0]?.id,
          operations_manager_id: selectedOM?.[0]?.id,
          csm_id: selectedCSM?.[0]?.id,
          client_name: selectedClient?.[0],
          missing_field: selectedMissingField?.[0],
        },
        (success, data) => {
          if (!success) {
            toast.error(extractApiError(data, "Failed to load issues."));
          }
        }
      )
    );
  };

  useEffect(() => {
    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination,
    sorting,
    searchFilter,
    selectedTL,
    selectedOM,
    selectedCSM,
    selectedClient,
    selectedMissingField,
  ]);

  return (
    <div>
      <DataIntegrityFilters
        filters={filters}
        isLoadingFilters={isLoadingFilters}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedTL={selectedTL}
        setSelectedTL={setSelectedTL}
        selectedOM={selectedOM}
        setSelectedOM={setSelectedOM}
        selectedCSM={selectedCSM}
        setSelectedCSM={setSelectedCSM}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedMissingField={selectedMissingField}
        setSelectedMissingField={setSelectedMissingField}
      />
      <AntDTable
        columns={getDataIntegrityColumns({ showIssueFlag: false })}
        data={issues?.data || []}
        loading={isLoadingIssues}
        rowKey="member_id"
        pagination={true}
        current={issues?.page || pagination.page}
        pageSize={issues?.page_size || pagination.size}
        total={issues?.total || 0}
        sorting={sorting}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onPageSizeChange={(size) => setPagination({ page: 1, size })}
        onSortChange={(field, order) =>
          setSorting({
            sort_by: order ? field : undefined,
            sort_order: order || undefined,
          })
        }
        onEdit={canEdit ? (record) => setEditingMember(record) : undefined}
      />
      <EditMemberDrawer
        open={!!editingMember}
        member={editingMember}
        canEdit={canEdit}
        onClose={() => setEditingMember(null)}
        onSaved={fetchIssues}
      />
    </div>
  );
}
