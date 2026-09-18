"use client";

import { Segmented, Switch } from "antd";
import { FORM_TYPE_OPTIONS } from "../helpers";

// Shared form_type + include_archived_forms controls, reused by the
// Overview and Clients pages so the two stay in sync when navigating
// between them (Overview's Assigned/Unassigned tiles carry these same
// two values over as query params).
export default function CoverageFiltersBar({
  formType,
  onFormTypeChange,
  includeArchivedForms,
  onIncludeArchivedFormsChange,
  extra,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-3">
      <Segmented
        options={FORM_TYPE_OPTIONS}
        value={formType}
        onChange={onFormTypeChange}
      />
      <div className="flex items-center gap-2">
        <Switch
          checked={includeArchivedForms}
          onChange={onIncludeArchivedFormsChange}
        />
        <span className="text-[13px] text-[#163143]">
          Include archived forms
        </span>
      </div>
      {extra}
    </div>
  );
}
