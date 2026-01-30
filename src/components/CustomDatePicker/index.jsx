import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DatePicker
      value={value ? dayjs(value) : null}
      onChange={onChange}
      placeholder={placeholder}
      format="YYYY-MM-DD"
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      className={`w-[50%] ${hasError ? "custom-date-error" : "custom-date"}`}
      popupClassName="custom-date-dropdown"
      style={{
        height: "50px",
        borderRadius: "32px",
        borderColor: hasError ? "#ff5546" : isOpen ? "#69c920" : "#D7E6E7",
        outline: "none",
        boxShadow: "none",
      }}
    />
  );
};

export default CustomDatePicker;
