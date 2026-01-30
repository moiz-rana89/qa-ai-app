"use client";
import { Select } from "antd";
import { useState } from "react";
import clientsList from "../../utils/clientsPCF.json";
export function BasicInfoSection({ clientVersion, onUpdate }) {
  const [isLoadingClient, setIsLoadingClient] = useState();

  const handleSelectClient = (e) => {
    const client = clientsList?.find((item) => item?.client_id == e);
    onUpdate({ clientVersion: client?.client, clientId: client?.client_id });
  };
  return (
    <div className="space-y-6 text-[#163143] font-[400]">
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
    </div>
  );
}
