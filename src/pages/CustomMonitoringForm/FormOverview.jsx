"use client";

import { useEffect, useState } from "react";
import { getTicketTypesByClient } from "../../utils/custom-form-data";

export function FormOverview({
  selectedTypes,
  onTypesChange,
  selectedClient,
  clientName,
}) {
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const types = getTicketTypesByClient(selectedClient);
    setTicketTypes(types);
  }, [selectedClient]);

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      // onTypesChange([...selectedTypes, type]);
      onTypesChange([type]);
    }
  };

  return (
    <div className="space-y-6 text-[#163143]">
      {ticketTypes?.length == 0 ? (
        <div className="space-y-4">
          <p className="text-[18px]">
            No Forms found against client
            <span className="text-[18px] font-semibold ml-[5px]">
              {clientName}
            </span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-[18px]">
            What type of Ticket Monitoring are you conducting?{" "}
            <span className="text-red-500">*</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ticketTypes?.map((type) => (
              <button
                key={type?.id}
                type="button"
                onClick={() => handleTypeChange(type?.id)}
                className={`p-4 rounded-[16px] border-2 text-left transition-all duration-200 ${
                  selectedTypes?.includes(type?.id)
                    ? "border-[#86FE96] bg-[#86FE960A]"
                    : "border-[#D7E6E7] bg-[#FFFFFF] hover:border-gray-300"
                }`}
              >
                <span className="text-md text-[16px]">{type?.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
