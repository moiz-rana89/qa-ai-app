import { Icon } from "@iconify/react";

// Three deliberately distinct empty states (per the spec) — collapsing them
// into one generic "no data" message would make a real bug (e.g. a broken
// filter combination) look identical to an expected empty result.
export default function ReportingEmptyState({ variant, onClearFilters }) {
  if (variant === "blocked") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-[16px] border border-[#D7E6E7]">
        <Icon
          icon="mdi:account-alert-outline"
          className="text-[#9CA3AF] mb-3"
          fontSize={36}
        />
        <div className="text-[14px] text-[#163143] font-medium">
          Your account isn't linked to a team yet
        </div>
        <div className="text-[13px] text-[#7F8A92] mt-1">
          Ask an admin to set this up.
        </div>
      </div>
    );
  }

  if (variant === "filtered") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-[16px] border border-[#D7E6E7]">
        <Icon
          icon="mdi:filter-off-outline"
          className="text-[#9CA3AF] mb-3"
          fontSize={36}
        />
        <div className="text-[14px] text-[#163143] font-medium">
          No results for these filters
        </div>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-3 px-4 py-[6px] rounded-full text-[13px] font-semibold border border-[#D7E6E7] text-[#163143] bg-white hover:bg-[#F1F5F5]"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  // variant === "no-data" (default) — the range simply has no activity.
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-[16px] border border-[#D7E6E7]">
      <Icon
        icon="mdi:calendar-blank-outline"
        className="text-[#9CA3AF] mb-3"
        fontSize={36}
      />
      <div className="text-[14px] text-[#163143] font-medium">
        No activity in this date range.
      </div>
    </div>
  );
}
