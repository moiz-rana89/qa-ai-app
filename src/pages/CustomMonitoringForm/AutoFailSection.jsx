"use client";

import { useState } from "react";
import { RatingDropdown } from "./RatingDropdown.jsx";
import { calculateAutoFailDeduction } from "../../utils/custom-form-data.js";

// Zero-tolerance / auto-fail checklist — only rendered when a form
// declares an autoFailSection (currently just Gamer Supps). Unlike the
// normal sections, this isn't part of the 100-point total; each answer
// just contributes a negative deduction, shown here and subtracted from
// the earned score in calculateTotalFormScore.
export function AutoFailSection({ section, responses, onResponseChange }) {
  const [isExpanded, setIsExpanded] = useState();

  const deduction = calculateAutoFailDeduction(section, responses);

  return (
    <div>
      <div className="mb-6 mt-6">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between text-left  ${
            isExpanded ? "rounded-t-xl" : "rounded-xl"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
              {section.title}
            </span>
            <span
              className={`text-[14px] px-[16px] py-[2px] bg-[#FFFFFF] rounded-[30px] border-[1px] ${
                deduction > 0
                  ? "border-[#FF5546] text-[#FF5546]"
                  : "border-[#69C920]"
              }`}
            >
              {deduction > 0 ? `-${deduction.toFixed(1)}` : "0.0"} deduction
            </span>
          </div>
          <div className="bg-white rounded-full border-[1px] border-[#D7E6E7] p-1">
            <svg
              className={`w-5 h-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {section.questions.map((question) => (
              <RatingDropdown
                key={question.id}
                label={question.label}
                sublabel={question.sublabel}
                value={responses[question.id] || ""}
                inputType={question.inputType}
                options={question.options}
                isIncluded={true}
                showToggle={false}
                onChange={(value) => onResponseChange(question.id, value)}
              />
            ))}
          </div>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 1H100" stroke="#D7E6E7" />
      </svg>
    </div>
  );
}
