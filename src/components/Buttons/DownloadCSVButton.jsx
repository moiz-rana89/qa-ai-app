import { Icon } from "@iconify/react";
import React from "react";

const DownloadCSVButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border-[#d9d9d9] bg-white border px-4 py-2 flex text-sm font-poppins space-x-1 rounded-full items-center align-middle text-main-text"
    >
      <Icon
        icon="material-symbols:download-rounded"
        color="#69C920"
        fontSize={24}
      />
      <span className="font-medium text-sm font-poppins">Download CSV</span>
    </button>
  );
};

export default DownloadCSVButton;
