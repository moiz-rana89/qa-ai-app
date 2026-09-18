"use client";

import { useNavigate, useParams } from "react-router-dom";
import { Tag, Progress, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import { getFormStats } from "../../reduxStore/action/qaFormCoverage";
import { formatDateTimeEnglish } from "../../utils/helperFunctions";
import { formatCount, formatPct } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";

export default function QAFormDetail() {
  const navigate = useNavigate();
  const { formId } = useParams();

  const report = useApiRequest(
    getFormStats,
    { form_id: formId },
    !!formId,
    [formId]
  );

  const backLink = (
    <button
      type="button"
      onClick={() => navigate("/qa-form-coverage")}
      className="inline-flex items-center gap-1 text-[13px] text-[#7F8A92] hover:text-[#163143]"
    >
      <Icon icon="mdi:arrow-left" fontSize={16} />
      Overview
    </button>
  );

  if (report.loading) {
    return (
      <div>
        <div className="mb-2">{backLink}</div>
        <Skeleton className="w-full h-[60vh]" rounded="rounded-[16px]" />
      </div>
    );
  }

  // Endpoint 6 returns 200 OK with an `error` key for a missing form —
  // not a 404 — so this must be checked in the body, not the HTTP status.
  if (report.error || report.data?.error) {
    return (
      <div>
        <div className="mb-2">{backLink}</div>
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          {report.data?.error
            ? `Form not found (id: ${report.data.form_id}).`
            : "Failed to load this form's stats."}
        </div>
      </div>
    );
  }

  const form = report.data;
  const clientColumns = [
    { title: "Client ID", dataIndex: "client_id", key: "client_id", disableSort: true },
    { title: "Client Name", dataIndex: "client_name", key: "client_name", disableSort: true },
  ];

  return (
    <div>
      <div className="mb-2">{backLink}</div>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl font-semibold text-[#163143]">
          {form?.form_name}
        </span>
        <Tag>{form?.form_type}</Tag>
        <Tag color={form?.is_enabled ? "green" : "default"}>
          {form?.is_enabled ? "Enabled" : "Disabled"}
        </Tag>
        <Tag color={form?.is_archived ? "orange" : "default"}>
          {form?.is_archived ? "Archived" : "Active"}
        </Tag>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[160px] bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[12px] text-[#7F8A92]">Clients Assigned</div>
          <div className="text-[24px] font-semibold text-[#163143]">
            {formatCount(form?.client_count)}
          </div>
        </div>
        <div className="flex-1 min-w-[160px] bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[12px] text-[#7F8A92]">Graded</div>
          <div className="text-[24px] font-semibold text-[#163143]">
            {formatCount(form?.graded_count)}
          </div>
        </div>
        <div className="flex-1 min-w-[160px] bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[12px] text-[#7F8A92]">Ungraded</div>
          <div className="text-[24px] font-semibold text-[#163143]">
            {formatCount(form?.ungraded_count)}
          </div>
        </div>
        <div className="flex-1 min-w-[220px] bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[12px] text-[#7F8A92] flex items-center justify-between">
            <span>% Graded ({formatPct(form?.pct_graded)})</span>
            {form?.stats_refreshed_at && (
              <Tooltip title="This throughput data comes from a periodically-refreshed snapshot, not a live query.">
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:clock-outline" fontSize={13} />
                  {formatDateTimeEnglish(form.stats_refreshed_at)}
                </span>
              </Tooltip>
            )}
          </div>
          <Progress percent={form?.pct_graded ?? 0} />
        </div>
      </div>

      <div className="text-[13px] font-semibold text-[#163143] mb-2">
        Assigned Clients ({formatCount(form?.client_count)})
      </div>
      {/* clients comes back in full (not paginated) — scroll rather than
          assume it's always a short list. */}
      <div className="max-h-[420px] overflow-y-auto">
        <AntDTable
          columns={clientColumns}
          data={form?.clients || []}
          rowKey="client_id"
          pagination={false}
        />
      </div>
    </div>
  );
}
