"use client";

import { useState } from "react";
import dayjs from "dayjs";

import { getAttendanceTotals } from "../../../reduxStore/action/reporting";
import {
  formatCount,
  formatRate,
  scopedIdParam,
} from "../../../utils/reportingHelpers";
import useReport from "../hooks/useReport";
import ReportingFilterBar from "../components/ReportingFilterBar";
import ReportingEmptyState from "../components/ReportingEmptyState";
import KpiTiles from "../components/KpiTiles";
import Skeleton from "../../../components/Skeleton";
import { Tab, Tabs } from "../../../components/Tabs/Tabs";
import AttendanceOverviewSection from "../../EndorsementReport/AttendanceOverviewSection";
import ActivityOverviewSection from "../../EndorsementReport/ActivityOverviewSection";

export default function AttendanceReporting({
  filters,
  isLoadingFilters,
  scope,
  state,
  setState,
}) {
  const buildBaseParams = () => ({
    start_date: state.dateRange?.[0]?.format("YYYY-MM-DD"),
    end_date: state.dateRange?.[1]?.format("YYYY-MM-DD"),
    agent_id: scopedIdParam(scope, "agent_id", state.selectedAgents),
    team_lead_id: scopedIdParam(scope, "team_lead_id", state.selectedTeamLeads),
    om_id: scopedIdParam(scope, "om_id", state.selectedOms),
    client_id: scopedIdParam(scope, "client_id", state.selectedClients),
    csm_id: scopedIdParam(scope, "csm_id", state.selectedCsms),
    // AOM names, not ids — sent through as-is (see reporting.js addParam).
    aom: state.selectedAoms,
  });

  const filterDeps = [
    state.dateRange?.[0]?.valueOf(),
    state.dateRange?.[1]?.valueOf(),
    state.selectedAgents,
    state.selectedTeamLeads,
    state.selectedOms,
    state.selectedClients,
    state.selectedCsms,
    state.selectedAoms,
  ];

  const totalsReport = useReport(
    getAttendanceTotals,
    buildBaseParams(),
    !scope?.blocked,
    filterDeps
  );

  // Tab state for the Attendance Overview / Hubstaff Activity Overview
  // tabs below — mirrors the pattern EndorsementReport itself uses.
  const [, setActiveTab] = useState("Attendance Overview");

  if (scope?.blocked) {
    return <ReportingEmptyState variant="blocked" />;
  }

  const totals = totalsReport.data?.totals;

  const tiles = totals
    ? [
        {
          label: "On Time",
          value: `${formatRate(totals.ontime_rate)}`,
          tooltip: `${formatCount(totals.ontime)} of ${formatCount(
            totals.total_scheduled
          )} scheduled shifts`,
        },
        { label: "Late", value: formatCount(totals.late) },
        { label: "Abandoned", value: formatCount(totals.abandoned) },
        { label: "Missed", value: formatCount(totals.missed) },
        { label: "Attendance Points", value: formatCount(totals.attendance_points) },
        { label: "Green Cards", value: formatCount(totals.green_cards) },
      ]
    : [];

  // Same two sections the Endorsement Report page renders, reused as-is —
  // each fetches and paginates independently, scoped to these filters.
  // (Endorsement Report also has a Senior CSM filter that this page's
  // shared filter bar doesn't expose, so senior_csm_id is left unset here.)
  const tabFilters = {
    agent_id: scopedIdParam(scope, "agent_id", state.selectedAgents),
    client_id: scopedIdParam(scope, "client_id", state.selectedClients),
    tl_id: scopedIdParam(scope, "team_lead_id", state.selectedTeamLeads),
    om_id: scopedIdParam(scope, "om_id", state.selectedOms),
    csm_id: scopedIdParam(scope, "csm_id", state.selectedCsms),
    startdate: state.dateRange?.[0],
    enddate: state.dateRange?.[1],
  };

  return (
    <div>
      <ReportingFilterBar
        filters={filters}
        isLoadingFilters={isLoadingFilters}
        scope={scope}
        dateRangeValue={state.dateRange}
        onDateRangeChange={(strDates) =>
          setState({
            dateRange:
              strDates?.[0] && strDates?.[1]
                ? [dayjs(strDates[0]), dayjs(strDates[1])]
                : null,
          })
        }
        selectedAgents={state.selectedAgents}
        setSelectedAgents={(v) => setState({ selectedAgents: v })}
        selectedTeamLeads={state.selectedTeamLeads}
        setSelectedTeamLeads={(v) => setState({ selectedTeamLeads: v })}
        selectedOms={state.selectedOms}
        setSelectedOms={(v) => setState({ selectedOms: v })}
        selectedClients={state.selectedClients}
        setSelectedClients={(v) => setState({ selectedClients: v })}
        selectedCsms={state.selectedCsms}
        setSelectedCsms={(v) => setState({ selectedCsms: v })}
        aomOptions={filters?.aoms}
        selectedAoms={state.selectedAoms}
        setSelectedAoms={(v) => setState({ selectedAoms: v })}
      />

      {totalsReport.loading ? (
        <Skeleton className="w-full h-[120px] mb-4" rounded="rounded-[16px]" />
      ) : (
        <KpiTiles tiles={tiles} />
      )}

      <Tabs setCurrntActiveTab={setActiveTab}>
        <Tab data-label="Attendance Overview" labelData="">
          <AttendanceOverviewSection filters={tabFilters} />
        </Tab>
        <Tab data-label="Hubstaff Activity Overview" labelData="">
          <ActivityOverviewSection filters={tabFilters} />
        </Tab>
      </Tabs>
    </div>
  );
}
