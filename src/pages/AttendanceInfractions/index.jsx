"use client";

import { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import EditInfractionDrawer from "./EditInfractionDrawer";
import {
  getAttendanceInfractions,
  approveInfraction,
  runAutomation,
} from "../../reduxStore/action/attendanceInfractions";
import { getTeamMemberFilter } from "../../reduxStore/action/formsManagement";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "false" },
  { label: "Archived", value: "true" },
];

const APPROVAL_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "true" },
  { label: "Pending", value: "false" },
];

const formatDateTime = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "-";
  }
};

export default function AttendanceInfractions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { infractions, isLoading } = useSelector(
    (state) => state.attendanceInfractions
  );
  const { agentNames: agentList } = useSelector(
    (store) => store.formsManagement
  );
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);

  // Read initial state from URL
  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // Filters (live — change triggers fetch immediately)
  const [userFilter, setUserFilter] = useState(() => {
    const v = urlParams.get("user_id");
    return v ? [{ user_id: Number(v) }] : [];
  });
  // Default to "Active" (archived=false) on first load when no URL param is set
  const [statusFilter, setStatusFilter] = useState(
    urlParams.get("archived") || "false"
  );
  const [approvalFilter, setApprovalFilter] = useState(() => {
    const v = urlParams.get("approved_by_wfa");
    if (v === "true" || v === "false") return v;
    return "all";
  });

  // Derived: the user_id that should be sent to the API
  const userIdForApi = userFilter?.[0]?.user_id || null;

  const [page, setPage] = useState(Number(urlParams.get("page")) || 1);
  const [perPage, setPerPage] = useState(
    Number(urlParams.get("per_page")) || 10
  );
  const [sortBy, setSortBy] = useState(urlParams.get("sort_by") || "id");
  const [sortOrder, setSortOrder] = useState(
    urlParams.get("sort_order") || "desc"
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [approvingId, setApprovingId] = useState(null);
  const [runningAutomation, setRunningAutomation] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Load agents for dropdown
  useEffect(() => {
    dispatch(getTeamMemberFilter(setIsLoadingAgent));
  }, []);

  // Build URL from current filter state
  useEffect(() => {
    const params = new URLSearchParams();
    if (userIdForApi) params.set("user_id", String(userIdForApi));
    if (statusFilter !== "all") params.set("archived", statusFilter);
    if (approvalFilter === "true" || approvalFilter === "false") {
      params.set("approved_by_wfa", approvalFilter);
    }
    if (page > 1) params.set("page", String(page));
    if (perPage !== 10) params.set("per_page", String(perPage));
    if (sortBy !== "id") params.set("sort_by", sortBy);
    if (sortOrder !== "desc") params.set("sort_order", sortOrder);

    const qs = params.toString();
    navigate(
      { pathname: location.pathname, search: qs ? `?${qs}` : "" },
      { replace: true }
    );
  }, [
    userIdForApi,
    statusFilter,
    approvalFilter,
    page,
    perPage,
    sortBy,
    sortOrder,
  ]);

  // Fetch data using current filter state
  const fetchData = () => {
    const apiParams = {
      page,
      per_page: perPage,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    if (userIdForApi) apiParams.user_id = userIdForApi;
    if (statusFilter === "true" || statusFilter === "false") {
      apiParams.archived = statusFilter;
    }
    if (approvalFilter === "true" || approvalFilter === "false") {
      apiParams.approved_by_wfa = approvalFilter;
    }
    // "all" => omit param entirely

    setErrorMsg("");
    dispatch(
      getAttendanceInfractions(apiParams, (success, dataOrErr) => {
        if (!success) {
          const msg =
            dataOrErr?.data?.detail ||
            dataOrErr?.message ||
            "Failed to load infractions.";
          setErrorMsg(typeof msg === "string" ? msg : "Failed to load.");
        }
      })
    );
  };

  // Live fetch on filter / pagination / sort changes (and initial mount)
  useEffect(() => {
    fetchData();
  }, [
    userIdForApi,
    statusFilter,
    approvalFilter,
    page,
    perPage,
    sortBy,
    sortOrder,
  ]);

  // Reset page to 1 whenever a filter changes (so user doesn't land on an empty page)
  const onUserChange = (next) => {
    setUserFilter(next);
    setPage(1);
  };
  const onStatusChange = (next) => {
    setStatusFilter(next);
    setPage(1);
  };
  const onApprovalChange = (next) => {
    setApprovalFilter(next);
    setPage(1);
  };

  const handleResetFilters = () => {
    setUserFilter([]);
    setStatusFilter("all");
    setApprovalFilter("all");
    setPage(1);
  };

  const handleRunAutomation = () => {
    if (runningAutomation) return;
    setRunningAutomation(true);
    dispatch(
      runAutomation((success, dataOrErr) => {
        if (success) {
          toast.success("Automation started successfully");
          // Refresh the list so any new infractions show up
          fetchData();
        } else {
          const msg =
            dataOrErr?.data?.detail ||
            dataOrErr?.message ||
            "Failed to run automation.";
          toast.error(typeof msg === "string" ? msg : "Run automation failed");
        }
        setRunningAutomation(false);
      })
    );
  };

  const handleApprove = (record) => {
    setApprovingId(record.id);
    dispatch(
      approveInfraction(record.id, (success, dataOrErr) => {
        if (success) {
          toast.success(`Infraction #${record.id} approved`);
          fetchData();
        } else {
          const msg =
            dataOrErr?.data?.detail ||
            dataOrErr?.message ||
            "Failed to approve.";
          toast.error(typeof msg === "string" ? msg : "Approve failed");
        }
        setApprovingId(null);
      })
    );
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setEditOpen(true);
  };

  // Resolve user name from agent list
  const resolveUserName = (userId) => {
    if (!userId) return "-";
    const agent = agentList?.find(
      (a) =>
        a.user_id === userId ||
        a.helpdesk_user_id === userId ||
        Number(a.user_id) === Number(userId)
    );
    return agent?.user_name || `#${userId}`;
  };

  const sortingState = { sort_by: sortBy, sort_order: sortOrder === "asc" ? "ascend" : "descend" };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "User",
      dataIndex: "user_name",
      key: "user_name",
      width: 160,
      // Prefer the user_name field on the record; fall back to looking up
      // the agent by user_id if the API didn't include the name inline.
      render: (value, record) => value || resolveUserName(record?.user_id),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 200,
      disableSort: true,
      render: (value) => value || "-",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      width: 170,
      render: (value) => formatDateTime(value),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: 130,
      render: (value) => formatDate(value),
    },
    {
      title: "TL Note",
      dataIndex: "team_lead_note",
      key: "team_lead_note",
      width: 250,
      disableSort: true,
      render: (value) => (
        <div className="line-clamp-2 max-w-[230px]" title={value}>
          {value || "-"}
        </div>
      ),
    },
    {
      title: "Attachment",
      dataIndex: "attachment_url",
      key: "attachment_url",
      width: 110,
      disableSort: true,
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#69C920] inline-flex items-center"
          >
            <Icon icon="mdi:open-in-new" className="text-[18px]" />
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Updated By",
      dataIndex: "updated_by",
      key: "updated_by",
      width: 180,
      disableSort: true,
      render: (value) => value || "-",
    },
    {
      title: "Archived",
      dataIndex: "archived",
      key: "archived",
      width: 110,
      render: (value) => (
        <div className="flex items-center justify-center">
          <div
            className={`rounded-full px-3 py-[2px] text-[13px] font-medium ${
              value === true
                ? "bg-[#FFECEC] text-[#DC2626]"
                : "bg-[#E4FAED] text-[#16A34A]"
            }`}
          >
            {value === true ? "Archived" : "Active"}
          </div>
        </div>
      ),
    },
    {
      title: "WFA Approved",
      dataIndex: "approved_by_wfa",
      key: "approved_by_wfa",
      width: 130,
      render: (value) => (
        <div className="flex items-center justify-center">
          <div
            className={`rounded-full px-3 py-[2px] text-[13px] font-medium ${
              value === true
                ? "bg-[#E4FAED] text-[#16A34A]"
                : value === false
                ? "bg-[#FFF7D8] text-[#D97706]"
                : "bg-[#F3F4F6] text-[#6B7280]"
            }`}
          >
            {value === true ? "Approved" : value === false ? "Pending" : "—"}
          </div>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "db_created_at",
      key: "db_created_at",
      width: 170,
      render: (value) => formatDateTime(value),
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      disableSort: true,
      render: (_, record) =>
        record.approved_by_wfa !== true ? (
          <button
            onClick={() => handleApprove(record)}
            disabled={approvingId === record.id}
            className="px-3 py-[4px] rounded-full text-[13px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {approvingId === record.id ? "Approving..." : "Approve"}
          </button>
        ) : null,
    },
  ];

  const totalRecords = infractions?.total ?? 0;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          Attendance Automation Infractions
        </span>
        <button
          onClick={handleRunAutomation}
          disabled={runningAutomation}
          className="px-5 py-[8px] rounded-full text-[14px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          <Icon
            icon={
              runningAutomation
                ? "eos-icons:loading"
                : "mdi:play-circle-outline"
            }
            className="text-[18px]"
          />
          {runningAutomation ? "Running..." : "Run Automation"}
        </button>
      </div>

      {/* Edit Drawer */}
      <EditInfractionDrawer
        open={editOpen}
        setOpen={setEditOpen}
        selectedRecord={selectedRecord}
        onSuccess={fetchData}
      />

      {/* Filters */}
      <div className="px-8 pt-5">
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
          <div className="flex items-end gap-4 flex-wrap">
            {/* User filter */}
            <div className="min-w-[200px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                User
              </label>
              <UnifiedDropdown
                placeholder="Select User"
                name="User"
                data={agentList || []}
                isLoading={isLoadingAgent}
                selectedList={userFilter}
                setselectedList={onUserChange}
                multiSelect={false}
                displayKey="user_name"
                valueKey="user_id"
                searchKeys={["user_name"]}
                className="border-[#d9d9d9] bg-white"
              />
            </div>

            {/* Status */}
            <div className="min-w-[160px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Status
              </label>
              <Select
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={onStatusChange}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
              />
            </div>

            {/* WFA Approval */}
            <div className="min-w-[180px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                WFA Approval
              </label>
              <Select
                options={APPROVAL_OPTIONS}
                value={approvalFilter}
                onChange={onApprovalChange}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
              />
            </div>

            {/* Reset */}
            <button
              onClick={handleResetFilters}
              className="px-5 py-[8px] rounded-full text-[14px] font-medium text-[#163143] border border-[#D7E6E7] hover:border-gray-400 transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="px-8 pt-3">
          <div className="bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[12px] px-4 py-2 text-[14px] flex items-center justify-between">
            <span>{errorMsg}</span>
            <Icon
              icon="mdi:close"
              className="cursor-pointer text-[18px]"
              onClick={() => setErrorMsg("")}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="px-8 pt-5 pb-8">
        {isLoading ? (
          <Skeleton className="w-full h-[60vh]" />
        ) : infractions?.data?.length > 0 ? (
          <AntDTable
            columns={columns}
            data={infractions.data}
            bordered={true}
            rowKey="id"
            total={totalRecords}
            current={page}
            pageSize={perPage}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPerPage(size);
              setPage(1);
            }}
            pagination={true}
            onEdit={handleEditClick}
            sorting={sortingState}
            onSortChange={(columnKey, order) => {
              if (!columnKey || !order) {
                setSortBy("id");
                setSortOrder("desc");
              } else {
                setSortBy(columnKey);
                setSortOrder(order === "ascend" ? "asc" : "desc");
              }
              setPage(1);
            }}
          />
        ) : (
          <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-20 flex flex-col items-center justify-center">
            <Icon
              icon="mdi:clipboard-text-off-outline"
              className="text-[64px] text-[#D7E6E7] mb-4"
            />
            <span className="text-[16px] text-[#9CA3AF]">
              No infractions found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
