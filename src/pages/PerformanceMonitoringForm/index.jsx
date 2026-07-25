"use client";

import React from "react";
import { useEffect, useState } from "react";
import { FormOverview } from "./FormOverview";
import { BasicInfoSection } from "./BasicInfoSection";
import { CustomerServiceSection } from "./CustomerServiceSection";
import { FeedbackSection } from "./FeedbackSection";
import {
  getFormTypeById,
  calculateTotalFormScore,
  formTypes,
  validateExtraFormData,
} from "../../utils/PC-form-data.js";

import axios from "axios";
import toast from "react-hot-toast";
import { pstDate } from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
import Api from "../../reduxStore/lib/api";

const baseURL = import.meta.env.VITE_API_URL;

export function PerformanceMonitoringForm() {
  const [formData, setFormData] = useState({
    ticketTypes: [],
    agentName: "",
    clientVersion: "",
    agentId: 0,
    clientId: 0,
    ticketUrl: "",
    additionalFeedback: "",
    improvements: "",
    recommendations: "",
  });

  const [responses, setResponses] = useState({});
  const [includedQuestions, setIncludedQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [typeScores, setTypeScores] = useState({});
  const [sectionScore, setSectionScore] = useState([]);
  const [sectionQuestions, setQuestions] = useState([]);
  const [genericQuestions, setGenericQuestions] = useState({});
  const [missingQuestions, setMissingQuestions] = useState({});
  const userDetails = useSelector((state) => state.auth.user);

  function findMissingSections(schema, answers) {
    let missingSections = [];
    let missingQuestions = [];

    schema.sections.forEach((section) => {
      const requiredQuestions = section.questions.filter((q) => !q.isOptional);

      const sectionMissingQuestions = requiredQuestions
        .filter((q) => {
          const answer = answers[q.id];
          const trimmedLength =
            typeof answer === "string" ? answer.trim().length : 0;
          return !answer || trimmedLength < 70; // ✅ check trimmed length
        })
        .map((q) => q.id);

      if (sectionMissingQuestions.length > 0) {
        missingSections.push(section.title);
        missingQuestions.push(...sectionMissingQuestions);
      }
    });

    return { missingSections, missingQuestions };
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
      const selectedType = formTypes?.find(
        (item) => item.id == selectedFormType
      );
      if (!formData.agentName || !formData.clientVersion) {
        toast.error(`Both Agent Name and Client Name must be filled in`);
        setMissingQuestions({
          ...missingQuestions,
          agentName: true,
          clientVersion: true,
        });
        return;
      }

      const isAnswerdAll = findMissingSections(selectedType, responses);
      setMissingQuestions({
        ...missingQuestions,
        missingQuestions: isAnswerdAll?.missingQuestions,
        missingSections: isAnswerdAll?.missingSections,
        genericQuestions: Object.keys(
          validateExtraFormData(genericQuestions)?.errors
        ),
      });
      if (
        isAnswerdAll?.missingQuestions?.length > 0 ||
        isAnswerdAll?.missingSections?.length
      ) {
        toast.error(
          `Please fill out all required properties
          `
        );
        return;
      }

      if (!validateExtraFormData(genericQuestions)?.valid) {
        toast.error(
          `Please fill out all required properties
          `
        );
        return;
      }

      let submissionData = {
        event_type: selectedFormType,
        submitted_at: pstDate(),
        agent_name: formData.agentName,
        client_name: formData.clientVersion,
        hubstaff_client_id: formData.clientId,
        hubstaff_user_id: formData.agentId,
        email: userDetails?.email,
        final_score: finalScore,
        pc_date: genericQuestions?.pc_date?.answer,
        fathom_url: genericQuestions?.fathom?.answer,
        ticket_id: "string",
        full_response: {
          section: sectionQuestions,
          response: responses,
          genericQuestions,
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
      const endPointUrl = `/openai/performance-coaching-form`;
      const response = await Api.post(endPointUrl, submissionData);
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

  const updateTypeForm = (updates) => {
    setFormData({
      ...updates,
      agentName: "",
      clientVersion: "",
      ticketUrl: "",
      additionalFeedback: "",
      improvements: "",
      recommendations: "",
      agentId: 0,
      clientId: 0,
    });
    setQuestions([]);
    setResponses({});
    setIncludedQuestions({});
    setTypeScores({});
    setSectionScore([]);
    setGenericQuestions({});
    setMissingQuestions({});
  };

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleIncludeChange = (questionId, included) => {
    setIncludedQuestions((prev) => ({
      ...prev,
      [questionId]: included,
    }));

    if (!included) {
      setResponses((prev) => {
        const newResponses = { ...prev };
        delete newResponses[questionId];
        return newResponses;
      });
    }
  };

  const selectedFormType = formData.ticketTypes?.[0] || "";
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
        <h1 className="text-[16px] font-semibold">Performance Coaching Form</h1>
        <div className="ml-5 bg-[#F1F5F5] px-[16px] py-[1px] rounded-[30px] text-[#163143] text-center font-poppins text-[14px] not-italic font-normal leading-6 tracking-[0.14px]">
          {getFormTypeById(selectedFormType)?.title}
        </div>
        <div className="flex items-center ml-auto">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormOverview
              selectedTypes={formData.ticketTypes}
              onTypesChange={(types) => updateTypeForm({ ticketTypes: types })}
            />
          </form>
        </div>

        {selectedFormType && (
          <div className="flex flex-col">
            <div className="bg-[#FCFCFC] rounded-[24px] shadow-sm border border-[#D7E6E7] p-6">
              <BasicInfoSection
                agentName={formData.agentName}
                clientVersion={formData.clientVersion}
                ticketUrl={formData.ticketUrl}
                onUpdate={updateFormData}
                missingQuestions={missingQuestions}
              />
            </div>
            <div className="bg-[#FCFCFC] rounded-[24px] mt-6 shadow-sm border border-[#D7E6E7] p-6">
              <CustomerServiceSection
                selectedFormType={selectedFormType}
                responses={responses}
                includedQuestions={includedQuestions}
                onResponseChange={handleResponseChange}
                onIncludeChange={handleIncludeChange}
                setSectionScore={setSectionScore}
                sectionScore={sectionScore}
                sectionQuestions={sectionQuestions}
                setQuestions={setQuestions}
                missingQuestions={missingQuestions}
              />
              <FeedbackSection
                onUpdate={(value) => setGenericQuestions(value)}
                selectedTypes={formData.ticketTypes}
                missingQuestions={missingQuestions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
