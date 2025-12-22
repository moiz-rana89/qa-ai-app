import React from "react";
import { Tabs } from "antd";

/**
 * Generic Tabs Component
 *
 * @param {Array} items - Array of tab objects: [{ key, label, icon, content }]
 * @param {string} defaultActiveKey - Default selected tab
 * @param {string} activeKey - (optional) Controlled active tab
 * @param {function} onChange - Callback when tab changes
 * @param {ReactNode} extra - Element to show at top-right section of tabs
 */

const GenericAntdTabs = ({
  items = [],
  defaultActiveKey,
  activeKey,
  onChange,
  extra,
}) => {
  const formattedItems = items.map((tab) => ({
    key: tab.key,
    label: (
      <span className="flex items-center text-[16px] font-semibold">
        {tab.icon && <tab.icon size={16} />}
        {tab.label}
      </span>
    ),
    children: tab.content,
  }));

  return (
    <Tabs
      items={formattedItems}
      defaultActiveKey={defaultActiveKey}
      activeKey={activeKey}
      onChange={onChange}
      tabBarExtraContent={extra}
      //   type="card"
    />
  );
};

export default GenericAntdTabs;
