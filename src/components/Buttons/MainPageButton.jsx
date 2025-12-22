import { Icon } from "@iconify/react";
import React from "react";

const MainPageButton = ({ onClick, buttonTittle, icon }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#D7E6E7] px-4 py-2 flex text-sm font-poppins space-x-1 rounded-full items-center align-middle text-main-text"
    >
      <Icon icon={icon} color="#69C920" fontSize={22} />
      <span className="font-medium ml-1 text-[14px] font-poppins">
        {buttonTittle}
      </span>
    </button>
  );
};

export default MainPageButton;
