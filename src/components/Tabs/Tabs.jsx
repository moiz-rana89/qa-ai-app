import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
const Tabs = ({ children, setCurrntActiveTab }) => {
  const [activeTab, setActiveTab] = useState(children[0].props["data-label"]);

  const currentpage = useLocation().pathname;

  useEffect(() => {
    setActiveTab(children[0].props["data-label"]);
    setCurrntActiveTab(children[0].props["data-label"]);
  }, [currentpage]);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
    setCurrntActiveTab(newActiveTab);
  };

  return (
    <div className="w-full text-[16px] flex flex-col space-y-2 text-main-text ">
      <div className="flex border-b-1 border-[#d9d9d9] border-opacity-50">
        {children.map((child) => (
          <button
            key={child.props["data-label"]}
            className={`${
              activeTab === child.props["data-label"]
                ? " bg-[#D0F7D8] rounded-t-md  font-semibold"
                : child.props["data-label"] == "Pending Manual Review"
                ? " bg-[#FFF7D8] font-medium"
                : "font-medium"
            } flex space-x-4 p-4 text-main-text`}
            onClick={(e) => handleClick(e, child.props["data-label"])}
          >
            {child.props["data-label"]}
          </button>
        ))}
      </div>
      <div className="">
        {children.map((child) => {
          if (child.props["data-label"] === activeTab) {
            return (
              <div key={child.props["data-label"]}>{child.props.children}</div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ labelData, children }) => {
  return (
    <div data-label={labelData} className="hidden">
      {children}
    </div>
  );
};
export { Tabs, Tab };
