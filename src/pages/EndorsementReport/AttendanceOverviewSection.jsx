"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Tooltip } from "antd";
import { Icon } from "@iconify/react";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import {
  getEndorsementAttendanceOverview,
  getEndorsementHubspotProperties,
} from "../../reduxStore/action/endorsementReport";

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

  // HubSpot APR Score is enriched per-agent from a separate (slow) endpoint
  // — one HubSpot API call per agent on the backend. We fetch it after the
  // main attendance table loads so the page isn't blocked. Keyed by user_id.
  // Value shape:
  //   { user_name, client_name, hubspot_contact_id, average_grade_apr_score }
  //   OR { error: "..." } when the per-agent lookup failed.
  const [hubspotMap, setHubspotMap] = useState({});
  const [hubspotLoading, setHubspotLoading] = useState(false);

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

  // ── HubSpot APR enrichment ────────────────────────────────────────────
  // Fires after the main table response arrives. Don't call the endpoint
  // if the agent list is empty (spec requirement — endpoint requires at
  // least one agent_id). Each `rows` reference change re-runs this so
  // pagination / sort / filter changes that produce a new agent set get
  // fresh HubSpot data.
  useEffect(() => {
    if (!rows.length) {
      setHubspotMap({});
      setHubspotLoading(false);
      return;
    }
    const agentIds = [
      ...new Set(rows.map((r) => r.user_id).filter(Boolean)),
    ];
    if (agentIds.length === 0) {
      setHubspotMap({});
      setHubspotLoading(false);
      return;
    }

    setHubspotLoading(true);
    // Clear stale data so the previous page's APR scores don't linger
    // while the new fetch is in flight.
    setHubspotMap({});

    dispatch(
      getEndorsementHubspotProperties(
        { agent_id: agentIds },
        (success, data) => {
          if (success) {
            const map = {};
            (data?.data || []).forEach((item) => {
              if (item?.user_id != null) {
                map[item.user_id] = item;
              }
            });
            setHubspotMap(map);
          } else {
            setHubspotMap({});
          }
          setHubspotLoading(false);
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

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
    {
      title: "Average Grade (APR Score)",
      dataIndex: "average_grade_apr_score",
      key: "average_grade_apr_score",
      width: 180,
      align: "center",
      // Sort is server-driven on this endpoint and APR comes from a
      // separate slow API — keep it non-sortable to avoid sending an
      // unsupported sort_by value to the attendance backend.
      disableSort: true,
      render: (_, r) => {
        // Still loading the secondary HubSpot fetch — show a thin
        // inline shimmer so the rest of the row stays visible.
        if (hubspotLoading) {
          return (
            <div className="inline-block w-[60px] h-[14px] rounded-full bg-[#F1F5F5] animate-pulse" />
          );
        }
        const entry = hubspotMap[r.user_id];
        if (!entry) {
          return <span className="text-[#9CA3AF]">—</span>;
        }
        if (entry.error) {
          return (
            <Tooltip title={entry.error} placement="left">
              <span className="text-[#C81E1E] cursor-help inline-flex items-center gap-1">
                <Icon icon="mdi:alert-circle-outline" /> —
              </span>
            </Tooltip>
          );
        }
        const raw = entry.average_grade_apr_score;
        if (raw == null || raw === "") {
          return <span className="text-[#9CA3AF]">—</span>;
        }
        const num = parseFloat(raw);
        if (Number.isNaN(num)) {
          return <span className="text-[#9CA3AF]">—</span>;
        }
        return (
          <span className="font-semibold tabular-nums text-[#163143]">
            {num.toFixed(2)}
          </span>
        );
      },
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
