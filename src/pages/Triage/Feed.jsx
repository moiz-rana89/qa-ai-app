"use client";

import { useMemo, useState } from "react";
import { Segmented, Tooltip } from "antd";

import {
  getTriageAgents,
  getTriageFilters,
  getTriageSummary,
} from "../../reduxStore/action/triage";
import { formatDateTimeEnglish } from "../../utils/helperFunctions";
import { WORKFLOW_STATE_LABELS, WORKFLOW_STATE_ORDER, formatCount } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import useTick from "./hooks/useTick";
import AgentCard from "./components/AgentCard";
import FlagDetailDrawer from "./components/FlagDetailDrawer";
import ScheduleCallModal from "./components/ScheduleCallModal";
import Skeleton from "../../components/Skeleton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";

const COUNTER_TILES = [
  { key: "act_today", label: "Act today" },
  { key: "in_progress", label: "In progress" },
  { key: "watch", label: "Watch this week" },
  { key: "trending_up", label: "Trending up" },
];

export default function TriageFeed() {
  // Tick every 60s so countdown labels (e.g. "2h 14m left") stay live
  // without re-fetching data.
  useTick(60000);

  const [sectionFilter, setSectionFilter] = useState(null);
  const [includeResolved, setIncludeResolved] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [viewMode, setViewMode] = useState("cards");
  const [openFlagId, setOpenFlagId] = useState(null);
  const [scheduleAgent, setScheduleAgent] = useState(null);
  const [scheduleFlagId, setScheduleFlagId] = useState(null);

  const filtersReport = useApiRequest(getTriageFilters, {}, true, []);
  const summaryReport = useApiRequest(getTriageSummary, {}, true, []);

  const account = selectedAccount[0]?.account;

  const agentsParams = {
    section: sectionFilter ? [sectionFilter] : undefined,
    account: account ? [account] : undefined,
    include_resolved: includeResolved,
  };
  const agentsReport = useApiRequest(getTriageAgents, agentsParams, true, [
    sectionFilter,
    account,
    includeResolved,
  ]);

  const refetchAll = () => {
    agentsReport.refetch();
    summaryReport.refetch();
  };

  const agents = agentsReport.data?.data || [];
  const sectionCounts = agentsReport.data?.sectionCounts || {};
  const sourceLabels = agentsReport.data?.sourceLabels || {};
  const roster = agentsReport.data?.roster;
  const accounts = filtersReport.data?.clients || [];

  const lastRunAt = useMemo(() => {
    const runs = summaryReport.data?.lastRun || [];
    const times = runs.map((r) => new Date(r.finished_at).getTime()).filter(Boolean);
    if (times.length === 0) return null;
    return new Date(Math.max(...times)).toISOString();
  }, [summaryReport.data]);

  const summaryCounts = summaryReport.data?.counts || {};
  const subLine = (key, label) =>
    summaryCounts[key] != null ? `${formatCount(summaryCounts[key])} ${label}` : null;

  const showEmpty = !agentsReport.loading && agents.length === 0;

  return (
    <div>
      <div className="mb-1">
        <span className="text-xl font-semibold text-[#163143]">
          What needs you now
        </span>
      </div>
      <div className="text-[12px] text-[#7F8A92] mb-4">
        {roster && (
          <>
            {formatCount(roster.agents)} agents across {formatCount(roster.accounts)}{" "}
            accounts
          </>
        )}
        {lastRunAt && <> · Last run: {formatDateTimeEnglish(lastRunAt)}</>}
      </div>

      {agentsReport.loading ? (
        <Skeleton className="w-full h-[90px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <div className="flex flex-wrap gap-3 mb-4">
          {COUNTER_TILES.map((tile) => {
            const active = sectionFilter === tile.key;
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => setSectionFilter(active ? null : tile.key)}
                className={`flex-1 min-w-[180px] text-left rounded-[16px] border p-4 transition-colors ${
                  active
                    ? "border-[#69C920] bg-[#F1FAEC]"
                    : "border-[#D7E6E7] bg-white hover:border-[#69C920]"
                }`}
              >
                <div className="text-[12px] text-[#7F8A92]">{tile.label}</div>
                <div className="text-[24px] font-semibold text-[#163143]">
                  {formatCount(sectionCounts[tile.key])}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {(subLine("past_status_deadline", "past the 8-hour deadline") ||
        subLine("escalated", "escalated") ||
        subLine("call_scheduled", "call scheduled") ||
        subLine("re_review_overdue", "re-review overdue")) && (
        <div className="text-[12px] text-[#7F8A92] mb-4 flex flex-wrap gap-3">
          {[
            subLine("past_status_deadline", "past the 8-hour deadline"),
            subLine("escalated", "escalated"),
            subLine("call_scheduled", "call scheduled"),
            subLine("re_review_overdue", "re-review overdue"),
          ]
            .filter(Boolean)
            .map((text) => (
              <span key={text}>{text}</span>
            ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSectionFilter(null);
              setIncludeResolved(false);
            }}
            className={`text-[12px] px-3 py-1 rounded-full border ${
              !sectionFilter && !includeResolved
                ? "bg-[#163143] text-white border-[#163143]"
                : "border-[#D7E6E7] text-[#163143] hover:border-[#69C920]"
            }`}
          >
            Everyone
          </button>
          {WORKFLOW_STATE_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSectionFilter(sectionFilter === key ? null : key)}
              className={`text-[12px] px-3 py-1 rounded-full border ${
                sectionFilter === key
                  ? "bg-[#163143] text-white border-[#163143]"
                  : "border-[#D7E6E7] text-[#163143] hover:border-[#69C920]"
              }`}
            >
              {WORKFLOW_STATE_LABELS[key]?.label || key} ({formatCount(sectionCounts[key])})
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIncludeResolved((v) => !v)}
            className={`text-[12px] px-3 py-1 rounded-full border ${
              includeResolved
                ? "bg-[#163143] text-white border-[#163143]"
                : "border-[#D7E6E7] text-[#163143] hover:border-[#69C920]"
            }`}
          >
            Resolved
          </button>
          {roster?.healthy != null && (
            <Tooltip title="Agents with no open flags right now.">
              <span className="text-[12px] px-3 py-1 rounded-full border border-[#D7E6E7] text-[#163143]">
                Healthy {formatCount(roster.healthy)}
              </span>
            </Tooltip>
          )}
          <UnifiedDropdown
            placeholder="Search accounts"
            name="Account"
            data={accounts}
            isLoading={filtersReport.loading}
            selectedList={selectedAccount}
            setselectedList={setSelectedAccount}
            multiSelect={false}
            displayKey="client_name"
            valueKey="account"
            searchKeys={["client_name"]}
            className="h-9 border-[#d9d9d9] bg-white"
          />
        </div>

        <Segmented
          options={[
            { label: "Cards", value: "cards" },
            { label: "Compact", value: "compact" },
          ]}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      {agentsReport.loading ? (
        <Skeleton className="w-full h-[50vh]" rounded="rounded-[16px]" />
      ) : showEmpty ? (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          Nothing needs you in this window.
        </div>
      ) : (
        <div className="space-y-3">
          {agents.map((agent) => (
            <AgentCard
              key={`${agent.user_id ?? "account"}-${agent.account}`}
              agent={agent}
              sourceLabels={sourceLabels}
              compact={viewMode === "compact"}
              onOpenFlag={(id) => setOpenFlagId(id)}
              onScheduleCall={(a) => {
                setScheduleAgent(a);
                setScheduleFlagId(null);
              }}
            />
          ))}
        </div>
      )}

      <FlagDetailDrawer
        flagId={openFlagId}
        open={!!openFlagId}
        onClose={() => setOpenFlagId(null)}
        onChanged={refetchAll}
        onScheduleCall={(flagId) => {
          // The single-flag detail endpoint doesn't carry this agent's
          // other open flags (needed for the multi-flag picker) — look
          // the owning agent up in the already-loaded agents list instead.
          const owningAgent = agents.find((a) =>
            (a.flags || []).some((f) => f.id === flagId)
          );
          setScheduleAgent(owningAgent || null);
          setScheduleFlagId(flagId);
        }}
      />
      <ScheduleCallModal
        agent={scheduleAgent}
        initialFlagId={scheduleFlagId}
        open={!!scheduleAgent}
        onClose={() => setScheduleAgent(null)}
        onScheduled={refetchAll}
        maxBookingHours={agentsReport.data?.clock?.callBookingMaxHours || 24}
      />
    </div>
  );
}
