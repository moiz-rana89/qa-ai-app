"use client";

import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const rangePresets = [
  {
    label: "Today",
    value: [dayjs().startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "Last 7 Days",
    value: [dayjs().subtract(6, "day"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().subtract(29, "day"), dayjs()],
  },
];

export default function AntDRangePicker({
  onChange,
  startPlaceholder,
  endPlaceholder,
  className,
  defaultValue,
  // Optional controlled value — e.g. [dayjs, dayjs] | null. Every existing
  // call site omits this and keeps the old display-only-controlled
  // behavior; passing it lets a parent restore/reset the visible range
  // (used by the Reporting page to persist each submenu's date range
  // across a tab switch, and to reset it on a cadence change).
  value: controlledValue,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(controlledValue || defaultValue || null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const hasEndDate = Boolean(value?.[1]);

  return (
    <RangePicker
      value={value}
      onChange={(date, dateString) => {
        onChange(dateString);
        setValue(date);
      }}
      open={open}
      onOpenChange={setOpen}
      presets={rangePresets}
      format="YYYY-MM-DD"
      placeholder={[
        startPlaceholder ? startPlaceholder : "Select Due Date",
        endPlaceholder ? endPlaceholder : "",
      ]}
      separator=" - "
      className={`${className} range-picker ${
        hasEndDate ? "expanded" : "collapsed"
      }`}
      prefix={
        <Icon
          icon="majesticons:calendar"
          width={18}
          style={{ color: "#69C920", marginRight: 5 }}
        />
      }
      suffixIcon={
        <Icon
          icon="icon-park-outline:down"
          width={18}
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      }
      style={{ borderRadius: 32 }}
    />
  );
}
