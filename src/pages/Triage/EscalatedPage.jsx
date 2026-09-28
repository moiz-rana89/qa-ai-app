"use client";

import { useState } from "react";
import { Tag } from "antd";

import { getTriageEscalated } from "../../reduxStore/action/triage";
import { escalationLevelLabel, formatCount, signalLabel } from "./helpers";
import useApiRequest from "./hooks/useApiRequest";
import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";

// Screen C — flags that went cold (escalated past the TL), plus rollups
// by team lead and by client. Deliberately not the raw firehose — just
// what needs an OM's attention.
export default function TriageEscalatedPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);

  const report = useApiRequest(getTriageEscalated, { page, size }, true, [page, size]);

  const rows = report.data?.data || [];
  const byTeamLead = report.data?.byTeamLead || [];
  const byClient = report.data?.byClient || [];

  const columns = [
    {
      title: "Signal",
      dataIndex: "signal",
      key: "signal",
      disableSort: true,
      render: (v) => <Tag>{signalLabel(v)}</Tag>,
    },
    { title: "Title", dataIndex: "title", key: "title", disableSort: true },
    { title: "Client", dataIndex: "client_name", key: "client_name", disableSort: true },
    { title: "Agent", dataIndex: "agent_name", key: "agent_name", disableSort: true },
    {
      title: "Team Lead",
      dataIndex: "team_lead",
      key: "team_lead",
      disableSort: true,
      render: (v) => v || <span className="text-[#7F8A92]">—</span>,
    },
    {
      title: "Escalation",
      dataIndex: "escalation_level",
      key: "escalation_level",
      disableSort: true,
      render: (v) => <Tag color="red">{escalationLevelLabel(v)}</Tag>,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <span className="text-xl font-semibold text-[#163143]">
          OM Portfolio — Escalated
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[13px] font-semibold text-[#163143] mb-2">
            By Team Lead
          </div>
          {byTeamLead.length === 0 ? (
            <span className="text-[#7F8A92] text-[13px]">No escalations.</span>
          ) : (
            <div className="space-y-1">
              {byTeamLead.map((row, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#163143]">
                    {row.team_lead || row.name}
                  </span>
                  <span className="font-semibold text-[#163143]">
                    {formatCount(row.count ?? row.escalated)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-4">
          <div className="text-[13px] font-semibold text-[#163143] mb-2">
            By Client
          </div>
          {byClient.length === 0 ? (
            <span className="text-[#7F8A92] text-[13px]">No escalations.</span>
          ) : (
            <div className="space-y-1">
              {byClient.map((row, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#163143]">
                    {row.client_name || row.name}
                  </span>
                  <span className="font-semibold text-[#163143]">
                    {formatCount(row.count ?? row.escalated)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {report.loading ? (
        <Skeleton className="w-full h-[40vh]" rounded="rounded-[16px]" />
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-8 text-center text-[#7F8A92]">
          Nothing escalated.
        </div>
      ) : (
        <AntDTable
          columns={columns}
          data={rows}
          rowKey="id"
          pagination={true}
          current={report.data?.pagination?.currentPage || page}
          pageSize={report.data?.pagination?.pageSize || size}
          total={report.data?.pagination?.totalRecords || 0}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setSize(s);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
