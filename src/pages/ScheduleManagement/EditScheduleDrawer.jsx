"use client";

import { useEffect, useState } from "react";
import { Drawer, Select, Input, DatePicker, TimePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { CustomButton } from "../../components/Buttons/CustomButton";
import {
  createSchedule,
  updateSchedule,
} from "../../reduxStore/action/scheduleManagement";

const TIMEZONE_OPTIONS = [
  { label: "Organization (PDT)", value: "America/Los_Angeles" },
  { label: "Eastern (EST)", value: "America/New_York" },
  { label: "Central (CST)", value: "America/Chicago" },
  { label: "Mountain (MST)", value: "America/Denver" },
  { label: "Pacific (PST)", value: "America/Los_Angeles" },
  { label: "Philippines (PHT)", value: "Asia/Manila" },
  { label: "Jamaica (EST)", value: "America/Jamaica" },
  { label: "South Africa (SAST)", value: "Africa/Johannesburg" },
  { label: "UTC", value: "UTC" },
];

const RECURRING_OPTIONS = [
  { label: "Forever", value: "forever" },
  { label: "Until Date", value: "until_date" },
];

export default function EditScheduleDrawer({
  open,
  setOpen,
  mode = "create",
  selectedSchedule,
  scheduleFilters,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    client: null,
    client_id: null,
    project: null,
    use_time_zone: "America/Los_Angeles",
    minimum_time: "",
    start_time: null,
    end_time: null,
    effective_from: null,
    repeat_until: null,
    recurring_option: "forever",
    schedule_type: "weekly",
    member_name: null,
    user_id: null,
  });

  useEffect(() => {
    if (open && mode === "edit" && selectedSchedule) {
      const startTime = selectedSchedule.start_time
        ? dayjs(selectedSchedule.start_time, "HH:mm:ss")
        : null;
      const endTime =
        selectedSchedule.start_time && selectedSchedule.duration
          ? dayjs(selectedSchedule.start_time, "HH:mm:ss").add(
              selectedSchedule.duration,
              "second"
            )
          : null;

      setFormData({
        client: selectedSchedule.client,
        client_id: selectedSchedule.client_id,
        project: selectedSchedule.project,
        use_time_zone:
          selectedSchedule.use_time_zone || "America/Los_Angeles",
        minimum_time: selectedSchedule.minimum_time
          ? (selectedSchedule.minimum_time / 3600).toFixed(1).replace(/\.0$/, "")
          : "",
        start_time: startTime,
        end_time: endTime,
        effective_from: selectedSchedule.effective_from
          ? dayjs(selectedSchedule.effective_from)
          : null,
        repeat_until: selectedSchedule.repeat_until
          ? dayjs(selectedSchedule.repeat_until)
          : null,
        recurring_option: selectedSchedule.repeat_until ? "until_date" : "forever",
        schedule_type: selectedSchedule.schedule_type || "weekly",
        member_name: selectedSchedule.member_name,
        user_id: selectedSchedule.user_id,
      });
    } else if (open && mode === "create") {
      setFormData({
        client: null,
        client_id: null,
        project: null,
        use_time_zone: "America/Los_Angeles",
        minimum_time: "",
        start_time: null,
        end_time: null,
        effective_from: null,
        repeat_until: null,
        recurring_option: "forever",
        schedule_type: "weekly",
        member_name: null,
        user_id: null,
      });
    }
  }, [open, mode, selectedSchedule]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (value) => {
    const client = scheduleFilters?.clients?.find(
      (c) => c.client_id === value
    );
    setFormData((prev) => ({
      ...prev,
      client: client?.client,
      client_id: client?.client_id,
    }));
  };

  const handleMemberChange = (value) => {
    const member = scheduleFilters?.members?.find(
      (m) => m.user_id === value
    );
    setFormData((prev) => ({
      ...prev,
      member_name: member?.member_name,
      user_id: member?.user_id,
    }));
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!formData.user_id && mode === "create") {
      toast.error("Please select a member");
      return;
    }
    if (!formData.start_time || !formData.end_time) {
      toast.error("Please select shift duration");
      return;
    }
    if (!formData.effective_from) {
      toast.error("Please select effective from date");
      return;
    }

    setLoading(true);

    const startTimeStr = formData.start_time?.format("HH:mm");
    const endTimeStr = formData.end_time?.format("HH:mm");

    // Calculate duration in seconds
    const startMinutes =
      formData.start_time?.hour() * 60 + formData.start_time?.minute();
    const endMinutes =
      formData.end_time?.hour() * 60 + formData.end_time?.minute();
    let durationMinutes = endMinutes - startMinutes;
    if (durationMinutes < 0) durationMinutes += 24 * 60;
    const duration = durationMinutes * 60;

    const minimumTime = formData.minimum_time
      ? parseFloat(formData.minimum_time) * 3600
      : null;

    const body = {
      user_id: formData.user_id || selectedSchedule?.user_id,
      organization_id: selectedSchedule?.organization_id || 323982,
      start_date: formData.effective_from?.format("YYYY-MM-DD"),
      use_time_zone: formData.use_time_zone,
      start_time: startTimeStr,
      duration: duration,
      minimum_time: minimumTime,
      repeat_schedule: formData.schedule_type,
      repeat_until:
        formData.recurring_option === "forever"
          ? null
          : formData.repeat_until?.format("YYYY-MM-DD"),
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      member_name: formData.member_name || selectedSchedule?.member_name,
      client: formData.client,
      client_id: formData.client_id,
      project: formData.project,
      team_lead: selectedSchedule?.team_lead,
      team_lead_id: selectedSchedule?.team_lead_id,
      status: "active",
    };

    const handleResponse = (success) => {
      if (success) {
        toast.success(
          mode === "create"
            ? "Schedule created successfully"
            : "Schedule updated successfully"
        );
        onClose();
        onSuccess?.();
      } else {
        toast.error(
          mode === "create"
            ? "Error creating schedule"
            : "Error updating schedule"
        );
      }
      setLoading(false);
    };

    if (mode === "create") {
      dispatch(createSchedule(body, handleResponse));
    } else {
      dispatch(updateSchedule(selectedSchedule?.id, body, handleResponse));
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-[#163143] font-poppins text-[20px] font-semibold">
            {mode === "create" ? "Create Schedule" : "Edit Schedule"}
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
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width={600}
    >
      <div className="flex flex-col gap-6 px-4">
        {/* Top buttons */}
        <div className="flex justify-end gap-3">
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

        {/* Member (create only) */}
        {mode === "create" && (
          <div>
            <label className="block text-[14px] font-semibold text-[#163143] mb-2">
              Member<span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="Select Member"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={scheduleFilters?.members?.map((item) => ({
                value: item?.user_id,
                label: item?.member_name,
              }))}
              onChange={handleMemberChange}
              value={formData.user_id}
              className="w-full custom-select-forms"
              popupClassName="custom-select-dropdown"
              style={{ height: "44px" }}
            />
          </div>
        )}

        {/* Client */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Client<span className="text-red-500">*</span>
          </label>
          <Select
            showSearch
            placeholder="Select Client"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={scheduleFilters?.clients?.map((item) => ({
              value: item?.client_id,
              label: item?.client,
            }))}
            onChange={handleClientChange}
            value={formData.client_id}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Project<span className="text-red-500">*</span>
          </label>
          <Select
            showSearch
            placeholder="Select Project"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={scheduleFilters?.projects?.map((item) => ({
              value: item?.project,
              label: item?.project,
            }))}
            onChange={(value) => handleChange("project", value)}
            value={formData.project}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Time Zone<span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select Time Zone"
            options={TIMEZONE_OPTIONS}
            onChange={(value) => handleChange("use_time_zone", value)}
            value={formData.use_time_zone}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>

        {/* Minimum Hours */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Minimum Hours<span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g. 7.5"
            value={formData.minimum_time}
            onChange={(e) => handleChange("minimum_time", e.target.value)}
            style={{ height: "44px" }}
          />
        </div>

        {/* Shift Duration */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Shift Duration<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-[12px] text-[#6B7280] mb-1">From</div>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={formData.start_time}
                onChange={(time) => handleChange("start_time", time)}
                className="w-full schedule-time-picker"
                style={{ height: "44px", borderRadius: "24px", border: "1px solid #D7E6E7" }}
                suffixIcon={<Icon icon="mdi:clock-outline" className="text-[#69C920] text-[18px]" />}
              />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-[#6B7280] mb-1">To</div>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={formData.end_time}
                onChange={(time) => handleChange("end_time", time)}
                className="w-full schedule-time-picker"
                style={{ height: "44px", borderRadius: "24px", border: "1px solid #D7E6E7" }}
                suffixIcon={<Icon icon="mdi:clock-outline" className="text-[#69C920] text-[18px]" />}
              />
            </div>
          </div>
        </div>

        {/* Schedule Period */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Schedule Period<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-[12px] text-[#6B7280] mb-1">
                Effective From
              </div>
              <DatePicker
                value={formData.effective_from}
                onChange={(date) => handleChange("effective_from", date)}
                className="w-full schedule-date-picker"
                style={{ height: "44px", borderRadius: "24px", border: "1px solid #D7E6E7" }}
                format="ddd, MMM D, YYYY"
                suffixIcon={<Icon icon="mdi:calendar-outline" className="text-[#69C920] text-[18px]" />}
              />
            </div>
            <div className="flex-1">
              <div className="text-[12px] text-[#6B7280] mb-1">To</div>
              <DatePicker
                value={formData.repeat_until}
                onChange={(date) => handleChange("repeat_until", date)}
                className="w-full schedule-date-picker"
                style={{ height: "44px", borderRadius: "24px", border: "1px solid #D7E6E7" }}
                format="ddd, MMM D, YYYY"
                disabled={formData.recurring_option === "forever"}
                suffixIcon={<Icon icon="mdi:calendar-outline" className="text-[#69C920] text-[18px]" />}
              />
            </div>
          </div>
        </div>

        {/* Recurring Shift Options */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Recurring Shift Options<span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select option"
            options={RECURRING_OPTIONS}
            onChange={(value) => {
              handleChange("recurring_option", value);
              if (value === "forever") {
                handleChange("repeat_until", null);
              }
            }}
            value={formData.recurring_option}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>
      </div>
    </Drawer>
  );
}
