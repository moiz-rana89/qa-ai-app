"use client";

import { Tag, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import {
  URGENCY_LABELS,
  escalationLevelLabel,
  formatCountdown,
  formatMetricValue,
  signalLabel,
} from "../helpers";
import renderGenericValue from "./renderGenericValue";

// Card anatomy per the spec: badge + colored left border, title, meta
// line, three metric tiles, a "Do next" box (hidden entirely when
// recommended_action is null — never show an empty shell), and a right
// rail with the countdown, owner, a Mark Resolved shortcut, and a link
// into the full detail drawer.
export default function FlagCard({ flag, onOpenDetail, onMarkResolved }) {
  const accent = URGENCY_LABELS[flag.urgency]?.accent || "#7F8A92";
  const countdown = formatCountdown(flag.resolve_due_at, flag.overdue);
  const isOverdue = flag.overdue || countdown === "Overdue";

  const tiles = [
    {
      value: formatMetricValue(flag.metric, flag.actual_value),
      caption:
        typeof flag.window_label === "string" && flag.window_label
          ? flag.window_label
          : "Actual",
    },
    {
      value: formatMetricValue(flag.metric, flag.target_value),
      caption: "Target",
    },
    {
      value: formatMetricValue("open_tickets", flag.sample_size),
      caption: "Sample size",
    },
  ];

  return (
    <div
      className="bg-white rounded-[16px] border border-[#D7E6E7] p-4 flex gap-4"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Tag>{signalLabel(flag.signal)}</Tag>
          {flag.provisional && (
            <Tooltip title="This detection rule hasn't been ratified yet.">
              <Tag color="gold">Unratified rule</Tag>
            </Tooltip>
          )}
          {flag.status === "auto_closed" && (
            <Tag color="blue">Resolved itself</Tag>
          )}
          {flag.condition_cleared_at && flag.status !== "resolved" && (
            <Tooltip title="The underlying condition cleared, but this flag is still open pending confirmation.">
              <Tag color="cyan">Condition cleared</Tag>
            </Tooltip>
          )}
          {flag.escalation_level && flag.escalation_level !== "tl" && (
            <Tag color="red">
              Escalated: {escalationLevelLabel(flag.escalation_level)}
            </Tag>
          )}
        </div>

        <div className="text-[15px] font-semibold text-[#163143]">
          {renderGenericValue(flag.title)}
        </div>
        <div className="text-[12px] text-[#7F8A92] mb-3">
          {[flag.client_name, flag.agent_name, flag.channel_family]
            .filter(Boolean)
            .join(" · ")}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {tiles.map((t, i) => (
            <div key={i} className="bg-[#F8FAFA] rounded-[10px] p-2">
              <div className="text-[14px] font-semibold text-[#163143]">
                {t.value}
              </div>
              <div className="text-[11px] text-[#7F8A92]">{t.caption}</div>
            </div>
          ))}
        </div>

        {flag.recommended_action && (
          <div className="bg-[#F1F5F5] rounded-[10px] p-3">
            <div className="text-[11px] font-semibold text-[#7F8A92] mb-1">
              DO NEXT
            </div>
            <div className="text-[13px] text-[#163143]">
              {renderGenericValue(flag.recommended_action)}
            </div>
          </div>
        )}
      </div>

      <div className="w-[160px] shrink-0 flex flex-col items-end justify-between text-right">
        <div>
          <div className="text-[11px] text-[#7F8A92]">TL resolution SLA</div>
          <div
            className={`text-[14px] font-semibold flex items-center gap-1 justify-end ${
              isOverdue ? "text-[#FF3434]" : "text-[#163143]"
            }`}
          >
            {isOverdue && <Icon icon="mdi:alert-circle" fontSize={14} />}
            {countdown}
          </div>
          {flag.team_lead && (
            <div className="text-[11px] text-[#7F8A92] mt-2">
              Owner: {renderGenericValue(flag.team_lead)}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 mt-3">
          <button
            type="button"
            onClick={() => onMarkResolved(flag)}
            className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#69C920] text-white hover:bg-[#5ab61c]"
          >
            Mark resolved
          </button>
          <button
            type="button"
            onClick={() => onOpenDetail(flag)}
            className="text-[12px] text-[#1A56DB] underline"
          >
            Open details
          </button>
        </div>
      </div>
    </div>
  );
}
