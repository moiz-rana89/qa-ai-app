"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, DatePicker } from "antd";
import toast from "react-hot-toast";

import { completeTriageCall } from "../../../reduxStore/action/triage";
import { extractApiError } from "../../../utils/helperFunctions";

const { TextArea } = Input;

// call_summary and action_plan are required (422 otherwise). Logging a
// call does NOT resolve the flags — they stay in_progress until someone
// separately confirms the behavior changed and resolves. The date picked
// here becomes the re-review date (expected_resolution_date).
export default function CompleteCallModal({ callId, open, onClose, onCompleted }) {
  const dispatch = useDispatch();
  const [fathomLink, setFathomLink] = useState("");
  const [callSummary, setCallSummary] = useState("");
  const [actionPlan, setActionPlan] = useState("");
  const [expectedResolutionDate, setExpectedResolutionDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setFathomLink("");
      setCallSummary("");
      setActionPlan("");
      setExpectedResolutionDate(null);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!callSummary.trim() || !actionPlan.trim()) {
      toast.error("Call summary and action plan are both required.");
      return;
    }
    setSubmitting(true);
    dispatch(
      completeTriageCall(
        { id: callId },
        {
          fathom_link: fathomLink.trim() || undefined,
          call_summary: callSummary.trim(),
          action_plan: actionPlan.trim(),
          expected_resolution_date: expectedResolutionDate
            ? expectedResolutionDate.format("YYYY-MM-DD")
            : undefined,
        },
        (success, data) => {
          setSubmitting(false);
          if (!success) {
            toast.error(extractApiError(data, "Failed to log this call."));
            return;
          }
          toast.success("Call logged.");
          onCompleted?.();
          onClose();
        }
      )
    );
  };

  return (
    <Modal
      title="Log Call"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Log Call"
      okButtonProps={{ loading: submitting }}
    >
      <div className="mb-3">
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          Fathom link
        </label>
        <Input
          value={fathomLink}
          onChange={(e) => setFathomLink(e.target.value)}
          placeholder="https://fathom.video/..."
        />
      </div>
      <div className="mb-3">
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          Call summary<span className="text-red-500">*</span>
        </label>
        <TextArea
          rows={3}
          value={callSummary}
          onChange={(e) => setCallSummary(e.target.value)}
          placeholder="What was discussed"
        />
      </div>
      <div className="mb-3">
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          Action plan<span className="text-red-500">*</span>
        </label>
        <TextArea
          rows={3}
          value={actionPlan}
          onChange={(e) => setActionPlan(e.target.value)}
          placeholder="What the agent agreed to change"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          Re-review date
        </label>
        <DatePicker
          value={expectedResolutionDate}
          onChange={setExpectedResolutionDate}
          style={{ width: "100%" }}
          placeholder="When to check back in"
        />
      </div>
    </Modal>
  );
}
