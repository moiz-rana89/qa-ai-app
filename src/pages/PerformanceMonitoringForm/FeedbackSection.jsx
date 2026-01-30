"use client";

import { useEffect, useState } from "react";
import { NotesInput } from "../../components/NotesInput";
import { Input, Select } from "antd";
import CustomDatePicker from "../../components/CustomDatePicker/index.jsx";

function DropDownSection({ children, title, borderColor }) {
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
            <span
              className={`text-[14px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[10px]`}
            >
              {title}
            </span>
            {borderColor ? (
              <span
                className={`text-[14px] px-[16px] py-[2px] border-[${borderColor}] rounded-[30px] border-[1px]`}
              >
                Required Questions
              </span>
            ) : null}
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

        {isExpanded && <div className="p-4 space-y-4">{children}</div>}
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

const intialFormData = {
  q1: {
    question:
      "What went well in the agent’s performance during this review—across task execution, communication, initiative, time management, and collaboration?",
    answer: "",
  },
  q2: {
    question:
      "Are there specific performance metrics where the agent needs improvement?",
    answer: [],
    notes: "",
  },
  q3: {
    question:
      "What do you believe is the root cause of the performance issue(s)?",
    answer: [],
  },
  q4: {
    question: "Why did you select this specific Root Cause?",
    answer: "",
  },
  q5: {
    question: "Smart Goal Statement",
    answer: [
      {
        question:
          "Specific: The goal should clearly state what needs to be done, who is responsible, and what the expected outcome is.",
        answer: "",
      },
      {
        question:
          "Measurable: The goal should include a way to track progress or success (e.g., metrics, completion status, counts).",
        answer: "",
      },
      {
        question:
          "Achievable: The goal should be realistic and within the agent’s control, given their tools, training, and workload.",
        answer: "",
      },
      {
        question:
          "Relevant: The goal should directly relate to the agent’s role, responsibilities, or performance focus.",
        answer: "",
      },
      {
        question:
          "Time-Bound: The goal should have a clear deadline or time frame for completion or review.",
        answer: "",
      },
    ],
  },
  q6: {
    question:
      "Is the agent currently at risk of being off boarded or replaced?",
    answer: "",
  },
  q7: {
    question: "Agent's Commitment",
    answer: [
      {
        question:
          "Start: Identify a new action, habit, or behavior the agent will begin doing to improve performance.",
        answer: "",
      },
      {
        question:
          "Stop: Highlight an action, habit, or behavior the agent should stop doing because it’s unproductive, incorrect, or misaligned with expectations.",
        answer: "",
      },
      {
        question:
          "Continue: Reinforce an action or behavior the agent is already doing well and should keep doing consistently.",
        answer: "",
      },
    ],
  },
  q8: { question: "Team Lead's Commitment", answer: "" },
  q9: {
    question:
      "Is there anything else we should note about this coaching session? Optional",
    answer: "",
  },
  fathom: {
    question:
      "Please share the Fathom recording URL for this performance coaching session?",
    answer: "",
  },
  pc_date: {
    question: "When was this Performance Coaching session conducted?",
    answer: "",
  },
};

export function FeedbackSection({ onUpdate, selectedTypes, missingQuestions }) {
  const charLimit = 70;
  const [formData, setFormData] = useState(intialFormData);
  useEffect(() => {
    setFormData(intialFormData);
  }, [selectedTypes]);
  const performanceMetrics = [
    "First Response Time",
    "Resolution Time",
    "Response Follow-Up (Between First Response and Resolution)",
    "Ticket/Task Productivity",
    "Ticket Quality (Customer Service)",
    "Task Quality (Brand Concierge/Growth Assistant)",
    "Attendance",
    "Hubstaff Activity Rate",
    "Idle Time",
    "Internal Communication",
    "Client Communication",
    "Proactive Communication",
    "CSAT",
    "Core Values (Over Deliver, Over Communicate, Empower Our Talent, Self Learning, Question the Status Quo, Team Player, Positive Daily Mindset)",
    "TalentPop/Client SLAs",
    "Average Handle Time (Tickets Per Hour)",
    "Average Handle Time (Phone)",
    "Missed Calls (Phone)",
    "Feedback Receptiveness/Implementation",
    "None",
    "Other",
  ];
  const performanceIssues = [
    "Knowledge Factors: Is there a gap in product knowledge, training, or understanding that's affecting performance? (e.g., not trained on updates, lack of brand/product knowledge, unsure how to handle certain issues)",
    "Skill Factors: Does the team member lack the necessary skills to perform effectively? (e.g., communication, time management, adapting to tools or processes)",
    "Process Factors: Is there a broken, unclear, or missing process contributing to the issue? (e.g., gaps in SOPs, lack of documentation, inefficient workflows)",
    "System Factors: Are the tools or systems the agent relies on slow, unreliable, or not fit for the task? (e.g., tech issues, tool limitations, system downtime)",
    "Motivation Factors: Is the agent's level of motivation, engagement, or job satisfaction affecting their performance? (e.g., burnout, low morale, lack of alignment with company culture)",
    "Workload Constraints: Is the agent's performance being impacted by high task volume, competing priorities, or insufficient time to complete work effectively? (e.g., unrealistic workload, competing deadlines, not enough time to complete tasks effectively)",
    "Client-Related Factors: Is the agent's performance being impacted by client dynamics that are outside the agent's control? (e.g., delayed feedback loops, shifting goals, inconsistent point-of-contact communication)",
    "N/A: Select N/A if not applicable",
  ];
  const toggleInArray = (arr, item) =>
    arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];

  const updateAnswer = (key, value, subIndex) => {
    setFormData((prev) => {
      const next = structuredClone(prev); // cleaner deep copy

      // case 1: updating a nested subquestion
      if (subIndex !== undefined) {
        next[key].answer[subIndex].answer = value;
      }
      // case 2: full question object update (includes answer + notes)
      else if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value.answer !== undefined
      ) {
        next[key] = value;
      }
      // case 3: normal direct answer update (previous behavior)
      else {
        next[key].answer = value;
      }

      onUpdate?.(next);
      return next;
    });
  };

  const checkValidity = (question) => {
    return missingQuestions?.genericQuestions?.includes(question);
  };
  function hasKey(key) {
    return missingQuestions?.genericQuestions?.some(
      (item) => item === key || item.startsWith(`${key}[`)
    );
  }
  function allAnswersValid(array) {
    return array.every(
      (item) =>
        typeof item.answer === "string" && item.answer.trim().length >= 70
    );
  }

  return (
    <div className="space-y-6  text-[#163143] font-[400] mt-6">
      <div>
        <label
          style={{
            width: "max-content",
            // border: checkValidity("fathom") ? `1px solid #FF5546` : "none",
          }}
          className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[4px] rounded-[10px] mb-3"
        >
          {formData?.fathom?.question}
        </label>
        <Input
          type="url"
          value={formData.fathom.answer}
          onChange={(e) => updateAnswer("fathom", e.target.value)}
          placeholder="Please only submit one ticket URL per submission"
          className={`!w-[50%] h-[50px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[${
            checkValidity("fathom") && formData.fathom.answer?.length == 0
              ? "#FF5546"
              : "#D7E6E7"
          }] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200`}
        />
      </div>
      <div>
        <label
          style={{
            width: "max-content",
          }}
          className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[4px] rounded-[10px] mb-3"
        >
          {formData?.pc_date?.question}
        </label>
        <CustomDatePicker
          value={formData?.pc_date?.answer}
          onChange={(date, dateString) => updateAnswer("pc_date", dateString)}
          hasError={
            checkValidity("pc_date") && formData?.pc_date?.answer?.length == 0
          }
        />
      </div>
      <div>
        <div className="flex">
          <label
            style={{
              width: "max-content",
              // border: checkValidity("q1") ? `1px solid #FF5546` : "none",
            }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[4px] rounded-[10px] mb-3"
          >
            {formData?.q1?.question}
          </label>
          {/* <span className="text-red-500 ml-2">*</span> */}
        </div>
        <NotesInput
          notes={formData.q1.answer}
          borderColor={checkValidity("q1") ? "#FF5546" : null}
          onChange={(value) => updateAnswer("q1", value)}
          placeholder="Please provide a detailed response"
        />
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

      <div>
        <DropDownSection
          title={formData?.q2?.question}
          borderColor={
            checkValidity("q2") && formData.q2.answer?.length == 0
              ? "#FF5546"
              : null
          }
        >
          {performanceMetrics.map((item) => (
            <label key={item} className="flex gap-[16px]">
              <input
                id={item}
                type="checkbox"
                className="custom-checkbox"
                style={{ marginTop: "4px" }}
                checked={formData.q2.answer.includes(item)}
                onChange={() =>
                  updateAnswer("q2", toggleInArray(formData.q2.answer, item))
                }
              />
              <span className="text-[#163143] font-poppins text-[14px]">
                {item}
              </span>
            </label>
          ))}
          <NotesInput
            // borderColor={checkValidity("q2_notes") ? "#FF5546" : null}
            notes={formData?.q2?.notes || ""}
            onChange={(value) => {
              updateAnswer("q2", {
                ...formData.q2,
                notes: value,
              });
            }}
            placeholder="Please provide the details here"
            limit={false}
          />
        </DropDownSection>
      </div>

      <div>
        <DropDownSection
          title={formData?.q3?.question}
          borderColor={
            checkValidity("q3") && formData.q3.answer?.length == 0
              ? "#FF5546"
              : null
          }
        >
          {performanceIssues?.map((item) => (
            <label className="flex gap-[16px]">
              <input
                id={item}
                type="checkbox"
                className="custom-checkbox"
                style={{ marginTop: "4px" }}
                checked={formData.q3.answer.includes(item)}
                onChange={() =>
                  updateAnswer("q3", toggleInArray(formData.q3.answer, item))
                }
              ></input>
              <span className="text-[#163143] font-poppins text-[14px] not-italic font-normal leading-[20px]">
                <span className="font-semibold"> {item?.split(":")?.[0]} </span>
                : {item?.split(":")?.[1]}
              </span>
            </label>
          ))}
        </DropDownSection>
      </div>

      <div>
        <div className="flex">
          <label
            style={{ width: "max-content" }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[4px] rounded-[10px] mb-3"
          >
            {formData?.q4?.question}
          </label>
          {/* <span className="text-red-500 ml-2">*</span> */}
        </div>
        <NotesInput
          notes={formData.q4.answer}
          borderColor={checkValidity("q4") ? "#FF5546" : null}
          onChange={(value) => updateAnswer("q4", value)}
          placeholder="Please provide a detailed response"
        />
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
      <div>
        <DropDownSection
          title={formData?.q5?.question}
          borderColor={
            (checkValidity("q5") || hasKey("q5")) &&
            !allAnswersValid(formData.q5.answer)
              ? "#FF5546"
              : null
          }
        >
          {formData?.q5?.answer?.map((item, idx) => (
            <label className="flex flex-col" id={item?.question}>
              <span className="text-[#163143] my-2 font-poppins text-[14px] not-italic font-normal leading-[20px]">
                <span className="font-semibold">
                  {" "}
                  {item?.question?.split(":")?.[0]}{" "}
                </span>
                : {item?.question?.split(":")?.[1]}
              </span>
              <NotesInput
                notes={formData.q5.answer[idx].answer}
                borderColor={
                  checkValidity(`q5[${idx}]`) || checkValidity("q5")
                    ? "#FF5546"
                    : null
                }
                onChange={(value) => updateAnswer("q5", value, idx)}
                placeholder="Please provide a detailed response"
              />
            </label>
          ))}
        </DropDownSection>
      </div>

      <div>
        <DropDownSection
          title={formData?.q6?.question}
          borderColor={
            (checkValidity("q6") || hasKey("q6")) &&
            formData.q6.answer?.length == 0
              ? "#FF5546"
              : null
          }
        >
          <label className="flex flex-col">
            <span className="text-[#163143] my-2 font-poppins text-[14px] not-italic font-normal leading-[20px]">
              Select "Yes" only if continued performance issues will likely lead
              to removal from the account.
            </span>
            <Select
              showSearch
              placeholder="Select Yes or No"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
                {
                  value: "No",
                  label: "No",
                },
              ]}
              value={formData.q6.answer || undefined}
              onChange={(val) => updateAnswer("q6", val)}
              className={`w-[50%] ${
                checkValidity("q6") && formData.q6.answer?.length == 0
                  ? "custom-select-forms-error"
                  : "custom-select"
              }`}
              popupClassName="custom-select-dropdown"
              style={{
                height: "42px",
                marginTop: "16px",
              }}
            />
          </label>
        </DropDownSection>
      </div>

      <div>
        <DropDownSection
          title={formData?.q7?.question}
          borderColor={
            (checkValidity("q7") || hasKey("q7")) &&
            !allAnswersValid(formData.q7.answer)
              ? "#FF5546"
              : null
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex flex-col w-full text-[14px] bg-[#F1F5F5] px-[16px] py-[15px] rounded-[10px]">
              <span className="mb-[25px]">
                What is the agent committing to moving forward? Please use the{" "}
                <span className="font-semibold"> Start, Stop, Continue </span>{" "}
                method to outline clear, actionable, commitments.
              </span>
              <span>Example:</span>
              <span>Start:</span>
              <span>
                Set aside 1–2 hours per week to review client SOPs and use
                downtime to proactively check client resources.
              </span>
              <span>Stop:</span>
              <span>
                Providing only one solution to customer issues without offering
                alternatives.
              </span>
              <span>Continue:</span>
              <span>
                Responding to customer queries in real time to avoid unnecessary
                delays.
              </span>
            </span>
          </div>
          {formData?.q7?.answer?.map((item, idx) => (
            <label className="flex flex-col" id={item?.question}>
              <span className="text-[#163143] my-2 font-poppins text-[14px] not-italic font-normal leading-[20px]">
                <span className="font-semibold">
                  {" "}
                  {item?.question?.split(":")?.[0]}{" "}
                </span>
                : {item?.question?.split(":")?.[1]}
              </span>
              <NotesInput
                notes={formData.q7.answer[idx].answer}
                borderColor={
                  checkValidity(`q7[${idx}]`) || checkValidity("q7")
                    ? "#FF5546"
                    : null
                }
                onChange={(value) => updateAnswer("q7", value, idx)}
                placeholder="Please provide a detailed response"
              />
            </label>
          ))}
        </DropDownSection>
      </div>
      <div>
        <DropDownSection
          title={formData?.q8?.question}
          borderColor={
            (checkValidity("q8") || hasKey("q8")) &&
            formData.q8.answer?.length < 70
              ? "#FF5546"
              : null
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex flex-col w-full text-[14px] bg-[#F1F5F5] px-[16px] py-[15px] rounded-[10px]">
              <span className="mb-[5px]">Example:</span>
              <span>
                1) I will schedule quick weekly check-ins to review the agent’s
                understanding of the client SOPs and clarify any confusing
                areas.
              </span>
              <span>
                2) I will prepare 2–3 quiz-style questions or fastball scenarios
                per week to reinforce SOP retention and application.
              </span>
              <span>
                3) I will review a small sample of recent tickets to check for
                improvement in solution variety and real-time responsiveness.
              </span>
              <span>
                4) I will follow up after 2 days to evaluate consistency and
                ensure the action plan is being implemented effectively.
              </span>
            </span>
          </div>
          <NotesInput
            notes={formData.q8.answer}
            borderColor={checkValidity(`q8`) ? "#FF5546" : null}
            onChange={(value) => updateAnswer("q8", value)}
            placeholder="Please provide a detailed response"
          />
        </DropDownSection>
      </div>
      <div>
        <div className="flex">
          <label
            style={{ width: "max-content" }}
            className="block text-[14px] bg-[#F1F5F5] px-[16px] py-[4px] rounded-[10px] mb-3"
          >
            {formData?.q9?.question}
          </label>
        </div>
        <NotesInput
          notes={formData.q9.answer}
          onChange={(value) => updateAnswer("q9", value)}
          placeholder="Please provide a detailed response"
          limit={false}
        />
      </div>
    </div>
  );
}
