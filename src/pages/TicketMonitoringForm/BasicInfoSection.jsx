"use client";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgentName } from "../../reduxStore/action/formsManagement";
import { getClientNamesTMF } from "../../reduxStore/action/workforcedashboard";

export function BasicInfoSection({
  agentName,
  clientVersion,
  ticketUrl,
  onUpdate,
}) {
  const dispatch = useDispatch();
  const { clientNameTMF: clientsList } = useSelector(
    (store) => store?.workforcedashboard
  );
  const { agentNames: agentList } = useSelector(
    (store) => store?.formsManagement
  );
  const [isLoadingClient, setIsLoadingClient] = useState();
  const [isLoadingAgent, setIsLoadingAgent] = useState();

  useEffect(() => {
    dispatch(getClientNamesTMF(setIsLoadingClient));
    dispatch(getAgentName(setIsLoadingAgent));
  }, []);
  const handleSelectClient = (e) => {
    const client = clientsList?.find((item) => item?.client_id == e);
    onUpdate({ clientVersion: client?.client, clientId: client?.client_id });
  };
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
          style={{ height: "50px", borderColor: "#69c920" }}
          loading={isLoadingAgent}
        />
      </div>

      <div>
        <label className="block text-[18px] mb-3">
          What is the Client Name? <span className="text-red-500">*</span>
        </label>
        <Select
          showSearch
          placeholder="Type client name here"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={clientsList?.map((item) => ({
            value: item?.client_id,
            label: item?.client,
          }))}
          onChange={(e) => handleSelectClient(e)}
          value={clientVersion ? clientVersion : null}
          className="w-[50%] custom-select-forms"
          popupClassName="custom-select-dropdown"
          style={{ height: "50px" }}
          loading={isLoadingClient}
        ></Select>
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
          className="!w-[50%] !p-[13px_53px_13px_14px] !font-poppins !text-[#163143] !bg-[#FFFFFF] border !border-[#69c920] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
        />
      </div>
    </div>
  );
}
