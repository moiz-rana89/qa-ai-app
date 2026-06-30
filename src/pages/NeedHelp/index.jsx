"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import NeedHelpModal from "../../components/NeedHelpModal";
import {
  getReportsList,
  getReportsStats,
} from "../../reduxStore/action/needHelp";
import { extractApiError } from "../../utils/helperFunctions";
import ReportDetailDrawer from "./ReportDetailDrawer";

// ── Role detection — per spec ──────────────────────────────────────────
const detectRoles = (user) => {
  const isAdmin = user?.is_admin === true;
  const role = (user?.role || "").toLowerCase();
  const isOM =
    !isAdmin && (role.includes("operations") || role === "om");
  const isEngineer =
    !isAdmin && (role.includes("eng") || role.includes("engineer"));
  return { isAdmin, isOM, isEngineer };
};

// Stat badge styles per spec
const STAT_DEFS = [
  { key: "total", label: "Total", bg: "#F1F5F5", fg: "#163143" },
  { key: "bugs", label: "Bugs", bg: "#FFECEC", fg: "#C81E1E" },
  { key: "features", label: "Features", bg: "#E0EEFB", fg: "#1A56DB" },
  { key: "pending", label: "Pending", bg: "#FFF7D8", fg: "#B86E00" },
  { key: "resolved", label: "Resolved", bg: "#E4FAED", fg: "#1F8B3F" },
  { key: "approved", label: "Approved", bg: "#E4FAED", fg: "#1F8B3F" },
  { key: "denied", label: "Denied", bg: "#FFECEC", fg: "#C81E1E" },
];

// Filter dropdown options
const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "Bug", label: "Bug" },
  { value: "Feature", label: "Feature" },
];
const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
];
const DECISION_OPTIONS = [
  { value: "all", label: "All Decisions" },
  { value: "approved", label: "Approved" },
  { value: "denied", label: "Denied" },
  { value: "awaiting", label: "Awaiting" },
];

export default function NeedHelpPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isAdmin, isOM, isEngineer } = useMemo(
    () => detectRoles(user),
    [user]
  );
  const roleFlags = { isAdmin, isOM, isEngineer };

  // Default scope from role
  const defaultScope = isAdmin ? "all" : isOM ? "team" : "mine";
  const [scope, setScope] = useState(defaultScope);

  // Filters
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const [submitterFilter, setSubmitterFilter] = useState(""); // admin only

  // Stats + list state
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 20,
    total: 0,
  });

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerReportId, setDrawerReportId] = useState(null);

  // Submit modal (reuses existing NeedHelpModal)
  const [submitOpen, setSubmitOpen] = useState(false);

  // Re-sync the scope if the user's role changes (rare but cheap)
  useEffect(() => {
    setScope(defaultScope);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isOM]);

  // ── Fetchers ────────────────────────────────────────────────────────────
  const fetchStats = (sc = scope) => {
    setStatsLoading(true);
    dispatch(
      getReportsStats({ scope: sc }, (success, data) => {
        if (success) {
          setStats(data || {});
        } else {
          // Stats failure isn't fatal — keep the list usable
          console.error("stats error", data);
        }
        setStatsLoading(false);
      })
    );
  };

  const buildListParams = (overrides = {}) => {
    const p = {
      scope: overrides.scope ?? scope,
      page: overrides.page ?? pagination.page,
      size: overrides.size ?? pagination.size,
    };
    const t = overrides.typeFilter ?? typeFilter;
    if (t !== "all") p.report_type = t;
    const s = overrides.statusFilter ?? statusFilter;
    if (s === "resolved") p.resolved_by_eng = "true";
    if (s === "pending") p.resolved_by_eng = "false";
    const d = overrides.decisionFilter ?? decisionFilter;
    if (d === "approved") p.decision_by_stakeholder = "true";
    if (d === "denied") p.decision_by_stakeholder = "false";
    // "awaiting" → omit param (backend treats null as awaiting)
    const sub = overrides.submitterFilter ?? submitterFilter;
    if (isAdmin && sub.trim()) p.submitted_by = sub.trim();
    return p;
  };

  const fetchList = (overrides = {}) => {
    setLoading(true);
    dispatch(
      getReportsList(buildListParams(overrides), (success, data) => {
        if (success) {
          setRows(data?.data || []);
          setPagination({
            page: data?.pagination?.currentPage || 1,
            size: data?.pagination?.pageSize || pagination.size,
            total: data?.pagination?.totalRecords || 0,
          });
        } else {
          const status = data?.response?.status;
          if (status === 403) {
            toast.error("You don't have permission to perform this action");
          } else {
            toast.error(extractApiError(data, "Failed to load reports."));
          }
          setRows([]);
        }
        setLoading(false);
      })
    );
  };

  // Initial load
  useEffect(() => {
    fetchStats(scope);
    fetchList({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scope change → refetch stats AND list, reset to page 1
  useEffect(() => {
    fetchStats(scope);
    setPagination((p) => ({ ...p, page: 1 }));
    fetchList({ scope, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope]);

  // Filter changes (not scope) → reset to page 1, refetch list only
  useEffect(() => {
    setPagination((p) => ({ ...p, page: 1 }));
    fetchList({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, statusFilter, decisionFilter, submitterFilter]);

  // ── Stat badge click → set the matching filter ──────────────────────────
  const handleStatClick = (key) => {
    switch (key) {
      case "bugs":
        setTypeFilter("Bug");
        break;
      case "features":
        setTypeFilter("Feature");
        break;
      case "pending":
        setStatusFilter("pending");
        break;
      case "resolved":
        setStatusFilter("resolved");
        break;
      case "approved":
        setDecisionFilter("approved");
        break;
      case "denied":
        setDecisionFilter("denied");
        break;
      case "total":
      default:
        setTypeFilter("all");
        setStatusFilter("all");
        setDecisionFilter("all");
    }
  };

  // ── Drawer handlers ─────────────────────────────────────────────────────
  const openDrawer = (reportId) => {
    setDrawerReportId(reportId);
    setDrawerOpen(true);
  };

  // ── Title per role ──────────────────────────────────────────────────────
  const pageTitle = isAdmin || isEngineer
    ? "All Reports"
    : isOM
    ? "Team Reports"
    : "My Reports";

  // ── Columns ─────────────────────────────────────────────────────────────
  const columns = [
    {
      title: "Type",
      dataIndex: "report_type",
      key: "report_type",
      width: 100,
      disableSort: true,
      render: (v) => {
        const bg = v === "Feature" ? "#E0EEFB" : "#FFECEC";
        const fg = v === "Feature" ? "#1A56DB" : "#C81E1E";
        return (
          <span
            className="inline-flex items-center px-2 py-[2px] rounded-full text-[11px] font-semibold"
            style={{ background: bg, color: fg }}
          >
            {v || "—"}
          </span>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 360,
      disableSort: true,
      render: (v) => {
        const truncated =
          v && v.length > 120 ? `${v.slice(0, 120).trim()}…` : v;
        return (
          <span className="text-[13px] text-[#163143]">{truncated || "—"}</span>
        );
      },
    },
    ...(isAdmin || isOM
      ? [
          {
            title: "Submitted by",
            dataIndex: "submitted_by_name",
            key: "submitted_by_name",
            width: 160,
            disableSort: true,
            render: (_, r) => (
              <Tooltip title={r.submitted_by} placement="top">
                <span className="text-[13px] text-[#163143] cursor-help">
                  {r.submitted_by_name || r.submitted_by || "—"}
                </span>
              </Tooltip>
            ),
          },
        ]
      : []),
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      width: 140,
      disableSort: true,
      render: (v) => (v ? dayjs(v).format("MMM D, YYYY") : "—"),
    },
    {
      title: "Status",
      dataIndex: "resolved_by_eng",
      key: "resolved_by_eng",
      width: 110,
      disableSort: true,
      render: (v) =>
        v ? (
          <span className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold bg-[#E4FAED] text-[#1F8B3F]">
            Resolved
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold bg-[#FFF7D8] text-[#B86E00]">
            Pending
          </span>
        ),
    },
    {
      title: "Decision",
      dataIndex: "decision_by_stakeholder",
      key: "decision_by_stakeholder",
      width: 140,
      disableSort: true,
      render: (v) => {
        if (v === true) {
          return (
            <span className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold bg-[#E4FAED] text-[#1F8B3F]">
              Approved
            </span>
          );
        }
        if (v === false) {
          return (
            <span className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold bg-[#FFECEC] text-[#C81E1E]">
              Denied
            </span>
          );
        }
        return (
          <span className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold bg-[#F1F5F5] text-[#163143]">
            Awaiting
          </span>
        );
      },
    },
    {
      title: "",
      key: "actions",
      width: 110,
      disableSort: true,
      render: (_, r) => (
        <button
          type="button"
          onClick={() => openDrawer(r.id)}
          className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold border border-[#D7E6E7] text-[#163143] bg-white hover:bg-[#F1F5F5]"
        >
          <Icon icon="mdi:eye-outline" /> View
        </button>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          {pageTitle}
        </span>
        <button
          type="button"
          onClick={() => setSubmitOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-[8px] rounded-full text-[14px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c]"
        >
          <Icon icon="mdi:plus" className="text-[18px]" />
          Submit a Report
        </button>
      </div>

      {/* Stats row — clickable badges */}
      <div className="mx-8 mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {STAT_DEFS.map((s) => {
          const value = statsLoading ? "…" : stats?.[s.key] ?? 0;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => handleStatClick(s.key)}
              className="bg-white border border-[#D7E6E7] rounded-[12px] p-3 text-left hover:border-[#69C920] hover:shadow-sm transition-all"
            >
              <div
                className="inline-flex items-center px-2 py-[2px] rounded-full text-[10px] font-semibold uppercase tracking-wide mb-1"
                style={{ background: s.bg, color: s.fg }}
              >
                {s.label}
              </div>
              <div className="text-[24px] font-bold text-[#163143] tabular-nums leading-[26px]">
                {value}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="mx-8 mt-4 bg-white border border-[#D7E6E7] rounded-[12px] p-3 flex items-center flex-wrap gap-3">
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          options={TYPE_OPTIONS}
          style={{ width: 160, height: 36 }}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          options={STATUS_OPTIONS}
          style={{ width: 160, height: 36 }}
        />
        <Select
          value={decisionFilter}
          onChange={setDecisionFilter}
          options={DECISION_OPTIONS}
          style={{ width: 180, height: 36 }}
        />

        {/* OM-only scope toggle */}
        {isOM && (
          <div className="inline-flex items-center bg-[#F1F5F5] rounded-full p-[3px]">
            {[
              { v: "mine", l: "Mine" },
              { v: "team", l: "Team" },
            ].map((s) => (
              <button
                key={s.v}
                type="button"
                onClick={() => setScope(s.v)}
                className={`px-3 py-[4px] rounded-full text-[12px] font-semibold transition-colors ${
                  scope === s.v
                    ? "bg-white text-[#163143] shadow-sm"
                    : "text-[#7F8A92] hover:text-[#163143]"
                }`}
              >
                {s.l}
              </button>
            ))}
          </div>
        )}

        {/* Admin-only submitter email filter */}
        {isAdmin && (
          <Input
            value={submitterFilter}
            onChange={(e) => setSubmitterFilter(e.target.value)}
            placeholder="Filter by submitter email…"
            allowClear
            prefix={
              <Icon icon="mdi:account-search-outline" className="text-[14px]" />
            }
            style={{ width: 280, height: 36, borderRadius: 18 }}
          />
        )}
      </div>

      {/* List */}
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
              fetchList({ page: p });
            }}
            onPageSizeChange={(s) => {
              setPagination((prev) =>
                prev.size !== s ? { ...prev, size: s, page: 1 } : prev
              );
              fetchList({ size: s, page: 1 });
            }}
            pagination={true}
            sorting={{ sort_by: null, sort_order: null }}
          />
        ) : (
          <div className="text-center py-16 bg-white rounded-[16px] border border-[#D7E6E7]">
            <Icon
              icon="mdi:inbox-outline"
              className="text-[42px] text-[#D7E6E7] mx-auto mb-2"
            />
            <div className="text-[#7F8A92] text-[14px] mb-4">
              No reports found.
            </div>
            <button
              type="button"
              onClick={() => setSubmitOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-[8px] rounded-full text-[14px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c]"
            >
              <Icon icon="mdi:plus" className="text-[18px]" />
              Submit a Report
            </button>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <ReportDetailDrawer
        open={drawerOpen}
        reportId={drawerReportId}
        onClose={() => setDrawerOpen(false)}
        onChanged={() => {
          // Refresh list + stats in the background — keep drawer open
          fetchList();
          fetchStats(scope);
        }}
        roleFlags={roleFlags}
      />

      {/* Submit modal — existing component, unchanged */}
      <NeedHelpModal
        open={submitOpen}
        onClose={() => {
          setSubmitOpen(false);
          // Refresh in case the modal just submitted a new report
          fetchList();
          fetchStats(scope);
        }}
      />
    </div>
  );
}
