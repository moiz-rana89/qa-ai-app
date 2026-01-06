import { Input } from "antd";
import React from "react";
import { formatDateTimeEnglish } from "../../../utils/helperFunctions";

export const TicketDetails = ({ details }) => {
  return (
    <div className="">
      <div className="space-y-6 text-[#163143] font-[400]">
        <div className="w-[100%]">
          <label className="block text-[14px] font-semibold mb-3">
            Ticket Link:
          </label>
          <Input
            type="text"
            disabled
            value={details.uri}
            // onChange={(e) => handleFormChange("form_name", e.target.value)}
            placeholder="Please type Ticket Link"
            style={{ color: "#007be5" }}
            className=" min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
          />
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
