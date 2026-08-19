"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AntDTable from "../../../components/AntDTable";
import DownloadCSVButton from "../../../components/Buttons/DownloadCSVButton";
import { extractApiError } from "../../../utils/helperFunctions";
import {
  downloadBlob,
  parseContentDispositionFilename,
} from "../../../utils/reportingHelpers";

// Thin wrapper around the shared AntDTable adding: a visible table title
// (doubles as an accessible label), an aria-live result-count announcer so
// screen-reader users hear when a filter change changes the row count, and
// a CSV export button wired to re-run the same request with csv:true.
//
// `fetchCsv(handleResponse)` — caller-provided; re-dispatches the exact same
// report thunk with { csv: true } and no pagination, so the export always
// matches the filters/sort on screen. Omit it to hide the export button
// (e.g. Hub Desk's unsupportedClients note isn't a table).
export default function ReportingTable({
  caption,
  columns,
  data,
  loading,
  rowKey,
  pagination = true,
  current,
  pageSize,
  total,
  sorting,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  fetchCsv,
  csvFilenameFallback = "report.csv",
}) {
  const [csvLoading, setCsvLoading] = useState(false);

  const liveRegionText = loading
    ? "Loading results…"
    : `${total ?? 0} results${caption ? ` for ${caption}` : ""}`;

  const handleExport = () => {
    if (!fetchCsv) return;
    setCsvLoading(true);
    fetchCsv((success, result) => {
      setCsvLoading(false);
      if (!success) {
        toast.error(extractApiError(result, "Failed to export CSV."));
        return;
      }
      const filename = parseContentDispositionFilename(
        result?.headers,
        csvFilenameFallback
      );
      downloadBlob(result.blob, filename);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        {caption && (
          <h2 className="text-[14px] font-semibold text-[#163143]">
            {caption}
          </h2>
        )}
        {fetchCsv && (
          <DownloadCSVButton onClick={handleExport} loading={csvLoading} />
        )}
      </div>
      <div aria-live="polite" className="sr-only">
        {liveRegionText}
      </div>
      <AntDTable
        columns={columns}
        data={data}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        current={current}
        pageSize={pageSize}
        total={total}
        sorting={sorting}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortChange={onSortChange}
      />
    </div>
  );
}
