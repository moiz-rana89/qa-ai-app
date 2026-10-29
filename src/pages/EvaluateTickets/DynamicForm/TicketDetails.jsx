import { Input } from "antd";
import React from "react";
import { formatDateTimeEnglish } from "../../../utils/helperFunctions";

const { TextArea } = Input;

// Customer Concern is a required question capped at this many characters
// (also checked on submit in EvaluteForm).
export const MAX_CUSTOMER_CONCERN_LENGTH = 100;

export const TicketDetails = ({
  details,
  customerConcern,
  setCustomerConcern,
}) => {
  const concernLength = (customerConcern ?? "").length;
  const concernAtLimit = concernLength >= MAX_CUSTOMER_CONCERN_LENGTH;

  return (
    <div className="">
      <div className="space-y-6 text-[#163143] font-[400]">
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Ticket Link:
          </label>
          {details.uri ? (
            <a
              href={details.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#007be5] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full hover:border-[#69C920] transition-all duration-200 truncate cursor-pointer underline"
            >
              {details.uri}
            </a>
          ) : (
            <Input
              type="text"
              disabled
              value=""
              placeholder="Please type Ticket Link"
              className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 transition-all duration-200"
            />
          )}
        </div>

        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Agent Name:
          </label>
          <Input
            type="text"
            disabled
            value={details.agent_name}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            style={{ color: "#163143" }}
            placeholder="Please type Agent Name"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Team Lead Name:
          </label>
          <Input
            type="text"
            disabled
            value={details.team_lead}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            style={{ color: "#163143" }}
            placeholder="Please type Team Lead Name"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Client Name:
          </label>
          <Input
            type="text"
            disabled
            value={details.hubstaff_client_name}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            style={{ color: "#163143" }}
            placeholder="Please type Client Name"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Date of Audit:
          </label>
          <Input
            type="text"
            disabled
            value={formatDateTimeEnglish(details.evaluation_date)}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            style={{ color: "#163143" }}
            placeholder="Please type Date of Audit"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>

        {/* Channel — read-only. Comes from the prefill payload as
            `details.channel` (e.g. "email", "chat", "phone"). */}
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Channel:
          </label>
          <Input
            type="text"
            disabled
            value={details.channel || ""}
            style={{ color: "#163143" }}
            placeholder="—"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200 capitalize"
          />
        </div>

        {/* Customer Concern — required free-text textarea (max
            MAX_CUSTOMER_CONCERN_LENGTH characters). Sent on submit as
            `customer_concern`. */}
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Customer Concern: <span className="text-red-500">*</span>
          </label>
          <TextArea
            value={customerConcern ?? ""}
            onChange={(e) => setCustomerConcern?.(e.target.value)}
            placeholder="What was the customer actually concerned about?"
            maxLength={MAX_CUSTOMER_CONCERN_LENGTH}
            autoSize={{ minRows: 3, maxRows: 8 }}
            className="font-poppins text-[#163143] !bg-[#FFFFFF] !border !border-[#D7E6E7] !rounded-[16px] placeholder-gray-400 focus:!outline-none focus:!ring-1 focus:!ring-[#69C920] focus:!border-[#69C920] hover:!border-[#69C920] transition-all duration-200"
            style={{ padding: "12px 14px" }}
          />
          <div
            className={`text-[12px] mt-1 ${
              concernAtLimit ? "text-[#FF5546]" : "text-[#7F8A92]"
            }`}
          >
            {concernLength}/{MAX_CUSTOMER_CONCERN_LENGTH} characters maximum
          </div>
        </div>

        {/*<div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Monitoring Type:
          </label>
          <Input
            type="text"
            value={details.uri}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            placeholder="Please type Monitoring Type"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Ticket Type:
          </label>
          <Input
            type="text"
            value={details.uri}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            placeholder="Please type Ticket Type"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div>
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Customer Concerns:
          </label>
          <Input
            type="text"
            value={details.uri}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            placeholder="Please type Customer Concerns"
            className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
        </div> */}
      </div>
    </div>
  );
};
