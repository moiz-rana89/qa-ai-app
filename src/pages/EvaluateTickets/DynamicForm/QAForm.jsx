"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import CategorySection from "./CategorySection";
import { TicketDetails } from "./TicketDetails";
import { NA_SCORE } from "../../../utils/helperFunctions";

const QAForm = ({
  initialData,
  onStateChange,
  details,
  customerConcern,
  setCustomerConcern,
}) => {
  const [formData, setFormData] = useState(initialData);

  const initializeState = (data) => {
    const initialScores = {};
    const initialNotes = {};

    if (data?.categories) {
      data.categories.forEach((category) => {
        category.questions.forEach((question) => {
          initialScores[question.question_id] = question.not_applicable
            ? NA_SCORE
            : question.score ?? "";
          initialNotes[question.question_id] = question.note ?? "";
        });
      });
    }

    return { initialScores, initialNotes };
  };

  const { initialScores, initialNotes } = initializeState(formData);

  const [scores, setScores] = useState(initialScores);
  const [notes, setNotes] = useState(initialNotes);

  const isInitialMount = useRef(true);

  useEffect(() => {
    setFormData(initialData);
    const { initialScores: newScores, initialNotes: newNotes } =
      initializeState(initialData);
    setScores(newScores);
    setNotes(newNotes);
    isInitialMount.current = true;
  }, [initialData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (onStateChange && formData) {
      // Create updated JSON with same structure
      const updatedData = {
        ticket_id: formData.ticket_id,
        categories: formData.categories.map((category) => ({
          category_name: category.category_name,
          category_index: category.category_index,
          questions: category.questions.map((question) => {
            const rawScore = scores[question.question_id];
            const isNA = rawScore === NA_SCORE;
            return {
              question_id: question.question_id,
              text: question.text,
              score: isNA ? 0 : rawScore ?? question.score,
              max_points: isNA ? 0 : question.max_points,
              note: notes[question.question_id] ?? question.note,
              optional: question.optional,
              not_applicable: isNA,
            };
          }),
        })),
      };

      onStateChange(updatedData);
    }
  }, [scores, notes]);

  const handleScoreChange = (questionId, value) => {
    setScores((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNotesChange = (questionId, value) => {
    setNotes((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateCategoryScore = (category) => {
    let totalScore = 0;
    let maxScore = 0;

    category.questions.forEach((question) => {
      const rawScore = scores[question.question_id];
      if (rawScore === NA_SCORE) {
        return;
      }
      totalScore += Number.parseFloat(rawScore || 0);
      maxScore += question.max_points;
    });

    return { totalScore, maxScore };
  };

  const items = [
    {
      key: "1",
      label: "QA Form",
      children: (
        <div className="space-y-4 px-4 h-[84vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {formData?.categories?.map((category, index) => {
            const { totalScore, maxScore } = calculateCategoryScore(category);
            return (
              <CategorySection
                key={index}
                category={category}
                scores={scores}
                notes={notes}
                onScoreChange={handleScoreChange}
                onNotesChange={handleNotesChange}
                totalScore={totalScore}
                maxScore={maxScore}
              />
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: "Ticket Details",
      children: (
        <div className="p-4  h-[84vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <TicketDetails
            details={details}
            customerConcern={customerConcern}
            setCustomerConcern={setCustomerConcern}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl">
      <Tabs defaultActiveKey="1" items={items} className="qa-form-tabs" />
    </div>
  );
};

export default QAForm;
