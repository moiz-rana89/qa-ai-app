"use client";

import { useEffect, useState } from "react";
import { Drawer, Input, DatePicker, InputNumber, Switch } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { CustomButton } from "../../components/Buttons/CustomButton";
import { updateInfraction } from "../../reduxStore/action/attendanceInfractions";

const { TextArea } = Input;

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
    user_id: null,
    reason: "",
    start_date: null,
    end_date: null,
    team_lead_note: "",
    attachment_url: "",
    updated_by: "",
    archived: false,
    approved_by_wfa: null,
  });

  // Track original to compute diff for PUT
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (open && selectedRecord) {
      const initial = {
        user_id: selectedRecord.user_id ?? null,
        reason: selectedRecord.reason ?? "",
        start_date: selectedRecord.start_date
          ? dayjs(selectedRecord.start_date)
          : null,
        end_date: selectedRecord.end_date
          ? dayjs(selectedRecord.end_date)
          : null,
        team_lead_note: selectedRecord.team_lead_note ?? "",
        attachment_url: selectedRecord.attachment_url ?? "",
        updated_by: selectedRecord.updated_by ?? "",
        archived: !!selectedRecord.archived,
        approved_by_wfa: selectedRecord.approved_by_wfa,
      };
      setFormData(initial);
      setOriginalData(initial);
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
    setLoading(true);
    setErrorMsg("");

    // Build only changed fields
    const body = {};
    if (formData.user_id !== originalData.user_id) body.user_id = formData.user_id;
    if (formData.reason !== originalData.reason) body.reason = formData.reason;
    const startStr = formData.start_date?.toISOString();
    const origStartStr = originalData.start_date?.toISOString();
    if (startStr !== origStartStr) body.start_date = startStr;
    const endStr = formData.end_date?.format("YYYY-MM-DD");
    const origEndStr = originalData.end_date?.format("YYYY-MM-DD");
    if (endStr !== origEndStr) body.end_date = endStr;
    if (formData.team_lead_note !== originalData.team_lead_note)
      body.team_lead_note = formData.team_lead_note;
    if (formData.attachment_url !== originalData.attachment_url)
      body.attachment_url = formData.attachment_url;
    if (formData.updated_by !== originalData.updated_by)
      body.updated_by = formData.updated_by;
    if (formData.archived !== originalData.archived)
      body.archived = formData.archived;
    if (formData.approved_by_wfa !== originalData.approved_by_wfa)
      body.approved_by_wfa = formData.approved_by_wfa;

    if (Object.keys(body).length === 0) {
      toast("No changes to save");
      setLoading(false);
      return;
    }

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
          <span className="text-[#163143] font-poppins text-[20px] font-semibold">
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
    >
      <div className="flex flex-col gap-5 px-6">
        {/* Sticky buttons */}
        <div className="sticky top-0 z-10 bg-white flex justify-end gap-3 pt-4 pb-4 -mx-6 px-6 border-b border-[#EBF3F4]">
          <CustomButton
            text="Cancel"
            textColor="#163143"
            bg="white"
            borderColor="#D7E6E7"
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

        {errorMsg && (
          <div className="bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[12px] px-4 py-2 text-[13px]">
            {errorMsg}
          </div>
        )}

        {/* User ID */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            User ID
          </label>
          <InputNumber
            value={formData.user_id}
            onChange={(v) => handleChange("user_id", v)}
            className="w-full"
            style={{ height: "40px" }}
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Reason
          </label>
          <Input
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            style={{ height: "40px" }}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Start Date
          </label>
          <DatePicker
            showTime
            value={formData.start_date}
            onChange={(d) => handleChange("start_date", d)}
            className="w-full"
            style={{
              height: "40px",
              borderRadius: "24px",
              border: "1px solid #D7E6E7",
            }}
            format="YYYY-MM-DD HH:mm"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            End Date
          </label>
          <DatePicker
            value={formData.end_date}
            onChange={(d) => handleChange("end_date", d)}
            className="w-full"
            style={{
              height: "40px",
              borderRadius: "24px",
              border: "1px solid #D7E6E7",
            }}
            format="YYYY-MM-DD"
          />
        </div>

        {/* TL Note */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Team Lead Note
          </label>
          <TextArea
            placeholder="Add notes here..."
            value={formData.team_lead_note}
            onChange={(e) => handleChange("team_lead_note", e.target.value)}
            className="!border-[#EFEFEF] !bg-[#FBFBFB] !rounded-[16px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </div>

        {/* Attachment URL */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Attachment URL
          </label>
          <Input
            value={formData.attachment_url}
            onChange={(e) => handleChange("attachment_url", e.target.value)}
            style={{ height: "40px" }}
          />
        </div>

        {/* Updated By */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Updated By
          </label>
          <Input
            value={formData.updated_by}
            onChange={(e) => handleChange("updated_by", e.target.value)}
            style={{ height: "40px" }}
          />
        </div>

        {/* Archived toggle */}
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-semibold text-[#163143]">
            Archived
          </label>
          <Switch
            checked={formData.archived}
            onChange={(v) => handleChange("archived", v)}
          />
        </div>

        {/* Approved by WFA toggle */}
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-semibold text-[#163143]">
            Approved by WFA
          </label>
          <Switch
            checked={formData.approved_by_wfa === true}
            onChange={(v) => handleChange("approved_by_wfa", v)}
          />
        </div>
      </div>
    </Drawer>
  );
}
