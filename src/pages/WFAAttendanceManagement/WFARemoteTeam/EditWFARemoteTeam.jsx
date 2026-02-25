"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Checkbox,
  Select,
  Input,
  Switch,
  DatePicker,
} from "antd"; // Assuming antd is available
import toast from "react-hot-toast";

import { CustomButton } from "../../../components/Buttons/CustomButton";
import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import {
  ATT_REASONS,
  ATT_REASONS_STATUS,
  handleReasonRules,
} from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addAutomationReport,
  disputeAttendnceReportbyWFA,
  disputeReopenAttendnceReportbyWFA,
  getAttendanceRecords,
  getAttendanceReportsTL,
  updateAttendnceReport,
} from "../../../reduxStore/action/workforcedashboard";
import moment from "moment";
import {
  isJsonString,
  isWithin15,
  isWithin90,
} from "../../../utils/helperFunctions";
import Skeleton from "../../../components/Skeleton";
import UploadFile from "../../../components/UploadFile";
import { Icon } from "@iconify/react";
import { NotesInput } from "../../../components/NotesInput";

const { Option } = Select;
const { TextArea } = Input;

export default function EditWFARemoteTeam({
  open,
  setOpen,
  selectedReport,
  role,
  filterParams,
  userName,
  fetchData,
  currentpage,
  activeTab,
}) {
  const [loading, setLoading] = useState(false);

  const [reason, setReason] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const [isDisputed, setIsDisputed] = useState(false);

  const [notes, setNotes] = useState("");
  const [notesTL, setNotesTL] = useState(" ");

  const [isNotes, setIsnotes] = useState(false);

  const [allowGreenCard, setAllowGreenCard] = useState(false);
  const [authCheck, setAuthCheck] = useState(false);

  const [fileInfo, setFileInfo] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const userDetails = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      selectedReport?.end_date
        ? setEndDate({
            d: moment(selectedReport?.end_date),
            ds: moment(selectedReport?.end_date).format("YYYY-MM-DD"),
          })
        : setEndDate("");
      selectedReport?.start_date
        ? setStartDate({
            d: moment(selectedReport?.start_date),
            ds: moment(selectedReport?.start_date).format("YYYY-MM-DD"),
          })
        : setStartDate("");
      setIsResolved(false);
      setNotes(selectedReport?.notes_wfa);
      setNotesTL(selectedReport?.notes);
      setIsDisputed(false);
      setAuthCheck(false);
      if (selectedReport?.attachments) {
        if (isJsonString(selectedReport?.attachments)) {
          setFileInfo(JSON.parse(selectedReport?.attachments));
        } else {
          setFileInfo([
            { name: "Attachment", url: selectedReport?.attachments },
          ]);
        }
      } else {
        setFileInfo();
      }
      if (selectedReport?.attendance_reason != null) {
        setReason([
          ATT_REASONS_STATUS?.find(
            (item) => item.reason == selectedReport?.attendance_reason
          ),
        ]);
      } else {
        setReason([]);
      }
      if (selectedReport?.green_card != null) {
        setAllowGreenCard(selectedReport?.green_card);
      } else {
        setAllowGreenCard(false);
      }
      setIsnotes(false);
    }
  }, [selectedReport, open]);

  const handleResponse = (success) => {
    if (success) {
      toast.success("Updated Successfuly");
      onClose();
      fetchData({ ...filterParams, page: currentpage });
    } else {
      toast.error(`Error occured, Please try again`);
    }
    setLoading(false);
    setIsnotes(false);
  };
  const handleResponseDispute = (success) => {
    if (success) {
      toast.success("Dispute added Successfuly");
    } else {
      toast.error(`Error occured while adding dispute, Please try again`);
    }
    setLoading(false);
  };
  const handleResponseDisputeReopen = (success) => {
    if (success) {
      toast.success("Dispute added again Successfuly");
      onClose();
      fetchData({ ...filterParams, page: currentpage });
    } else {
      toast.error(`Error occured while adding dispute, Please try again`);
    }
    setLoading(false);
  };
  const handleSave = () => {
    if (reason?.length == 0) {
      toast.error("Please select reason");
      setIsnotes(true);
    } else if (
      handleReasonRules(reason[0]?.reason) &&
      (!endDate?.ds || !fileInfo?.length > 0)
    ) {
      toast.error(
        "You must provide End Date and Upload Attachment before proceeding."
      );
    } else if (
      handleReasonRules(reason[0]?.reason) &&
      reason[0]?.reason == "Schedule plotted for Billing Purposes" &&
      !startDate?.ds
    ) {
      toast.error("You must provide Start Date");
    } else if (
      handleReasonRules(reason[0]?.reason) &&
      reason[0]?.reason == "Schedule plotted for Billing Purposes" &&
      !isWithin15(endDate?.ds, startDate?.ds)
    ) {
      toast.error("End date must be within 15 days.");
    } else if (
      handleReasonRules(reason[0]?.reason) &&
      !isWithin90(endDate?.ds)
    ) {
      toast.error("End date must be within 90 days.");
    } else if (!authCheck) {
      toast.error(
        "Please confirm that you have reviewed the infraction and provided the required notes or documentation."
      );
    } else if (
      isDisputed &&
      !isResolved &&
      activeTab != "Dispute Resolved by TL"
    ) {
      toast.error(
        "Please Mark this as resolved if you want to add this in dispute"
      );
    } else if (!isDisputed && activeTab == "Dispute Resolved by TL") {
      toast.error(
        "Please check Mark as disputed if you want to add this in dispute"
      );
    } else {
      setLoading(true);
      let params = {
        id: selectedReport?.id,
        attendance_reason: reason[0]?.reason,
        notes_wfa: notes,
        reason_type: reason[0]?.validity,
        green_card: reason[0]?.validity === "INVALID" ? allowGreenCard : false,
        attachments: fileInfo?.length > 0 ? JSON.stringify(fileInfo) : null,
        role: role,
        end_date: endDate?.ds,
        start_date: startDate?.ds,
      };
      if (role === "wfa") {
        params = {
          ...params,
          status_resolved: isResolved,
          updated_by_wfa: userName,
        };
      } else {
        params = {
          ...params,
          status_resolved_tl: isResolved,
          updated_by_tl: userName,
        };
      }
      const paramsAutomation = {
        user_id: selectedReport?.user_id,
        reason: reason[0]?.reason,
        end_date: endDate?.ds,
        team_lead_note: notes,
        attachment_url: fileInfo?.length > 0 ? JSON.stringify(fileInfo) : null,
        updated_by: userDetails?.name,
        start_date: startDate?.ds,
      };
      if (handleReasonRules(reason[0]?.reason) && !selectedReport?.end_date) {
        dispatch(addAutomationReport(paramsAutomation, toast));
      }
      const paramsDispute = {
        id: selectedReport?.id,
        table_type: "remote",
        notes_wfa: notes,
        reason: reason[0]?.reason,
      };
      if (isDisputed && activeTab == "Resolved by TL") {
        dispatch(
          disputeAttendnceReportbyWFA(paramsDispute, handleResponseDispute)
        );
      }
      if (isDisputed && activeTab == "Dispute Resolved by TL") {
        dispatch(
          disputeReopenAttendnceReportbyWFA(
            paramsDispute,
            handleResponseDisputeReopen
          )
        );
        return;
      }
      dispatch(updateAttendnceReport(params, handleResponse));
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-[#163143] font-poppins text-[20px] not-italic font-semibold leading-[24px] tracking-[0.2px]">
            Edit Attendance Report Alert
          </span>
          <div>
            <Icon
              icon="codex:cross"
              className="h-8 w-8 text-[#163143]"
              onClick={onClose}
            />
          </div>
        </div>
      }
      footer={
        <label className="flex my-[10px]">
          <input
            type="checkbox"
            class="custom-checkbox mt-[2px]"
            checked={authCheck}
            onChange={(e) => {
              setAuthCheck(e.target.checked);
            }}
          ></input>
          <span className="text-[#163143] font-poppins text-[14px] not-italic font-[400px] leading-[20px] ml-2">
            I certify that I have reviewed the infraction, selected the
            appropriate resolution, and provided required notes or
            documentation.<span className="text-red-500 ml-1">*</span>
          </span>
        </label>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={600}
      closable={false}
      // shadow-[-4px_0px_20px_-10px_rgba(0,0,0,0.25)]
      motion={{
        motionName: {
          appear: "custom-slide-in",
          enter: "custom-slide-in",
          leave: "custom-fade-out",
        },
        motionAppear: true,
        motionEnter: true,
        motionLeave: true,
      }}
      className="[&_.ant-drawer-header]:px-6 [&_.ant-drawer-header]:py-4 [&_.ant-drawer-header]:border-b [&_.ant-drawer-body]:p-0 [&_.ant-drawer-body]:space-y-6 [&_.ant-drawer-footer]:px-6 [&_.ant-drawer-footer]:py-4 [&_.ant-drawer-footer]:border-t"
    >
      {loading ? (
        <div className="flex  flex-col justify-between   bg-white  rounded shadow-lg  h-[100%] w-[100%] max-w-[800px] ">
          <div className=" w-full h-[90vh] relative flex items-center justify-center ">
            <div className=" absolute  text-4xl text-slate-400">Updating</div>
            <Skeleton className=" w-full h-full " />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Mark as Resolved Checkbox */}
          <div className="flex items-center border-b border-[#D7E6E7] w-[100%] pl-6">
            {/* </Checkbox> */}
            <div className="flex justify-end gap-2 w-[60%] ml-auto">
              <div className="py-5  px-8 flex justify-end gap-5 items-center">
                <CustomButton
                  text={"Cancel"}
                  textColor={"black"}
                  bg={"white"}
                  borderColor={"#00000040"}
                  width={100}
                  onclick={() => onClose()}
                />

                <CustomButton
                  text={"Save"}
                  textColor={"white"}
                  bg={"#69C920"}
                  borderColor={undefined}
                  width={100}
                  onclick={() => handleSave()}
                />
              </div>
            </div>
          </div>
          {/* Resolution Reason */}
          <div className="pl-6">
            <div className="text-[#163143] text-[14px] font-semibold">
              Mark As:
            </div>
            {activeTab != "Dispute Resolved by TL" && (
              <label className="flex items-center ml-1 mt-3">
                <input
                  type="checkbox"
                  class="custom-checkbox"
                  checked={isResolved}
                  onChange={(e) => setIsResolved(e.target.checked)}
                ></input>
                <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                  Mark as Resolved
                </span>
              </label>
            )}

            {(activeTab == "Resolved by TL" ||
              activeTab == "Dispute Resolved by TL") && (
              <label className="flex items-center ml-1 mt-3">
                <input
                  type="checkbox"
                  class="custom-checkbox"
                  checked={isDisputed}
                  onChange={(e) => setIsDisputed(e.target.checked)}
                ></input>
                <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                  Mark as Disputed
                </span>
              </label>
            )}
          </div>
          <div className="space-y-2 px-6 flex">
            <label className="flex items-center">
              <span className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]">
                Green Cards Received:
              </span>
              <div
                className={`ml-[5px] text-center capitalize flex items-center justify-center rounded-full  px-4 py-1 ${"bg-[#E4FAED]"}`}
              >
                <span className="mb-[2px]">
                  {selectedReport?.green_card_count
                    ? selectedReport?.green_card_count
                    : "N/A"}
                </span>
              </div>
            </label>

            <label className="flex items-center ml-auto mb-[6px]">
              <span className="text-[#163143] text-center font-poppins text-[14px] not-italic font-[400px] leading-[20px] mr-2">
                Allow Green Card
              </span>
              <input
                type="checkbox"
                class="custom-checkbox"
                checked={allowGreenCard}
                onChange={(e) => {
                  if (selectedReport?.green_card_count >= 2) {
                    toast.error(
                      "Green card limit reached. This agent has already received two or more green cards in the last 30 days"
                    );
                    return;
                  }
                  setAllowGreenCard(e.target.checked);
                }}
              ></input>
            </label>
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
              className="mt-[10px] border-[#D7E6E7] w-full h-[45px] bg-[#FBFBFB]"
              data={ATT_REASONS_STATUS}
              // isLoading={isloading}
              selectedList={reason}
              setselectedList={(e) => {
                setReason(e);
                if (e[0]?.validity === "VALID") {
                  setAllowGreenCard(false);
                }
                setFileInfo();
                setEndDate();
                setStartDate();
              }}
              fullwidthDropdown={true}
              displayKey={"reason"}
              valueKey={"reason"}
              searchKeys={["reason"]}
            />
            <div className="pt-1">
              <label
                htmlFor="resolution-reason"
                className="text-[#7F8A92] font-poppins text-[14px]"
              >
                Reason Description:
              </label>
            </div>
            <div>
              <label
                htmlFor="resolution-reason"
                className="whitespace-pre-wrap text-[#7F8A92] font-poppins text-[14px]"
              >
                {reason?.[0]?.description}
              </label>
            </div>
          </div>
          {handleReasonRules(reason[0]?.reason) &&
            reason[0]?.reason == "Schedule plotted for Billing Purposes" && (
              <div className="space-y-2 px-6">
                <label
                  htmlFor="resolution-reason"
                  className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
                >
                  Start Date<span className="text-red-500 ml-1">*</span>
                </label>
                <DatePicker
                  className="!mt-[10px] w-full h-[45px] bg-[#FBFBFB] !border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[32px] focus:shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
                  placeholder="Select Start Date"
                  onChange={(d, ds) => setStartDate({ d: d, ds: ds })}
                  value={startDate?.d}
                  allowClear={false}
                />
              </div>
            )}
          {handleReasonRules(reason[0]?.reason) && (
            <div className="space-y-2 px-6">
              <label
                htmlFor="resolution-reason"
                className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
              >
                End Date<span className="text-red-500 ml-1">*</span>
              </label>
              <DatePicker
                className="!mt-[10px] w-full h-[45px] bg-[#FBFBFB] !border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[32px] focus:shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
                placeholder="Select End Date"
                onChange={(d, ds) => setEndDate({ d: d, ds: ds })}
                value={endDate?.d}
                allowClear={false}
                disabled={selectedReport?.end_date ? true : false}
              />
            </div>
          )}

          {reason[0]?.validity === "INVALID" && (
            <div className="space-y-2 px-6">
              <label className="flex  items-center ">
                <input
                  type="checkbox"
                  class="custom-checkbox"
                  checked={allowGreenCard}
                  onChange={(e) => {
                    if (selectedReport?.green_card_count >= 2) {
                      toast.error(
                        "Green card limit reached. This agent has already received two or more green cards in the last 30 days"
                      );
                      return;
                    }
                    setAllowGreenCard(e.target.checked);
                  }}
                ></input>
                <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                  Allow Green Card
                </span>
              </label>
            </div>
          )}
          {/* Notes */}
          {notesTL && (
            <div className="space-y-2 px-6">
              <label
                htmlFor="notes"
                className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
              >
                Notes Added by TL
              </label>
              <TextArea
                className="!mt-[10px] !border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[16px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
                id="notesbytl"
                placeholder="Add notes here..."
                autoSize={{ minRows: 5, maxRows: 10 }}
                value={notesTL}
                readOnly={true}
                // onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2 px-6">
            <label
              htmlFor="notes"
              className="text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]"
            >
              Notes By WFA
            </label>
            {activeTab === "Disputed by WFA" ? (
              <TextArea
                className="!mt-[10px] !border-[#EFEFEF] !bg-[#FFF7D8] !rounded-[16px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
                id="notesbytl"
                placeholder="Add notes here..."
                autoSize={{ minRows: 5, maxRows: 10 }}
                value={notesTL}
                readOnly={true}
              />
            ) : (
              <NotesInput
                id="notes"
                placeholder="Add notes here..."
                borderColor={notes?.length < 70 ? "#FF5546" : "#D7E6E7"}
                notes={notes}
                onChange={(e) => setNotes(e)}
              />
            )}
          </div>
          <div className="space-y-2 px-6">
            <UploadFile
              // required={handleReasonRules(reason[0]?.reason)}
              reqNotes={reason?.[0]?.fileReqMessage}
              required={false}
              fileInfo={fileInfo}
              setFileInfo={setFileInfo}
            />
          </div>
        </div>
      )}
    </Drawer>
  );
}
