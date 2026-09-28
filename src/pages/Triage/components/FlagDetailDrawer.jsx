"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Drawer, Tag, Input, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import {
  acknowledgeTriageFlag,
  addTriageFlagNote,
  getTriageFlag,
} from "../../../reduxStore/action/triage";
import { extractApiError, formatDateTimeEnglish } from "../../../utils/helperFunctions";
import {
  escalationLevelLabel,
  formatMetricValue,
  humanizeMetric,
  signalLabel,
  statusLabel,
} from "../helpers";
import useApiRequest from "../hooks/useApiRequest";
import Skeleton from "../../../components/Skeleton";
import ResolveFlagModal from "./ResolveFlagModal";
import DismissFlagModal from "./DismissFlagModal";

const { TextArea } = Input;

// sla_compliance carries a distinct evidence shape the spec explicitly
// calls out — mean and median shown side by side (they diverge sharply
// on chat volume, and a TL needs to see that at a glance).
function SlaComplianceEvidence({ evidence }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-[#F8FAFA] rounded-[10px] p-3">
          <div className="text-[11px] text-[#7F8A92]">Weighted mean</div>
          <div className="text-[16px] font-semibold text-[#163143]">
            {formatMetricValue("_frt", evidence.weighted_mean_seconds)}
          </div>
        </div>
        <div className="bg-[#F8FAFA] rounded-[10px] p-3">
          <div className="text-[11px] text-[#7F8A92]">Weighted median</div>
          <div className="text-[16px] font-semibold text-[#163143]">
            {formatMetricValue("_frt", evidence.weighted_median_seconds)}
          </div>
        </div>
      </div>
      <div className="text-[12px] text-[#7F8A92] space-y-1">
        {evidence.basis && <div>Basis: {evidence.basis}</div>}
        {evidence.tier && <div>Tier: {evidence.tier}</div>}
        {evidence.window_days != null && <div>Window: {evidence.window_days} days</div>}
        {evidence.dropped_outlier_days != null && (
          <div>Outlier days dropped: {evidence.dropped_outlier_days}</div>
        )}
        {Array.isArray(evidence.worst_days) && evidence.worst_days.length > 0 && (
          <div>Worst days: {evidence.worst_days.join(", ")}</div>
        )}
      </div>
    </div>
  );
}

function GenericEvidence({ evidence }) {
  const entries = Object.entries(evidence || {}).filter(
    ([, v]) => v !== null && v !== undefined
  );
  if (entries.length === 0) {
    return <span className="text-[#7F8A92] text-[13px]">No additional evidence.</span>;
  }
  return (
    <div className="grid grid-cols-2 gap-2">
      {entries.map(([key, value]) => (
        <div key={key} className="bg-[#F8FAFA] rounded-[10px] p-2">
          <div className="text-[11px] text-[#7F8A92]">{humanizeMetric(key)}</div>
          <div className="text-[13px] text-[#163143]">
            {Array.isArray(value) ? value.join(", ") : String(value)}
          </div>
        </div>
      ))}
    </div>
  );
}

const EVENT_ICON = {
  opened: "mdi:flag-plus-outline",
  acknowledged: "mdi:eye-check-outline",
  escalated: "mdi:arrow-up-bold-circle-outline",
  resolved: "mdi:check-circle-outline",
  auto_closed: "mdi:autorenew",
  dismissed: "mdi:close-circle-outline",
};

export default function FlagDetailDrawer({ flagId, open, onClose, onChanged }) {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [acking, setAcking] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [dismissOpen, setDismissOpen] = useState(false);

  const report = useApiRequest(
    getTriageFlag,
    { id: flagId },
    open && !!flagId,
    [flagId, open]
  );

  const flag = report.data;

  const handleAcknowledge = () => {
    setAcking(true);
    dispatch(
      acknowledgeTriageFlag({ id: flagId }, undefined, (success, data) => {
        setAcking(false);
        if (!success) {
          toast.error(extractApiError(data, "Failed to acknowledge this flag."));
          return;
        }
        toast.success("Flag acknowledged.");
        report.refetch();
        onChanged?.();
      })
    );
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    setAddingNote(true);
    dispatch(
      addTriageFlagNote({ id: flagId }, { body: noteText.trim() }, (success, data) => {
        setAddingNote(false);
        if (!success) {
          toast.error(extractApiError(data, "Failed to add note."));
          return;
        }
        setNoteText("");
        report.refetch();
      })
    );
  };

  const isClosed = ["resolved", "dismissed", "auto_closed"].includes(flag?.status);

  return (
    <Drawer
      title={flag?.title || "Flag Details"}
      open={open}
      onClose={onClose}
      width={640}
    >
      <div className="px-6 py-6">
        {/* !flag is the important guard here, not just report.loading —
            on first render (or while the drawer is closed and its fetch
            is inactive) loading is still false and data is still null at
            the same time, so checking loading alone fell through to the
            "flag is ready" branch and crashed reading flag.signal. */}
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
              {flag.escalation_level && flag.escalation_level !== "tl" && (
                <Tag color="red">{escalationLevelLabel(flag.escalation_level)}</Tag>
              )}
              {flag.provisional && <Tag color="gold">Unratified rule</Tag>}
            </div>

            <div className="text-[13px] text-[#7F8A92] mb-4">
              {[flag.client_name, flag.agent_name].filter(Boolean).join(" · ")}
            </div>

            <div className="mb-2 text-[13px] font-semibold text-[#163143]">
              Summary
            </div>
            <div className="text-[13px] text-[#163143] mb-4">{flag.summary}</div>

            {flag.recommended_action && (
              <div className="bg-[#F1F5F5] rounded-[10px] p-3 mb-4">
                <div className="text-[11px] font-semibold text-[#7F8A92] mb-1">
                  DO NEXT
                </div>
                <div className="text-[13px] text-[#163143]">
                  {flag.recommended_action}
                </div>
              </div>
            )}

            <div className="flex gap-2 mb-5">
              {flag.status === "open" && (
                <button
                  type="button"
                  disabled={acking}
                  onClick={handleAcknowledge}
                  className="text-[13px] font-medium px-4 py-2 rounded-full border border-[#D7E6E7] hover:bg-[#F1F5F5] disabled:opacity-50"
                >
                  {acking ? "Acknowledging…" : "Acknowledge"}
                </button>
              )}
              {!isClosed && (
                <button
                  type="button"
                  onClick={() => setResolveOpen(true)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#69C920] text-white hover:bg-[#5ab61c]"
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
                  Dismiss
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

            <div className="mb-2 text-[13px] font-semibold text-[#163143]">
              Evidence
            </div>
            <div className="mb-5">
              {flag.signal === "sla_compliance" ? (
                <SlaComplianceEvidence evidence={flag.evidence || {}} />
              ) : (
                <GenericEvidence evidence={flag.evidence} />
              )}
            </div>

            <div className="mb-2 text-[13px] font-semibold text-[#163143]">
              Timeline
            </div>
            <div className="mb-5 space-y-2">
              {(flag.events || []).length === 0 ? (
                <span className="text-[#7F8A92] text-[13px]">No events yet.</span>
              ) : (
                flag.events.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px]">
                    <Icon
                      icon={EVENT_ICON[ev.event_type] || "mdi:circle-small"}
                      className="text-[#69C920] mt-[2px]"
                      fontSize={16}
                    />
                    <div>
                      <div className="text-[#163143]">
                        <span className="font-medium">
                          {statusLabel(ev.event_type) || ev.event_type}
                        </span>
                        {ev.actor && (
                          <span className="text-[#7F8A92]">
                            {" "}
                            by {ev.actor}
                            {ev.actor_role ? ` (${ev.actor_role})` : ""}
                          </span>
                        )}
                      </div>
                      {ev.detail && (
                        <div className="text-[#7F8A92]">{ev.detail}</div>
                      )}
                      <div className="text-[11px] text-[#9CA3AF]">
                        {formatDateTimeEnglish(ev.created_at)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mb-2 text-[13px] font-semibold text-[#163143]">
              Notes
            </div>
            <div className="mb-3 space-y-2">
              {(flag.notes || []).map((n) => (
                <div key={n.id} className="bg-[#F8FAFA] rounded-[10px] p-2">
                  <div className="text-[13px] text-[#163143]">{n.body}</div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    {n.created_by} · {formatDateTimeEnglish(n.created_at)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-6">
              <TextArea
                rows={2}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note…"
              />
              <button
                type="button"
                disabled={addingNote || !noteText.trim()}
                onClick={handleAddNote}
                className="text-[13px] font-medium px-3 rounded-full bg-[#69C920] text-white disabled:opacity-50 shrink-0"
              >
                Add
              </button>
            </div>

            <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
              <Tooltip title="Source and rule-set version this flag was evaluated against.">
                <Icon icon="mdi:information-outline" fontSize={13} />
              </Tooltip>
              {flag.sla_source} · {flag.config_version}
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
    </Drawer>
  );
}
