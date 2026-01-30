"use client";

import { useState } from "react";
import { NotesInput } from "../../components/NotesInput";

export function RatingDropdown({
  label,
  id,
  sublabel,
  value,
  answers,
  onChange,
  showToggle = false,
  toggleValue = "Included",
  isIncluded = false,
  onToggleChange,
  errorBorder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newIncluded = !isIncluded;
    onToggleChange?.(newIncluded);
  };

  return (
    <div className="space-y-3 text-[#163143]">
      <div className="flex flex-col items-start gap-4">
        <div className="flex-1">
          <p
            className={`text-sm leading-relaxed ${
              !isIncluded ? "opacity-50" : ""
            }`}
          >
            {label}
          </p>
          <p className={`text-sm mt-1 ${!isIncluded ? "opacity-50" : ""}`}>
            ({id})
          </p>
          {showToggle && (
            <div className="mt-2">
              <button
                type="button"
                onClick={handleToggle}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  isIncluded
                    ? "text-[#69C920] border-[#69C920]"
                    : "text-red-700 border-[#FF5546]"
                }`}
              >
                {/* {isIncluded ? "✓ Included" : "✗ Excluded"} */}
                {isIncluded ? (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                    >
                      <path
                        d="M5.15218 12C4.93711 12 4.73055 11.9037 4.57802 11.7314L0.237913 6.82991C-0.0793043 6.47181 -0.0793043 5.89101 0.237913 5.53272C0.554957 5.17443 1.06935 5.17424 1.38639 5.53272L5.11882 9.74764L12.5819 0.306314C12.8806 -0.0712055 13.3939 -0.104562 13.7287 0.232929C14.0633 0.570421 14.0925 1.15024 13.7937 1.52815L5.75795 11.6935C5.60924 11.8817 5.39834 11.9923 5.17511 11.9996C5.16746 11.9998 5.15982 12 5.15218 12Z"
                        fill="#69C920"
                      />
                    </svg>
                    <div className="text-[14px] text-[#163143] ml-2">
                      Included
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M13 13L1 1M13 1L1 13"
                        stroke="#FF5546"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <div className="text-[14px] text-[#163143] ml-2">
                      Excluded
                    </div>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
        <div className="w-full">
          <NotesInput
            notes={value}
            borderColor={errorBorder ? "#FF5546" : "#D7E6E7"}
            onChange={(value) => {
              onChange(value);
              // setIsOpen(false);
            }}
            placeholder="Please provide a detailed response"
          />
        </div>
      </div>
    </div>
  );
}
