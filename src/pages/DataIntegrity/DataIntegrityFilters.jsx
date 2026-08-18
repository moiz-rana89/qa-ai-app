"use client";

import { Icon } from "@iconify/react";
import { Input } from "antd";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";

// Shared filter bar for both Roster and Issues tabs — same filter set,
// same /filters response, just wired to whichever tab's local state.
export default function DataIntegrityFilters({
  filters,
  isLoadingFilters,
  searchInput,
  setSearchInput,
  selectedTL,
  setSelectedTL,
  selectedOM,
  setSelectedOM,
  selectedCSM,
  setSelectedCSM,
  selectedClient,
  setSelectedClient,
  selectedMissingField,
  setSelectedMissingField,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      <Input
        placeholder="Search agent, email, client, ticket…"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        allowClear
        prefix={
          <Icon
            icon="material-symbols:search-rounded"
            className="text-[#69C920]"
            fontSize={16}
          />
        }
        style={{
          height: 36,
          borderRadius: 32,
          width: 260,
          background: "white",
          borderColor: "#d9d9d9",
        }}
      />
      <UnifiedDropdown
        placeholder="Search team leads"
        name="Team Lead"
        data={filters?.team_leads || []}
        isLoading={isLoadingFilters}
        selectedList={selectedTL}
        setselectedList={setSelectedTL}
        displayKey="name"
        valueKey="id"
        searchKeys={["name"]}
        className="h-9 border-[#d9d9d9] bg-white"
      />
      <UnifiedDropdown
        placeholder="Search OMs"
        name="OM"
        data={filters?.operations_managers || []}
        isLoading={isLoadingFilters}
        selectedList={selectedOM}
        setselectedList={setSelectedOM}
        displayKey="name"
        valueKey="id"
        searchKeys={["name"]}
        className="h-9 border-[#d9d9d9] bg-white"
      />
      <UnifiedDropdown
        placeholder="Search CSMs"
        name="CSM"
        data={filters?.csms || []}
        isLoading={isLoadingFilters}
        selectedList={selectedCSM}
        setselectedList={setSelectedCSM}
        displayKey="name"
        valueKey="id"
        searchKeys={["name"]}
        className="h-9 border-[#d9d9d9] bg-white"
      />
      <UnifiedDropdown
        placeholder="Search clients"
        name="Client"
        data={filters?.clients || []}
        isLoading={isLoadingFilters}
        selectedList={selectedClient}
        setselectedList={setSelectedClient}
        className="h-9 border-[#d9d9d9] bg-white"
      />
      <UnifiedDropdown
        placeholder="Missing field"
        name="Missing Field"
        data={filters?.missing_fields || []}
        isLoading={isLoadingFilters}
        selectedList={selectedMissingField}
        setselectedList={setSelectedMissingField}
        className="h-9 border-[#d9d9d9] bg-white"
      />
    </div>
  );
}
