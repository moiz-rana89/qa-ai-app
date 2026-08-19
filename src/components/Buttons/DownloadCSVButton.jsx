import { Icon } from "@iconify/react";
import React from "react";

// `loading`/`disabled` are optional and default to off — every existing
// call site omits them and keeps the previous always-clickable behavior.
const DownloadCSVButton = ({ onClick, loading = false, disabled = false }) => {
  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`border-[#d9d9d9] bg-white border px-4 py-2 flex text-sm font-poppins space-x-1 rounded-full items-center align-middle text-main-text ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <Icon
        icon={loading ? "eos-icons:loading" : "material-symbols:download-rounded"}
        color="#69C920"
        fontSize={24}
      />
      <span className="font-medium text-sm font-poppins">
        {loading ? "Exporting…" : "Download CSV"}
      </span>
    </button>
  );
};

export default DownloadCSVButton;
