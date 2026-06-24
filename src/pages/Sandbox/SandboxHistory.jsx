"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import SandboxBanner from "../../components/SandboxBanner";
import { getSandboxEvaluations } from "../../reduxStore/action/sandbox";

export default function SandboxHistory() {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, size: 20, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchData = (page = pagination.page, size = pagination.size) => {
    setLoading(true);
    dispatch(
      getSandboxEvaluations({ page, per_page: size }, (success, data) => {
        if (success) {
          setRows(data?.data || []);
          setPagination({
            page: data?.page || 1,
            size: data?.per_page || size,
            total: data?.total || 0,
          });
        } else {
          toast.error(
            data?.data?.detail ||
              data?.message ||
              "Failed to load sandbox history."
          );
        }
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData(1, pagination.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPct = (pct) => {
    if (pct == null) return "—";
    const num = Number(pct);
    const color =
      num >= 80 ? "#1F8B3F" : num >= 60 ? "#B86E00" : "#C81E1E";
    return (
      <span className="font-semibold tabular-nums" style={{ color }}>
        {num.toFixed(1)}%
      </span>
    );
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "evaluation_date",
      key: "evaluation_date",
      width: 160,
      disableSort: true,
      render: (v) => (v ? dayjs(v).format("MMM D, YYYY HH:mm") : "—"),
    },
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      key: "ticket_id",
      width: 120,
      disableSort: true,
      render: (v) => <span className="font-mono">{v}</span>,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      width: 180,
      disableSort: true,
      render: (v) => v || "—",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      width: 110,
      disableSort: true,
      render: (v) => <span className="capitalize">{v || "—"}</span>,
    },
    {
      title: "Form",
      dataIndex: "form_id",
      key: "form_id",
      width: 100,
      align: "center",
      disableSort: true,
    },
    {
      title: "Score",
      dataIndex: "final_score",
      key: "final_score",
      width: 130,
      align: "center",
      disableSort: true,
      render: (_, r) => (
        <span className="font-semibold tabular-nums text-[#163143]">
          {r.final_score ?? "—"} / {r.max_score ?? "—"}
        </span>
      ),
    },
    {
      title: "%",
      dataIndex: "percentage_score",
      key: "percentage_score",
      width: 100,
      align: "center",
      disableSort: true,
      render: (v) => renderPct(v),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <SandboxBanner />
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          QA Sandbox — My Practice History
        </span>
      </div>
      <div className="px-8 mt-4 pb-8">
        {loading && rows.length === 0 ? (
          <Skeleton className="w-full h-[50vh]" />
        ) : rows.length > 0 ? (
          <AntDTable
            columns={columns}
            data={rows}
            rowKey={(r) => `${r.id}`}
            bordered
            total={pagination.total}
            current={pagination.page}
            pageSize={pagination.size}
            onPageChange={(p) => {
              setPagination((prev) => ({ ...prev, page: p }));
              fetchData(p, pagination.size);
            }}
            onPageSizeChange={(s) => {
              setPagination((prev) =>
                prev.size !== s ? { ...prev, size: s, page: 1 } : prev
              );
              fetchData(1, s);
            }}
            pagination={true}
            sorting={{ sort_by: null, sort_order: null }}
          />
        ) : (
          <div className="text-center py-16 text-[#7F8A92] bg-white rounded-[16px] border border-[#D7E6E7]">
            <Icon
              icon="mdi:history"
              className="text-[42px] mx-auto mb-2 text-[#D7E6E7]"
            />
            No practice attempts yet. Pick a ticket from the Sandbox
            Tickets list to start practicing.
          </div>
        )}
      </div>
    </div>
  );
}
