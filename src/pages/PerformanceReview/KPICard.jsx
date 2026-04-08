"use client";

import { Icon } from "@iconify/react";
import { Tooltip } from "antd";

export default function KPICard({
  title,
  tooltipText,
  metrics = [],
  showResolve = false,
  onResolve,
}) {
  return (
    <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[16px] font-semibold text-[#163143]">
          {title}
        </span>
        {tooltipText && (
          <Tooltip title={tooltipText}>
            <Icon
              icon="mdi:information-outline"
              className="text-[#9CA3AF] text-[18px] cursor-help"
            />
          </Tooltip>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="flex flex-wrap gap-0 border border-[#EBF3F4] rounded-[12px] overflow-hidden">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`flex-1 min-w-[120px] p-3 ${
              index < metrics.length - 1 ? "border-r border-[#EBF3F4]" : ""
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[13px] font-medium text-[#163143]">
                {metric.label}
              </span>
              {metric.status && (
                <Icon
                  icon={
                    metric.status === "pass"
                      ? "mdi:check-circle"
                      : "mdi:close-circle"
                  }
                  className={`text-[16px] ${
                    metric.status === "pass"
                      ? "text-[#69C920]"
                      : "text-[#EF4444]"
                  }`}
                />
              )}
            </div>
            {metric.subValues ? (
              <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
                {metric.subValues.map((sub, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <Icon icon={sub.icon} className="text-[14px]" />
                    {sub.value}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[14px] text-[#163143] font-medium">
                {metric.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Resolve Button */}
      {showResolve && (
        <button
          onClick={onResolve}
          className="mt-4 px-5 py-[6px] rounded-full text-[13px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all"
        >
          Click to Resolve
        </button>
      )}
    </div>
  );
}
