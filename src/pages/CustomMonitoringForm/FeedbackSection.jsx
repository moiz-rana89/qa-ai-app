"use client";

export function FeedbackSection({
  additionalFeedback,
  improvements,
  recommendations,
  selectedFormType,
  onUpdate,
}) {
  const charLimit = 70;
  return (
    <div className="space-y-6  text-[#163143] font-[400] mt-6">
      <div>
        <div className="flex">
          <label
            style={{ width: "max-content" }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px] mb-3"
          >
            {console.log(
              "selectedFormType",
              selectedFormType?.includes("phone") ||
                selectedFormType?.includes("call")
            )}
            What are some things this agent did particularly well in their
            {selectedFormType?.includes("phone") ||
            selectedFormType?.includes("call")
              ? " call"
              : " tickets"}
            ?
          </label>
          <span className="text-red-500 ml-2">*</span>
        </div>
        <textarea
          value={additionalFeedback}
          onChange={(e) => onUpdate({ additionalFeedback: e.target.value })}
          placeholder="Please provide a detailed response"
          rows={3}
          className="w-full px-6 py-2 bg-[#FFFFFF] border border-[#D7E6E7] rounded-[12px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] transition-all duration-200"
        />
        <span
          style={{
            color:
              additionalFeedback?.length > charLimit
                ? "#16314380"
                : additionalFeedback
                ? "red"
                : "#16314380",
            fontSize: "14px",
          }}
        >
          The minimum character limit is{" "}
          {additionalFeedback?.length ? additionalFeedback?.length : 0}/
          {charLimit}
        </span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 1H100" stroke="#D7E6E7" />
      </svg>

      <div>
        <div className="flex">
          <label
            style={{ width: "max-content" }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px] mb-3"
          >
            Where do you see opportunities for this agent to improve or further
            strengthen their{" "}
            {selectedFormType?.includes("phone") ||
            selectedFormType?.includes("call")
              ? "call"
              : "ticket"}{" "}
            handling skills?
          </label>
          <span className="text-red-500 ml-2">*</span>
        </div>
        <textarea
          value={improvements}
          onChange={(e) => onUpdate({ improvements: e.target.value })}
          placeholder="Please provide a detailed response"
          rows={3}
          className="w-full px-6 py-2 bg-[#FFFFFF] border border-[#D7E6E7] rounded-[12px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] transition-all duration-200"
        />
        <span
          style={{
            color:
              improvements?.length > charLimit
                ? "#16314380"
                : improvements
                ? "red"
                : "#16314380",
            fontSize: "14px",
          }}
        >
          The minimum character limit is{" "}
          {improvements?.length ? improvements?.length : 0}/{charLimit}
        </span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 1H100" stroke="#D7E6E7" />
      </svg>
      <div>
        <div className="flex">
          <label
            style={{ width: "max-content" }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px] mb-3"
          >
            What recommendations do you have to help this agent continue
            improving and developing their{" "}
            {selectedFormType?.includes("phone") ||
            selectedFormType?.includes("call")
              ? "call"
              : "ticket"}{" "}
            handling skills?
          </label>
          <span className="text-red-500 ml-2">*</span>
        </div>
        <textarea
          value={recommendations}
          onChange={(e) => onUpdate({ recommendations: e.target.value })}
          placeholder="Please provide a detailed response"
          rows={3}
          className="w-full px-6 py-2 bg-[#FFFFFF] border border-[#D7E6E7] rounded-[12px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] transition-all duration-200"
        />
        <span
          style={{
            color:
              recommendations?.length > charLimit
                ? "#16314380"
                : recommendations
                ? "red"
                : "#16314380",
            fontSize: "14px",
          }}
        >
          The minimum character limit is{" "}
          {recommendations?.length ? recommendations?.length : 0}/{charLimit}
        </span>
      </div>
    </div>
  );
}
