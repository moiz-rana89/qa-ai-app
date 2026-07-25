"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { Tooltip } from "antd";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import { getEndorsementHubspotProperties } from "../../reduxStore/action/endorsementReport";

export default function HubspotPropertiesSection({ filters, filtersVersion }) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const agentIds = filters.agent_id || [];
  const hasAgents = agentIds.length > 0;

  const fetchData = () => {
    // Skip the very first render — wait until the user has clicked
    // Apply Filters at least once (parent bumps filtersVersion to >= 1).
    if (filtersVersion === 0) return;

    if (!hasAgents) {
      setRows([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    dispatch(
      getEndorsementHubspotProperties(
        { agent_id: agentIds },
        (success, data) => {
          if (success) {
            setRows(data?.data || []);
          } else {
            setError(
              data?.data?.detail ||
                data?.message ||
                "Failed to load HubSpot properties."
            );
            setRows([]);
          }
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersVersion]);

  const columns = [
    {
      title: "Agent",
      dataIndex: "user_name",
      key: "user_name",
      width: 200,
      disableSort: true,
    },
    {
      title: "HubSpot Contact ID",
      dataIndex: "hubspot_contact_id",
      key: "hubspot_contact_id",
      width: 200,
      disableSort: true,
      render: (v) => (
        <span className="font-mono text-[13px] text-[#163143]">
          {v || "—"}
        </span>
      ),
    },
    {
      title: "Workforce Attendance Points",
      dataIndex: "workforce_attendance_points",
      key: "workforce_attendance_points",
      width: 200,
      align: "center",
      disableSort: true,
      render: (v) => (
        <span className="font-semibold text-[#163143] tabular-nums">
          {v != null && v !== "" ? v : "—"}
        </span>
      ),
    },
    {
      title: "Average Grade (APR Score)",
      dataIndex: "average_grade_apr_score",
      key: "average_grade_apr_score",
      width: 200,
      align: "center",
      disableSort: true,
      render: (v) => (
        <span className="font-semibold text-[#163143] tabular-nums">
          {v != null && v !== "" ? v : "—"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "error",
      key: "status",
      width: 120,
      align: "center",
      disableSort: true,
      render: (errMsg) =>
        errMsg ? (
          <Tooltip title={errMsg} placement="left">
            <span className="inline-flex items-center gap-1 px-3 py-[4px] rounded-full text-[12px] font-semibold bg-[#FDE8E8] text-[#C81E1E] cursor-help">
              <Icon icon="mdi:alert-circle-outline" /> Error
            </span>
          </Tooltip>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-[4px] rounded-full text-[12px] font-semibold bg-[#E4FAED] text-[#1F8B3F]">
            <Icon icon="mdi:check-circle-outline" /> OK
          </span>
        ),
    },
  ];

  return (
    <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-6 mt-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#163143] text-[18px] font-semibold">
          HubSpot Properties
        </h2>
        <span className="text-[#7F8A92] text-[13px]">
          {loading
            ? "Loading…"
            : hasAgents
            ? `${rows.length} agent(s)`
            : ""}
        </span>
      </div>

      {filtersVersion === 0 ? (
        <div className="text-center py-16 text-[#7F8A92]">
          <Icon
            icon="mdi:filter-outline"
            className="text-[40px] mx-auto mb-2"
          />
          <div className="text-[14px]">
            Apply filters (with at least one agent selected) to load HubSpot data.
          </div>
        </div>
      ) : !hasAgents ? (
        <div className="text-center py-16 text-[#7F8A92]">
          <Icon
            icon="mdi:account-multiple-outline"
            className="text-[40px] mx-auto mb-2"
          />
          <div className="text-[14px]">
            Select one or more agents to view HubSpot data.
          </div>
        </div>
      ) : error ? (
        <div className="bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[12px] px-4 py-3 text-[13px] flex items-center justify-between mb-4">
          <span>{error}</span>
          <button
            onClick={fetchData}
            className="ml-3 inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold text-white bg-[#DC2626] hover:bg-[#b91c1c]"
          >
            <Icon icon="mdi:refresh" /> Retry
          </button>
        </div>
      ) : loading ? (
        <Skeleton className="w-full h-[200px]" />
      ) : rows.length > 0 ? (
        <AntDTable
          columns={columns}
          data={rows}
          rowKey={(r) => `${r.user_id}`}
          bordered
          pagination={false}
          sorting={{ sort_by: null, sort_order: null }}
        />
      ) : (
        <div className="text-center py-16 text-[#7F8A92]">
          No HubSpot data returned.
        </div>
      )}
    </div>
  );
}
