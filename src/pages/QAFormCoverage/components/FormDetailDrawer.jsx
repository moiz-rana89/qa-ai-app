"use client";

import { Drawer, Tag, Progress, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import { getFormStats } from "../../../reduxStore/action/qaFormCoverage";
import { formatDateTimeEnglish } from "../../../utils/helperFunctions";
import { formatCount, formatPct } from "../helpers";
import useApiRequest from "../hooks/useApiRequest";
import AntDTable from "../../../components/AntDTable";
import Skeleton from "../../../components/Skeleton";

// Read-only "view details" side drawer for a single form — opened via the
// eye icon on the client-count / grading-throughput tables instead of
// navigating to the full form-detail page. Endpoint 6 already combines
// the client list and grading stats in one call, so this drawer and the
// standalone /qa-form-coverage/forms/:formId page both just call it.
export default function FormDetailDrawer({ formId, open, onClose }) {
  const report = useApiRequest(
    getFormStats,
    { form_id: formId },
    open && !!formId,
    [formId, open]
  );

  const form = report.data;
  const notFound = form?.error;

  return (
    <Drawer
      title={notFound ? "Form Not Found" : form?.form_name || "Form Details"}
      open={open}
      onClose={onClose}
      width={640}
    >
      {/* .ant-drawer-body is globally forced to padding: 0 !important
          (src/index.css) — a plain non-!important Tailwind override on
          the body itself can never win that fight, so the padding lives
          on this wrapper div instead, one level inside the body. */}
      <div className="px-6 py-6">
      {report.loading ? (
        <Skeleton className="w-full h-[60vh]" rounded="rounded-[16px]" />
      ) : notFound || report.error ? (
        <div className="bg-[#F8FAFA] rounded-[16px] border border-[#D7E6E7] p-6 text-center text-[#7F8A92]">
          {notFound
            ? `Form not found (id: ${form.form_id}).`
            : "Failed to load this form's stats."}
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag>{form?.form_type}</Tag>
            <Tag color={form?.is_enabled ? "green" : "default"}>
              {form?.is_enabled ? "Enabled" : "Disabled"}
            </Tag>
            <Tag color={form?.is_archived ? "orange" : "default"}>
              {form?.is_archived ? "Archived" : "Active"}
            </Tag>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3">
              <div className="text-[12px] text-[#7F8A92]">Clients Assigned</div>
              <div className="text-[20px] font-semibold text-[#163143]">
                {formatCount(form?.client_count)}
              </div>
            </div>
            <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3">
              <div className="text-[12px] text-[#7F8A92]">Graded</div>
              <div className="text-[20px] font-semibold text-[#163143]">
                {formatCount(form?.graded_count)}
              </div>
            </div>
            <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3">
              <div className="text-[12px] text-[#7F8A92]">Ungraded</div>
              <div className="text-[20px] font-semibold text-[#163143]">
                {formatCount(form?.ungraded_count)}
              </div>
            </div>
            <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3">
              <div className="text-[12px] text-[#7F8A92]">Total Tickets</div>
              <div className="text-[20px] font-semibold text-[#163143]">
                {formatCount(form?.total_count)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3 mb-5">
            <div className="text-[12px] text-[#7F8A92] flex items-center justify-between mb-1">
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

          <div className="text-[13px] font-semibold text-[#163143] mb-3">
            Assigned Clients ({formatCount(form?.client_count)})
          </div>
          <div className="bg-white rounded-[12px] border border-[#D7E6E7] p-3">
            <div className="max-h-[320px] overflow-y-auto">
              <AntDTable
                columns={[
                  {
                    title: "Client ID",
                    dataIndex: "client_id",
                    key: "client_id",
                    disableSort: true,
                  },
                  {
                    title: "Client Name",
                    dataIndex: "client_name",
                    key: "client_name",
                    disableSort: true,
                  },
                ]}
                data={form?.clients || []}
                rowKey="client_id"
                pagination={false}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </Drawer>
  );
}
