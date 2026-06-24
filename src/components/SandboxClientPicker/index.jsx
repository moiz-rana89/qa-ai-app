"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

import { getClientNames } from "../../reduxStore/action/formsManagement";

// Shared single-select client picker used at the top of each Sandbox page.
// Renders a labeled AntD Select bound to value/onChange — keeps the
// per-page wiring to one line.
//
// Props:
//   value     — numeric client_id (or null when nothing picked)
//   onChange  — fn(nextClientId)
//   label     — optional label override
export default function SandboxClientPicker({
  value,
  onChange,
  label = "Client",
}) {
  const dispatch = useDispatch();
  const { clientNames, isLoadingClients } = useSelector(
    (store) => store.formsManagement
  );

  useEffect(() => {
    // Same action already used by Evaluate Tickets / Assign Tickets — Redux
    // caches the result so this is a no-op on the second mount.
    if (!clientNames || clientNames.length === 0) {
      dispatch(getClientNames());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(
    () =>
      (clientNames || []).map((c) => ({
        value: Number(c?.client_id),
        label: c?.client || `Client ${c?.client_id}`,
      })),
    [clientNames]
  );

  return (
    <div className="mx-8 mt-4 bg-white rounded-[16px] border border-[#D7E6E7] p-4 flex items-center gap-3">
      <label className="text-[14px] font-semibold text-[#163143] shrink-0">
        {label}:
      </label>
      <Select
        showSearch
        placeholder="Select a client to load sandbox data"
        value={value ?? undefined}
        onChange={(v) => onChange?.(v)}
        options={options}
        loading={isLoadingClients}
        optionFilterProp="label"
        style={{ minWidth: 280, height: 40 }}
        className="custom-select-forms"
      />
      {value == null && (
        <span className="text-[12px] text-[#7F8A92]">
          Pick a client to load data.
        </span>
      )}
    </div>
  );
}
