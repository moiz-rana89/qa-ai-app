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
import moment from "moment";

import { CustomButton } from "../../../components/Buttons/CustomButton";
import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import { ATT_REASONS_STATUS } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { updateAttendnceInternalReport } from "../../../reduxStore/action/workforcedashboard";
import UploadFile from "../../../components/UploadFile/index";
import { isJsonString } from "../../../utils/helperFunctions";
import { Icon } from "@iconify/react";
import Skeleton from "../../../components/Skeleton";

const { Option } = Select;
const { TextArea } = Input;

export default function EditWFAInternalTeam({
  open,
  setOpen,
  selectedReport,
  role,
  filterParams,
  userName,
  fetchData,
  currentpage,
}) {
  const [loading, setLoading] = useState(false);

  const [reason, setReason] = useState("");
  const [isNotes, setIsnotes] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [notes, setNotes] = useState(" ");
  const [notesTL, setNotesTL] = useState(" ");
  const [allowGreenCard, setAllowGreenCard] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [reasonAttachment, setReasonAttachment] = useState(null);
  const [authCheck, setAuthCheck] = useState(false);

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
      setIsResolved(false);
      setNotes(selectedReport?.notes_wfa);
      setNotesTL(selectedReport?.notes);
      if (selectedReport?.attachments) {
        // setFileInfo(JSON.parse(selectedReport?.attachments));
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
  const handleSave = () => {
    if (reason?.length == 0) {
      toast.error("Please select reason");
      setIsnotes(true);
    } else if (!fileInfo?.length > 0) {
      toast.error("You must Upload Attachment before proceeding.");
    }
    // else if (notes?.length < 70) {
    //   toast.error("Notes must be 70 character long");
    //   setIsnotes(true);
    // }
    else if (!authCheck) {
      toast.error(
        "Please confirm that you have reviewed the infraction and provided the required notes or documentation."
      );
    } else {
      setLoading(true);
      let params = {
        id: selectedReport?.id,
        attendance_reason: reason[0]?.reason,
        notes_wfa: notes,
        reason_type: reason[0]?.validity,
        green_card: reason[0]?.validity === "INVALID" ? allowGreenCard : false,
        role: role,
        end_date: endDate?.ds,
        attachments: fileInfo?.length > 0 ? JSON.stringify(fileInfo) : null,
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
      const userDetails = JSON.parse(
        localStorage.getItem("user_details") || "{}"
      );

      dispatch(updateAttendnceInternalReport(params, handleResponse));
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
            <label className="flex  items-center">
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
                className="text-[#7F8A92] font-poppins text-[14px]"
              >
                {reason?.[0]?.description}
              </label>
            </div>
          </div>

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
                className="!border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[16px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
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
            <TextArea
              className="!mt-[10px] !border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[16px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
              id="notes"
              placeholder="Add notes here..."
              autoSize={{ minRows: 5, maxRows: 10 }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* <span
              style={{
                color:
                  notes?.length > 70
                    ? "#16314380"
                    : isNotes
                    ? "red"
                    : "#16314380",
              }}
            >
              The minimum character limit is {notes?.length ? notes?.length : 0}
              /70
            </span> */}
          </div>
          <div className="space-y-2 px-6">
            <UploadFile
              // required={handleReasonRules(reason[0]?.reason)}
              required={true}
              fileInfo={fileInfo}
              setFileInfo={setFileInfo}
            />
          </div>
        </div>
      )}
    </Drawer>
  );
}
