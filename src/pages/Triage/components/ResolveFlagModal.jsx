"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Select, Input } from "antd";
import toast from "react-hot-toast";

import { getTriageFlag, resolveTriageFlag } from "../../../reduxStore/action/triage";
import { extractApiError } from "../../../utils/helperFunctions";
import useApiRequest from "../hooks/useApiRequest";

const { TextArea } = Input;

// Reason + note are both mandatory on resolve per the spec — enforced
// here client-side, on top of the backend's own 422. resolutionReasons
// comes from the flag's own detail payload (fetched on open), since the
// spec ties it to the flag rather than a fixed global list.
export default function ResolveFlagModal({ flagId, open, onClose, onResolved }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState(undefined);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const detail = useApiRequest(
    getTriageFlag,
    { id: flagId },
    open && !!flagId,
    [flagId, open]
  );

  useEffect(() => {
    if (!open) {
      setReason(undefined);
      setNote("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!reason || !note.trim()) {
      toast.error("A resolution reason and a note are both required.");
      return;
    }
    setSubmitting(true);
    dispatch(
      resolveTriageFlag(
        { id: flagId },
        { reason, note: note.trim() },
        (success, data) => {
          setSubmitting(false);
          if (!success) {
            toast.error(extractApiError(data, "Failed to resolve this flag."));
            return;
          }
          toast.success("Flag resolved.");
          onResolved?.();
          onClose();
        }
      )
    );
  };

  return (
    <Modal
      title="Mark Resolved"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Resolve"
      okButtonProps={{ loading: submitting, disabled: detail.loading }}
    >
      <div className="mb-3">
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          Reason<span className="text-red-500">*</span>
        </label>
        <Select
          placeholder="Select a reason"
          value={reason}
          onChange={setReason}
          loading={detail.loading}
          options={(detail.data?.resolutionReasons || []).map((r) => ({
            label: r.label,
            value: r.key,
          }))}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          What was done<span className="text-red-500">*</span>
        </label>
        <TextArea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe what was actually done to resolve this"
        />
      </div>
    </Modal>
  );
}
