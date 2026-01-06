import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DownOutlined } from "@ant-design/icons";

const CustomSelect = ({ value, onChange, placeholder, options }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Outside click handling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position syncing on scroll/resize
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <div className="relative w-20" ref={triggerRef}>
        <div
          className="flex items-center justify-between border border-gray-300 rounded-md px-2 py-1 cursor-pointer hover:border-gray-400"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={value ? "text-black" : "text-gray-400"}>
            {value ?? placeholder}
          </span>
          <DownOutlined
            className="text-[#69C920] transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open &&
        position &&
        createPortal(
          <ul
            ref={dropdownRef}
            className="bg-white border border-gray-300 rounded-md shadow-md z-[9999] max-h-40 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value); // parent state updates correctly
                  setOpen(false);
                }}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-[14px] text-[#163143]"
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};

export default CustomSelect;
