"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input, Select, Segmented, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import { AntDNotification } from "../../components/AntDNotification";
import {
  getReports,
  resolveReport,
} from "../../reduxStore/action/bugsFeatures";

const REPORT_TYPE_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Bug", value: "Bug" },
  { label: "Feature", value: "Feature" },
];

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "false" },
  { label: "Resolved", value: "true" },
];

// Format date as "MMM DD, YYYY"
const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[d.getMonth()]} ${String(d.getDate()).padStart(
      2,
      "0"
    )}, ${d.getFullYear()}`;
  } catch {
    return "-";
  }
};

export default function BugsFeatures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { reports, isLoading } = useSelector((state) => state.bugsFeatures);

  // Read initial state from URL
  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [reportType, setReportType] = useState(
    urlParams.get("report_type") || "All"
  );
  const [status, setStatus] = useState(
    urlParams.get("resolved_by_eng") === null
      ? "all"
      : urlParams.get("resolved_by_eng") || "all"
  );
  const [submittedBy, setSubmittedBy] = useState(
    urlParams.get("submitted_by") || ""
  );
  const [debouncedSubmittedBy, setDebouncedSubmittedBy] = useState(submittedBy);
  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(urlParams.get("size")) || 20
  );

  const [resolvingId, setResolvingId] = useState(null);

  // Debounce submittedBy input (300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSubmittedBy(submittedBy);
    }, 300);
    return () => clearTimeout(t);
  }, [submittedBy]);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (reportType && reportType !== "All")
      params.set("report_type", reportType);
    if (status && status !== "all") params.set("resolved_by_eng", status);
    if (debouncedSubmittedBy)
      params.set("submitted_by", debouncedSubmittedBy);
    if (currentPage > 1) params.set("page", String(currentPage));
    if (pageSize !== 20) params.set("size", String(pageSize));

    const qs = params.toString();
    navigate(
      { pathname: location.pathname, search: qs ? `?${qs}` : "" },
      { replace: true }
    );
  }, [reportType, status, debouncedSubmittedBy, currentPage, pageSize]);

  // Fetch reports when filters/page change
  useEffect(() => {
    const apiParams = {
      page: currentPage,
      size: pageSize,
    };
    if (reportType && reportType !== "All") apiParams.report_type = reportType;
    if (status && status !== "all") apiParams.resolved_by_eng = status;
    if (debouncedSubmittedBy) apiParams.submitted_by = debouncedSubmittedBy;

    dispatch(
      getReports(apiParams, (success, err) => {
        if (!success) {
          AntDNotification({
            status: "error",
            title: "Failed to load reports",
            description: err?.message || "Please try again.",
          });
        }
      })
    );
  }, [reportType, status, debouncedSubmittedBy, currentPage, pageSize]);

  // Reset to page 1 when any filter changes
  const onFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleResolve = (record) => {
    setResolvingId(record.id);
    dispatch(
      resolveReport(record.id, (success, err) => {
        if (success) {
          AntDNotification({
            status: "success",
            title: "Resolved",
            description: `Report #${record.id} marked as resolved.`,
          });
          // Refresh table
          const apiParams = {
            page: currentPage,
            size: pageSize,
          };
          if (reportType && reportType !== "All")
            apiParams.report_type = reportType;
          if (status && status !== "all")
            apiParams.resolved_by_eng = status;
          if (debouncedSubmittedBy)
            apiParams.submitted_by = debouncedSubmittedBy;
          dispatch(getReports(apiParams));
        } else {
          AntDNotification({
            status: "error",
            title: "Failed to resolve report",
            description: err?.message || "Please try again.",
          });
        }
        setResolvingId(null);
      })
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
      disableSort: true,
    },
    {
      title: "Type",
      dataIndex: "report_type",
      key: "report_type",
      width: 110,
      disableSort: true,
      render: (value) => {
        if (!value) return "-";
        const isBug = value === "Bug";
        return (
          <div className="flex items-center justify-center">
            <div
              className={`rounded-full px-3 py-[2px] text-[13px] font-medium ${
                isBug
                  ? "bg-[#FFECEC] text-[#DC2626]"
                  : "bg-[#E3F2FD] text-[#1976D2]"
              }`}
            >
              {value}
            </div>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      disableSort: true,
      render: (value) =>
        value ? (
          <Tooltip title={value} placement="topLeft">
            <div
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value}
            </div>
          </Tooltip>
        ) : (
          "-"
        ),
    },
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
      width: 140,
      disableSort: true,
      render: (value) => value || "-",
    },
    {
      title: "Agent",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 140,
      disableSort: true,
      render: (value) => value || "-",
    },
    {
      title: "Submitted By",
      dataIndex: "submitted_by",
      key: "submitted_by",
      width: 180,
      disableSort: true,
      render: (value) => value || "-",
    },
    {
      title: "Submitted At",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      disableSort: true,
      render: (value) => formatDate(value),
    },
    {
      title: "Page Link",
      dataIndex: "page_link",
      key: "page_link",
      width: 100,
      disableSort: true,
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#69C920] hover:underline inline-flex items-center"
          >
            <Icon icon="mdi:open-in-new" className="text-[18px]" />
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Loom",
      dataIndex: "loom_recording_link",
      key: "loom_recording_link",
      width: 80,
      disableSort: true,
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#69C920] hover:underline inline-flex items-center"
          >
            <Icon icon="mdi:open-in-new" className="text-[18px]" />
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Status",
      dataIndex: "resolved_by_eng",
      key: "resolved_by_eng",
      width: 120,
      disableSort: true,
      render: (value) => (
        <div className="flex items-center justify-center">
          <div
            className={`rounded-full px-3 py-[2px] text-[13px] font-medium ${
              value === true
                ? "bg-[#E4FAED] text-[#16A34A]"
                : "bg-[#FFF7D8] text-[#D97706]"
            }`}
          >
            {value === true ? "Resolved" : "Pending"}
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      disableSort: true,
      render: (_, record) =>
        record.resolved_by_eng ? null : (
          <button
            onClick={() => handleResolve(record)}
            disabled={resolvingId === record.id}
            className="px-3 py-[4px] rounded-full text-[13px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resolvingId === record.id ? "Resolving..." : "Mark Resolved"}
          </button>
        ),
    },
  ];

  const pagination = reports?.pagination || {};
  const totalRecords = pagination.totalRecords ?? 0;
  const apiCurrentPage = pagination.currentPage ?? currentPage;
  const apiPageSize = pagination.pageSize ?? pageSize;

  const start =
    totalRecords === 0 ? 0 : (apiCurrentPage - 1) * apiPageSize + 1;
  const end = Math.min(apiCurrentPage * apiPageSize, totalRecords);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-7 pl-8">
        <span className="text-2xl font-semibold text-[#163143]">
          Bugs & Features
        </span>
      </div>

      {/* Filters */}
      <div className="px-8 pt-5">
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
          <div className="flex items-end gap-4 flex-wrap">
            {/* Report Type Segmented */}
            <div>
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Report Type
              </label>
              <Segmented
                options={REPORT_TYPE_OPTIONS}
                value={reportType}
                onChange={onFilterChange(setReportType)}
              />
            </div>

            {/* Status */}
            <div className="min-w-[160px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Status
              </label>
              <Select
                options={STATUS_OPTIONS}
                value={status}
                onChange={onFilterChange(setStatus)}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
              />
            </div>

            {/* Submitted By */}
            <div className="flex-1 min-w-[220px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Submitted By
              </label>
              <Input
                placeholder="Enter email..."
                value={submittedBy}
                onChange={(e) => {
                  setSubmittedBy(e.target.value);
                  setCurrentPage(1);
                }}
                allowClear
                style={{
                  height: "40px",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-8 pt-5 pb-8">
        <div className="flex items-center mb-3">
          <span className="text-[14px] text-[#6B7280]">
            {totalRecords > 0
              ? `Showing ${start}–${end} of ${totalRecords} results`
              : ""}
          </span>
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-[60vh]" />
        ) : reports?.data?.length > 0 ? (
          <AntDTable
            columns={columns}
            data={reports.data}
            bordered={true}
            total={totalRecords}
            current={apiCurrentPage}
            pageSize={apiPageSize}
            rowKey="id"
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            pagination={true}
          />
        ) : (
          <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-20 flex flex-col items-center justify-center">
            <Icon
              icon="mdi:bug-outline"
              className="text-[64px] text-[#D7E6E7] mb-4"
            />
            <span className="text-[16px] text-[#9CA3AF]">
              No reports found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
