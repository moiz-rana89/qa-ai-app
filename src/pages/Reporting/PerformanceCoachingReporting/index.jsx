"use client";

import {
  getPerformanceCoachingSummary,
  getPerformanceCoachingBreakdown,
} from "../../../reduxStore/action/reporting";
import { PERFORMANCE_COACHING_SOURCE_LABELS, formatDateOnly } from "../../../utils/reportingHelpers";
import ConsolidatedCountPage from "../components/ConsolidatedCountPage";

export default function PerformanceCoachingReporting({
  filters,
  isLoadingFilters,
  scope,
  state,
  setState,
}) {
  return (
    <ConsolidatedCountPage
      headlineLabel="coachings completed"
      totalLabel="total submissions (including duplicates)"
      headlineTooltip="A coaching is counted once per agent per day, not per ticket — the original form has no usable ticket id. Only completed coachings count; drafts in the new dashboard are excluded."
      uniqueKey="unique_coachings"
      totalKey="total_submissions"
      perSourceCountKey="submissions"
      sourceLabels={PERFORMANCE_COACHING_SOURCE_LABELS}
      dateRangeLabel="Coaching date"
      summaryThunk={getPerformanceCoachingSummary}
      breakdownThunk={getPerformanceCoachingBreakdown}
      extraBreakdownColumns={[
        {
          title: "Last Coached",
          dataIndex: "last_coaching_date",
          key: "last_coaching_date",
          disableSort: true,
          render: (v) => formatDateOnly(v),
        },
      ]}
      csvFilenamePrefix="performance_coaching_reporting"
      filters={filters}
      isLoadingFilters={isLoadingFilters}
      scope={scope}
      state={state}
      setState={setState}
    />
  );
}
