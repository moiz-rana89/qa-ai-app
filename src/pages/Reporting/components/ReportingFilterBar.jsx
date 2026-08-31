"use client";

import AntDRangePicker from "../../../components/AntDRangePicker";
import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import ScopeLockChip from "./ScopeLockChip";

const findName = (list, id) =>
  list?.find((item) => String(item.id) === String(id))?.name;

// Shared filter bar for all four Reporting submenus — same five multi-select
// dimensions, the date range, and whichever field the caller's scope locks.
// `filters` is the ONE cached /reporting/filters response, fetched once by
// the shell and passed down to every submenu (never refetched per tab).
export default function ReportingFilterBar({
  filters,
  isLoadingFilters,
  scope,
  dateRangeLabel,
  dateRangeValue,
  onDateRangeChange,
  selectedAgents,
  setSelectedAgents,
  selectedTeamLeads,
  setSelectedTeamLeads,
  selectedOms,
  setSelectedOms,
  selectedClients,
  setSelectedClients,
  selectedCsms,
  setSelectedCsms,
  // Plain strings, not {id, name} objects — AOM names are matched exactly
  // by the backend, so UnifiedDropdown is fed (and returns) the raw
  // strings unchanged. `aomOptions` defaults to filters.aoms but callers
  // scoped to an "internal" view can pass filters.internal.aoms instead.
  aomOptions,
  selectedAoms,
  setSelectedAoms,
  extra,
}) {
  const isTLLocked = scope?.lockedField === "team_lead_id";
  const isOMLocked = scope?.lockedField === "om_id";
  const isCSMLocked = scope?.lockedField === "csm_id";

  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      {dateRangeLabel && (
        <span className="text-[13px] font-medium text-[#7F8A92]">
          {dateRangeLabel}:
        </span>
      )}
      <AntDRangePicker
        value={dateRangeValue}
        onChange={onDateRangeChange}
        startPlaceholder="Start date"
        endPlaceholder="End date"
        className="h-9"
      />
      <UnifiedDropdown
        placeholder="Search agents"
        name="Agent"
        data={filters?.agents || []}
        isLoading={isLoadingFilters}
        selectedList={selectedAgents}
        setselectedList={setSelectedAgents}
        multiSelect={true}
        displayKey="name"
        valueKey="id"
        searchKeys={["name"]}
        className="h-9 border-[#d9d9d9] bg-white"
      />

      {isTLLocked ? (
        <ScopeLockChip
          label="Team Lead"
          name={findName(filters?.teamLeads, scope.lockedValue)}
        />
      ) : (
        <UnifiedDropdown
          placeholder="Search team leads"
          name="Team Lead"
          data={filters?.teamLeads || []}
          isLoading={isLoadingFilters}
          selectedList={selectedTeamLeads}
          setselectedList={setSelectedTeamLeads}
          multiSelect={true}
          displayKey="name"
          valueKey="id"
          searchKeys={["name"]}
          className="h-9 border-[#d9d9d9] bg-white"
        />
      )}

      {isOMLocked ? (
        <ScopeLockChip
          label="OM"
          name={findName(filters?.operationsManagers, scope.lockedValue)}
        />
      ) : (
        <UnifiedDropdown
          placeholder="Search OMs"
          name="OM"
          data={filters?.operationsManagers || []}
          isLoading={isLoadingFilters}
          selectedList={selectedOms}
          setselectedList={setSelectedOms}
          multiSelect={true}
          displayKey="name"
          valueKey="id"
          searchKeys={["name"]}
          className="h-9 border-[#d9d9d9] bg-white"
        />
      )}

      <UnifiedDropdown
        placeholder="Search clients"
        name="Client"
        data={filters?.clients || []}
        isLoading={isLoadingFilters}
        selectedList={selectedClients}
        setselectedList={setSelectedClients}
        multiSelect={true}
        displayKey="name"
        valueKey="id"
        searchKeys={["name"]}
        className="h-9 border-[#d9d9d9] bg-white"
      />

      {isCSMLocked ? (
        <ScopeLockChip
          label="CSM"
          name={findName(filters?.csms, scope.lockedValue)}
        />
      ) : (
        <UnifiedDropdown
          placeholder="Search CSMs"
          name="CSM"
          data={filters?.csms || []}
          isLoading={isLoadingFilters}
          selectedList={selectedCsms}
          setselectedList={setSelectedCsms}
          multiSelect={true}
          displayKey="name"
          valueKey="id"
          searchKeys={["name"]}
          className="h-9 border-[#d9d9d9] bg-white"
        />
      )}

      {setSelectedAoms && (
        <UnifiedDropdown
          placeholder="Search AOMs"
          name="AOM"
          data={aomOptions ?? filters?.aoms ?? []}
          isLoading={isLoadingFilters}
          selectedList={selectedAoms}
          setselectedList={setSelectedAoms}
          multiSelect={true}
          className="h-9 border-[#d9d9d9] bg-white"
        />
      )}

      {extra}
    </div>
  );
}
