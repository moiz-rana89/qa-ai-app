"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import AntDRangePicker from "../../components/AntDRangePicker";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import Skeleton from "../../components/Skeleton";
import { GenericAntDeleteModal } from "../../components/GenericAntDeleteModal";
import { ColumnDataScheduleManagement } from "../../utils/tablesColumns";

import {
  getSchedules,
  getScheduleFilters,
  getUnmappedCount,
  getSyncIssuesCount,
  deactivateSchedule,
  deleteSchedule,
  acknowledgeSync,
} from "../../reduxStore/action/scheduleManagement";

import EditScheduleDrawer from "./EditScheduleDrawer";
import EditMappingModal from "./EditMappingModal";

const SCHEDULE_TYPE_OPTIONS = [
  { label: "Weekly", value: "weekly" },
  { label: "Never", value: "never" },
  { label: "Bi-Weekly", value: "bi_weekly" },
];

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const MAPPING_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Mapped", value: "mapped" },
  { label: "Unmapped", value: "unmapped" },
];

export default function ScheduleManagement() {
  const isMounted = useRef(false);
  const isTabEffectInitialMount = useRef(true);
  const dispatch = useDispatch();

  // Drawer/modal states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create"); // "create" or "edit"
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination/sorting
  const [currentpage, setcurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });
  const [sortBy, setSortBy] = useState("member_name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clientsFilter, setClientsFilter] = useState();
  const [membersFilter, setMembersFilter] = useState();
  const [projectFilter, setProjectFilter] = useState();
  const [teamLeadsFilter, setTeamLeadsFilter] = useState();
  const [scheduleTypeFilter, setScheduleTypeFilter] = useState();
  const [statusFilter, setStatusFilter] = useState();
  const [mappingStatusFilter, setMappingStatusFilter] = useState();
  const [filterParams, setFilterParams] = useState({});

  const userDetails = useSelector((state) => state.auth.user);
  const {
    schedules,
    scheduleFilters,
    unmappedCount,
    syncIssues,
    isLoading,
  } = useSelector((store) => store.scheduleManagement);

  // --- Data fetching ---
  const fetchData = (params) => {
    dispatch(getSchedules(params));
  };

  const refreshAll = () => {
    fetchData({ ...filterParams, page: currentpage, pageSize });
    dispatch(getUnmappedCount());
    dispatch(getSyncIssuesCount());
  };

  // Initial load
  useEffect(() => {
    dispatch(getScheduleFilters());
    dispatch(getUnmappedCount());
    dispatch(getSyncIssuesCount());
  }, []);

  // Filter changes
  useEffect(() => {
    if (!userDetails) return;

    const params = {
      user_id: membersFilter?.map((item) => String(item?.user_id)),
      client_id: clientsFilter?.map((item) => String(item?.hubstaff_client_id)),
      project: projectFilter?.[0]?.id ? String(projectFilter[0].id) : undefined,
      team_lead_id: teamLeadsFilter?.map((item) => String(item?.team_lead_id)),
      schedule_type: scheduleTypeFilter?.[0]?.value,
      status: statusFilter?.[0]?.value !== "all" ? statusFilter?.[0]?.value : undefined,
      mapping_status: mappingStatusFilter?.[0]?.value !== "all" ? mappingStatusFilter?.[0]?.value : undefined,
      sort_order: sortOrder,
      sort_by: sortBy,
      page: 1,
      pageSize: pageSize,
      startdate: startDate,
      enddate: endDate,
    };

    setcurrentpage(1);
    fetchData(params);
    setFilterParams(params);
  }, [
    clientsFilter,
    membersFilter,
    projectFilter,
    teamLeadsFilter,
    scheduleTypeFilter,
    statusFilter,
    mappingStatusFilter,
    sortBy,
    sortOrder,
    startDate,
    endDate,
    userDetails,
  ]);

  // Pagination change
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (currentpage > 0) {
      const params = { ...filterParams, page: currentpage, pageSize };
      fetchData(params);
    }
  }, [currentpage, pageSize]);

  // --- Actions ---
  const handleEditClick = (record) => {
    setSelectedSchedule(record);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedSchedule(null);
    setDrawerMode("create");
    setIsDrawerOpen(true);
  };

  const handleEditMapping = (record) => {
    setSelectedSchedule(record);
    setIsMappingModalOpen(true);
  };

  const handleDeactivateClick = (record) => {
    setSelectedSchedule(record);
    setIsDeactivateModalOpen(true);
  };

  const handleDeleteClick = (record) => {
    setSelectedSchedule(record);
    setIsDeleteModalOpen(true);
  };

  const handleAcknowledgeSync = (record) => {
    dispatch(
      acknowledgeSync(record.id, (success) => {
        if (success) {
          toast.success("Sync acknowledged successfully");
          refreshAll();
        } else {
          toast.error("Error acknowledging sync");
        }
      })
    );
  };

  const handleDeactivateConfirm = () => {
    setActionLoading(true);
    dispatch(
      deactivateSchedule(selectedSchedule?.id, (success) => {
        if (success) {
          toast.success("Schedule deactivated successfully");
          setIsDeactivateModalOpen(false);
          refreshAll();
        } else {
          toast.error("Error deactivating schedule");
        }
        setActionLoading(false);
      })
    );
  };

  const handleDeleteConfirm = () => {
    setActionLoading(true);
    dispatch(
      deleteSchedule(selectedSchedule?.id, (success) => {
        if (success) {
          toast.success("Schedule deleted successfully");
          setIsDeleteModalOpen(false);
          refreshAll();
        } else {
          toast.error("Error deleting schedule");
        }
        setActionLoading(false);
      })
    );
  };

  const handleSummaryCardClick = (filter) => {
    setMappingStatusFilter(
      filter === "unmapped" ? [{ label: "Unmapped", value: "unmapped" }] : undefined
    );
  };

  const onChangeDate = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  // Action column with conditional buttons
  const actionColumn = {
    title: "Action",
    width: 60,
    fixed: "left",
    disableSort: true,
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <Icon
          icon="lucide:edit"
          className="text-[18px] text-[#69C920] cursor-pointer hover:opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(record);
          }}
        />
      </div>
    ),
  };

  const columns = [actionColumn, ...ColumnDataScheduleManagement];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="pt-7 flex items-center pl-8">
        <span className="text-2xl font-semibold">Schedule Management</span>
      </div>

      {/* Filters */}
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            <Icon
              icon="basil:filter-solid"
              color="#163143"
              className="h-[45%]"
            />
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <AntDRangePicker
              onChange={onChangeDate}
              startPlaceholder="Start Date"
              endPlaceholder="End Date"
            />

            <UnifiedDropdown
              name="Clients"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={scheduleFilters?.clients || []}
              selectedList={clientsFilter}
              setselectedList={setClientsFilter}
              multiSelect={true}
              displayKey="name"
              valueKey="hubstaff_client_id"
              searchKeys={["name"]}
            />

            <UnifiedDropdown
              name="Members"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={scheduleFilters?.members || []}
              selectedList={membersFilter}
              setselectedList={setMembersFilter}
              multiSelect={true}
              displayKey="user_name"
              valueKey="user_id"
              searchKeys={["user_name"]}
            />

            <UnifiedDropdown
              name="Project"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={scheduleFilters?.projects || []}
              selectedList={projectFilter}
              setselectedList={setProjectFilter}
              multiSelect={false}
              displayKey="name"
              valueKey="id"
              searchKeys={["name"]}
            />

            <UnifiedDropdown
              name="TL"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={scheduleFilters?.team_leads || []}
              selectedList={teamLeadsFilter}
              setselectedList={setTeamLeadsFilter}
              multiSelect={true}
              displayKey="team_lead"
              valueKey="team_lead_id"
              searchKeys={["team_lead"]}
            />

            <UnifiedDropdown
              name="Schedule Type"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={SCHEDULE_TYPE_OPTIONS}
              selectedList={scheduleTypeFilter}
              setselectedList={setScheduleTypeFilter}
              multiSelect={false}
              displayKey="label"
              valueKey="value"
              searchKeys={["label"]}
            />

            <UnifiedDropdown
              name="Status"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={STATUS_OPTIONS}
              selectedList={statusFilter}
              setselectedList={setStatusFilter}
              multiSelect={false}
              displayKey="label"
              valueKey="value"
              searchKeys={["label"]}
            />

            <UnifiedDropdown
              name="Mapping Status"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={MAPPING_STATUS_OPTIONS}
              selectedList={mappingStatusFilter}
              setselectedList={setMappingStatusFilter}
              multiSelect={false}
              displayKey="label"
              valueKey="value"
              searchKeys={["label"]}
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {(unmappedCount?.unmapped_count > 0 ||
        syncIssues?.modified_count > 0 ||
        syncIssues?.removed_count > 0) && (
        <div className="flex gap-3 px-8 py-2">
          {unmappedCount?.unmapped_count > 0 && (
            <div
              onClick={() => handleSummaryCardClick("unmapped")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFF7D8] border border-[#F5DEB3] cursor-pointer hover:shadow-sm transition-all"
            >
              <Icon icon="mdi:alert-circle-outline" className="text-[#D97706] text-[18px]" />
              <span className="text-[14px] font-medium text-[#D97706]">
                {unmappedCount.unmapped_count} Unmapped Schedules
              </span>
            </div>
          )}
          {syncIssues?.modified_count > 0 && (
            <div
              onClick={() => {
                setMappingStatusFilter();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFF7D8] border border-[#F5DEB3] cursor-pointer hover:shadow-sm transition-all"
            >
              <Icon icon="mdi:sync-alert" className="text-[#D97706] text-[18px]" />
              <span className="text-[14px] font-medium text-[#D97706]">
                {syncIssues.modified_count} Modified in Hubstaff
              </span>
            </div>
          )}
          {syncIssues?.removed_count > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFECEC] border border-[#FECACA] cursor-pointer hover:shadow-sm transition-all"
            >
              <Icon icon="mdi:delete-alert" className="text-[#DC2626] text-[18px]" />
              <span className="text-[14px] font-medium text-[#DC2626]">
                {syncIssues.removed_count} Removed in Hubstaff
              </span>
            </div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div className="px-8 pt-2 pb-8 flex-1">
        <div className="flex items-center w-full mb-[20px]">
          <span className="text-xl font-semibold">Schedules Overview</span>
          <div className="ml-auto flex items-center gap-3">
            <div
              onClick={handleCreateClick}
              className="group flex items-center border border-[#D7E6E7] px-[16px] py-[6px] rounded-[30px] text-[14px] text-[#163143] cursor-pointer hover:border-[#69C920] hover:bg-[#69C920] hover:text-[#fff] transition-all duration-200"
            >
              <Icon
                fontSize={20}
                className="pr-1 text-[#69C920] group-hover:text-white transition-all duration-200"
                icon="material-symbols:add-rounded"
              />
              <span>Create Schedule</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-[75vh]" />
        ) : (
          <AntDTable
            columns={columns}
            data={schedules?.data}
            bordered={true}
            total={schedules?.pagination?.totalRecords}
            current={schedules?.pagination?.currentPage}
            pageSize={schedules?.pagination?.pageSize}
            rowKey={"id"}
            onPageChange={setcurrentpage}
            onPageSizeChange={setPageSize}
            onSortChange={(columnKey, order) => {
              setSorting({ sort_by: columnKey, sort_order: order });
              setSortBy(columnKey);
              setSortOrder(
                order == "ascend"
                  ? "asc"
                  : order == "descend"
                  ? "desc"
                  : null
              );
            }}
            sorting={sorting}
            pagination={true}
          />
        )}
      </div>

      {/* Edit/Create Schedule Drawer */}
      <EditScheduleDrawer
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        mode={drawerMode}
        selectedSchedule={selectedSchedule}
        scheduleFilters={scheduleFilters}
        onSuccess={refreshAll}
      />

      {/* Edit Mapping Modal */}
      <EditMappingModal
        open={isMappingModalOpen}
        setOpen={setIsMappingModalOpen}
        selectedSchedule={selectedSchedule}
        onSuccess={refreshAll}
      />

      {/* Deactivate Confirmation */}
      <GenericAntDeleteModal
        isOpen={isDeactivateModalOpen}
        title="Deactivate Schedule"
        message="Deactivating this schedule will remove it from Hubstaff and end its client/project mapping. The records will be retained for historical reference. Are you sure?"
        confirmText="Deactivate"
        cancelText="Cancel"
        onConfirm={handleDeactivateConfirm}
        onCancel={() => setIsDeactivateModalOpen(false)}
        isLoading={actionLoading}
      />

      {/* Delete Confirmation */}
      <GenericAntDeleteModal
        isOpen={isDeleteModalOpen}
        title="Delete Schedule"
        message="Are you sure you want to permanently delete this schedule? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={actionLoading}
        isDangerous={true}
      />
    </div>
  );
}
