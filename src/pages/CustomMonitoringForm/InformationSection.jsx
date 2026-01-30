"use client";
import { Input, Select } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesInput } from "../../components/NotesInput";
import { getAgentName } from "../../reduxStore/action/formsManagement";

export function InformationSection({
  agentName,
  ticketUrl,
  onUpdate,
  additionalNotes,
}) {
  const dispatch = useDispatch();
  const { agentNames: agentList } = useSelector(
    (store) => store?.formsManagement
  );

  const [isLoadingAgent, setIsLoadingAgent] = useState();

  useEffect(() => {
    dispatch(getAgentName(setIsLoadingAgent));
  }, []);

  const handleSelectAgent = (e) => {
    const agent = agentList?.find((item) => item?.user_id == e);
    onUpdate({ agentName: agent?.user_name, agentId: agent?.user_id });
  };
  return (
    <div className="space-y-6 text-[#163143] font-[400]">
      <div>
        <label className="block text-[18px] mb-3">
          What is the full name of the Agent you are providing coaching for?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Select
          showSearch
          placeholder="Type agent name here"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={agentList?.map((item) => ({
            value: item?.user_id,
            label: item?.user_name,
          }))}
          onChange={(e) => handleSelectAgent(e)}
          value={agentName ? agentName : null}
          className="w-[50%] custom-select-forms"
          popupClassName="custom-select-dropdown"
          style={{ height: "50px" }}
          loading={isLoadingAgent}
        />
      </div>

      <div>
        <label className="block text-[18px] mb-3">
          What is the URL to the Ticket You are auditing?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Input
          type="url"
          value={ticketUrl ? ticketUrl : ""}
          onChange={(e) => onUpdate({ ticketUrl: e.target.value })}
          placeholder="Please only submit one ticket URL per submission"
          className="!w-[50%] h-[50px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-[18px] mb-3">
          Additional Notes / Customer Concerns{" "}
        </label>
        <NotesInput
          notes={additionalNotes ? additionalNotes : ""}
          onChange={(e) => onUpdate({ additionalNotes: e })}
          placeholder="Please only submit one ticket URL per submission"
          limit={false}
        />
      </div>
    </div>
  );
}
