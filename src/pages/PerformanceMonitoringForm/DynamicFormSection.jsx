"use client";

import { useEffect, useState } from "react";
import { RatingDropdown } from "./RatingDropdown.jsx";
import { calculateSectionScore } from "../../utils/PC-form-data.js";

export function DynamicFormSection({
  section,
  responses,
  includedQuestions,
  onResponseChange,
  onIncludeChange,
  setSectionScore,
  sectionScore,
  setQuestions,
  sectionQuestions,
  missingQuestions,
}) {
  // const [isExpanded, setIsExpanded] = useState(section.id === "knowledge"); // Default expanded for knowledge section
  const [isExpanded, setIsExpanded] = useState(); // Default expanded for knowledge section

  const { current, total } = calculateSectionScore(
    section,
    responses,
    includedQuestions
  );

  function upsert(arr, newObj, field) {
    const index = arr.findIndex((item) => item.id === newObj.id);
    if (index > -1) {
      arr[index][field] = newObj[field];
    } else {
      arr.push(newObj);
    }
    return arr;
  }

  useEffect(() => {
    const objParam = { title: section.title, score: current, id: section.id };
    upsert(sectionScore, objParam, "score");
    setSectionScore([]);
    setSectionScore(sectionScore);
  }, [current]);

  useEffect(() => {
    const objParam = {
      title: section.title,
      id: section.id,
      questions: section?.questions?.map((item) => ({
        id: item.id,
        question: item.label,
        answers: "",
        // isOptional: item.isOptional,
      })),
    };

    sectionQuestions.push(objParam);
    setQuestions(sectionQuestions);
  }, [section]);

  function updatePoints(arr, id, value) {
    return arr?.map((item) =>
      item.id === id ? { ...item, answers: value } : item
    );
  }
  const handleChangeResponse = (secId, questionId, value) => {
    const sectionSelected = sectionQuestions?.find((item) => item.id == secId);
    let updated = updatePoints(sectionSelected?.questions, questionId, value);

    const objParam = { ...sectionSelected, questions: updated };
    upsert(sectionQuestions, objParam, "questions");
    setQuestions(sectionQuestions);
  };
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
          <div className={`flex items-center gap-3`}>
            <span className="text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
              {section.title}
            </span>
            <span
              className={`text-[14px] px-[16px] py-[2px] border-[${
                missingQuestions?.missingSections?.includes(section.title) &&
                current != total
                  ? "#FF5546"
                  : "#69C920"
              }] rounded-[30px] border-[1px]`}
            >
              Required Questions: {current}/{total}
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
                id={question.id}
                label={question.label}
                sublabel={question.sublabel}
                value={responses[question.id] || ""}
                answer={question.answers}
                onChange={(value) => {
                  onResponseChange(question.id, value);
                  handleChangeResponse(section?.id, question.id, value);
                }}
                showToggle={question.isOptional}
                isIncluded={
                  question.isOptional
                    ? includedQuestions[question.id]
                      ? includedQuestions[question.id]
                      : false
                    : true
                }
                onToggleChange={(included) =>
                  onIncludeChange(question.id, included)
                }
                errorBorder={missingQuestions?.missingQuestions?.includes(
                  question.id
                )}
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
