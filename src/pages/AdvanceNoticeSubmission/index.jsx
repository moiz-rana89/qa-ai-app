"use client";

import { useState } from "react";
import { Input } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import { CustomButton } from "../../components/Buttons/CustomButton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import { ATT_REASONS_STATUS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addAdvanceAutomationNotice } from "../../reduxStore/action/workforcedashboard";
import UploadFile from "../../components/UploadFile";
import { useEffect } from "react";
import { getAgentName } from "../../reduxStore/action/formsManagement";
import { getMemberFilterData } from "../../reduxStore/action/workforcedashboard";
import Skeleton from "../../components/Skeleton";
import { NotesInput } from "../../components/NotesInput";

const { TextArea } = Input;

export default function AdvanceNoticeSubmission({ setOpen }) {
  const [loading, setLoading] = useState(false);
  const [isLoadingAgent, setisLoadingAgent] = useState(false);
  const [isLoadingMember, setIsLoadingMember] = useState(false);

  // Team type the user is submitting an advance notice for.
  // "remote"   -> loads remote agents via getAgentName
  // "internal" -> loads internal team members via getMemberFilterData
  const [teamType, setTeamType] = useState("remote");

  const [reason, setReason] = useState([]);
  const [notes, setNotes] = useState("");
  const [isNotes, setIsnotes] = useState(false);

  const [allowGreenCard, setAllowGreenCard] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [agentFilters, setAgentFilters] = useState();

  const userDetails = useSelector((state) => state.auth.user);

  const excludedReasons = [
    "Flexible Schedule",
    "PTO",
    "LOA",
    "Maternity Leave",
    "Paternity Leave",
    "Schedule plotted for Billing Purposes",
    "Hours not met - Completed Shift",
  ];
  const dispatch = useDispatch();

  // Fetch the appropriate people-list whenever team type changes
  // (and once on mount for the default "remote" view).
  useEffect(() => {
    if (teamType === "remote") {
      dispatch(getAgentName(setisLoadingAgent));
    } else {
      dispatch(getMemberFilterData(setIsLoadingMember));
    }
  }, [teamType]);

  const { agentNames: remoteAgentList } = useSelector(
    (store) => store?.formsManagement
  );
  const { memberFilterData: internalMemberList } = useSelector(
    (store) => store?.workforcedashboard
  );

  // The list + loading flag the dropdown should currently render
  const peopleList =
    teamType === "remote" ? remoteAgentList : internalMemberList;
  const peopleLoading =
    teamType === "remote" ? isLoadingAgent : isLoadingMember;

  const handleResponse = (success) => {
    if (success) {
      toast.success("Advance Notice Submitted Successfuly");
    } else {
      toast.error(`Error occured, Please try again`);
    }
    setLoading(false);
    setIsnotes(false);
    setAgentFilters();
    setReason("");
    setNotes("");
    setFileInfo(null);
  };
  const handleSave = () => {
    if (reason?.length == 0 || !notes) {
      toast.error("Please select reason and add notes");
      setIsnotes(true);
    } else if (notes?.length < 70) {
      toast.error("Notes must be 70 characters long");
      setIsnotes(true);
    } else if (!agentFilters?.[0]?.user_id) {
      toast.error(
        teamType === "remote"
          ? "Please Select Agent"
          : "Please Select Member"
      );
    } else {
      setLoading(true);

      const paramsAutomation = {
        user_id: agentFilters[0]?.user_id,
        reason: reason[0]?.reason,
        end_date: moment(Date.now()).format("YYYY-MM-DD"),
        team_lead_note: notes,
        attachment_url: fileInfo?.url ? fileInfo?.url : null,
        updated_by: userDetails?.name,
        team_type: teamType, // "remote" | "internal"
      };
      dispatch(addAdvanceAutomationNotice(paramsAutomation, handleResponse));
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center border-b border-l w-[100%] pl-6 h-[65px] border-[#EBF3F4] bg-white shadow-xl/8">
          <label
            htmlFor="notes"
            className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
          >
            Advance Notice Submission Form
          </label>
          <div className="flex justify-end gap-2 w-[60%] ml-auto">
            <div className="py-5  px-8 flex justify-end gap-5 items-center">
              {loading ? (
                <Skeleton className=" w-[160px] h-[40px] rounded-full" />
              ) : (
                <CustomButton
                  text={"Submit"}
                  textColor={"white"}
                  bg={"#69C920"}
                  borderColor={undefined}
                  width={160}
                  onclick={() => handleSave()}
                />
              )}
            </div>
          </div>
        </div>
        {/* Resolution Reason */}
        <div className="flex flex-col m-[2%] rounded-[32px]  border-t border-[#D7E6E7] bg-[#FCFCFC]">
          {loading ? (
            <div className=" w-full h-[50vh]  relative flex items-center justify-center ">
              <div className=" absolute  text-4xl text-slate-400">
                Submitting
              </div>
              <Skeleton className=" w-full h-full rounded-[32px]" />
            </div>
          ) : (
            <div className="flex flex-col w-[50%] px-4 py-8 justify-center space-y-6">
              {/* Team Type toggle — Remote vs Internal */}
              <div className="space-y-2 px-6">
                <label
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  Team Type<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-3 mt-[10px]">
                  {[
                    { label: "Remote Team", value: "remote" },
                    { label: "Internal Team", value: "internal" },
                  ].map((opt) => {
                    const isSelected = teamType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          if (teamType === opt.value) return;
                          setTeamType(opt.value);
                          // Clear the previous selection when switching teams
                          // so a remote-agent ID can't accidentally be sent
                          // for an internal submission (or vice versa).
                          setAgentFilters();
                        }}
                        className={`min-w-[140px] h-[40px] px-4 rounded-full text-[14px] font-semibold transition-all border ${
                          isSelected
                            ? "bg-[#69C920] text-white border-[#69C920] hover:bg-[#5ab61c]"
                            : "bg-white text-[#163143] border-[#D7E6E7] hover:border-[#69C920] hover:text-[#69C920]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 px-6">
                <label
                  htmlFor="resolution-reason"
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  {teamType === "remote" ? "Select Agent" : "Select Member"}
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <UnifiedDropdown
                  name={teamType === "remote" ? "Agents" : "Members"}
                  className="border-[#d9d9d9] mt-[10px] w-full h-[45px] bg-[#FBFBFB]"
                  data={peopleList}
                  isLoading={peopleLoading}
                  selectedList={agentFilters}
                  setselectedList={setAgentFilters}
                  multiSelect={false}
                  fullwidthDropdown={true}
                  displayKey="user_name"
                  valueKey="user_id"
                  searchKeys={["user_name"]}
                />
              </div>
              <div className="space-y-2 px-6">
                <label
                  htmlFor="resolution-reason"
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  Resolution Reason<span className="text-red-500 ml-1">*</span>
                </label>

                <UnifiedDropdown
                  name="Select Reason"
                  className="border-[#d9d9d9] mt-[10px] w-full h-[45px] bg-[#FBFBFB]"
                  data={ATT_REASONS_STATUS?.filter(
                    (item) => !excludedReasons.includes(item.reason)
                  )}
                  selectedList={reason}
                  setselectedList={(e) => {
                    setReason(e);
                  }}
                  fullwidthDropdown={true}
                  displayKey={"reason"}
                  valueKey={"reason"}
                  searchKeys={["reason"]}
                />
              </div>

              {reason[0]?.validity === "INVALID" && (
                <div className="space-y-2 px-6">
                  <label className="flex  items-center ">
                    <input
                      type="checkbox"
                      class="custom-checkbox"
                      checked={allowGreenCard}
                      onChange={(e) => setAllowGreenCard(e.target.checked)}
                    ></input>
                    <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                      Allow Green Card
                    </span>
                  </label>
                </div>
              )}

              {/* Notes */}
              <div className="flex flex-col space-y-2 px-6">
                <label
                  htmlFor="notes"
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  Justification Notes
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <NotesInput
                  id="notes"
                  placeholder="Add notes here..."
                  borderColor={
                    notes && notes?.length < 70 ? "#FF5546" : "#D7E6E7"
                  }
                  notes={notes}
                  onChange={(e) => setNotes(e)}
                />
              </div>
              <div className="space-y-2 px-6">
                <UploadFile
                  required={false}
                  fileInfo={fileInfo}
                  setFileInfo={setFileInfo}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
