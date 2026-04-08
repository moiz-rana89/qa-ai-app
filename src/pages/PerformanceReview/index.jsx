"use client";

import { useEffect, useState } from "react";
import { Select, DatePicker, Collapse } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import KPICard from "./KPICard";
import ResolveDrawer from "./ResolveDrawer";
import Skeleton from "../../components/Skeleton";
import { getAgentName } from "../../reduxStore/action/formsManagement";
import { getClientNamesTMF } from "../../reduxStore/action/workforcedashboard";
import { getPerformanceReview } from "../../reduxStore/action/performanceReview";

const CHANNEL_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Email", value: "email" },
  { label: "Chat", value: "chat" },
  { label: "Phone", value: "phone" },
];

// Mock KPI data — replace with API response data
const MOCK_KPI_DATA = {
  attendance: {
    title: "Attendance",
    tooltip: "Tracks agent attendance including on-time, missed, late, and abandoned shifts.",
    metrics: [
      { label: "On-Time", value: "17/26" },
      { label: "Missed", value: "2/26", status: "pass" },
      { label: "Late", value: "6/26", status: "fail" },
      { label: "Abandoned", value: "1/26", status: "pass" },
    ],
    showResolve: true,
  },
  activity: {
    title: "Activity Percentage",
    tooltip: "Measures agent activity levels against daily, weekly, and monthly SLAs.",
    metrics: [
      {
        label: "Daily SLA",
        status: "pass",
        subValues: [
          { icon: "mdi:clock-outline", value: "85%" },
          { icon: "mdi:chart-bar", value: "82%" },
        ],
      },
      {
        label: "Weekly SLA",
        status: "pass",
        subValues: [
          { icon: "mdi:clock-outline", value: "84%" },
          { icon: "mdi:chart-bar", value: "79%" },
        ],
      },
      {
        label: "Monthly SLA",
        status: "pass",
        subValues: [
          { icon: "mdi:clock-outline", value: "81%" },
          { icon: "mdi:chart-bar", value: "76%" },
        ],
      },
    ],
    showResolve: false,
  },
  messagesSent: {
    title: "Messages Sent",
    tooltip: "Tracks the number of messages sent against daily, weekly, and monthly targets.",
    metrics: [
      { label: "Daily SLA", value: "124 / 110", status: "pass" },
      { label: "Weekly SLA", value: "538 / 560", status: "fail" },
      { label: "Monthly SLA", value: "2,312 / 2,200", status: "pass" },
    ],
    showResolve: true,
    missedMetrics: [
      { label: "Daily SLA", value: "98 / 110" },
      { label: "Weekly SLA", value: "538 / 560" },
      { label: "Monthly SLA", value: "2,112 / 2,200" },
    ],
  },
  ticketsClosed: {
    title: "Tickets Closed",
    tooltip: "Tracks the number of tickets closed against daily, weekly, and monthly targets.",
    metrics: [
      { label: "Daily SLA", value: "42 / 40", status: "pass" },
      { label: "Weekly SLA", value: "198 / 200", status: "pass" },
      { label: "Monthly SLA", value: "782 / 800", status: "pass" },
    ],
    showResolve: false,
  },
  firstResponseTime: {
    title: "First Response Time",
    tooltip: "Average first response time compared to SLA targets.",
    metrics: [
      { label: "Avg. Daily SLA", value: "2m 18s / 2m", status: "fail" },
      { label: "Avg. Weekly SLA", value: "2m 11s / 2m", status: "fail" },
      { label: "Avg. Monthly SLA", value: "Avg 2m 06s / 2m", status: "fail" },
    ],
    showResolve: true,
    missedMetrics: [
      { label: "Avg. Daily SLA", value: "2m 18s / 2m" },
      { label: "Avg. Weekly SLA", value: "2m 11s / 2m" },
      { label: "Avg. Monthly SLA", value: "Avg 2m 06s / 2m" },
    ],
  },
  resolutionTime: {
    title: "Resolution Time",
    tooltip: "Average resolution time compared to SLA targets.",
    metrics: [
      { label: "Avg. Daily SLA", value: "15m / 20m", status: "pass" },
      { label: "Weekly SLA", value: "17m / 20m", status: "pass" },
      { label: "Monthly SLA", value: "19m / 20m", status: "pass" },
    ],
    showResolve: false,
  },
  qaScore: {
    title: "QA Score",
    tooltip: "Quality assurance scores for audited tickets.",
    metrics: [
      { label: "Tickets QA'ed", value: "34", status: "pass" },
      { label: "Avg. Weekly", value: "84%", status: "pass" },
      { label: "Avg. Monthly", value: "89%", status: "pass" },
    ],
    showResolve: false,
  },
  ticketMonitoring: {
    title: "Ticket Monitoring",
    tooltip: "Ticket monitoring scores and coverage.",
    metrics: [
      { label: "Tickets Monitored", value: "23", status: "pass" },
      { label: "Avg. Weekly", value: "84%", status: "pass" },
      { label: "Avg. Monthly", value: "89%", status: "pass" },
    ],
    showResolve: false,
  },
};

export default function PerformanceReview() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const { isLoading } = useSelector((state) => state.performanceReview);
  const { clientNameTMF: clientsList } = useSelector(
    (store) => store?.workforcedashboard
  );
  const { agentNames: agentList } = useSelector(
    (store) => store?.formsManagement
  );

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [showKPIs, setShowKPIs] = useState(false);

  // Resolve Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resolveKPI, setResolveKPI] = useState(null);
  const [resolveMissed, setResolveMissed] = useState([]);

  useEffect(() => {
    dispatch(getClientNamesTMF(setIsLoadingClient));
    dispatch(getAgentName(setIsLoadingAgent));
  }, []);

  const handleViewPerformance = () => {
    if (!selectedAgent) {
      toast.error("Please select an agent");
      return;
    }
    if (!selectedClient) {
      toast.error("Please select a client");
      return;
    }

    dispatch(
      getPerformanceReview(
        {
          agent_id: selectedAgent,
          client_id: selectedClient,
          channel: selectedChannel,
          date: selectedDate?.format("YYYY-MM-DD"),
        },
        (success) => {
          if (success) setShowKPIs(true);
        }
      )
    );
  };

  const handleClearFilter = () => {
    setSelectedAgent(null);
    setSelectedClient(null);
    setSelectedChannel("all");
    setSelectedDate(dayjs());
    setShowKPIs(false);
  };

  const openResolveDrawer = (kpiKey) => {
    const kpi = MOCK_KPI_DATA[kpiKey];
    setResolveKPI(kpi?.title);
    setResolveMissed(kpi?.missedMetrics || []);
    setIsDrawerOpen(true);
  };

  const kpiEntries = Object.entries(MOCK_KPI_DATA);

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
        missedMetrics={resolveMissed}
        onSuccess={() => {}}
      />

      {/* Filter Bar */}
      <div className="px-8 pt-5">
        <div className="bg-white rounded-[16px] border border-[#D7E6E7] p-5">
          <div className="flex items-end gap-4 flex-wrap">
            {/* Agent */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Agent<span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder="Select Agent"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={agentList?.map((item) => ({
                  value: item?.user_id,
                  label: item?.user_name,
                }))}
                onChange={(v) => setSelectedAgent(v)}
                value={selectedAgent}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
                loading={isLoadingAgent}
              />
            </div>

            {/* Client */}
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
                options={clientsList?.map((item) => ({
                  value: item?.client_id,
                  label: item?.client,
                }))}
                onChange={(v) => setSelectedClient(v)}
                value={selectedClient}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
                loading={isLoadingClient}
              />
            </div>

            {/* Channel */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Channel<span className="text-red-500">*</span>
              </label>
              <Select
                options={CHANNEL_OPTIONS}
                onChange={(v) => setSelectedChannel(v)}
                value={selectedChannel}
                className="w-full custom-select-forms"
                popupClassName="custom-select-dropdown"
                style={{ height: "40px" }}
              />
            </div>

            {/* Date */}
            <div className="min-w-[160px]">
              <label className="block text-[13px] font-semibold text-[#163143] mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <DatePicker
                value={selectedDate}
                onChange={(d) => setSelectedDate(d)}
                className="w-full schedule-date-picker"
                style={{
                  height: "40px",
                  borderRadius: "24px",
                  border: "1px solid #D7E6E7",
                }}
                format="M/D/YYYY"
                suffixIcon={
                  <Icon
                    icon="mdi:calendar-outline"
                    className="text-[#69C920] text-[18px]"
                  />
                }
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
      ) : showKPIs ? (
        <div className="px-8 pt-5 pb-8 space-y-5">
          {/* Performance Coaching Form Accordion */}
          <Collapse
            className="bg-white rounded-[16px] border border-[#D7E6E7]"
            expandIconPosition="end"
            items={[
              {
                key: "1",
                label: (
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] font-semibold text-[#163143]">
                      Performance Coaching Form
                    </span>
                    <span className="text-[13px] text-[#6B7280] border border-[#D7E6E7] rounded-full px-3 py-[2px]">
                      Required Questions: 0/4
                    </span>
                  </div>
                ),
                children: (
                  <div className="text-[14px] text-[#6B7280]">
                    Performance coaching form content will be loaded here based
                    on API integration.
                  </div>
                ),
              },
            ]}
          />

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-5">
            {kpiEntries.map(([key, kpi]) => (
              <KPICard
                key={key}
                title={kpi.title}
                tooltipText={kpi.tooltip}
                metrics={kpi.metrics}
                showResolve={kpi.showResolve}
                onResolve={() => openResolveDrawer(key)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-[#9CA3AF]">
            <Icon
              icon="mdi:chart-line"
              className="text-[64px] mx-auto mb-4 text-[#D7E6E7]"
            />
            <p className="text-[16px]">
              Select an agent and click "View Performance" to see KPI data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
