"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import { getEndorsementActivityOverview } from "../../reduxStore/action/endorsementReport";

// Color thresholds per the spec:
//  Activity (keyboard / mouse): >=60 green, 40-59 amber, <40 red
//  Idle:                        <=10 green, 11-25 amber, >25 red
const activityColor = (pct) => {
  if (pct == null) return "#9CA3AF";
  if (pct >= 60) return "#1F8B3F";
  if (pct >= 40) return "#B86E00";
  return "#C81E1E";
};
const idleColor = (pct) => {
  if (pct == null) return "#9CA3AF";
  if (pct <= 10) return "#1F8B3F";
  if (pct <= 25) return "#B86E00";
  return "#C81E1E";
};

function PercentBar({ pct, color }) {
  const safe = Math.max(0, Math.min(100, Number(pct) || 0));
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-[8px] bg-[#F1F5F5] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${safe}%`, background: color }}
        />
      </div>
      <span
        className="font-poppins text-[13px] font-semibold tabular-nums"
        style={{ color }}
      >
        {pct != null ? `${Number(pct).toFixed(1)}%` : "—"}
      </span>
    </div>
  );
}

export default function ActivityOverviewSection({ filters }) {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sorting, setSorting] = useState({
    sort_by: "user_name",
    sort_order: "ascend",
  });
  const [loading, setLoading] = useState(false);

  // The activity endpoint only accepts agent_id, client_id, and date range
  // — TL/CSM/OM/Senior-CSM filters are deliberately not forwarded.
  const scopedFilters = useMemo(
    () => ({
      agent_id: filters?.agent_id,
      client_id: filters?.client_id,
      startdate: filters?.startdate,
      enddate: filters?.enddate,
    }),
    [filters]
  );

  const filterKey = useMemo(
    () => JSON.stringify(scopedFilters || {}),
    [scopedFilters]
  );

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const fetchData = () => {
    const apiParams = {
      ...scopedFilters,
      page,
      size,
      sort_by: sorting.sort_by,
      sort_order: sorting.sort_order === "ascend" ? "asc" : "desc",
    };
    setLoading(true);
    dispatch(
      getEndorsementActivityOverview(apiParams, (success, data) => {
        if (success) {
          setRows(data?.data || []);
          setTotal(data?.pagination?.total || 0);
        } else {
          setRows([]);
          setTotal(0);
          toast.error(
            data?.data?.detail ||
              data?.message ||
              "Failed to load activity overview."
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
      dataIndex: "user_name",
      key: "user_name",
      width: 200,
    },
    {
      title: "Client",
      dataIndex: "hubstaff_client_name",
      key: "hubstaff_client_name",
      width: 180,
      disableSort: true,
    },
    {
      title: "Tracked Hours",
      dataIndex: "total_tracked",
      key: "total_tracked",
      width: 130,
      align: "right",
      render: (_, r) => (
        <span className="font-semibold tabular-nums">
          {r.total_tracked_hours != null
            ? Number(r.total_tracked_hours).toFixed(1)
            : "—"}
        </span>
      ),
    },
    {
      title: "Idle Hours",
      dataIndex: "total_idle",
      key: "total_idle",
      width: 110,
      align: "right",
      render: (_, r) => (
        <span className="font-semibold tabular-nums text-[#163143]">
          {r.total_idle_hours != null
            ? Number(r.total_idle_hours).toFixed(1)
            : "—"}
        </span>
      ),
    },
    {
      title: "Keyboard Activity",
      dataIndex: "keyboard_pct",
      key: "keyboard_pct",
      width: 200,
      render: (_, r) => (
        <PercentBar pct={r.keyboard_pct} color={activityColor(r.keyboard_pct)} />
      ),
    },
    {
      title: "Mouse Activity",
      dataIndex: "mouse_pct",
      key: "mouse_pct",
      width: 200,
      render: (_, r) => (
        <PercentBar pct={r.mouse_pct} color={activityColor(r.mouse_pct)} />
      ),
    },
    {
      title: "Idle %",
      dataIndex: "idle_pct",
      key: "idle_pct",
      width: 180,
      render: (_, r) => (
        <PercentBar pct={r.idle_pct} color={idleColor(r.idle_pct)} />
      ),
    },
  ];

  return (
    <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide">
      <div className="flex items-center w-[100%] mb-[20px]">
        <span className="text-xl font-semibold">Hubstaff Activity Overview</span>
      </div>
      {loading ? (
        <Skeleton className="w-full h-[75vh]" />
      ) : (
        <AntDTable
          columns={columns}
          data={rows}
          rowKey={(r) => `${r.user_id}-${r.hubstaff_client_name ?? "x"}`}
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
              setSorting({ sort_by: "user_name", sort_order: "ascend" });
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
