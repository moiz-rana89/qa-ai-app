"use client";
import { DynamicFormSection } from "./DynamicFormSection.jsx";
import { getFormTypeById } from "../../utils/custom-form-data.js";
import { DynamicFormExtraQuestion } from "./DynamicFormExtraQuestion.jsx";

export function CustomerServiceSection({
  selectedFormType,
  responses,
  includedQuestions,
  onResponseChange,
  onCommentChange,
  onIncludeChange,
  setSectionScore,
  sectionScore,
  setQuestions,
  sectionQuestions,
  commentResponses,
  handleResponseExtraChange,
  setExtraSectionQuestions,
  extraSectionQuestions,
  responsesExtra,
}) {
  const formType = getFormTypeById(selectedFormType);
  if (!formType) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800">
          Please select a monitoring type from the Form Overview section
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-[#163143]">
      <h2 className="text-[18px] font-[400] pt-6">{formType.title}</h2>

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
      <div className="">
        {formType.sections.map((section) => (
          <DynamicFormSection
            key={section.id}
            section={section}
            responses={responses}
            commentResponses={commentResponses}
            includedQuestions={includedQuestions}
            onResponseChange={onResponseChange}
            onCommentChange={onCommentChange}
            onIncludeChange={onIncludeChange}
            setSectionScore={setSectionScore}
            sectionScore={sectionScore}
            sectionQuestions={sectionQuestions}
            setQuestions={setQuestions}
          />
        ))}
        {formType.extraSections.map((section) => (
          <DynamicFormExtraQuestion
            key={section.id}
            section={section}
            responses={responsesExtra}
            commentResponses={commentResponses}
            includedQuestions={includedQuestions}
            onResponseChange={handleResponseExtraChange}
            onCommentChange={onCommentChange}
            onIncludeChange={onIncludeChange}
            setSectionScore={setSectionScore}
            sectionScore={sectionScore}
            sectionQuestions={extraSectionQuestions}
            setQuestions={setExtraSectionQuestions}
          />
        ))}
      </div>
    </div>
  );
}
