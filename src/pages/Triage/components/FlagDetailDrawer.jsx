"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Drawer, Select, Tag, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import { getTriageFlag, moveTriageFlagState } from "../../../reduxStore/action/triage";
import { extractApiError, formatDateTimeEnglish } from "../../../utils/helperFunctions";
import {
  WORKFLOW_STATE_LABELS,
  escalationLevelLabel,
  formatCountdown,
  formatRecurrenceLine,
  signalLabel,
  statusLabel,
} from "../helpers";
import useApiRequest from "../hooks/useApiRequest";
import Skeleton from "../../../components/Skeleton";
import ResolveFlagModal from "./ResolveFlagModal";
import DismissFlagModal from "./DismissFlagModal";
import CompleteCallModal from "./CompleteCallModal";
import renderGenericValue from "./renderGenericValue";

// Manual moves only ever target these three — resolved/dismissed go
// through their own dedicated endpoints (the state endpoint 422s on them).
const MOVABLE_STATES = ["act_today", "watch", "trending_up"];

// Flag detail is deliberately minimal per the v3 spec — narrative +
// status + recurrence only. No evidence panel, no notes, no
// acknowledge — those are superseded by the call workflow below.
const STEPS = ["Open", "Call scheduled", "Call completed — in progress", "Resolved"];

function currentStep(flag) {
  if (["resolved", "dismissed", "auto_closed"].includes(flag.status)) return 3;
  if (flag.call_completed_at) return 2;
  if (flag.call_id || flag.call_scheduled_for) return 1;
  return 0;
}

function NarrativeBlock({ flag }) {
  const rows = [
    { label: "What changed", value: flag.what_changed },
    { label: "Likely cause", value: flag.likely_cause },
    { label: "Suggested next step", value: flag.suggested_next_step },
  ].filter((r) => r.value);

  if (rows.length === 0) {
    return (
      <span className="text-[#7F8A92] text-[13px]">
        No narrative generated for this flag yet.
      </span>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="text-[11px] font-semibold text-[#7F8A92] uppercase tracking-wide">
            {r.label}
          </div>
          <div className="text-[13px] text-[#163143]">{renderGenericValue(r.value)}</div>
        </div>
      ))}
      {flag.confidence && (
        <div className="text-[11px] text-[#9CA3AF]">
          Confidence: {renderGenericValue(flag.confidence)}
        </div>
      )}
    </div>
  );
}

export default function FlagDetailDrawer({ flagId, open, onClose, onChanged, onScheduleCall }) {
  const dispatch = useDispatch();
  const [resolveOpen, setResolveOpen] = useState(false);
  const [dismissOpen, setDismissOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [moving, setMoving] = useState(false);

  const report = useApiRequest(
    getTriageFlag,
    { id: flagId },
    open && !!flagId,
    [flagId, open]
  );

  const handleMoveState = (workflowState) => {
    setMoving(true);
    dispatch(
      moveTriageFlagState({ id: flagId }, { workflow_state: workflowState }, (success, data) => {
        setMoving(false);
        if (!success) {
          toast.error(extractApiError(data, "Failed to move this flag."));
          return;
        }
        toast.success("Updated.");
        report.refetch();
        onChanged?.();
      })
    );
  };

  const flag = report.data;

  const isClosed = flag ? ["resolved", "dismissed", "auto_closed"].includes(flag.status) : false;
  const hasCallBooked = flag ? !!(flag.call_id || flag.call_scheduled_for) : false;
  const hasCallCompleted = flag ? !!flag.call_completed_at : false;

  return (
    <Drawer
      title={flag?.title ? renderGenericValue(flag.title) : "Flag Details"}
      open={open}
      onClose={onClose}
      width={640}
    >
      <div className="px-6 py-6">
        {/* !flag is the important guard here, not just report.loading —
            on first render (or while the drawer is closed and its fetch
            is inactive) loading is still false and data is still null at
            the same time, so checking loading alone fell through to the
            "flag is ready" branch and crashed. */}
        {report.loading || !flag ? (
          <Skeleton className="w-full h-[60vh]" rounded="rounded-[16px]" />
        ) : report.error ? (
          <div className="bg-[#F8FAFA] rounded-[16px] border border-[#D7E6E7] p-6 text-center text-[#7F8A92]">
            Failed to load this flag.
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Tag>{signalLabel(flag.signal)}</Tag>
              <Tag>{statusLabel(flag.status)}</Tag>
              {flag.visibility === "leader_only" && <Tag color="purple">Leader only</Tag>}
              {flag.provisional && <Tag color="gold">Unratified rule</Tag>}
            </div>

            <div className="text-[13px] text-[#7F8A92] mb-4">
              {[flag.client_name, flag.agent_name].filter(Boolean).join(" · ")}
            </div>

            {/* Status stepper */}
            <div className="flex items-center gap-1 mb-2">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1">
                  <div
                    className={`flex-1 h-[6px] rounded-full ${
                      i <= currentStep(flag) ? "bg-[#69C920]" : "bg-[#F1F5F5]"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="text-[12px] text-[#163143] font-medium mb-1">
              {STEPS[currentStep(flag)]}
            </div>
            {currentStep(flag) === 0 && flag.workflow_state === "act_today" && (
              <div className="text-[11px] text-[#7F8A92] mb-4">
                Not actioned yet. Schedule or log a call to stop the 8-hour clock.
              </div>
            )}
            {currentStep(flag) !== 0 && <div className="mb-4" />}

            {!["resolved", "dismissed", "auto_closed"].includes(flag.status) && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12px] text-[#7F8A92]">Move to</span>
                <Select
                  size="small"
                  value={flag.workflow_state}
                  loading={moving}
                  onChange={handleMoveState}
                  options={MOVABLE_STATES.map((s) => ({
                    value: s,
                    label: WORKFLOW_STATE_LABELS[s]?.label || s,
                  }))}
                  style={{ width: 160 }}
                />
              </div>
            )}

            {/* Clocks */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {flag.workflow_state === "act_today" && flag.status_due_at && (
                <div className="bg-[#F8FAFA] rounded-[10px] p-3">
                  <div className="text-[11px] text-[#7F8A92]">Status due</div>
                  <div className="text-[14px] font-semibold text-[#163143]">
                    {formatCountdown(flag.status_due_at, flag.status_overdue)}
                  </div>
                </div>
              )}
              {flag.resolve_due_at && (
                <div className="bg-[#F8FAFA] rounded-[10px] p-3">
                  <div className="text-[11px] text-[#7F8A92]">Resolve by</div>
                  <div className="text-[14px] font-semibold text-[#163143]">
                    {formatCountdown(flag.resolve_due_at, flag.overdue)}
                  </div>
                </div>
              )}
            </div>

            {flag.escalation_level && flag.escalation_level !== "tl" ? (
              <div className="text-[12px] text-[#C81E1E] mb-4">
                Escalated to {escalationLevelLabel(flag.escalation_level)}
              </div>
            ) : (
              flag.workflow_state === "act_today" && (
                <div className="text-[12px] text-[#7F8A92] mb-4">
                  Escalates to OM if it fires again this week.
                </div>
              )
            )}

            <div className="mb-2 text-[13px] font-semibold text-[#163143]">Narrative</div>
            <div className="mb-5">
              <NarrativeBlock flag={flag} />
            </div>

            {(flag.recurrence_7d != null || flag.recurrence_90d != null) && (
              <div className="mb-5">
                <div className="mb-1 text-[13px] font-semibold text-[#163143] flex items-center gap-2">
                  Recurrence
                  {flag.recurred_after_resolution && <Tag color="red">Recurred</Tag>}
                </div>
                <div className="text-[13px] text-[#163143]">{formatRecurrenceLine(flag)}</div>
                {flag.recurred_after_resolution && flag.last_resolved_at && (
                  <div className="text-[11px] text-[#7F8A92]">
                    Last resolved {formatDateTimeEnglish(flag.last_resolved_at)}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {!isClosed && !hasCallBooked && (
                <button
                  type="button"
                  onClick={() => onScheduleCall?.(flag.id)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#69C920] text-white hover:bg-[#5ab61c]"
                >
                  Schedule call
                </button>
              )}
              {!isClosed && hasCallBooked && !hasCallCompleted && (
                <button
                  type="button"
                  onClick={() => setCompleteOpen(true)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#69C920] text-white hover:bg-[#5ab61c]"
                >
                  Log call
                </button>
              )}
              {!isClosed && (
                <button
                  type="button"
                  onClick={() => setResolveOpen(true)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full border border-[#D7E6E7] hover:bg-[#F1F5F5]"
                >
                  Mark resolved
                </button>
              )}
              {flag.canDismiss && !isClosed && (
                <button
                  type="button"
                  onClick={() => setDismissOpen(true)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full border border-[#FF5546] text-[#FF5546] hover:bg-[#FFF1F0]"
                >
                  Dismiss as not a real issue
                </button>
              )}
              {flag.gorgiasUrl && (
                <a
                  href={flag.gorgiasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium px-4 py-2 rounded-full border border-[#D7E6E7] hover:bg-[#F1F5F5] inline-flex items-center gap-1"
                >
                  <Icon icon="mdi:open-in-new" fontSize={14} />
                  Gorgias
                </a>
              )}
            </div>

            <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
              <Tooltip title="Source and rule-set version this flag was evaluated against.">
                <Icon icon="mdi:information-outline" fontSize={13} />
              </Tooltip>
              {renderGenericValue(flag.sla_source)} · {renderGenericValue(flag.config_version)}
            </div>
          </div>
        )}
      </div>

      <ResolveFlagModal
        flagId={flagId}
        open={resolveOpen}
        onClose={() => setResolveOpen(false)}
        onResolved={() => {
          report.refetch();
          onChanged?.();
        }}
      />
      <DismissFlagModal
        flagId={flagId}
        open={dismissOpen}
        onClose={() => setDismissOpen(false)}
        onDismissed={() => {
          report.refetch();
          onChanged?.();
        }}
      />
      <CompleteCallModal
        callId={flag?.call_id}
        open={completeOpen}
        onClose={() => setCompleteOpen(false)}
        onCompleted={() => {
          report.refetch();
          onChanged?.();
        }}
      />
    </Drawer>
  );
}
