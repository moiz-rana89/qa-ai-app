"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import SandboxBanner from "../../components/SandboxBanner";
import { getSandboxTickets } from "../../reduxStore/action/sandbox";

export default function SandboxTickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, size: 20, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchData = (page = pagination.page, size = pagination.size) => {
    setLoading(true);
    dispatch(
      getSandboxTickets(
        { source: "gorgias", page, per_page: size },
        (success, data) => {
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
                "Failed to load sandbox tickets."
            );
          }
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    fetchData(1, pagination.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      key: "ticket_id",
      width: 130,
      disableSort: true,
      render: (v) => <span className="font-mono text-[#163143]">{v}</span>,
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
      render: (v) => (
        <span className="capitalize text-[#163143]">{v || "—"}</span>
      ),
    },
    {
      title: "Agent Messages",
      dataIndex: "count_of_agent_messages",
      key: "count_of_agent_messages",
      width: 150,
      align: "center",
      disableSort: true,
      render: (v) => v ?? 0,
    },
    {
      title: "Form ID",
      dataIndex: "form_id",
      key: "form_id",
      width: 100,
      align: "center",
      disableSort: true,
      render: (v) => v || "—",
    },
    {
      title: "Closed",
      dataIndex: "closed_datetime",
      key: "closed_datetime",
      width: 160,
      disableSort: true,
      render: (v) => (v ? dayjs(v).format("MMM D, YYYY") : "—"),
    },
    {
      title: "",
      key: "actions",
      width: 120,
      disableSort: true,
      render: (_, r) => (
        <button
          type="button"
          onClick={() =>
            navigate(
              `/sandbox-evaluate?ticket_id=${encodeURIComponent(
                r.ticket_id
              )}&form_id=${encodeURIComponent(r.form_id ?? "")}`
            )
          }
          className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-colors"
        >
          <Icon icon="mdi:play-outline" /> Practice
        </button>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <SandboxBanner />
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          QA Sandbox — Curated Tickets
        </span>
      </div>
      <div className="px-8 mt-4 pb-8">
        {loading && rows.length === 0 ? (
          <Skeleton className="w-full h-[50vh]" />
        ) : rows.length > 0 ? (
          <AntDTable
            columns={columns}
            data={rows}
            rowKey={(r) => `${r.ticket_id}`}
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
              icon="mdi:inbox-outline"
              className="text-[42px] mx-auto mb-2 text-[#D7E6E7]"
            />
            No sandbox tickets available yet. Ask an admin to flag some
            tickets from the Sandbox Admin page.
          </div>
        )}
      </div>
    </div>
  );
}
