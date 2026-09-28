"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input } from "antd";
import toast from "react-hot-toast";

import { dismissTriageFlag } from "../../../reduxStore/action/triage";
import { extractApiError } from "../../../utils/helperFunctions";

const { TextArea } = Input;

// Dismiss is OM/SOM-only server-side (canDismiss on the flag detail
// gates whether this is even offered) — a 403 here means the caller
// showed the control when they shouldn't have, not a user-input problem.
export default function DismissFlagModal({ flagId, open, onClose, onDismissed }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error("A reason is required to dismiss this flag.");
      return;
    }
    setSubmitting(true);
    dispatch(
      dismissTriageFlag({ id: flagId }, { reason: reason.trim() }, (success, data) => {
        setSubmitting(false);
        if (!success) {
          toast.error(extractApiError(data, "Failed to dismiss this flag."));
          return;
        }
        toast.success("Flag dismissed.");
        onDismissed?.();
        onClose();
      })
    );
  };

  return (
    <Modal
      title="Dismiss Flag"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Dismiss"
      okButtonProps={{ loading: submitting, danger: true }}
    >
      <label className="block text-[13px] font-semibold text-[#163143] mb-1">
        Reason<span className="text-red-500">*</span>
      </label>
      <TextArea
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Why is this flag being dismissed?"
      />
    </Modal>
  );
}
