"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Tag } from "antd";
import toast from "react-hot-toast";

import {
  approveTriagePlaybookEntry,
  createTriagePlaybookEntry,
  getTriagePlaybook,
} from "../../reduxStore/action/triage";
import { extractApiError } from "../../utils/helperFunctions";
import { signalLabel } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import Skeleton from "../../components/Skeleton";

const { TextArea } = Input;

// Screen F — OM/SOM (and admin) can edit the "Do next" text per signal;
// editing resets approval; only admin can approve. Until an entry is
// approved, recommended_action stays null across the whole feed, so
// this page is the only place that text gets written.
export default function TriagePlaybookPage() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const isAdmin = ["admin", "dev"].includes(userDetails?.role);

  const report = useApiRequest(getTriagePlaybook, {}, true, []);
  const [editingSignal, setEditingSignal] = useState(null);
  const [draftText, setDraftText] = useState("");
  const [saving, setSaving] = useState(false);
  const [approvingId, setApprovingId] = useState(null);

  const entries = Array.isArray(report.data) ? report.data : report.data?.data || [];

  const startEdit = (entry) => {
    setEditingSignal(entry.signal);
    setDraftText(entry.recommended_action || "");
  };

  const saveEdit = (entry) => {
    setSaving(true);
    dispatch(
      createTriagePlaybookEntry(
        {},
        { signal: entry.signal, recommended_action: draftText.trim() },
        (success, data) => {
          setSaving(false);
          if (!success) {
            toast.error(extractApiError(data, "Failed to save playbook entry."));
            return;
          }
          toast.success("Saved — pending approval.");
          setEditingSignal(null);
          report.refetch();
        }
      )
    );
  };

  const approve = (entry) => {
    setApprovingId(entry.id);
    dispatch(
      approveTriagePlaybookEntry({ id: entry.id }, undefined, (success, data) => {
        setApprovingId(null);
        if (!success) {
          toast.error(extractApiError(data, "Failed to approve this entry."));
          return;
        }
        toast.success("Approved.");
        report.refetch();
      })
    );
  };

  if (report.loading) {
    return <Skeleton className="w-full h-[60vh]" rounded="rounded-[16px]" />;
  }

  return (
    <div>
      <div className="mb-4">
        <span className="text-xl font-semibold text-[#163143]">
          Playbook — "Do Next" text per signal
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          No playbook entries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id ?? entry.signal}
              className="bg-white rounded-[16px] border border-[#D7E6E7] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-[#163143]">
                    {signalLabel(entry.signal)}
                  </span>
                  <Tag color={entry.approved ? "green" : "gold"}>
                    {entry.approved ? "Approved" : "Pending approval"}
                  </Tag>
                </div>
                <div className="flex gap-2">
                  {editingSignal !== entry.signal && (
                    <button
                      type="button"
                      onClick={() => startEdit(entry)}
                      className="text-[12px] font-medium px-3 py-1 rounded-full border border-[#D7E6E7] hover:bg-[#F1F5F5]"
                    >
                      Edit
                    </button>
                  )}
                  {isAdmin && !entry.approved && editingSignal !== entry.signal && (
                    <button
                      type="button"
                      disabled={approvingId === entry.id}
                      onClick={() => approve(entry)}
                      className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#69C920] text-white disabled:opacity-50"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {editingSignal === entry.signal ? (
                <div>
                  <TextArea
                    rows={3}
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => saveEdit(entry)}
                      className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#69C920] text-white disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSignal(null)}
                      className="text-[12px] font-medium px-3 py-1 rounded-full border border-[#D7E6E7]"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-[11px] text-[#7F8A92] mt-1">
                    Saving resets approval — an admin will need to re-approve.
                  </div>
                </div>
              ) : (
                <div className="text-[13px] text-[#163143]">
                  {entry.recommended_action || (
                    <span className="text-[#7F8A92]">No "do next" text set yet.</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
