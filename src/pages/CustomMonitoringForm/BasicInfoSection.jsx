"use client";
import { Select } from "antd";
import { useClients } from "./useClients";

export function BasicInfoSection({ clientId, onUpdate }) {
  const { clients, isLoading, error, retry } = useClients();

  const handleSelectClient = (id) => {
    const client = clients.find((item) => item.client_id === id);
    onUpdate({ clientVersion: client?.client_name, clientId: client?.client_id });
  };

  return (
    <div className="space-y-6 text-[#163143] font-[400]">
      <div>
        <label className="block text-[18px] mb-3">
          What is the Client Name? <span className="text-red-500">*</span>
        </label>
        {error ? (
          <div className="flex items-center gap-4">
            <p className="text-[16px] text-[#FF5546]">
              Failed to load clients.
            </p>
            <button
              type="button"
              onClick={retry}
              className="min-h-[40px] px-6 text-[14px] font-medium rounded-full bg-[#69C920] hover:bg-[#5CB518] text-white transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        ) : !isLoading && clients.length === 0 ? (
          <p className="text-[16px]">No clients available</p>
        ) : (
          <Select
            showSearch
            placeholder="Type client name here"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={clients.map((item) => ({
              value: item.client_id,
              label: item.client_name,
            }))}
            onChange={handleSelectClient}
            value={clientId || null}
            className="w-[50%] custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "50px" }}
            loading={isLoading}
            disabled={isLoading}
          ></Select>
        )}
      </div>
    </div>
  );
}
