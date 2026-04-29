"use client";

import { useEffect, useState } from "react";
import { Drawer, DatePicker } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { CustomButton } from "../../components/Buttons/CustomButton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import { NotesInput } from "../../components/NotesInput";
import UploadFile from "../../components/UploadFile";
import Skeleton from "../../components/Skeleton";
import { ATT_REASONS_STATUS } from "../../utils/constants";
import { isJsonString } from "../../utils/helperFunctions";
import { updateInfraction } from "../../reduxStore/action/attendanceInfractions";

export default function EditInfractionDrawer({
  open,
  setOpen,
  selectedRecord,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    reason: [],
    start_date: null,
    end_date: null,
    team_lead_note: "",
    archived: false,
    approved_by_wfa: false,
  });

  // File attachments — list of { name, url } objects
  const [fileInfo, setFileInfo] = useState([]);

  // Track original to compute diff for PUT
  const [originalData, setOriginalData] = useState({});
  const [originalAttachmentUrl, setOriginalAttachmentUrl] = useState("");

  useEffect(() => {
    if (open && selectedRecord) {
      // Match the stored reason against ATT_REASONS_STATUS so the dropdown
      // shows the current selection. Falls back to a synthetic option if
      // the value doesn't match a known reason.
      const storedReason = selectedRecord.reason ?? "";
      const found = storedReason
        ? ATT_REASONS_STATUS.find((item) => item.reason === storedReason) ||
          { reason: storedReason, validity: "VALID", description: "" }
        : null;

      const initial = {
        reason: found ? [found] : [],
        start_date: selectedRecord.start_date
          ? dayjs(selectedRecord.start_date)
          : null,
        end_date: selectedRecord.end_date
          ? dayjs(selectedRecord.end_date)
          : null,
        team_lead_note: selectedRecord.team_lead_note ?? "",
        archived: !!selectedRecord.archived,
        approved_by_wfa: selectedRecord.approved_by_wfa === true,
      };
      setFormData(initial);
      setOriginalData(initial);

      // Parse attachment_url — supports both single URL strings and
      // JSON-encoded arrays of {name, url}.
      const stored = selectedRecord.attachment_url;
      if (stored) {
        if (isJsonString(stored)) {
          try {
            const parsed = JSON.parse(stored);
            setFileInfo(Array.isArray(parsed) ? parsed : []);
          } catch {
            setFileInfo([{ name: "Attachment", url: stored }]);
          }
        } else {
          setFileInfo([{ name: "Attachment", url: stored }]);
        }
      } else {
        setFileInfo([]);
      }
      setOriginalAttachmentUrl(stored || "");
      setErrorMsg("");
    }
  }, [open, selectedRecord]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setErrorMsg("");

    // Build only changed fields
    const body = {};
    const newReason = formData.reason?.[0]?.reason ?? "";
    const origReason = originalData.reason?.[0]?.reason ?? "";
    if (newReason !== origReason) body.reason = newReason;

    const startStr = formData.start_date
      ? formData.start_date.toISOString()
      : null;
    const origStartStr = originalData.start_date
      ? originalData.start_date.toISOString()
      : null;
    if (startStr !== origStartStr) body.start_date = startStr;

    const endStr = formData.end_date
      ? formData.end_date.format("YYYY-MM-DD")
      : null;
    const origEndStr = originalData.end_date
      ? originalData.end_date.format("YYYY-MM-DD")
      : null;
    if (endStr !== origEndStr) body.end_date = endStr;

    if (formData.team_lead_note !== originalData.team_lead_note)
      body.team_lead_note = formData.team_lead_note;
    if (formData.archived !== originalData.archived)
      body.archived = formData.archived;
    if (formData.approved_by_wfa !== originalData.approved_by_wfa)
      body.approved_by_wfa = formData.approved_by_wfa;

    // Attachment — store as JSON array of {name, url} so multi-file uploads
    // round-trip correctly. Empty list -> null.
    const newAttachmentUrl =
      fileInfo?.length > 0 ? JSON.stringify(fileInfo) : null;
    const origAttachmentUrl = originalAttachmentUrl || null;
    if (newAttachmentUrl !== origAttachmentUrl) {
      body.attachment_url = newAttachmentUrl;
    }

    if (Object.keys(body).length === 0) {
      toast("No changes to save");
      return;
    }

    setLoading(true);
    dispatch(
      updateInfraction(selectedRecord?.id, body, (success, dataOrErr) => {
        if (success) {
          toast.success("Infraction updated successfully");
          onClose();
          onSuccess?.();
        } else {
          const msg =
            dataOrErr?.data?.detail ||
            dataOrErr?.message ||
            "Failed to update. Please try again.";
          setErrorMsg(typeof msg === "string" ? msg : "Failed to update.");
          toast.error("Update failed");
        }
        setLoading(false);
      })
    );
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-[#163143] font-poppins text-[20px] font-semibold leading-[24px] tracking-[0.2px]">
            Edit Infraction
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
      closable={false}
      onClose={onClose}
      open={open}
      width={600}
      className="[&_.ant-drawer-header]:px-6 [&_.ant-drawer-header]:py-4 [&_.ant-drawer-header]:border-b [&_.ant-drawer-body]:p-0 [&_.ant-drawer-body]:space-y-6"
    >
      {loading ? (
        <div className="flex flex-col justify-between bg-white rounded shadow-lg h-[100%] w-[100%] max-w-[800px]">
          <div className="w-full h-[90vh] relative flex items-center justify-center">
            <div className="absolute text-4xl text-slate-400">Updating</div>
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sticky top — Cancel/Save buttons */}
          <div className="sticky top-0 z-10 bg-white flex items-center border-b border-[#D7E6E7] w-full pl-6 pt-4">
            <div className="flex justify-end gap-2 w-full ml-auto">
              <div className="py-5 px-8 flex justify-end gap-5 items-center w-full">
                <CustomButton
                  text="Cancel"
                  textColor="black"
                  bg="white"
                  borderColor="#00000040"
                  width={100}
                  onclick={onClose}
                />
                <CustomButton
                  text={loading ? "Saving..." : "Save"}
                  textColor="white"
                  bg="#69C920"
                  borderColor={undefined}
                  width={100}
                  onclick={handleSave}
                />
              </div>
            </div>
          </div>

          {/* Stacked status checkboxes */}
          <div className="pl-6">
            <label className="flex items-center ml-1 cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={formData.archived}
                onChange={(e) => handleChange("archived", e.target.checked)}
              />
              <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                Archived
              </span>
            </label>
            <label className="flex items-center ml-1 mt-3 cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={formData.approved_by_wfa}
                onChange={(e) =>
                  handleChange("approved_by_wfa", e.target.checked)
                }
              />
              <span className="text-[#163143] text-center font-poppins text-[16px] not-italic font-normal leading-[20px] ml-2">
                Approved by WFA
              </span>
            </label>
          </div>

          {errorMsg && (
            <div className="mx-6 bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[12px] px-4 py-2 text-[13px]">
              {errorMsg}
            </div>
          )}

          {/* Reason */}
          <div className="px-6">
            <label className="text-[#163143] font-poppins text-[16px] font-semibold leading-[20.5px]">
              Reason<span className="text-red-500 ml-1">*</span>
            </label>
            <UnifiedDropdown
              name="Select Reason"
              className="border-[#d9d9d9] w-full h-[45px] bg-[#FBFBFB] mt-[10px]"
              data={ATT_REASONS_STATUS}
              selectedList={formData.reason}
              setselectedList={(e) => handleChange("reason", e)}
              fullwidthDropdown={true}
              displayKey="reason"
              valueKey="reason"
              searchKeys={["reason"]}
            />
            {formData.reason?.[0]?.description && (
              <>
                <div className="pt-1">
                  <span className="text-[#7F8A92] font-poppins text-[14px]">
                    Reason Description:
                  </span>
                </div>
                <div>
                  <span className="whitespace-pre-wrap text-[#7F8A92] font-poppins text-[14px]">
                    {formData.reason[0].description}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-2 px-6">
            <label className="text-[#163143] font-poppins text-[16px] font-semibold leading-[20.5px]">
              Start Date
            </label>
            <DatePicker
              showTime
              value={formData.start_date}
              onChange={(d) => handleChange("start_date", d)}
              className="!mt-[10px] w-full h-[45px] bg-[#FBFBFB] !border-[#EFEFEF] !rounded-[32px] focus:shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
              placeholder="Select Start Date"
              allowClear
              format="YYYY-MM-DD HH:mm"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2 px-6">
            <label className="text-[#163143] font-poppins text-[16px] font-semibold leading-[20.5px]">
              End Date
            </label>
            <DatePicker
              value={formData.end_date}
              onChange={(d) => handleChange("end_date", d)}
              className="!mt-[10px] w-full h-[45px] bg-[#FBFBFB] !border-[#EFEFEF] !rounded-[32px] focus:shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
              placeholder="Select End Date"
              allowClear
              format="YYYY-MM-DD"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2 px-6">
            <label className="text-[#163143] font-poppins text-[16px] font-semibold leading-[20.5px]">
              Notes<span className="text-red-500 ml-1">*</span>
            </label>
            <NotesInput
              placeholder="Add notes here..."
              borderColor={
                formData.team_lead_note?.length < 70 ? "#FF5546" : "#D7E6E7"
              }
              notes={formData.team_lead_note}
              onChange={(e) => handleChange("team_lead_note", e)}
            />
          </div>

          {/* Attachment Upload + Preview */}
          <div className="space-y-2 px-6 pb-6">
            <UploadFile fileInfo={fileInfo} setFileInfo={setFileInfo} />
          </div>
        </div>
      )}
    </Drawer>
  );
}
