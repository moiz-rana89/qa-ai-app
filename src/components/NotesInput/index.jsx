import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;
export const NotesInput = ({
  onChange,
  placeholder,
  notes,
  minRows,
  borderColor = "#D7E6E7",
  limit = true,
}) => {
  return (
    <div className="space-y-2">
      <TextArea
        className={`!mt-[10px] !bg-[#FBFBFB] !rounded-[12px] focus:!shadow-none focus:!border-[#EFEFEF] hover:!border-[#EFEFEF]`}
        id="notes"
        placeholder={placeholder}
        autoSize={{ minRows: minRows ? minRows : 5 }}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        style={{
          borderColor: notes?.trim()?.length >= 70 ? "#D7E6E7" : borderColor,
        }}
      />
      {limit && (
        <span
          style={{
            color:
              notes?.trim()?.length >= 70
                ? "#16314380"
                : notes?.trim()?.length >= 0
                ? "red"
                : "#16314380",
            fontSize: "14px",
          }}
        >
          The minimum character limit is{" "}
          {notes?.trim()?.length ? notes?.trim()?.length : 0}
          /70
        </span>
      )}
    </div>
  );
};
