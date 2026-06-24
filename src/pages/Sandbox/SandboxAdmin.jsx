"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { Input, Switch } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import SandboxBanner from "../../components/SandboxBanner";
import { CustomButton } from "../../components/Buttons/CustomButton";
import {
  getSandboxTickets,
  toggleSandboxTicket,
} from "../../reduxStore/action/sandbox";

// Admin / curator page — toggle is_sandbox on tickets.
// Lists the currently-flagged sandbox tickets. To flag a NEW ticket the
// curator types the ticket ID in the "Flag a ticket" form at top (we don't
// have a "list every ticket ever" endpoint, so flagging is search-by-id).
export default function SandboxAdmin() {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, size: 20, total: 0 });
  const [loading, setLoading] = useState(false);
  const [togglingIds, setTogglingIds] = useState(new Set());

  // "Flag a ticket" form state
  const [newTicketId, setNewTicketId] = useState("");
  const [flagging, setFlagging] = useState(false);

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

  const handleToggle = (ticketId, nextValue) => {
    if (togglingIds.has(ticketId)) return;
    setTogglingIds((prev) => {
      const next = new Set(prev);
      next.add(ticketId);
      return next;
    });
    dispatch(
      toggleSandboxTicket(
        ticketId,
        { is_sandbox: nextValue, source: "gorgias" },
        (success, data) => {
          setTogglingIds((prev) => {
            const next = new Set(prev);
            next.delete(ticketId);
            return next;
          });
          if (success) {
            toast.success(
              nextValue
                ? `Ticket ${ticketId} added to sandbox.`
                : `Ticket ${ticketId} removed from sandbox.`
            );
            // Refetch so the list reflects the change
            fetchData(pagination.page, pagination.size);
          } else {
            toast.error(
              data?.data?.detail ||
                data?.message ||
                "Failed to update sandbox flag."
            );
          }
        }
      )
    );
  };

  const handleFlagNew = () => {
    const id = newTicketId.trim();
    if (!id) {
      toast.error("Ticket ID is required.");
      return;
    }
    setFlagging(true);
    dispatch(
      toggleSandboxTicket(
        id,
        { is_sandbox: true, source: "gorgias" },
        (success, data) => {
          setFlagging(false);
          if (success) {
            toast.success(`Ticket ${id} added to sandbox.`);
            setNewTicketId("");
            fetchData(1, pagination.size);
          } else {
            toast.error(
              data?.data?.detail ||
                data?.message ||
                "Failed to add ticket to sandbox."
            );
          }
        }
      )
    );
  };

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      key: "ticket_id",
      width: 130,
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
      width: 140,
      disableSort: true,
      render: (v) => (v ? dayjs(v).format("MMM D, YYYY") : "—"),
    },
    {
      title: "Sandbox",
      key: "is_sandbox",
      width: 110,
      align: "center",
      disableSort: true,
      render: (_, r) => (
        <Switch
          checked={true}
          loading={togglingIds.has(r.ticket_id)}
          onChange={(checked) => handleToggle(r.ticket_id, checked)}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <SandboxBanner />
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          QA Sandbox — Admin
        </span>
      </div>

      {/* Flag a new ticket */}
      <div className="mx-8 mt-4 bg-white rounded-[16px] border border-[#D7E6E7] p-5">
        <div className="text-[14px] font-semibold text-[#163143] mb-2">
          Flag a ticket as sandbox
        </div>
        <div className="flex items-end gap-3">
          <Input
            value={newTicketId}
            onChange={(e) => setNewTicketId(e.target.value)}
            onPressEnter={handleFlagNew}
            placeholder="Ticket ID (e.g. 99001)"
            disabled={flagging}
            style={{ height: 44, borderRadius: 24, maxWidth: 240 }}
          />
          <CustomButton
            text={flagging ? "Flagging…" : "Add to Sandbox"}
            textColor="white"
            bg="#69C920"
            borderColor={undefined}
            width={170}
            onclick={handleFlagNew}
          />
        </div>
        <div className="text-[12px] text-[#7F8A92] mt-2">
          Adds the ticket to the sandbox list trainees can practice on.
          Toggle off below to remove a ticket.
        </div>
      </div>

      {/* Current sandbox tickets */}
      <div className="px-8 mt-6 pb-8">
        <div className="text-[16px] font-semibold text-[#163143] mb-3">
          Currently flagged tickets
        </div>
        {loading && rows.length === 0 ? (
          <Skeleton className="w-full h-[40vh]" />
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
          <div className="text-center py-12 text-[#7F8A92] bg-white rounded-[16px] border border-[#D7E6E7]">
            <Icon
              icon="mdi:flag-off-outline"
              className="text-[42px] mx-auto mb-2 text-[#D7E6E7]"
            />
            No tickets are flagged for the sandbox yet.
          </div>
        )}
      </div>
    </div>
  );
}
