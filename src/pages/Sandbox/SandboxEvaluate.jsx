"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Modal, Input } from "antd";
import toast from "react-hot-toast";

import SandboxBanner from "../../components/SandboxBanner";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { submitSandboxEvaluation } from "../../reduxStore/action/sandbox";

// Sandbox evaluation page. Submitting calls the dedicated sandbox endpoint
// which AI-grades the ticket and returns a preview score — nothing is
// recorded in live data.
//
// MVP scope: capture ticket_id / form_id + a "Submit Sandbox Evaluation"
// button. Show the AI's grade in a result modal. The richer form-rendering
// UI is intentionally deferred — the spec says to reuse the existing
// QAForm component, which lives in EvaluteTickets/DynamicForm and is
// tightly coupled to that page's data flow; reusing it for sandbox is a
// follow-up integration task.
export default function SandboxEvaluate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Optionally pre-filled from query string when the user navigated here
  // from the Sandbox Tickets list.
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [ticketId, setTicketId] = useState(
    queryParams.get("ticket_id") || ""
  );
  const [formId, setFormId] = useState(queryParams.get("form_id") || "");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (!ticketId.trim()) {
      toast.error("Ticket ID is required.");
      return;
    }
    if (!formId.toString().trim()) {
      toast.error("Form ID is required.");
      return;
    }
    setSubmitting(true);
    dispatch(
      submitSandboxEvaluation(
        {
          ticket_id: ticketId.trim(),
          source: "gorgias",
          form_id: Number(formId) || formId,
        },
        (success, data) => {
          if (success) {
            setResult(data);
          } else {
            const status = data?.response?.status;
            const detail = data?.data?.detail || data?.message;
            if (status === 404) {
              toast.error(
                "Ticket not found. It may not have been reconstructed yet."
              );
            } else if (status === 403) {
              toast.error(
                "This ticket hasn't been added to the sandbox. Contact your admin."
              );
            } else if (status === 400) {
              toast.error(
                detail || "No evaluation form is linked to this ticket yet."
              );
            } else if (status === 500) {
              toast.error("AI grading failed. Please try again in a moment.");
            } else {
              toast.error(detail || "Failed to submit. Please try again.");
            }
          }
          setSubmitting(false);
        }
      )
    );
  };

  const preview = result?.preview_grade;
  const pct = preview?.percentage_score;

  return (
    <div className="w-full h-full flex flex-col">
      <SandboxBanner />

      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          QA Sandbox — Practice Evaluation
        </span>
      </div>

      <div className="mx-8 mt-6 mb-8 bg-white rounded-[16px] border border-[#D7E6E7] p-8 max-w-[640px]">
        <p className="text-[#7F8A92] text-[14px] mb-6">
          Submit a sandbox evaluation against a curated ticket. Your score
          will be calculated by AI for practice — it won't be saved as a
          live QA record.
        </p>

        <div className="mb-5">
          <label className="block text-[#163143] font-poppins text-[14px] font-semibold mb-2">
            Ticket ID<span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="e.g. 99001"
            disabled={submitting}
            style={{ height: 44, borderRadius: 24 }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#163143] font-poppins text-[14px] font-semibold mb-2">
            Form ID<span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            placeholder="e.g. 12"
            disabled={submitting}
            style={{ height: 44, borderRadius: 24 }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <CustomButton
            text="Back to tickets"
            textColor="#163143"
            bg="white"
            borderColor="#D7E6E7"
            width={150}
            onclick={() => navigate("/sandbox-tickets")}
          />
          <CustomButton
            text={submitting ? "Grading…" : "Submit Sandbox Evaluation"}
            textColor="white"
            bg="#69C920"
            borderColor={undefined}
            width={230}
            onclick={handleSubmit}
          />
        </div>
      </div>

      {/* Success modal — shows the AI-graded preview */}
      <Modal
        open={!!result}
        title={
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:check-circle"
              className="text-[#1F8B3F] text-[22px]"
            />
            <span className="text-[#163143] text-[18px] font-semibold">
              Practice complete!
            </span>
          </div>
        }
        onCancel={() => setResult(null)}
        onOk={() => setResult(null)}
        okText="Done"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: { background: "#69C920", borderColor: "#69C920" },
        }}
        destroyOnClose
      >
        {result && (
          <div className="space-y-4 pt-2">
            <div className="bg-[#FFF3D8] border border-[#F0B400] rounded-[12px] px-4 py-3 text-[13px] text-[#7A5A00]">
              <Icon
                icon="mdi:test-tube"
                className="inline align-[-3px] mr-1 text-[16px]"
              />
              This was a sandbox attempt — it was <strong>not recorded
              in live data</strong>.
            </div>

            <div className="text-center py-2">
              <div className="text-[14px] text-[#7F8A92]">Your score</div>
              <div className="text-[36px] font-bold text-[#163143] tabular-nums">
                {preview?.final_score ?? "—"}
                <span className="text-[20px] text-[#7F8A92] font-normal">
                  {" "}
                  / {preview?.max_score ?? "—"}
                </span>
              </div>
              {pct != null && (
                <div className="text-[16px] font-semibold text-[#69C920] tabular-nums">
                  {Number(pct).toFixed(1)}%
                </div>
              )}
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-y-1 gap-x-3 text-[13px]">
              <div className="text-[#7F8A92]">Ticket</div>
              <div className="text-[#163143] font-mono">
                {result.ticket_id}
              </div>
              <div className="text-[#7F8A92]">Form</div>
              <div className="text-[#163143]">{result.form_id}</div>
              <div className="text-[#7F8A92]">Agent</div>
              <div className="text-[#163143]">{result.agent_id ?? "—"}</div>
              <div className="text-[#7F8A92]">Graded at</div>
              <div className="text-[#163143]">
                {result.graded_at
                  ? new Date(result.graded_at).toLocaleString()
                  : "—"}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
