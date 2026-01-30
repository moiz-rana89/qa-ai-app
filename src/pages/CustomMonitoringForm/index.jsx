"use client";

import React from "react";
import { useEffect, useState } from "react";
import { FormOverview } from "./FormOverview";
import { BasicInfoSection } from "./BasicInfoSection";
import { CustomerServiceSection } from "./CustomerServiceSection";
import {
  getFormTypeById,
  calculateTotalFormScore,
  formTypes,
} from "../../utils/custom-form-data.js";

import axios from "axios";
import toast from "react-hot-toast";
import { InformationSection } from "./InformationSection";

export function CustomMonitoringForm() {
  const [formData, setFormData] = useState({
    ticketTypes: [],
    agentName: "",
    clientVersion: "",
    agentId: 0,
    clientId: 0,
    ticketUrl: "",
    additionalNotes: "",
  });

  const [responses, setResponses] = useState({});
  const [responsesExtra, setResponsesExtra] = useState({});

  const [commentResponses, setCommentResponses] = useState({});

  const [includedQuestions, setIncludedQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [typeScores, setTypeScores] = useState({});
  const [sectionScore, setSectionScore] = useState([]);
  const [sectionQuestions, setQuestions] = useState([]);
  const [extraSectionQuestions, setExtraSectionQuestions] = useState([]);
  const [selectedFormType, setSelectedFormType] = useState(
    formData.ticketTypes?.[0] || ""
  );
  function findMissingSections(schema, answers) {
    let missingSections = [];

    schema.sections.forEach((section) => {
      const requiredQuestions = section.questions.filter((q) => !q.isOptional);
      const missing = requiredQuestions.some((q) => !(q.id in answers));

      if (missing) {
        missingSections.push(section.title);
      }
    });

    return missingSections;
  }
  function validateExtraQuestionAnswers(arrayA, objectB) {
    return arrayA.every((item) => {
      const answer = objectB[item.id];
      return typeof answer === "string" && answer.length >= 70;
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const selectedFormType = formData.ticketTypes[0];
      const formType = getFormTypeById(selectedFormType);
      let finalScore = 0;
      let totalPossible = 0;

      if (formType) {
        const { current, total } = calculateTotalFormScore(
          formType,
          responses,
          includedQuestions
        );
        finalScore = current;
        totalPossible = total;
      }

      if (!formData.clientVersion) {
        toast.error(
          `Please select client
          `
        );
        return;
      }
      if (!selectedFormType) {
        toast.error(
          `Please Select Monitoring Type
          `
        );
        return;
      }
      if (!formData.agentName || !formData.ticketUrl) {
        toast.error(
          `Please fill agent name and ticket URL
          `
        );
        return;
      }
      const selectedType = formTypes?.find(
        (item) => item.id == selectedFormType
      );
      const isAnswerdAll = findMissingSections(selectedType, responses);
      if (isAnswerdAll.length > 1) {
        toast.error(
          `Please fill out all required properties
          `
        );
        return;
      }

      if (
        extraSectionQuestions[0]?.required &&
        !validateExtraQuestionAnswers(
          extraSectionQuestions[0]?.questions,
          responsesExtra
        )
      ) {
        toast.error(
          `Please fill out all required questions
    `
        );
        return;
      }
      const userDetails = JSON.parse(
        localStorage.getItem("user_details") || "{}"
      );
      let submissionData = {
        event_type: selectedFormType,
        submitted_at: Date.now(),
        agent_name: formData.agentName,
        client_name: formData.clientVersion,
        hubstaff_client_id: formData.clientId,
        hubstaff_user_id: formData.agentId,
        ticket_id: formData.ticketUrl,
        email: userDetails?.email,
        final_score: finalScore,
        percentage: parseFloat(
          (typeScores?.current / typeScores?.total) * 100
        ).toFixed(1),
        full_response: {
          section: sectionQuestions,
          genericSection: extraSectionQuestions,
          response: responses,
          comments: commentResponses,
          extraQuestion: responsesExtra,
          additionalNotes: formData.additionalNotes,
          percentage: parseFloat(
            (typeScores?.current / typeScores?.total) * 100
          ).toFixed(1),
        },
        scores: sectionScore,
      };
      if (userDetails?.role == "qas") {
        submissionData = {
          ...submissionData,
          updated_by_qas: userDetails?.name,
        };
      } else {
        submissionData = {
          ...submissionData,
          updated_by_tl: userDetails?.name,
        };
      }
      // console.log("submissionData", submissionData);
      const baseUrl = `${process.env.REACT_APP_BASE_URL}/openai/client_specific_forms`;
      const response = await axios.post(baseUrl, submissionData);
      toast.success("Form submitted successfully!");
      let messageTimer = setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setQuestions([]);
    setResponses({});
    setResponsesExtra({});
    setCommentResponses({});
    setIncludedQuestions({});
    setTypeScores({});
    setSectionScore([]);
    setSelectedFormType("");
    setExtraSectionQuestions([]);
  };
  const updateTypeForm = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
      agentName: "",
      additionalNotes: "",
      ticketUrl: "",
    }));
    resetForm();
  };

  const updateFormData = (updates) => {
    setFormData({
      ticketTypes: [],
      agentName: "",
      clientVersion: updates?.clientVersion,
      agentId: 0,
      clientId: updates?.clientId,
      ticketUrl: "",
      additionalNotes: "",
    });
    resetForm();
  };

  const updateFormInfo = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  const handleResponseExtraChange = (questionId, value) => {
    setResponsesExtra((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  const handleCommentChange = (questionId, value) => {
    setCommentResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleIncludeChange = (questionId, included) => {
    setIncludedQuestions((prev) => ({
      ...prev,
      [questionId]: included,
    }));
    setResponses((prev) => ({
      ...prev,
      [questionId]: "0",
    }));

    if (!included) {
      setResponses((prev) => {
        const newResponses = { ...prev };
        delete newResponses[questionId];
        return newResponses;
      });
      setCommentResponses((prev) => {
        const newResponses = { ...prev };
        delete newResponses[questionId];
        return newResponses;
      });
    }
  };

  useEffect(() => {
    setSelectedFormType(formData.ticketTypes?.[0] || "");
  }, [formData?.ticketTypes]);
  useEffect(() => {
    if (selectedFormType) {
      const formType = getFormTypeById(selectedFormType);
      const { current, total } = calculateTotalFormScore(
        formType,
        responses,
        includedQuestions
      );
      setTypeScores({ current: current, total: total });
    }
  }, [selectedFormType, responses, includedQuestions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-center">
              <div className="text-lg text-gray-600">Loading form data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex items-center text-[#163143] min-h-[63px] max-h-[63px] p-5  border-l border-[#EBF3F4] bg-white shadow-[4px_4px_16px_rgba(22,49,67,0.08)]">
        <h1 className="text-[16px] font-semibold">Client Specific Form</h1>
        <div className="ml-5 bg-[#F1F5F5] px-[16px] py-[1px] rounded-[30px] text-[#163143] text-center font-poppins text-[14px] not-italic font-normal leading-6 tracking-[0.14px]">
          {getFormTypeById(selectedFormType)?.title}
        </div>
        <div className="flex items-center ml-auto">
          {typeScores.total ? (
            <div className="px-6 text-[16px] font-semibold">
              Total Score:{"  "}
              <span className="text-[#69C920]">
                {typeScores?.current?.toFixed(1)}/
                {typeScores?.total?.toFixed(1)} (
                {parseFloat(
                  (typeScores?.current / typeScores?.total) * 100
                ).toFixed(1)}
                %)
              </span>
            </div>
          ) : null}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-[160px] min-h-[40px] ml-auto text-[14px] font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#69C920] hover:bg-[#5CB518] text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-6 overflow-y-scroll py-8 px-4 sm:px-6 lg:px-8">
        <div className="font-[600]">Form Overview</div>

        <div className="bg-[#FCFCFC] rounded-[24px] shadow-sm border border-[#D7E6E7] p-6">
          <BasicInfoSection
            clientVersion={formData.clientVersion}
            onUpdate={updateFormData}
          />
        </div>
        {formData?.clientId != 0 && (
          <div className="bg-[#FCFCFC] rounded-[24px] shadow-sm border border-[#D7E6E7] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormOverview
                selectedTypes={formData.ticketTypes}
                onTypesChange={(types) =>
                  updateTypeForm({ ticketTypes: types })
                }
                selectedClient={formData?.clientId}
                clientName={formData.clientVersion}
              />
            </form>
          </div>
        )}

        {selectedFormType && (
          <div className="flex flex-col">
            <div className="bg-[#FCFCFC] rounded-[24px] shadow-sm border border-[#D7E6E7] p-6">
              <InformationSection
                agentName={formData.agentName}
                clientVersion={formData.clientVersion}
                ticketUrl={formData.ticketUrl}
                additionalNotes={formData.additionalNotes}
                onUpdate={updateFormInfo}
              />
            </div>
            <div className="bg-[#FCFCFC] rounded-[24px] mt-6 shadow-sm border border-[#D7E6E7] p-6">
              <CustomerServiceSection
                selectedFormType={selectedFormType}
                responses={responses}
                commentResponses={commentResponses}
                includedQuestions={includedQuestions}
                onResponseChange={handleResponseChange}
                handleResponseExtraChange={handleResponseExtraChange}
                onCommentChange={handleCommentChange}
                onIncludeChange={handleIncludeChange}
                setSectionScore={setSectionScore}
                sectionScore={sectionScore}
                sectionQuestions={sectionQuestions}
                setQuestions={setQuestions}
                setExtraSectionQuestions={setExtraSectionQuestions}
                extraSectionQuestions={extraSectionQuestions}
                responsesExtra={responsesExtra}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
