import { useState, useRef, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";

const CustomSelect = ({ value, onChange, placeholder, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-20" ref={dropdownRef}>
      {/* Select Box */}
      <div
        className="flex items-center justify-between border border-gray-300 rounded-md px-2 py-1 cursor-pointer hover:border-gray-400"
        onClick={() => setOpen(!open)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value ?? placeholder}
        </span>
        <DownOutlined
          className="text-[#69C920] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {/* Dropdown Options */}
      {open && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-50 max-h-40 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
