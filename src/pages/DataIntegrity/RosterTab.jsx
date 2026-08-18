"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import { getRoster } from "../../reduxStore/action/dataIntegrity";
import { extractApiError } from "../../utils/helperFunctions";
import { getDataIntegrityColumns } from "./columns";
import DataIntegrityFilters from "./DataIntegrityFilters";

const toApiSortOrder = (antdOrder) => {
  if (antdOrder === "ascend") return "asc";
  if (antdOrder === "descend") return "desc";
  return undefined;
};

export default function RosterTab({ filters, isLoadingFilters }) {
  const dispatch = useDispatch();
  const { roster, isLoadingRoster } = useSelector((state) => state.dataIntegrity);

  const [pagination, setPagination] = useState({ page: 1, size: 25 });
  const [sorting, setSorting] = useState({ sort_by: undefined, sort_order: undefined });
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedTL, setSelectedTL] = useState([]);
  const [selectedOM, setSelectedOM] = useState([]);
  const [selectedCSM, setSelectedCSM] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedMissingField, setSelectedMissingField] = useState([]);

  // Debounce the free-text search — commit after 400ms of no typing,
  // same pattern used across the app (e.g. EvaluateTickets ticket-id filter).
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

  // Reset to page 1 whenever a filter changes.
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [selectedTL, selectedOM, selectedCSM, selectedClient, selectedMissingField]);

  useEffect(() => {
    dispatch(
      getRoster(
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
            toast.error(extractApiError(data, "Failed to load roster."));
          }
        }
      )
    );
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
        columns={getDataIntegrityColumns({ showIssueFlag: true })}
        data={roster?.data || []}
        loading={isLoadingRoster}
        rowKey="member_id"
        pagination={true}
        current={roster?.page || pagination.page}
        pageSize={roster?.page_size || pagination.size}
        total={roster?.total || 0}
        sorting={sorting}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onPageSizeChange={(size) => setPagination({ page: 1, size })}
        onSortChange={(field, order) =>
          setSorting({
            sort_by: order ? field : undefined,
            sort_order: order || undefined,
          })
        }
      />
    </div>
  );
}
