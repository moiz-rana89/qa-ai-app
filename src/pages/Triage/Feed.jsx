"use client";

import { useMemo, useState } from "react";
import { Pagination } from "antd";

import {
  getTriageFeed,
  getTriageFilters,
  getTriageSummary,
} from "../../reduxStore/action/triage";
import { formatDateTimeEnglish } from "../../utils/helperFunctions";
import { URGENCY_LABELS, URGENCY_ORDER, formatCount } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import useTick from "./hooks/useTick";
import FlagCard from "./components/FlagCard";
import FlagDetailDrawer from "./components/FlagDetailDrawer";
import ResolveFlagModal from "./components/ResolveFlagModal";
import Skeleton from "../../components/Skeleton";

const COUNTER_TILES = [
  { key: "today", label: "Act today" },
  { key: "next_48_72h", label: "This shift" },
  { key: "this_week", label: "This week" },
];

// Maps a summary counter key to the urgency value the feed endpoint
// actually filters on (the summary and feed use slightly different
// vocabularies: "next_48_72h" vs "48_72h").
const COUNTER_TO_URGENCY = {
  today: "today",
  next_48_72h: "48_72h",
  this_week: "this_week",
};

export default function TriageFeed() {
  // Tick every 60s so countdown labels (e.g. "2h 14m left") stay live
  // without re-fetching data.
  useTick(60000);

  const [urgencyFilter, setUrgencyFilter] = useState(null);
  const [account, setAccount] = useState(null);
  const [selectedTL, setSelectedTL] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(25);
  const [openFlagId, setOpenFlagId] = useState(null);
  const [resolveFlagId, setResolveFlagId] = useState(null);

  const filtersReport = useApiRequest(getTriageFilters, {}, true, []);
  const summaryReport = useApiRequest(getTriageSummary, {}, true, []);

  const feedParams = {
    urgency: urgencyFilter ? [urgencyFilter] : undefined,
    account: account ? [account] : undefined,
    team_lead_id: selectedTL || undefined,
    page,
    size,
  };
  const feedReport = useApiRequest(getTriageFeed, feedParams, true, [
    urgencyFilter,
    account,
    selectedTL,
    page,
    size,
  ]);

  const refetchAll = () => {
    feedReport.refetch();
    summaryReport.refetch();
  };

  // Group the current page's flat, already-ranked list into the three
  // urgency sections for display — this never re-sorts, it only clusters
  // rows that are already in the backend's own order.
  const grouped = useMemo(() => {
    const rows = feedReport.data?.data || [];
    const buckets = { today: [], "48_72h": [], this_week: [] };
    rows.forEach((row) => {
      if (buckets[row.urgency]) buckets[row.urgency].push(row);
    });
    return buckets;
  }, [feedReport.data]);

  const lastRunAt = useMemo(() => {
    const runs = summaryReport.data?.lastRun || [];
    const times = runs.map((r) => new Date(r.finished_at).getTime()).filter(Boolean);
    if (times.length === 0) return null;
    return new Date(Math.max(...times)).toISOString();
  }, [summaryReport.data]);

  const scope = feedReport.data?.scope;
  const accounts = filtersReport.data?.clients || [];
  const teamLeads = filtersReport.data?.teamLeads || [];

  const totalRows = feedReport.data?.data?.length || 0;
  const showEmpty = !feedReport.loading && totalRows === 0;

  return (
    <div>
      <div className="mb-1">
        <span className="text-xl font-semibold text-[#163143]">
          What needs you now
        </span>
      </div>
      <div className="text-[12px] text-[#7F8A92] mb-4">
        {account ? `Account: ${account}` : "All your accounts"}
        {lastRunAt && <> · Last run: {formatDateTimeEnglish(lastRunAt)}</>}
      </div>

      {summaryReport.loading ? (
        <Skeleton className="w-full h-[90px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <div className="flex flex-wrap gap-3 mb-4">
          {COUNTER_TILES.map((tile) => {
            const value = summaryReport.data?.counts?.[tile.key];
            const urgencyValue = COUNTER_TO_URGENCY[tile.key];
            const active = urgencyFilter === urgencyValue;
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => {
                  setUrgencyFilter(active ? null : urgencyValue);
                  setPage(1);
                }}
                className={`flex-1 min-w-[160px] text-left rounded-[16px] border p-4 transition-colors ${
                  active
                    ? "border-[#69C920] bg-[#F1FAEC]"
                    : "border-[#D7E6E7] bg-white hover:border-[#69C920]"
                }`}
              >
                <div className="text-[12px] text-[#7F8A92]">{tile.label}</div>
                <div className="text-[24px] font-semibold text-[#163143]">
                  {formatCount(value)}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={() => {
            setAccount(null);
            setPage(1);
          }}
          className={`text-[12px] px-3 py-1 rounded-full border ${
            !account
              ? "bg-[#163143] text-white border-[#163143]"
              : "border-[#D7E6E7] text-[#163143] hover:border-[#69C920]"
          }`}
        >
          All accounts
        </button>
        {accounts.map((c) => (
          <button
            key={c.id ?? c.value ?? c}
            type="button"
            onClick={() => {
              setAccount(c.value ?? c.id ?? c);
              setPage(1);
            }}
            className={`text-[12px] px-3 py-1 rounded-full border ${
              account === (c.value ?? c.id ?? c)
                ? "bg-[#163143] text-white border-[#163143]"
                : "border-[#D7E6E7] text-[#163143] hover:border-[#69C920]"
            }`}
          >
            {c.label ?? c.name ?? c}
          </button>
        ))}
      </div>

      {scope?.unrestricted && teamLeads.length > 0 && (
        <div className="mb-4">
          <select
            value={selectedTL || ""}
            onChange={(e) => {
              setSelectedTL(e.target.value || null);
              setPage(1);
            }}
            className="h-9 rounded-full border border-[#d9d9d9] px-3 text-[13px]"
          >
            <option value="">All team leads</option>
            {teamLeads.map((tl) => (
              <option key={tl.id ?? tl.value} value={tl.id ?? tl.value}>
                {tl.label ?? tl.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {feedReport.loading ? (
        <Skeleton className="w-full h-[50vh]" rounded="rounded-[16px]" />
      ) : showEmpty ? (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          Nothing needs you in this window.
        </div>
      ) : (
        <div className="space-y-6">
          {URGENCY_ORDER.filter((key) => !urgencyFilter || urgencyFilter === key).map(
            (urgencyKey) => {
              const rows = grouped[urgencyKey];
              if (!rows || rows.length === 0) return null;
              const meta = URGENCY_LABELS[urgencyKey];
              return (
                <div key={urgencyKey}>
                  <div className="mb-2">
                    <span
                      className="text-[13px] font-semibold uppercase tracking-wide"
                      style={{ color: meta.accent }}
                    >
                      {meta.label}
                    </span>
                    <div className="text-[12px] text-[#7F8A92]">{meta.subtitle}</div>
                  </div>
                  <div className="space-y-3">
                    {rows.map((flag) => (
                      <FlagCard
                        key={flag.id}
                        flag={flag}
                        onOpenDetail={(f) => setOpenFlagId(f.id)}
                        onMarkResolved={(f) => setResolveFlagId(f.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          )}

          <div className="flex justify-center pt-2">
            <Pagination
              current={feedReport.data?.pagination?.currentPage || page}
              pageSize={feedReport.data?.pagination?.pageSize || size}
              total={feedReport.data?.pagination?.totalRecords || 0}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div>
        </div>
      )}

      <FlagDetailDrawer
        flagId={openFlagId}
        open={!!openFlagId}
        onClose={() => setOpenFlagId(null)}
        onChanged={refetchAll}
      />
      <ResolveFlagModal
        flagId={resolveFlagId}
        open={!!resolveFlagId}
        onClose={() => setResolveFlagId(null)}
        onResolved={refetchAll}
      />
    </div>
  );
}
