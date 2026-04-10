"use client";

import { useEffect, useState } from "react";
import { Select } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import KPICard from "./KPICard";
import ResolveDrawer from "./ResolveDrawer";
import CoachingForm from "./CoachingForm";
import Skeleton from "../../components/Skeleton";
import {
  getPRClients,
  getPRAgents,
  getPRChannels,
  createPerformanceReviewSession,
  getCoachingForm,
} from "../../reduxStore/action/performanceReview";

// Helper: compare metric value to SLA and return "pass" or "fail"
const checkSLA = (actual, slaTarget, higherIsBetter = true) => {
  if (actual == null || slaTarget == null) return null;
  return higherIsBetter
    ? actual >= slaTarget
      ? "pass"
      : "fail"
    : actual <= slaTarget
    ? "pass"
    : "fail";
};

// Helper: format seconds to "Xm Ys"
const fmtTime = (str) => {
  if (!str) return "-";
  return str;
};

// Build KPI cards from session data
function buildKPICards(data) {
  if (!data) return [];
  const sla = data.sla || {};

  return [
    {
      key: "attendance",
      title: "Attendance",
      tooltip: "Tracks agent attendance including on-time, missed, late, and abandoned shifts.",
      metrics: [
        { label: "On-Time", value: `${data.attendance?.on_time ?? 0}/${data.attendance?.total ?? 0}` },
        {
          label: "Missed",
          value: `${data.attendance?.missed ?? 0}/${data.attendance?.total ?? 0}`,
          status: checkSLA(sla.sla_missed, data.attendance?.missed, false) === "pass" ? "pass" : data.attendance?.missed > 0 ? "fail" : "pass",
        },
        {
          label: "Late",
          value: `${data.attendance?.late ?? 0}/${data.attendance?.total ?? 0}`,
          status: data.attendance?.late > 0 ? "fail" : "pass",
        },
        {
          label: "Abandoned",
          value: `${data.attendance?.abandoned ?? 0}/${data.attendance?.total ?? 0}`,
          status: data.attendance?.abandoned > 0 ? "fail" : "pass",
        },
      ],
      showResolve: (data.attendance?.missed > 0 || data.attendance?.late > 0 || data.attendance?.abandoned > 0),
    },
    {
      key: "activity_percentage",
      title: "Activity Percentage",
      tooltip: "Measures agent keyboard and mouse activity levels against SLAs.",
      metrics: [
        {
          label: "Daily SLA",
          status: checkSLA(data.activity?.daily?.keyboard_avg, sla.sla_daily_percentage_keyboard),
          subValues: [
            { icon: "mdi:keyboard-outline", value: `${data.activity?.daily?.keyboard_avg?.toFixed(0) ?? "-"}%` },
            { icon: "mdi:mouse", value: `${data.activity?.daily?.mouse_avg?.toFixed(0) ?? "-"}%` },
          ],
        },
        {
          label: "Weekly SLA",
          status: checkSLA(data.activity?.weekly?.keyboard_avg, sla.sla_weekly_percentage_keyboard),
          subValues: [
            { icon: "mdi:keyboard-outline", value: `${data.activity?.weekly?.keyboard_avg?.toFixed(0) ?? "-"}%` },
            { icon: "mdi:mouse", value: `${data.activity?.weekly?.mouse_avg?.toFixed(0) ?? "-"}%` },
          ],
        },
        {
          label: "Monthly SLA",
          status: checkSLA(data.activity?.monthly?.keyboard_avg, sla.sla_monthly_percentage_keyboard),
          subValues: [
            { icon: "mdi:keyboard-outline", value: `${data.activity?.monthly?.keyboard_avg?.toFixed(0) ?? "-"}%` },
            { icon: "mdi:mouse", value: `${data.activity?.monthly?.mouse_avg?.toFixed(0) ?? "-"}%` },
          ],
        },
      ],
      showResolve:
        checkSLA(data.activity?.daily?.keyboard_avg, sla.sla_daily_percentage_keyboard) === "fail" ||
        checkSLA(data.activity?.weekly?.keyboard_avg, sla.sla_weekly_percentage_keyboard) === "fail" ||
        checkSLA(data.activity?.monthly?.keyboard_avg, sla.sla_monthly_percentage_keyboard) === "fail",
    },
    {
      key: "messages_sent",
      title: "Messages Sent",
      tooltip: "Tracks the number of messages sent against daily, weekly, and monthly targets.",
      metrics: [
        { label: "Daily SLA", value: `${data.messages_sent?.daily?.average?.toFixed(0) ?? "-"} / ${sla.sla_messages_sent_daily ?? "-"}`, status: checkSLA(data.messages_sent?.daily?.average, sla.sla_messages_sent_daily) },
        { label: "Weekly SLA", value: `${data.messages_sent?.weekly?.average?.toFixed(0) ?? "-"} / ${sla.sla_messages_sent_weekly ?? "-"}`, status: checkSLA(data.messages_sent?.weekly?.average, sla.sla_messages_sent_weekly) },
        { label: "Monthly SLA", value: `${data.messages_sent?.monthly?.average?.toFixed(0) ?? "-"} / ${sla.sla_messages_sent_monthly ?? "-"}`, status: checkSLA(data.messages_sent?.monthly?.average, sla.sla_messages_sent_monthly) },
      ],
      showResolve:
        checkSLA(data.messages_sent?.daily?.average, sla.sla_messages_sent_daily) === "fail" ||
        checkSLA(data.messages_sent?.weekly?.average, sla.sla_messages_sent_weekly) === "fail" ||
        checkSLA(data.messages_sent?.monthly?.average, sla.sla_messages_sent_monthly) === "fail",
    },
    {
      key: "tickets_closed",
      title: "Tickets Closed",
      tooltip: "Tracks the number of tickets closed against daily, weekly, and monthly targets.",
      metrics: [
        { label: "Daily SLA", value: `${data.tickets_closed?.daily?.average?.toFixed(0) ?? "-"} / ${sla.sla_tickets_closed_daily ?? "-"}`, status: checkSLA(data.tickets_closed?.daily?.average, sla.sla_tickets_closed_daily) },
        { label: "Weekly SLA", value: `${data.tickets_closed?.weekly?.average?.toFixed(0) ?? "-"} / ${sla.sla_tickets_closed_weekly ?? "-"}`, status: checkSLA(data.tickets_closed?.weekly?.average, sla.sla_tickets_closed_weekly) },
        { label: "Monthly SLA", value: `${data.tickets_closed?.monthly?.average?.toFixed(0) ?? "-"} / ${sla.sla_tickets_closed_monthly ?? "-"}`, status: checkSLA(data.tickets_closed?.monthly?.average, sla.sla_tickets_closed_monthly) },
      ],
      showResolve:
        checkSLA(data.tickets_closed?.daily?.average, sla.sla_tickets_closed_daily) === "fail" ||
        checkSLA(data.tickets_closed?.weekly?.average, sla.sla_tickets_closed_weekly) === "fail" ||
        checkSLA(data.tickets_closed?.monthly?.average, sla.sla_tickets_closed_monthly) === "fail",
    },
    {
      key: "first_response_time",
      title: "First Response Time",
      tooltip: "Average first response time compared to SLA targets.",
      metrics: [
        { label: "Avg. Daily SLA", value: `${fmtTime(data.first_response_time?.daily?.average)} / ${fmtSeconds(sla.sla_first_response)}`, status: checkSLA(data.first_response_time?.daily?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) },
        { label: "Avg. Weekly SLA", value: `${fmtTime(data.first_response_time?.weekly?.average)} / ${fmtSeconds(sla.sla_first_response)}`, status: checkSLA(data.first_response_time?.weekly?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) },
        { label: "Avg. Monthly SLA", value: `${fmtTime(data.first_response_time?.monthly?.average)} / ${fmtSeconds(sla.sla_first_response)}`, status: checkSLA(data.first_response_time?.monthly?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) },
      ],
      showResolve:
        checkSLA(data.first_response_time?.daily?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) === "fail" ||
        checkSLA(data.first_response_time?.weekly?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) === "fail" ||
        checkSLA(data.first_response_time?.monthly?.average_seconds_raw, parseSLATime(sla.sla_first_response), false) === "fail",
    },
    {
      key: "resolution_time",
      title: "Resolution Time",
      tooltip: "Average resolution time compared to SLA targets.",
      metrics: [
        { label: "Avg. Daily SLA", value: `${fmtTime(data.resolution_time?.daily?.average)} / ${fmtSeconds(sla.sla_resolution_time)}`, status: checkSLA(data.resolution_time?.daily?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) },
        { label: "Weekly SLA", value: `${fmtTime(data.resolution_time?.weekly?.average)} / ${fmtSeconds(sla.sla_resolution_time)}`, status: checkSLA(data.resolution_time?.weekly?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) },
        { label: "Monthly SLA", value: `${fmtTime(data.resolution_time?.monthly?.average)} / ${fmtSeconds(sla.sla_resolution_time)}`, status: checkSLA(data.resolution_time?.monthly?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) },
      ],
      showResolve:
        checkSLA(data.resolution_time?.daily?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) === "fail" ||
        checkSLA(data.resolution_time?.weekly?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) === "fail" ||
        checkSLA(data.resolution_time?.monthly?.average_seconds_raw, parseSLATime(sla.sla_resolution_time), false) === "fail",
    },
    {
      key: "qa_score",
      title: "QA Score",
      tooltip: "Quality assurance scores for audited tickets.",
      metrics: [
        { label: "Tickets QA'ed", value: `${data.qa_score?.total_tickets_qaed ?? "-"}`, status: checkSLA(data.qa_score?.total_tickets_qaed, sla.sla_tickets_qad) },
        { label: "Avg. Weekly", value: `${data.qa_score?.weekly_avg_percentage?.toFixed(0) ?? "-"}%`, status: checkSLA(data.qa_score?.weekly_avg_percentage, sla.sla_average_weekly_qa_score) },
        { label: "Avg. Monthly", value: `${data.qa_score?.monthly_avg_percentage?.toFixed(0) ?? "-"}%`, status: checkSLA(data.qa_score?.monthly_avg_percentage, sla.sla_average_monthly_qa_score) },
      ],
      showResolve:
        checkSLA(data.qa_score?.weekly_avg_percentage, sla.sla_average_weekly_qa_score) === "fail" ||
        checkSLA(data.qa_score?.monthly_avg_percentage, sla.sla_average_monthly_qa_score) === "fail",
    },
    {
      key: "ticket_monitoring",
      title: "Ticket Monitoring",
      tooltip: "Ticket monitoring scores and coverage.",
      metrics: [
        { label: "Tickets Monitored", value: `${data.ticket_monitoring?.total_tickets_monitored ?? "-"}`, status: checkSLA(data.ticket_monitoring?.total_tickets_monitored, sla.sla_tickets_monitored) },
        { label: "Avg. Weekly", value: `${data.ticket_monitoring?.weekly_avg_percentage?.toFixed(0) ?? "-"}%`, status: checkSLA(data.ticket_monitoring?.weekly_avg_percentage, sla.sla_tickets_monitored_average_weekly) },
        { label: "Avg. Monthly", value: `${data.ticket_monitoring?.monthly_avg_percentage?.toFixed(0) ?? "-"}%`, status: checkSLA(data.ticket_monitoring?.monthly_avg_percentage, sla.sla_tickets_monitored_average_monthly) },
      ],
      showResolve:
        checkSLA(data.ticket_monitoring?.weekly_avg_percentage, sla.sla_tickets_monitored_average_weekly) === "fail" ||
        checkSLA(data.ticket_monitoring?.monthly_avg_percentage, sla.sla_tickets_monitored_average_monthly) === "fail",
    },
  ];
}

// Parse SLA time to seconds — handles both "MM:SS" strings and raw numbers (seconds)
function parseSLATime(val) {
  if (val == null) return null;
  if (typeof val === "number") return val;
  if (typeof val === "string" && val.includes(":")) {
    const parts = val.split(":");
    if (parts.length !== 2) return null;
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return Number(val) || null;
}

// Format seconds to "Xm Ys" display string
function fmtSeconds(val) {
  if (val == null) return "-";
  const num = typeof val === "number" ? val : parseSLATime(val);
  if (num == null) return String(val);
  const mins = Math.floor(num / 60);
  const secs = num % 60;
  if (mins === 0 && secs === 0) return "0m";
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

// Get failed metrics for resolve drawer
function getFailedMetrics(kpiCard) {
  return (kpiCard?.metrics || []).filter((m) => m.status === "fail");
}

export default function PerformanceReview() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const { isLoading, performanceData, prClients, prAgents, prChannels } =
    useSelector((state) => state.performanceReview);

  // Filter state
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgentData, setSelectedAgentData] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(["all"]);
  const [dateRange, setDateRange] = useState(null);
  const [datePreset, setDatePreset] = useState(null);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);

  // Session state
  const [sessionId, setSessionId] = useState(null);
  const [showKPIs, setShowKPIs] = useState(false);

  // Resolve Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resolveKPI, setResolveKPI] = useState(null);
  const [resolveMetricType, setResolveMetricType] = useState(null);
  const [resolveMissed, setResolveMissed] = useState([]);

  // Coaching form accordion
  const [coachingFormOpen, setCoachingFormOpen] = useState(false);

  // Fetch clients and channels on mount
  useEffect(() => {
    dispatch(getPRClients(setIsLoadingClient));
    dispatch(getPRChannels(setIsLoadingChannels));
  }, []);

  // When client changes, fetch agents for that client
  useEffect(() => {
    if (selectedClient) {
      setSelectedAgent(null);
      setSelectedAgentData(null);
      dispatch(getPRAgents(selectedClient, setIsLoadingAgent));
    }
  }, [selectedClient]);

  const handleAgentChange = (value) => {
    setSelectedAgent(value);
    const agent = prAgents?.find((a) => a.hubstaff_id === value);
    setSelectedAgentData(agent);
  };

  const handleViewPerformance = () => {
    if (!selectedClient) {
      toast.error("Please select a client");
      return;
    }
    if (!selectedAgent || !selectedAgentData) {
      toast.error("Please select an agent");
      return;
    }
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      toast.error("Please select a date range");
      return;
    }

    dispatch(
      createPerformanceReviewSession(
        {
          created_by: userDetails?.owner_id,
          agent_hubstaff_user_id: selectedAgentData.hubstaff_id,
          agent_helpdesk_user_id: selectedAgentData.helpdesk_user_id,
          client_hubstaff_id: selectedClient,
          review_start_date: dateRange[0].format("YYYY-MM-DD"),
          review_end_date: dateRange[1].format("YYYY-MM-DD"),
          channels: selectedChannels,
        },
        (success, data) => {
          if (success && data) {
            setSessionId(data.id);
            setShowKPIs(true);
            dispatch(getCoachingForm(data.id));
          } else {
            toast.error("Error creating performance review session");
          }
        }
      )
    );
  };

  const handleClearFilter = () => {
    setSelectedClient(null);
    setSelectedAgent(null);
    setSelectedAgentData(null);
    setSelectedChannels(["all"]);
    setDateRange(null);
    setDatePreset(null);
    setShowKPIs(false);
    setSessionId(null);
  };

  const openResolveDrawer = (kpiCard) => {
    setResolveKPI(kpiCard.title);
    setResolveMetricType(kpiCard.key);
    setResolveMissed(getFailedMetrics(kpiCard));
    setIsDrawerOpen(true);
  };

  const kpiCards = buildKPICards(performanceData);

  // Build channel options from API
  const channelOptions = (prChannels || []).map((ch) => ({
    label: ch === "all" ? "All" : ch.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: ch,
  }));

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-7 pl-8">
        <span className="text-2xl font-semibold text-[#163143]">
          Performance Review
        </span>
      </div>

      {/* Resolve Drawer */}
      <ResolveDrawer
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        kpiTitle={resolveKPI}
        metricType={resolveMetricType}
        sessionId={sessionId}
        missedMetrics={resolveMissed}
        onSuccess={() => {}}
      />

      {/* Filter Bar */}
      <div className="px-8 pt-5">
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
          <div className="flex items-end gap-4 flex-wrap">
            {/* Client (select first) */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Client<span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder="Select Client"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={prClients?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
                onChange={(v) => setSelectedClient(v)}
                value={selectedClient}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
                loading={isLoadingClient}
              />
            </div>

            {/* Agent (depends on Client) */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Agent<span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder={
                  selectedClient
                    ? "Select Agent"
                    : "Select a client first"
                }
                disabled={!selectedClient}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={prAgents?.map((item) => ({
                  value: item?.hubstaff_id,
                  label: item?.user_name,
                }))}
                onChange={handleAgentChange}
                value={selectedAgent}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
                loading={isLoadingAgent}
              />
            </div>

            {/* Channel */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Channel<span className="text-red-500">*</span>
              </label>
              <Select
                mode="multiple"
                placeholder="Select Channel"
                options={channelOptions}
                onChange={(v) => setSelectedChannels(v)}
                value={selectedChannels}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
                loading={isLoadingChannels}
                maxTagCount="responsive"
              />
            </div>

            {/* Date - preset options only */}
            <div className="min-w-[180px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <Select
                placeholder="Select Period"
                value={datePreset}
                onChange={(val) => {
                  setDatePreset(val);
                  if (val === "daily") {
                    setDateRange([dayjs(), dayjs()]);
                  } else if (val === "weekly") {
                    setDateRange([dayjs().subtract(6, "day"), dayjs()]);
                  } else if (val === "monthly") {
                    setDateRange([dayjs().subtract(29, "day"), dayjs()]);
                  }
                }}
                options={[
                  { label: "Daily", value: "daily" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" },
                ]}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
              />
            </div>

            {/* Clear Filter */}
            {showKPIs && (
              <button
                onClick={handleClearFilter}
                className="px-5 py-[8px] rounded-full text-[14px] font-medium text-[#163143] border border-[#D7E6E7] hover:border-gray-400 transition-all"
              >
                Clear Filter
              </button>
            )}

            {/* View Performance */}
            <button
              onClick={handleViewPerformance}
              className="px-6 py-[8px] rounded-full text-[14px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all"
            >
              View Performance
            </button>
          </div>
        </div>
      </div>

      {/* KPI Content */}
      {isLoading ? (
        <div className="px-8 pt-5">
          <Skeleton className="w-full h-[60vh]" />
        </div>
      ) : showKPIs && kpiCards.length > 0 ? (
        <div className="px-8 pt-5 pb-8 space-y-5">
          {/* Performance Coaching Form Accordion */}
          <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCoachingFormOpen(!coachingFormOpen)}
            >
              <span className="text-[16px] font-semibold text-[#163143]">
                Performance Coaching Form
              </span>
              <span className="text-[13px] text-[#69C920] border border-[#69C920] rounded-full px-3 py-[2px]">
                Required Questions: 0/4
              </span>
              <Icon
                icon="mdi:chevron-down"
                className={`ml-auto text-[24px] text-[#163143] transition-transform ${
                  coachingFormOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {coachingFormOpen && (
              <CoachingForm
                sessionId={sessionId}
                onSaved={() => setCoachingFormOpen(false)}
              />
            )}
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-5">
            {kpiCards.map((kpi) => (
              <KPICard
                key={kpi.key}
                title={kpi.title}
                tooltipText={kpi.tooltip}
                metrics={kpi.metrics}
                showResolve={kpi.showResolve}
                onResolve={() => openResolveDrawer(kpi)}
              />
            ))}
          </div>
        </div>
      ) : (
        !showKPIs && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-[#9CA3AF]">
              <Icon
                icon="mdi:chart-line"
                className="text-[64px] mx-auto mb-4 text-[#D7E6E7]"
              />
              <p className="text-[16px]">
                Select a client and agent, then click "View Performance" to see
                KPI data.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
