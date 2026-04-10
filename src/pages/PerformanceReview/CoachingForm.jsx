"use client";

import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { saveCoachingForm } from "../../reduxStore/action/performanceReview";

const { TextArea } = Input;

export default function CoachingForm({ sessionId, onSaved }) {
  const dispatch = useDispatch();
  const { coachingForm } = useSelector((state) => state.performanceReview);

  const [loading, setLoading] = useState(false);
  const [wentWell, setWentWell] = useState("");
  const [atRisk, setAtRisk] = useState(null);
  const [otherNotes, setOtherNotes] = useState("");
  const [fathomUrl, setFathomUrl] = useState("");
  const [certified, setCertified] = useState(false);

  // Pre-fill from API if data exists
  useEffect(() => {
    if (coachingForm) {
      setWentWell(coachingForm.what_went_well || "");
      setAtRisk(
        coachingForm.at_risk_of_offboarding == null
          ? null
          : coachingForm.at_risk_of_offboarding
          ? "yes"
          : "no"
      );
      setOtherNotes(coachingForm.additional_notes || "");
      setFathomUrl(coachingForm.fathom_url || "");
    }
  }, [coachingForm]);

  const handleSubmit = () => {
    if (!wentWell) {
      toast.error("Please fill 'What went well' field");
      return;
    }
    if (atRisk == null) {
      toast.error("Please select risk status");
      return;
    }
    if (!certified) {
      toast.error("Please certify you have reviewed the action plan");
      return;
    }

    setLoading(true);
    const body = {
      session_id: sessionId,
      what_went_well: wentWell,
      at_risk_of_offboarding: atRisk === "yes",
      additional_notes: otherNotes,
      fathom_url: fathomUrl,
    };

    dispatch(
      saveCoachingForm(body, (success) => {
        if (success) {
          toast.success("Coaching form saved successfully");
          onSaved?.();
        } else {
          toast.error("Error saving coaching form");
        }
        setLoading(false);
      })
    );
  };

  return (
    <div className="pt-5 space-y-6">
      {/* What went well */}
      <div>
        <div className="bg-[#F1F5F5] rounded-[12px] px-4 py-2 mb-2">
          <span className="text-[14px] font-medium text-[#163143]">
            What went well in the agent's performance during this review—across
            task execution, communication, initiative, time management, and
            collaboration?
            <span className="text-red-500">*</span>
          </span>
        </div>
        <TextArea
          placeholder="Please provide a detailed response"
          value={wentWell}
          onChange={(e) => setWentWell(e.target.value)}
          className="!border-[#D7E6E7] !rounded-[12px]"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      </div>

      {/* At risk */}
      <div>
        <div className="bg-[#F1F5F5] rounded-[12px] px-4 py-2 mb-2 inline-block">
          <span className="text-[14px] font-medium text-[#163143]">
            Is the agent currently at risk of being off boarded or replaced?
            <span className="text-red-500">*</span>
          </span>
        </div>
        <p className="text-[13px] text-[#6B7280] mb-2">
          Select "Yes" only if continued performance issues will likely lead to
          removal from the account.
        </p>
        <Select
          placeholder="Select Yes or No"
          value={atRisk}
          onChange={(v) => setAtRisk(v)}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          className="w-[200px] custom-select-forms"
          popupClassName="custom-select-dropdown"
          style={{ height: "40px" }}
        />
      </div>

      {/* Other notes */}
      <div>
        <div className="bg-[#F1F5F5] rounded-[12px] px-4 py-2 mb-2 inline-block">
          <span className="text-[14px] font-medium text-[#163143]">
            Is there anything else we should not about this coaching session?
            Optional
          </span>
        </div>
        <TextArea
          placeholder="Please provide a detailed response"
          value={otherNotes}
          onChange={(e) => setOtherNotes(e.target.value)}
          className="!border-[#D7E6E7] !rounded-[12px]"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </div>

      {/* Fathom URL */}
      <div>
        <div className="bg-[#F1F5F5] rounded-[12px] px-4 py-2 mb-2 inline-block">
          <span className="text-[14px] font-medium text-[#163143]">
            Fathom URL of Performance Coaching
          </span>
        </div>
        <Input
          placeholder="Paste the Fathom call link here"
          value={fathomUrl}
          onChange={(e) => setFathomUrl(e.target.value)}
          className="!border-[#D7E6E7] !rounded-full"
          style={{ height: "40px" }}
        />
      </div>

      {/* Certify + Submit */}
      <div className="flex items-center justify-between pt-2 border-t border-[#EBF3F4]">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={certified}
            onChange={(e) => setCertified(e.target.checked)}
          />
          <span className="text-[14px] text-[#163143]">
            I certify that I have reviewed the action plan with the agent and
            shared the follow-up steps.
          </span>
        </label>
        <CustomButton
          text={loading ? "Submitting..." : "Submit"}
          textColor="white"
          bg={certified ? "#69C920" : "#B8E89C"}
          borderColor={undefined}
          width={120}
          onclick={handleSubmit}
        />
      </div>
    </div>
  );
}
