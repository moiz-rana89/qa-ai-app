import { Icon } from "@iconify/react";
import { Tooltip } from "antd";

// Generic KPI tile strip, visually modeled on PerformanceReview/KPICard's
// bordered/divided metric-cell layout (not imported directly — that
// component's resolve/status props are specific to that page's workflow
// and don't fit a plain reporting tile).
// tiles: [{ label, value, tooltip? }]
export default function KpiTiles({ title, titleTooltip, tiles = [] }) {
  return (
    <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5 mb-4">
      {title && (
        <div className="flex items-center gap-1 text-[16px] font-semibold text-[#163143] mb-3">
          {title}
          {titleTooltip && (
            <Tooltip title={titleTooltip}>
              <Icon
                icon="mdi:information-outline"
                className="text-[#9CA3AF] cursor-help"
                fontSize={16}
              />
            </Tooltip>
          )}
        </div>
      )}
      <div className="flex flex-wrap border border-[#EBF3F4] rounded-[12px] overflow-hidden">
        {tiles.map((t, i) => (
          <div
            key={t.label}
            className={`flex-1 min-w-[140px] p-4 ${
              i < tiles.length - 1 ? "border-r border-[#EBF3F4]" : ""
            }`}
          >
            <div className="flex items-center gap-1 text-[13px] font-medium text-[#7F8A92] mb-1">
              {t.label}
              {t.tooltip && (
                <Tooltip title={t.tooltip}>
                  <Icon
                    icon="mdi:information-outline"
                    className="text-[#9CA3AF] cursor-help"
                    fontSize={13}
                  />
                </Tooltip>
              )}
            </div>
            <div className="text-[20px] font-semibold text-[#163143]">
              {t.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
