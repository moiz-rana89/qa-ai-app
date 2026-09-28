"use client";

import { Tag } from "antd";

import { getTriageConfig } from "../../reduxStore/action/triage";
import { humanizeMetric } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";

// Renders one config section generically: an array of objects becomes a
// table (columns from whatever keys the rows carry), a plain object
// becomes a key/value list, anything else is shown as-is. The spec
// doesn't pin down the exact shape of every config field (targets,
// clocks, escalationLadder, ...), so this degrades gracefully instead of
// assuming a shape that might not match what the backend actually sends.
function ConfigSection({ title, value }) {
  if (value == null) return null;

  let body;
  if (Array.isArray(value)) {
    if (value.length === 0) {
      body = <span className="text-[#7F8A92] text-[13px]">None.</span>;
    } else if (typeof value[0] === "object") {
      const columns = Object.keys(value[0]).map((key) => ({
        title: humanizeMetric(key),
        dataIndex: key,
        key,
        disableSort: true,
        render: (v) => (Array.isArray(v) ? v.join(", ") : String(v ?? "—")),
      }));
      body = <AntDTable columns={columns} data={value} rowKey={columns[0]?.dataIndex} pagination={false} />;
    } else {
      body = <span className="text-[13px] text-[#163143]">{value.join(", ")}</span>;
    }
  } else if (typeof value === "object") {
    const entries = Object.entries(value);
    body = (
      <div className="grid grid-cols-2 gap-2">
        {entries.map(([k, v]) => (
          <div key={k} className="bg-[#F8FAFA] rounded-[10px] p-2">
            <div className="text-[11px] text-[#7F8A92]">{humanizeMetric(k)}</div>
            <div className="text-[13px] text-[#163143]">
              {Array.isArray(v) ? v.join(", ") : String(v ?? "—")}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    body = <span className="text-[13px] text-[#163143]">{String(value)}</span>;
  }

  return (
    <div className="mb-6">
      <div className="text-[13px] font-semibold text-[#163143] mb-2">{title}</div>
      {body}
    </div>
  );
}

export default function TriageSlaReferencePage() {
  const report = useApiRequest(getTriageConfig, {}, true, []);
  const config = report.data;

  if (report.loading) {
    return <Skeleton className="w-full h-[60vh]" rounded="rounded-[16px]" />;
  }

  const provisionalEntries = Object.entries(config?.provisional || {});

  return (
    <div>
      <div className="mb-1">
        <span className="text-xl font-semibold text-[#163143]">SLA Reference</span>
      </div>
      {config?.slaSource && (
        <div className="text-[12px] text-[#7F8A92] mb-1">
          Source: {config.slaSource}
          {config?.configVersion && <> · Version: {config.configVersion}</>}
        </div>
      )}

      {provisionalEntries.length > 0 && (
        <div className="bg-[#FFF7D8] border border-[#F5E7A8] rounded-[12px] p-3 mb-5">
          <div className="text-[13px] font-semibold text-[#7A5A00] mb-2">
            Unratified rules — targets below aren't final yet
          </div>
          <div className="flex flex-wrap gap-2">
            {provisionalEntries.map(([key]) => (
              <Tag key={key} color="gold">
                {humanizeMetric(key)}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <ConfigSection title="Targets" value={config?.targets} />
      <ConfigSection title="Metric Windows (days)" value={config?.metricWindowDays} />
      <ConfigSection title="Tiers" value={config?.tier} />
      <ConfigSection title="Clocks" value={config?.clocks} />
      <ConfigSection title="Clock Basis" value={config?.clockBasis} />
      <ConfigSection title="Escalation Ladder" value={config?.escalationLadder} />
      <ConfigSection title="Superseded Rules" value={config?.supersededRules} />
    </div>
  );
}
