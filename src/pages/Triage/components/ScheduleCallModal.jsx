"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { scheduleTriageCall } from "../../../reduxStore/action/triage";
import { extractApiError } from "../../../utils/helperFunctions";
import { signalLabel } from "../helpers";

// Multi-flag selection is a core feature per the spec — scheduling from
// one flag should offer the agent's other open flags too ("replies per
// hour is also going to be discussed here"). All selected flags must
// belong to the same agent; the API 422s otherwise, but since this modal
// is always opened scoped to one agent's own flags, that can't happen
// from here.
export default function ScheduleCallModal({
  agent,
  initialFlagId,
  open,
  onClose,
  onScheduled,
  maxBookingHours = 24,
}) {
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState([]);
  const [scheduledFor, setScheduledFor] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openFlags = (agent?.flags || []).filter((f) => f.status === "open");

  useEffect(() => {
    if (open) {
      setSelectedIds(initialFlagId ? [initialFlagId] : openFlags.map((f) => f.id));
      setScheduledFor(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialFlagId, agent]);

  const toggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const now = dayjs();
  const maxTime = now.add(maxBookingHours, "hour");

  const disabledDate = (date) =>
    date.isBefore(now, "day") || date.isAfter(maxTime, "day");

  const handleSubmit = () => {
    if (selectedIds.length === 0) {
      toast.error("Select at least one flag to discuss.");
      return;
    }
    if (!scheduledFor) {
      toast.error("Pick a date/time within the next 24 hours.");
      return;
    }
    setSubmitting(true);
    dispatch(
      scheduleTriageCall(
        {},
        { flag_ids: selectedIds, scheduled_for: scheduledFor.toISOString() },
        (success, data) => {
          setSubmitting(false);
          if (!success) {
            toast.error(extractApiError(data, "Failed to schedule this call."));
            return;
          }
          toast.success("Call scheduled.");
          onScheduled?.();
          onClose();
        }
      )
    );
  };

  return (
    <Modal
      title={`Schedule a Call — ${agent?.agent_name || ""}`}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Schedule"
      okButtonProps={{ loading: submitting }}
    >
      <div className="mb-4">
        <label className="block text-[13px] font-semibold text-[#163143] mb-2">
          What to discuss<span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {openFlags.map((f) => (
            <label key={f.id} className="flex items-start gap-2 text-[13px] text-[#163143]">
              <Checkbox
                checked={selectedIds.includes(f.id)}
                onChange={() => toggle(f.id)}
              />
              <span>
                {signalLabel(f.signal)} — {f.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-[#163143] mb-1">
          When<span className="text-red-500">*</span>
        </label>
        <DatePicker
          showTime
          value={scheduledFor}
          onChange={setScheduledFor}
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          placeholder={`Within the next ${maxBookingHours}h`}
        />
      </div>
    </Modal>
  );
}
