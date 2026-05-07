"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import { getEndorsementAttendanceOverview } from "../../reduxStore/action/endorsementReport";

// Color tokens for the attendance status cells
const STATUS_STYLES = {
  ontime: "bg-[#E4FAED] text-[#1F8B3F]",
  late: "bg-[#FFF3D8] text-[#B86E00]",
  missed: "bg-[#FDE8E8] text-[#C81E1E]",
  abandoned: "bg-[#FCE2E2] text-[#9B1C1C]",
};

function CountWithPct({ count, pct, kind }) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center px-3 py-1 rounded-[12px] min-w-[60px] ${
        STATUS_STYLES[kind] || ""
      }`}
    >
      <span className="font-poppins text-[14px] font-semibold leading-[16px]">
        {count ?? 0}
      </span>
      <span className="font-poppins text-[11px] leading-[14px] opacity-80">
        {pct != null ? `${Number(pct).toFixed(1)}%` : "—"}
      </span>
    </div>
  );
}

export default function AttendanceOverviewSection({ filters }) {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sorting, setSorting] = useState({
    sort_by: "agent_name",
    sort_order: "ascend",
  });
  const [loading, setLoading] = useState(false);

  // Stable key for the filter object so useEffect can watch it without
  // false positives from object identity churn.
  const filterKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const fetchData = () => {
    const apiParams = {
      ...filters,
      page,
      size,
      sort_by: sorting.sort_by,
      sort_order: sorting.sort_order === "ascend" ? "asc" : "desc",
    };
    setLoading(true);
    dispatch(
      getEndorsementAttendanceOverview(apiParams, (success, data) => {
        if (success) {
          setRows(data?.data || []);
          setTotal(data?.pagination?.total || 0);
        } else {
          setRows([]);
          setTotal(0);
          toast.error(
            data?.data?.detail ||
              data?.message ||
              "Failed to load attendance overview."
          );
        }
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, page, size, sorting.sort_by, sorting.sort_order]);

  const columns = [
    {
      title: "Agent",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 180,
    },
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
      width: 180,
    },
    {
      title: "Team Lead",
      dataIndex: "team_lead",
      key: "team_lead",
      width: 160,
      disableSort: true,
    },
    {
      title: "CSM",
      dataIndex: "csm",
      key: "csm",
      width: 160,
      disableSort: true,
    },
    {
      title: "Total",
      dataIndex: "total_attendance",
      key: "total_attendance",
      width: 90,
      align: "center",
      render: (v) => <span className="font-semibold">{v ?? 0}</span>,
    },
    {
      title: "On Time",
      dataIndex: "ontime_count",
      key: "ontime_count",
      width: 110,
      align: "center",
      render: (_, r) => (
        <CountWithPct count={r.ontime_count} pct={r.ontime_pct} kind="ontime" />
      ),
    },
    {
      title: "Late",
      dataIndex: "late_count",
      key: "late_count",
      width: 110,
      align: "center",
      render: (_, r) => (
        <CountWithPct count={r.late_count} pct={r.late_pct} kind="late" />
      ),
    },
    {
      title: "Missed",
      dataIndex: "missed_count",
      key: "missed_count",
      width: 110,
      align: "center",
      render: (_, r) => (
        <CountWithPct count={r.missed_count} pct={r.missed_pct} kind="missed" />
      ),
    },
    {
      title: "Abandoned",
      dataIndex: "abandoned_count",
      key: "abandoned_count",
      width: 120,
      align: "center",
      render: (_, r) => (
        <CountWithPct
          count={r.abandoned_count}
          pct={r.abandoned_pct}
          kind="abandoned"
        />
      ),
    },
    {
      title: "Deduction Points",
      dataIndex: "total_deduction_points",
      key: "total_deduction_points",
      width: 140,
      align: "center",
      disableSort: true,
      render: (v) => (
        <span className="font-semibold text-[#163143]">{v ?? 0}</span>
      ),
    },
  ];

  return (
    <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide">
      <div className="flex items-center w-[100%] mb-[20px]">
        <span className="text-xl font-semibold">Attendance Overview</span>
      </div>
      {loading ? (
        <Skeleton className="w-full h-[75vh]" />
      ) : (
        <AntDTable
          columns={columns}
          data={rows}
          rowKey={(r) => `${r.user_id}-${r.hubstaff_client_id ?? "x"}`}
          bordered
          total={total}
          current={page}
          pageSize={size}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setSize(s);
            setPage(1);
          }}
          pagination={true}
          sorting={sorting}
          onSortChange={(field, order) => {
            if (!field || !order) {
              setSorting({ sort_by: "agent_name", sort_order: "ascend" });
            } else {
              setSorting({ sort_by: field, sort_order: order });
            }
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
