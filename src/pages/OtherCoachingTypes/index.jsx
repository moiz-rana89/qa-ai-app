import React, { useEffect } from "react";

export const OtherCoachingTypes = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 ">
      {/* Header */}
      <div className="flex items-center text-[#163143] min-h-[63px] max-h-[63px] p-5 border-l border-[#EBF3F4] bg-white shadow-[4px_4px_16px_rgba(22,49,67,0.08)]">
        <h1 className="text-[16px] font-semibold">Other Coaching Form</h1>
      </div>

      <div className="flex-1 w-full overflow-hidden mt-[2px] ml-[2px]">
        <div
          data-tf-widget="NLr4spkg"
          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
        ></div>
      </div>
    </div>
  );
};
