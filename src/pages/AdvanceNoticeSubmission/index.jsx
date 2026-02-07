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
import Skeleton from "../../components/Skeleton";
import { NotesInput } from "../../components/NotesInput";

const { TextArea } = Input;

export default function AdvanceNoticeSubmission({ setOpen }) {
  const [loading, setLoading] = useState(false);
  const [isLoadingAgent, setisLoadingAgent] = useState(false);

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isNotes, setIsnotes] = useState(false);

  const [allowGreenCard, setAllowGreenCard] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [agentFilters, setAgentFilters] = useState();
  const excludedReasons = [
    "Flexible Schedule",
    "PTO",
    "LOA",
    "Maternity Leave",
    "Paternity Leave",
    "Schedule plotted for Billing Purposes",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentName(setisLoadingAgent));
  }, []);

  const { agentNames: agentList } = useSelector(
    (store) => store?.formsManagement
  );

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
    } else if (!agentFilters[0]?.user_id) {
      toast.error("Please Select Agent");
    } else {
      setLoading(true);
      const userDetails = JSON.parse(
        localStorage.getItem("user_details") || "{}"
      );
      const paramsAutomation = {
        user_id: agentFilters[0]?.user_id,
        reason: reason[0]?.reason,
        end_date: moment(Date.now()).format("YYYY-MM-DD"),
        team_lead_note: notes,
        attachment_url: fileInfo?.url ? fileInfo?.url : null,
        updated_by: userDetails?.name,
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
              <div className="space-y-2 px-6">
                <label
                  htmlFor="resolution-reason"
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  Select Agent<span className="text-red-500 ml-1">*</span>
                </label>

                <UnifiedDropdown
                  name="Agents"
                  className="border-[#d9d9d9] mt-[10px] w-full h-[45px] bg-[#FBFBFB]"
                  data={agentList}
                  isLoading={isLoadingAgent}
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
