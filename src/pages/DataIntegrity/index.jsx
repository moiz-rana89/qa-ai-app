"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import GenericAntdTabs from "../../components/GenericAntdTabs";
import { getDISummary, getDIFilters } from "../../reduxStore/action/dataIntegrity";
import { extractApiError } from "../../utils/helperFunctions";
import RosterTab from "./RosterTab";
import IssuesTab from "./IssuesTab";

const Badge = ({ count }) => (
  <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-[#F1F5F5] text-[#163143] text-[11px] font-semibold">
    {count ?? "—"}
  </span>
);

export default function DataIntegrity() {
  const dispatch = useDispatch();
  const { summary, filters, isLoadingFilters } = useSelector(
    (state) => state.dataIntegrity
  );
  const [activeTab, setActiveTab] = useState("roster");

  useEffect(() => {
    dispatch(
      getDISummary((success, data) => {
        if (!success) {
          toast.error(extractApiError(data, "Failed to load summary."));
        }
      })
    );
    dispatch(
      getDIFilters((success, data) => {
        if (!success) {
          toast.error(extractApiError(data, "Failed to load filters."));
        }
      })
    );
  }, [dispatch]);

  const canEdit = !!summary?.can_edit;

  return (
    <div className="m-[25px]">
      <div className="flex items-center mb-2">
        <span className="text-xl font-semibold text-[#163143]">
          Data Integrity
        </span>
      </div>

      <GenericAntdTabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "roster",
            label: (
              <>
                Roster
                <Badge count={summary?.roster_total} />
              </>
            ),
            content: (
              <RosterTab filters={filters} isLoadingFilters={isLoadingFilters} />
            ),
          },
          {
            key: "issues",
            label: (
              <>
                Issues
                <Badge count={summary?.issues_total} />
              </>
            ),
            content: (
              <IssuesTab
                filters={filters}
                isLoadingFilters={isLoadingFilters}
                canEdit={canEdit}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
