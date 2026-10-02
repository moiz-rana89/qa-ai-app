"use client";

import { Tag, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import {
  WORKFLOW_STATE_LABELS,
  formatCount,
  formatCountdown,
  signalLabel,
  sourceLabel,
} from "../helpers";
import renderGenericValue from "./renderGenericValue";

// Agent card anatomy per the spec: name, client, flag chips (one per
// flag, colored by that flag's own workflow_state), source badges,
// open_flags count, a recurrence line, and a right rail with the
// agent-level next-deadline clock and a Schedule Call shortcut.
// is_account_level agents (client-level flags, no real agent) never get
// the Schedule Call button.
export default function AgentCard({
  agent,
  sourceLabels,
  compact,
  onOpenFlag,
  onScheduleCall,
}) {
  const flags = agent.flags || [];
  const deadlineIso =
    agent.seconds_to_next_deadline != null
      ? new Date(Date.now() + agent.seconds_to_next_deadline * 1000).toISOString()
      : null;
  const isOverdue = agent.status_overdue || agent.seconds_to_next_deadline < 0;
  const countdown = formatCountdown(deadlineIso, isOverdue);

  const recurrence90 = agent.max_recurrence_90d;
  const recurrence7 = flags.reduce(
    (max, f) => (f.recurrence_7d != null ? Math.max(max, f.recurrence_7d) : max),
    0
  );

  return (
    <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-4 flex gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-[15px] font-semibold text-[#163143]">
            {renderGenericValue(agent.agent_name)}
          </span>
          {agent.is_account_level && <Tag>Client-level</Tag>}
          {agent.escalated && <Tag color="red">Escalated</Tag>}
          {agent.re_review_overdue && <Tag color="orange">Re-review overdue</Tag>}
        </div>
        <div className="text-[12px] text-[#7F8A92] mb-2">
          {renderGenericValue(agent.client_name)}
        </div>

        {!compact && (
          <>
            <div className="flex flex-wrap gap-1 mb-2">
              {flags.map((f) => {
                const meta = WORKFLOW_STATE_LABELS[f.workflow_state];
                return (
                  <Tooltip key={f.id} title={f.title}>
                    <button
                      type="button"
                      onClick={() => onOpenFlag(f.id)}
                      className="text-[11px] px-2 py-[2px] rounded-full border hover:opacity-80"
                      style={{
                        borderColor: meta?.accent || "#D7E6E7",
                        color: meta?.accent || "#163143",
                      }}
                    >
                      {signalLabel(f.signal)}
                      {f.visibility === "leader_only" && " 🔒"}
                    </button>
                  </Tooltip>
                );
              })}
            </div>

            {agent.sources?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {agent.sources.map((s) => (
                  <Tag key={s}>{sourceLabel(sourceLabels, s)}</Tag>
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-[12px] text-[#7F8A92] flex items-center gap-3 flex-wrap">
          <span>{formatCount(agent.open_flags)} open</span>
          {(recurrence7 > 0 || recurrence90 > 0) && (
            <span>
              {recurrence7}× this week · {formatCount(recurrence90)}× in 90d
            </span>
          )}
        </div>
      </div>

      <div className="w-[160px] shrink-0 flex flex-col items-end justify-between text-right">
        <div>
          <div className="text-[11px] text-[#7F8A92]">Next deadline</div>
          <div
            className={`text-[14px] font-semibold flex items-center gap-1 justify-end ${
              isOverdue ? "text-[#FF3434]" : "text-[#163143]"
            }`}
          >
            {isOverdue && <Icon icon="mdi:alert-circle" fontSize={14} />}
            {countdown}
          </div>
          {agent.team_lead && (
            <div className="text-[11px] text-[#7F8A92] mt-2">
              TL: {renderGenericValue(agent.team_lead)}
            </div>
          )}
        </div>
        {!agent.is_account_level && (
          <button
            type="button"
            onClick={() => onScheduleCall(agent)}
            className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#69C920] text-white hover:bg-[#5ab61c] mt-3"
          >
            Schedule call
          </button>
        )}
      </div>
    </div>
  );
}
