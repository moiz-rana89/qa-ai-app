"use client";

import {
  getTicketMonitoringSummary,
  getTicketMonitoringBreakdown,
} from "../../../reduxStore/action/reporting";
import { TICKET_MONITORING_SOURCE_LABELS } from "../../../utils/reportingHelpers";
import ConsolidatedCountPage from "../components/ConsolidatedCountPage";

export default function TicketMonitoringReporting({
  filters,
  isLoadingFilters,
  scope,
  state,
  setState,
}) {
  return (
    <ConsolidatedCountPage
      headlineLabel="unique tickets graded"
      totalLabel="total gradings (including duplicates)"
      headlineTooltip="A ticket graded on more than one surface counts once here. The gap between this number and the per-source counts is shown as Overlap."
      uniqueKey="unique_tickets"
      totalKey="total_gradings"
      perSourceCountKey="gradings"
      sourceLabels={TICKET_MONITORING_SOURCE_LABELS}
      dateRangeLabel="Date range"
      summaryThunk={getTicketMonitoringSummary}
      breakdownThunk={getTicketMonitoringBreakdown}
      pinUnattributedToBottom
      csvFilenamePrefix="ticket_monitoring_reporting"
      filters={filters}
      isLoadingFilters={isLoadingFilters}
      scope={scope}
      state={state}
      setState={setState}
    />
  );
}
