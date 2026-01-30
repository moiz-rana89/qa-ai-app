"use client";

export function FormOverview({ selectedTypes, onTypesChange }) {
  const ticketTypes = [
    {
      title: "Customer Service - Email/Chat",
      id: "customer-service-email-chat",
    },
    {
      title: "Customer Service - Phone",
      id: "customer-service-phone",
    },
    {
      title: "Customer Service - Email, Chat & Phone",
      id: "customer-service-email-chat-phone",
    },
    {
      title: "Brand Concierge",
      id: "brand-concierge",
    },
    { title: "Growth Assistant", id: "growth-assistant" },
  ];

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
      <div className="space-y-4">
        <p className="text-[18px]">
          What type of Performance Coaching are you conducting?{" "}
          <span className="text-red-500">*</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ticketTypes.map((type) => (
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
    </div>
  );
}
