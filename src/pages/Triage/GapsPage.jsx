"use client";

import { getTriageGaps } from "../../reduxStore/action/triage";
import { formatCount, humanizeMetric } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";

// Screen D — what could NOT be evaluated (token unhealthy, thin hours
// data, not synced, tier defaulted). Framed as "not measured" so an
// empty feed is never read as "all healthy" — this page is the honest
// counterpart to the main queue.
//
// The spec doesn't give an exact row shape for `data[]` here, only the
// `counts` example — columns below are built dynamically from whatever
// keys the rows actually carry, so this renders correctly regardless of
// the exact shape; flag back if a more tailored layout is wanted once
// real data is visible.
export default function TriageGapsPage() {
  const report = useApiRequest(getTriageGaps, {}, true, []);

  const counts = report.data?.counts || {};
  const rows = report.data?.data || [];
  const columns = Object.keys(rows[0] || {}).map((key) => ({
    title: humanizeMetric(key),
    dataIndex: key,
    key,
    disableSort: true,
    render: (v) => (Array.isArray(v) ? v.join(", ") : String(v ?? "—")),
  }));

  return (
    <div>
      <div className="mb-1">
        <span className="text-xl font-semibold text-[#163143]">
          For Engineering — Coverage Gaps
        </span>
      </div>
      <div className="text-[12px] text-[#7F8A92] mb-4">
        These agents/accounts were not measured this run — this is a data-quality
        gap, not a sign everything else is healthy.
        {report.data?.gapDate && <> As of {report.data.gapDate}.</>}
      </div>

      {report.loading ? (
        <Skeleton className="w-full h-[100px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <div className="flex flex-wrap gap-3 mb-5">
          {Object.entries(counts).map(([gapType, count]) => (
            <div
              key={gapType}
              className="flex-1 min-w-[160px] bg-white rounded-[16px] border border-[#D7E6E7] p-4"
            >
              <div className="text-[12px] text-[#7F8A92]">
                {humanizeMetric(gapType)}
              </div>
              <div className="text-[24px] font-semibold text-[#163143]">
                {formatCount(count)}
              </div>
            </div>
          ))}
        </div>
      )}

      {report.loading ? (
        <Skeleton className="w-full h-[40vh]" rounded="rounded-[16px]" />
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          No coverage gaps for this run.
        </div>
      ) : (
        <AntDTable columns={columns} data={rows} rowKey={columns[0]?.dataIndex} pagination={false} />
      )}
    </div>
  );
}
