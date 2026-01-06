"use client";

import { useState } from "react";
import { roundTo } from "../../../utils/helperFunctions";
import QuestionItem from "./QuestionItem";

const CategorySection = ({
  category,
  scores,
  notes,
  onScoreChange,
  onNotesChange,
  totalScore,
  maxScore,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              {category.category_name}
            </span>
            <span className="text-[14px] px-[16px] py-[2px] bg-[#FFFFFF] rounded-[30px] border-[1px] border-[#69C920]">
              {roundTo(totalScore, 1)}/{maxScore}
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

        <div
          className={`transition-all duration-200 ease-in-out ${
            isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 border-t border-gray-100">
            {category.questions.map((question, index) => (
              <QuestionItem
                key={question.question_id}
                question={question}
                index={index}
                score={scores[question.question_id]}
                note={notes[question.question_id]}
                onScoreChange={onScoreChange}
                onNotesChange={onNotesChange}
              />
            ))}
          </div>
        </div>
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
};

export default CategorySection;
