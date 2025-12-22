"use client";

import React from "react";
import { ConfigProvider, notification } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

let apiHolder;

export const AntDNotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  apiHolder = api;

  return (
    <ConfigProvider
      theme={{
        components: {
          Notification: {
            progressBg: "#69C920", // progress bar color
          },
        },
      }}
    >
      {contextHolder}
      {children}
    </ConfigProvider>
  );
};

/**
 * Generic notification function
 * @param {Object} options
 * @param {"success"|"error"|"info"|"warning"} options.status
 * @param {string} options.title
 * @param {string} options.description
 * @param {number} options.duration
 */
export const AntDNotification = ({
  status = "info",
  title,
  description,
  duration = 4.5,
}) => {
  if (!apiHolder) {
    console.error(
      "Notification API not initialized. Wrap app with AntDNotificationProvider."
    );
    return;
  }

  // Filled icon based on status
  let icon;
  switch (status) {
    case "success":
      icon = <CheckCircleFilled style={{ color: "#69C920", fontSize: 20 }} />;
      break;
    case "error":
      icon = <CloseCircleFilled style={{ color: "#FF3434", fontSize: 20 }} />;
      break;
    case "info":
      icon = <InfoCircleFilled style={{ color: "#69C920", fontSize: 20 }} />;
      break;
    case "warning":
      icon = (
        <ExclamationCircleFilled style={{ color: "#FFC107", fontSize: 20 }} />
      );
      break;
    default:
      icon = null;
  }

  apiHolder.open({
    message: (
      <div style={{ fontWeight: 700, fontSize: "16px", color: "#1C1917" }}>
        {title}
      </div>
    ),
    description: (
      <div style={{ fontSize: "14px", color: "#1C1917", marginTop: "4px" }}>
        {description}
      </div>
    ),
    duration,
    placement: "bottomRight",
    icon,
    style: {
      borderRadius: "6px",
      background: status === "error" ? "#FAA0A0" : "#DBFFDF",
      boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)",
      border: "none",
      padding: "16px 24px",
    },
    showIcon: true,
    showProgress: true, // ✅ ensures progress bar is visible
  });
};
