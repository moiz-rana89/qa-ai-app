"use client";

import { useState, useEffect } from "react";
import { Modal, Select, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { AntDNotification } from "../AntDNotification";
import Api from "../../reduxStore/lib/api";
import { getAgentName } from "../../reduxStore/action/formsManagement";
import { getClientNamesTMF } from "../../reduxStore/action/workforcedashboard";

const HELP_OPTIONS = [
  {
    key: "Bug",
    title: "Report an Issue",
    description: "Something not working right?",
    icon: "mdi:alert-circle-outline",
    iconColor: "#6B7280",
  },
  {
    key: "Feature",
    title: "Feature Request",
    description: "Got an idea? Let us know.",
    icon: "mdi:lightbulb-outline",
    iconColor: "#163143",
  },
];

export default function NeedHelpModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    pageLink: "",
    client: null,
    clientName: null,
    agent: null,
    agentName: null,
    loomLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);

  const isFeature = selectedOption?.key === "Feature";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { clientNameTMF: clientsList } = useSelector(
    (store) => store?.workforcedashboard
  );
  const { agentNames: agentList } = useSelector(
    (store) => store?.formsManagement
  );

  useEffect(() => {
    if (open && step === 2) {
      dispatch(getClientNamesTMF(setIsLoadingClient));
      dispatch(getAgentName(setIsLoadingAgent));
    }
  }, [open, step]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedOption(null);
    setFormData({
      description: "",
      pageLink: "",
      client: null,
      clientName: null,
      agent: null,
      agentName: null,
      loomLink: "",
    });
    onClose();
  };

  const handleSelectClient = (value) => {
    const client = clientsList?.find((item) => item?.client_id == value);
    setFormData({
      ...formData,
      client: client?.client_id,
      clientName: client?.client,
    });
  };

  const handleSelectAgent = (value) => {
    const agent = agentList?.find((item) => item?.user_id == value);
    setFormData({
      ...formData,
      agent: agent?.user_id,
      agentName: agent?.user_name,
    });
  };

  const handleSubmit = async () => {
    if (!formData.description || formData.description.length < 70) {
      AntDNotification({
        status: "error",
        title: "Validation Error",
        description: "Description must be at least 70 characters.",
      });
      return;
    }
    if (!formData.loomLink) {
      AntDNotification({
        status: "error",
        title: "Validation Error",
        description: "Loom Recording Link is required.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await Api.post("/qa_ai_apis/submit-report", {
        description: formData.description,
        page_link: formData.pageLink,
        client: {
          client_id: formData.client,
          client_name: formData.clientName,
        },
        agent: {
          agent_id: formData.agent,
          agent_name: formData.agentName,
        },
        report_type: selectedOption.key,
        loom_recording_link: formData.loomLink,
      });
      AntDNotification({
        status: "success",
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
      });
      handleClose();
    } catch (error) {
      AntDNotification({
        status: "error",
        title: "Submission Failed",
        description: error.message || "Failed to submit report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={true}
      closeIcon={
        <CloseOutlined className="text-[#163143] hover:text-gray-900" />
      }
      width={step === 1 ? 480 : 520}
      centered
      destroyOnClose
    >
      {step === 1 ? (
        <div className="flex flex-col items-center gap-6 py-2">
          <h2 className="text-[22px] font-semibold text-[#163143]">
            How can we help?
          </h2>
          <div className="flex gap-4 w-full">
            {HELP_OPTIONS.map((option) => (
              <div
                key={option.key}
                onClick={() => handleOptionSelect(option)}
                className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border border-[#E5E7EB] cursor-pointer hover:border-[#69C920] hover:shadow-md transition-all"
              >
                <span className="font-semibold text-[15px] text-[#163143]">
                  {option.title}
                </span>
                <Icon
                  icon={option.icon}
                  className="text-[40px]"
                  style={{ color: option.iconColor }}
                />
                <span className="text-[13px] text-[#6B7280] text-center">
                  {option.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 py-2">
          <h2 className="text-[22px] font-semibold text-[#163143] text-center">
            {selectedOption?.title}
          </h2>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <Input.TextArea
              rows={3}
              placeholder={
                isFeature
                  ? "Tell us about your idea — what would you like to see and how would it help?"
                  : "Tell us what's going wrong and what you were trying to do..."
              }
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ borderRadius: "16px" }}
            />
            <span className="text-[12px] text-[#9CA3AF]">
              The minimum character limit is {formData.description.length}/70
            </span>
          </div>

          {/* Page Link */}
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-1">
              Page Link
            </label>
            <p className="text-[12px] text-[#6B7280] mb-1">
              {isFeature
                ? "Share a page where you'd like to see this feature."
                : "Enter the link to the page where the issue occurred."}
            </p>
            <Input
              placeholder={
                isFeature
                  ? "Add a page link where this feature would be useful..."
                  : "www.example.com"
              }
              value={formData.pageLink}
              onChange={(e) =>
                setFormData({ ...formData, pageLink: e.target.value })
              }
              style={{ height: "40px", color: formData.pageLink ? "#4285F4" : undefined }}
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-1">
              Client
            </label>
            <p className="text-[12px] text-[#6B7280] mb-1">
              {isFeature
                ? "Is this feature for a specific client?"
                : "Select the client this issue is related to."}
            </p>
            <Select
              showSearch
              placeholder="Select client name"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={clientsList?.map((item) => ({
                value: item?.client_id,
                label: item?.client,
              }))}
              onChange={handleSelectClient}
              value={formData.client}
              className="w-full custom-select-forms"
              popupClassName="custom-select-dropdown"
              style={{ height: "40px" }}
              loading={isLoadingClient}
            />
          </div>

          {/* Agent */}
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-1">
              Agent
            </label>
            <p className="text-[12px] text-[#6B7280] mb-1">
              {isFeature
                ? "Choose an agent if this request is related to someone specific."
                : "Select the agent this issue is related to."}
            </p>
            <Select
              showSearch
              placeholder="Select agent name"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={agentList?.map((item) => ({
                value: item?.user_id,
                label: item?.user_name,
              }))}
              onChange={handleSelectAgent}
              value={formData.agent}
              className="w-full custom-select-forms"
              popupClassName="custom-select-dropdown"
              style={{ height: "40px" }}
              loading={isLoadingAgent}
            />
          </div>

          {/* Loom Recording Link */}
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-1">
              Loom Recording Link<span className="text-red-500">*</span>
            </label>
            <p className="text-[12px] text-[#6B7280] mb-1">
              {isFeature
                ? "A quick video helps us better understand your feature."
                : "Share a Loom video that walks us through the issue."}
            </p>
            <Input
              placeholder={
                isFeature
                  ? "Share a Loom link or upload a video to explain your idea"
                  : "www.loom.com"
              }
              value={formData.loomLink}
              onChange={(e) =>
                setFormData({ ...formData, loomLink: e.target.value })
              }
              style={{ height: "40px", color: formData.loomLink ? "#4285F4" : undefined }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={handleClose}
              className="w-full h-[40px] px-6 rounded-full font-semibold text-[16px] text-[#163143] border border-[#D7E6E7] hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-[40px] px-6 rounded-full font-semibold text-[16px] text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : isFeature ? "Submit Request" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
