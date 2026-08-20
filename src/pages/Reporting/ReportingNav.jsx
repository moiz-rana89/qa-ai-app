"use client";

import { Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// Statuses that mean "not ready yet" — everything else (including "active",
// "available", true, or a missing status) is treated as enabled. Matched by
// substring, case-insensitively, since the exact wording/casing the backend
// uses for this field isn't pinned down by the spec.
const DISABLED_STATUS_HINTS = [
  "disabled",
  "inactive",
  "unavailable",
  "coming",
  "soon",
  "pending",
];

const isDisabledStatus = (status) => {
  if (!status || status === true) return false;
  const s = String(status).toLowerCase();
  return DISABLED_STATUS_HINTS.some((hint) => s.includes(hint));
};

// Left sub-nav for the Reporting page — driven entirely by GET /reporting/nav
// (label/path/status), never hardcoded, so a new submenu or a "coming soon"
// status shows up without a frontend change.
export default function ReportingNav({ submenus }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-[220px] shrink-0 border-r border-[#D7E6E7] pr-4">
      <ul className="space-y-1">
        {submenus.map((item) => {
          const isActive = location.pathname === `/reporting/${item.path}`;
          const isEnabled = !isDisabledStatus(item.status);
          const content = (
            <button
              type="button"
              disabled={!isEnabled}
              onClick={() => isEnabled && navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded-[10px] text-[14px] ${
                isActive
                  ? "bg-[#DBFFDF] text-[#163143] font-semibold"
                  : isEnabled
                  ? "text-[#163143] hover:bg-[#F1F5F5]"
                  : "text-[#9CA3AF] cursor-not-allowed"
              }`}
            >
              {item.label}
            </button>
          );
          return (
            <li key={item.path}>
              {isEnabled ? (
                content
              ) : (
                // Wrapped in a span — a disabled native <button> can block
                // the pointer events antd's Tooltip needs to detect hover.
                <Tooltip title={item.status || "Not available yet"}>
                  <span className="block">{content}</span>
                </Tooltip>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
