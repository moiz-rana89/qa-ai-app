"use client";

import { useState } from "react";
import { Drawer, Input, DatePicker } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { CustomButton } from "../../components/Buttons/CustomButton";
import UploadFile from "../../components/UploadFile";
import { submitResolutions } from "../../reduxStore/action/performanceReview";

const { TextArea } = Input;

function NumberedInputList({ items, setItems, placeholder }) {
  const addItem = () => setItems([...items, ""]);
  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };
  const removeItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-[14px] text-[#9CA3AF] min-w-[24px]">
            {index + 1}
          </span>
          <Input
            placeholder={placeholder}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1"
            style={{ height: "40px", borderRadius: "8px" }}
          />
          {items.length > 1 && (
            <Icon
              icon="mdi:close"
              className="text-[#9CA3AF] text-[18px] cursor-pointer hover:text-[#EF4444]"
              onClick={() => removeItem(index)}
            />
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-[13px] text-[#69C920] font-medium hover:underline"
      >
        + Add more
      </button>
    </div>
  );
}

export default function ResolveDrawer({
  open,
  setOpen,
  kpiTitle,
  metricType,
  sessionId,
  missedMetrics = [],
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tlCommitment, setTlCommitment] = useState("");
  const [agentCommitment, setAgentCommitment] = useState("");
  const [tlOptions, setTlOptions] = useState([""]);
  const [tlOptionDate, setTlOptionDate] = useState(null);
  const [startItems, setStartItems] = useState([""]);
  const [stopItems, setStopItems] = useState([""]);
  const [continueItems, setContinueItems] = useState([""]);
  const [resolveDate, setResolveDate] = useState(dayjs());
  const [fileInfo, setFileInfo] = useState(null);

  const onClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTlCommitment("");
    setAgentCommitment("");
    setTlOptions([""]);
    setTlOptionDate(null);
    setStartItems([""]);
    setStopItems([""]);
    setContinueItems([""]);
    setResolveDate(dayjs());
    setFileInfo(null);
  };

  const handleSave = () => {
    if (!tlCommitment) {
      toast.error("Team Lead Commitment is required");
      return;
    }
    if (!agentCommitment) {
      toast.error("Agent Commitment is required");
      return;
    }

    if (!sessionId || !metricType) {
      toast.error("Session data is missing");
      return;
    }

    setLoading(true);
    const body = {
      session_id: sessionId,
      resolutions: [
        {
          metric_type: metricType,
          team_lead_commitment: tlCommitment,
          team_lead_commitment_options: tlOptions
            .filter((o) => o.trim())
            .map((text) => ({
              text,
              datee: tlOptionDate?.format("YYYY-MM-DD") || null,
            })),
          agent_commitment_start: startItems.filter((s) => s.trim()).join("\n"),
          agent_commitment_stop: stopItems.filter((s) => s.trim()).join("\n"),
          agent_commitment_continue: continueItems.filter((c) => c.trim()).join("\n"),
          resolution_date: resolveDate?.format("YYYY-MM-DD"),
          upload_url:
            fileInfo?.length > 0 ? fileInfo[0]?.url : null,
        },
      ],
    };

    dispatch(
      submitResolutions(body, (success) => {
        if (success) {
          toast.success("Resolved successfully");
          onClose();
          onSuccess?.();
        } else {
          toast.error("Error submitting resolution");
        }
        setLoading(false);
      })
    );
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-[#163143] font-poppins text-[20px] font-semibold">
            {kpiTitle}
          </span>
          <div>
            <Icon
              icon="codex:cross"
              className="h-8 w-8 text-[#163143] cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width={600}
    >
      <div className="flex flex-col gap-6 px-2">
        {/* Top buttons */}
        <div className="flex justify-end gap-3">
          <CustomButton
            text="Cancel"
            textColor="#163143"
            bg="white"
            borderColor="#D7E6E7"
            width={100}
            onclick={onClose}
          />
          <CustomButton
            text={loading ? "Saving..." : "Save"}
            textColor="white"
            bg="#69C920"
            borderColor={undefined}
            width={100}
            onclick={handleSave}
          />
        </div>

        {/* Missed SLA Cards */}
        {missedMetrics.length > 0 && (
          <div>
            <div className="text-[14px] font-semibold text-[#EF4444] mb-3">
              Missed:
            </div>
            <div className="flex gap-3">
              {missedMetrics.map((m, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#F0FFF4] border border-[#D7E6E7] rounded-[12px] p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold text-[#163143]">
                      {m.label}
                    </span>
                    <Icon
                      icon="mdi:close-circle"
                      className="text-[20px] text-[#EF4444]"
                    />
                  </div>
                  <span className="text-[15px] text-[#163143] font-medium">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Lead Commitment */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Team Lead Commitment<span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="Example:
1) I will schedule quick weekly check-ins to review the agent's understanding of the client SOPs and clarify any confusing areas.
2) I will prepare 2-3 quiz-style questions or fastball scenarios per week to reinforce SOP retention and application."
            value={tlCommitment}
            onChange={(e) => setTlCommitment(e.target.value)}
            className="!border-[#D7E6E7] !rounded-[12px]"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </div>

        {/* Add Options */}
        <div>
          <label className="block text-[13px] text-[#163143] mb-2">
            Add Options Here:
          </label>
          <div className="space-y-2">
            {tlOptions.map((opt, i) => (
              <div
                key={i}
                className="flex items-center border border-[#D7E6E7] rounded-[24px] overflow-hidden"
              >
                <span className="text-[14px] text-[#9CA3AF] pl-4 pr-2">
                  {i + 1}
                </span>
                <Input
                  placeholder="Enter your commitment and follow-up actions."
                  value={opt}
                  onChange={(e) => {
                    const updated = [...tlOptions];
                    updated[i] = e.target.value;
                    setTlOptions(updated);
                  }}
                  className="flex-1 !border-0 !shadow-none"
                  style={{ height: "40px" }}
                />
                <div className="flex items-center gap-1 pr-3 border-l border-[#D7E6E7] pl-3">
                  <Icon
                    icon="mdi:calendar-outline"
                    className="text-[#69C920] text-[18px] cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById(`tl-option-date-${i}`)
                        ?.querySelector("input")
                        ?.click();
                    }}
                  />
                  <DatePicker
                    id={`tl-option-date-${i}`}
                    value={tlOptionDate}
                    onChange={(d) => setTlOptionDate(d)}
                    className="!w-0 !p-0 !border-0 !shadow-none opacity-0 absolute"
                    style={{ height: 0 }}
                  />
                  <Icon
                    icon="mdi:chevron-down"
                    className="text-[#9CA3AF] text-[16px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Commitment */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Agent Commitment<span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="What is the agent committing to moving forward? Please use the Start, Stop, Continue method to outline clear, actionable commitments.

Example:
Start: Set aside 1-2 hours per week to review client SOPs.
Stop: Providing only one solution to customer issues without offering alternatives.
Continue: Responding to customer queries in real time to avoid unnecessary delays."
            value={agentCommitment}
            onChange={(e) => setAgentCommitment(e.target.value)}
            className="!border-[#D7E6E7] !rounded-[12px]"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </div>

        {/* Start */}
        <div>
          <label className="block text-[13px] font-semibold text-[#163143] mb-1">
            Start:{" "}
            <span className="font-normal text-[#6B7280]">
              Identify a new action, habit, or behavior the agent will begin
              doing to improve performance.
            </span>{" "}
            <span className="text-red-500">*</span>
          </label>
          <NumberedInputList
            items={startItems}
            setItems={setStartItems}
            placeholder="Enter here..."
          />
        </div>

        {/* Stop */}
        <div>
          <label className="block text-[13px] font-semibold text-[#163143] mb-1">
            Stop:{" "}
            <span className="font-normal text-[#6B7280]">
              Highlight an action, habit, or behavior the agent should stop
              doing because it's unproductive, incorrect, or misaligned with
              expectations.
            </span>{" "}
            <span className="text-red-500">*</span>
          </label>
          <NumberedInputList
            items={stopItems}
            setItems={setStopItems}
            placeholder="Enter here..."
          />
        </div>

        {/* Continue */}
        <div>
          <label className="block text-[13px] font-semibold text-[#163143] mb-1">
            Continue:{" "}
            <span className="font-normal text-[#6B7280]">
              Reinforce an action or behavior the agent is already doing well
              and should keep doing consistently.
            </span>{" "}
            <span className="text-red-500">*</span>
          </label>
          <NumberedInputList
            items={continueItems}
            setItems={setContinueItems}
            placeholder="Enter here..."
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-1">
            Date<span className="text-red-500">*</span>
          </label>
          <p className="text-[12px] text-[#6B7280] mb-2">
            This date determines when the update or adjustment will apply.
          </p>
          <DatePicker
            value={resolveDate}
            onChange={(d) => setResolveDate(d)}
            className="w-[200px] schedule-date-picker"
            style={{
              height: "44px",
              borderRadius: "24px",
              border: "1px solid #D7E6E7",
            }}
            format="M/D/YYYY"
            suffixIcon={
              <Icon
                icon="mdi:calendar-outline"
                className="text-[#69C920] text-[18px]"
              />
            }
          />
        </div>

        {/* Upload */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-1">
            Upload
          </label>
          <p className="text-[12px] text-[#6B7280] mb-2">
            Attach relevant files if needed to support your resolution or
            assessment.
          </p>
          <UploadFile fileInfo={fileInfo} setFileInfo={setFileInfo} />
        </div>
      </div>
    </Drawer>
  );
}
