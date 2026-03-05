"use client";

import { useEffect, useState } from "react";
import { Drawer, Select } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../components/Buttons/CustomButton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import {
  getQasName,
  getTeamLeadName,
} from "../../reduxStore/action/formsManagement";
import { updateQASettings } from "../../reduxStore/action/qaSettings";
import Skeleton from "../../components/Skeleton";

const TICKET_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

export default function EditQASettings({
  open,
  onClose,
  selectedRow,
  onSaveSuccess,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [qaEnabled, setQaEnabled] = useState(false);
  const [ticketsPerAgents, setTicketsPerAgents] = useState(10);
  const [ticketsPerTeamLead, setTicketsPerTeamLead] = useState(2);
  const [ticketsPerQASpecialist, setTicketsPerQASpecialist] = useState(2);
  const [qasAssigned, setQasAssigned] = useState([]);
  const [tlAssigned, setTlAssigned] = useState([]);

  const [isLoadingTL, setIsLoadingTL] = useState(false);
  const { qasNames, teamLeadNames, isLoadingQas } = useSelector(
    (store) => store.formsManagement
  );

  useEffect(() => {
    if (open) {
      dispatch(getQasName());
      dispatch(getTeamLeadName(setIsLoadingTL));
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open && selectedRow) {
      setQaEnabled(selectedRow?.qa_enabled ?? false);
      setTicketsPerAgents(selectedRow?.no_of_tickets_per_agents ?? 10);
      setTicketsPerTeamLead(selectedRow?.no_of_tickets_per_team_lead ?? 2);
      setTicketsPerQASpecialist(
        selectedRow?.no_of_tickets_per_qa_specialist ?? 2
      );
      if (selectedRow?.quality_assurance_specialist_assigned) {
        setQasAssigned([
          {
            name: selectedRow.quality_assurance_specialist_assigned,
            owner: selectedRow.qa_specialist_id,
          },
        ]);
      } else {
        setQasAssigned([]);
      }
      if (selectedRow?.team_lead_assigned) {
        setTlAssigned([
          {
            teamleads: selectedRow.team_lead_assigned,
            teamlead_id: selectedRow.team_lead_id,
          },
        ]);
      } else {
        setTlAssigned([]);
      }
    }
  }, [selectedRow, open]);

  const handleSave = () => {
    if (!qasAssigned?.length) {
      toast.error("Please select Quality Assurance Specialist Assigned");
      return;
    }
    if (!tlAssigned?.length) {
      toast.error("Please select Team Lead Assigned");
      return;
    }
    setLoading(true);
    const body = {
      qa_enabled: qaEnabled,
      no_of_tickets_per_agents: ticketsPerAgents,
      no_of_tickets_per_team_lead: ticketsPerTeamLead,
      no_of_tickets_per_qa_specialist: ticketsPerQASpecialist,
      quality_assurance_specialist_assigned: qasAssigned[0]?.name,
      qa_specialist_id: qasAssigned[0]?.owner,
      team_lead_assigned: tlAssigned[0]?.teamleads,
      team_lead_id: tlAssigned[0]?.teamlead_id,
    };
    dispatch(
      updateQASettings(selectedRow?.id, body, (success) => {
        setLoading(false);
        if (success) {
          toast.success("QA Settings updated successfully");
          onSaveSuccess?.();
        } else {
          toast.error("Failed to update QA Settings. Please try again.");
        }
      })
    );
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-[#163143] font-poppins text-[20px] not-italic font-semibold leading-[24px] tracking-[0.2px]">
            Edit QA Settings
          </span>
          <div>
            <Icon
              icon="codex:cross"
              className="h-8 w-8 text-[#163143] cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={600}
      closable={false}
      className="[&_.ant-drawer-header]:px-6 [&_.ant-drawer-header]:py-4 [&_.ant-drawer-header]:border-b [&_.ant-drawer-body]:px-6 [&_.ant-drawer-body]:py-6"
    >
      {loading ? (
        <div className="flex flex-col justify-between bg-white rounded shadow-lg h-[100%] w-[100%]">
          <div className="w-full h-[50vh] relative flex items-center justify-center">
            <div className="absolute text-4xl text-slate-400">Updating</div>
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center border-b border-[#D7E6E7] w-full px-[24px] py-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={qaEnabled}
                onChange={(e) => setQaEnabled(e.target.checked)}
              />
              <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                QA Enabled
              </span>
            </label>
            <div className="flex justify-end gap-2 flex-1 ml-auto">
              <CustomButton
                text="Cancel"
                textColor="black"
                bg="white"
                borderColor="#00000040"
                width={100}
                onclick={onClose}
              />
              <CustomButton
                text="Save"
                textColor="white"
                bg="#69C920"
                borderColor={undefined}
                width={100}
                onclick={handleSave}
              />
            </div>
          </div>
          <div className="space-y-5 mx-5">
            <div className="space-y-2">
              <label className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                No. of Tickets per Agents
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={ticketsPerAgents}
                onChange={setTicketsPerAgents}
                className="w-full !h-[45px]"
                options={TICKET_COUNT_OPTIONS.map((n) => ({
                  label: String(n),
                  value: n,
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                No. of Tickets per Team Lead
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={ticketsPerTeamLead}
                onChange={setTicketsPerTeamLead}
                className="w-full !h-[45px]"
                options={TICKET_COUNT_OPTIONS.map((n) => ({
                  label: String(n),
                  value: n,
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                No. of Tickets per QA Specialist
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={ticketsPerQASpecialist}
                onChange={setTicketsPerQASpecialist}
                className="w-full !h-[45px]"
                options={TICKET_COUNT_OPTIONS.map((n) => ({
                  label: String(n),
                  value: n,
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                Quality Assurance Specialist Assigned
                <span className="text-red-500 ml-1">*</span>
              </label>
              <UnifiedDropdown
                name="Select QAS"
                className="border-[#d9d9d9] w-full h-[45px] bg-[#FBFBFB]"
                data={qasNames || []}
                isLoading={isLoadingQas}
                selectedList={qasAssigned}
                setselectedList={setQasAssigned}
                multiSelect={false}
                displayKey="name"
                valueKey="owner"
                searchKeys={["name"]}
                fullwidthDropdown={true}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                Team Lead Assigned<span className="text-red-500 ml-1">*</span>
              </label>
              <UnifiedDropdown
                name="Select Team Lead"
                className="border-[#d9d9d9] w-full h-[45px] bg-[#FBFBFB]"
                data={teamLeadNames || []}
                isLoading={isLoadingTL}
                selectedList={tlAssigned}
                setselectedList={setTlAssigned}
                multiSelect={false}
                displayKey="teamleads"
                valueKey="teamlead_id"
                searchKeys={["teamleads"]}
                fullwidthDropdown={true}
              />
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
