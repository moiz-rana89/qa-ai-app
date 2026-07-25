"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import AntDRangePicker from "../../components/AntDRangePicker";
import { Tab, Tabs } from "../../components/Tabs/Tabs";
import {
  getEndorsementAgents,
  getEndorsementClients,
  getEndorsementTeamLeads,
  getEndorsementCsms,
  getEndorsementOms,
  getEndorsementSeniorCsms,
} from "../../reduxStore/action/endorsementReport";

import AttendanceOverviewSection from "./AttendanceOverviewSection";
import ActivityOverviewSection from "./ActivityOverviewSection";

export default function EndorsementReport() {
  const dispatch = useDispatch();

  // ── Dropdown source data ────────────────────────────────────────────────
  const [agentOpts, setAgentOpts] = useState([]);
  const [clientOpts, setClientOpts] = useState([]);
  const [tlOpts, setTlOpts] = useState([]);
  const [csmOpts, setCsmOpts] = useState([]);
  const [omOpts, setOmOpts] = useState([]);
  const [seniorCsmOpts, setSeniorCsmOpts] = useState([]);

  const [loadingAgents, setLoadingAgents] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingTls, setLoadingTls] = useState(false);
  const [loadingCsms, setLoadingCsms] = useState(false);
  const [loadingOms, setLoadingOms] = useState(false);
  const [loadingSeniorCsms, setLoadingSeniorCsms] = useState(false);

  // ── Live filter selections (no Apply button — matches attendance) ──────
  const [agentsFilter, setAgentsFilter] = useState();
  const [clientsFilter, setClientsFilter] = useState();
  const [tlsFilter, setTlsFilter] = useState();
  const [csmsFilter, setCsmsFilter] = useState();
  const [omsFilter, setOmsFilter] = useState();
  const [seniorCsmsFilter, setSeniorCsmsFilter] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Active tab — tracked at parent level so filter changes apply to whichever
  // tab is visible without losing tab selection.
  const [activeTab, setActiveTab] = useState("Attendance Overview");

  // ── Load all dropdowns once on mount ────────────────────────────────────
  useEffect(() => {
    setLoadingAgents(true);
    setLoadingClients(true);
    setLoadingTls(true);
    setLoadingCsms(true);
    setLoadingOms(true);
    setLoadingSeniorCsms(true);

    dispatch(
      getEndorsementAgents((ok, d) => {
        if (ok) setAgentOpts(d || []);
        setLoadingAgents(false);
      })
    );
    dispatch(
      getEndorsementClients((ok, d) => {
        if (ok) setClientOpts(d || []);
        setLoadingClients(false);
      })
    );
    dispatch(
      getEndorsementTeamLeads((ok, d) => {
        if (ok) setTlOpts(d || []);
        setLoadingTls(false);
      })
    );
    dispatch(
      getEndorsementCsms((ok, d) => {
        if (ok) setCsmOpts(d || []);
        setLoadingCsms(false);
      })
    );
    dispatch(
      getEndorsementOms((ok, d) => {
        if (ok) setOmOpts(d || []);
        setLoadingOms(false);
      })
    );
    dispatch(
      getEndorsementSeniorCsms((ok, d) => {
        if (ok) setSeniorCsmOpts(d || []);
        setLoadingSeniorCsms(false);
      })
    );
  }, [dispatch]);

  const onChangeDate = (date) => {
    setStartDate(date?.[0] || null);
    setEndDate(date?.[1] || null);
  };

  // Build the API filter object once per render. Sections watch this object
  // (via JSON.stringify) and refetch whenever any filter or date changes.
  const filters = {
    agent_id: agentsFilter?.map((a) => a.user_id),
    client_id: clientsFilter?.map((c) => c.client_id),
    tl_id: tlsFilter?.map((t) => t.teamlead_id),
    csm_id: csmsFilter?.map((c) => c.csm_id),
    om_id: omsFilter?.map((o) => o.operations_manager_id),
    senior_csm_id: seniorCsmsFilter?.map((s) => s.senior_csm_id),
    startdate: startDate,
    enddate: endDate,
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header — title only (matches attendance page pattern) */}
      <div className="pt-7 flex items-center pl-8">
        <span className="text-2xl font-semibold">Endorsement Report</span>
      </div>

      {/* Inline "Filters:" row — live filtering, no Apply/Clear buttons */}
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <AntDRangePicker
              onChange={onChangeDate}
              startPlaceholder="Start Date"
              endPlaceholder="End Date"
            />
            <UnifiedDropdown
              name="Clients"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={clientOpts}
              isLoading={loadingClients}
              selectedList={clientsFilter}
              setselectedList={setClientsFilter}
              multiSelect={true}
              displayKey="client"
              valueKey="client_id"
              searchKeys={["client"]}
            />
            <UnifiedDropdown
              name="Agents"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={agentOpts}
              isLoading={loadingAgents}
              selectedList={agentsFilter}
              setselectedList={setAgentsFilter}
              multiSelect={true}
              displayKey="user_name"
              valueKey="user_id"
              searchKeys={["user_name"]}
            />
            <UnifiedDropdown
              name="Team Leads"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={tlOpts}
              isLoading={loadingTls}
              selectedList={tlsFilter}
              setselectedList={setTlsFilter}
              multiSelect={true}
              displayKey="teamleads"
              valueKey="teamlead_id"
              searchKeys={["teamleads"]}
            />
            <UnifiedDropdown
              name="CSM"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={csmOpts}
              isLoading={loadingCsms}
              selectedList={csmsFilter}
              setselectedList={setCsmsFilter}
              multiSelect={true}
              displayKey="csm"
              valueKey="csm_id"
              searchKeys={["csm"]}
            />
            <UnifiedDropdown
              name="OM"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={omOpts}
              isLoading={loadingOms}
              selectedList={omsFilter}
              setselectedList={setOmsFilter}
              multiSelect={true}
              displayKey="operations_manager"
              valueKey="operations_manager_id"
              searchKeys={["operations_manager"]}
            />
            <UnifiedDropdown
              name="Senior CSM"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={seniorCsmOpts}
              isLoading={loadingSeniorCsms}
              selectedList={seniorCsmsFilter}
              setselectedList={setSeniorCsmsFilter}
              multiSelect={true}
              displayKey="senior_csm"
              valueKey="senior_csm_id"
              searchKeys={["senior_csm"]}
            />
          </div>
        </div>
      </div>

      {/* Tabs — Attendance Overview / Hubstaff Activity Overview.
          Filters above are shared across both tabs; switching tabs
          preserves filter state, the new tab fetches with current filters. */}
      <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide pl-8">
        <div className="w-[75vw] pb-[50px] pt-2 space-y-9">
          <Tabs setCurrntActiveTab={setActiveTab}>
            <Tab data-label="Attendance Overview" labelData="">
              <AttendanceOverviewSection filters={filters} />
            </Tab>
            <Tab data-label="Hubstaff Activity Overview" labelData="">
              <ActivityOverviewSection filters={filters} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
