"use client";

import { Tag } from "antd";

import { getTriageConfig } from "../../reduxStore/action/triage";
import { humanizeMetric } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import Skeleton from "../../components/Skeleton";
import renderGenericValue from "./components/renderGenericValue";

function ConfigSection({ title, value }) {
  if (value == null) return null;
  return (
    <div className="mb-6">
      <div className="text-[13px] font-semibold text-[#163143] mb-2">{title}</div>
      {renderGenericValue(value)}
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
