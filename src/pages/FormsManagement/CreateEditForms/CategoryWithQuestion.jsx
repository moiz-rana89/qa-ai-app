"use client";

import { useState } from "react";
import { Button, Slider, Input, InputNumber, Select, Checkbox } from "antd";
import { Icon } from "@iconify/react";
import { apiCalls, exportQuestionnaireJSON } from "../../../lib/api";
import GenericAntDrawer from "../../../components/GenericAntDrawer";
import { AntDNotification } from "../../../components/AntDNotification";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createQuestion,
  deleteCategory,
  deleteQuestionAction,
  getCategoryByForm,
  updateCategory,
  updateQuestionAction,
} from "../../../reduxStore/action/formsManagement";
import { useEffect } from "react";
import Skeleton from "../../../components/Skeleton";
import { QUESTION_SCORE, QUESTION_TYPE } from "../../../utils/formsConstant";
import GenericAntDeleteModal from "../../../components/GenericAntDeleteModal";

const { TextArea } = Input;

export default function CategoryWithQuestion() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([
    // {
    //   id: 1,
    //   name: "Greeting & Personalization",
    //   totalScore: 17,
    //   questions: [
    //     {
    //       id: 1,
    //       text: "Did the agent greet the customer warmly and use their name if known?",
    //       points: 3,
    //       code: "A1",
    //       isOptional: false,
    //       allowNotes: false,
    //       questionType: "text",
    //     },
    //     {
    //       id: 2,
    //       text: "Did the agent acknowledge the customer's situation and respond with Empathy & Tone and understanding?",
    //       points: 4,
    //       code: "A2",
    //       isOptional: false,
    //       allowNotes: true,
    //       questionType: "text",
    //     },
    //     {
    //       id: 3,
    //       text: "Did the agent fully address all of the customer's questions or concerns in their reply/replies?",
    //       points: 5,
    //       code: "A3",
    //       isOptional: true,
    //       allowNotes: false,
    //       questionType: "text",
    //     },
    //     {
    //       id: 4,
    //       text: "Did the agent use available context to personalize the response?",
    //       points: 3,
    //       code: "A4",
    //       isOptional: false,
    //       allowNotes: true,
    //       questionType: "text",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "Response & Resolution Time",
    //   totalScore: 20,
    //   questions: [
    //     {
    //       id: 5,
    //       text: "Did the agent respond within the expected timeframe?",
    //       points: 10,
    //       code: "B1",
    //       isOptional: false,
    //       allowNotes: false,
    //       questionType: "text",
    //     },
    //     {
    //       id: 6,
    //       text: "Was the issue resolved completely?",
    //       points: 10,
    //       code: "B2",
    //       isOptional: false,
    //       allowNotes: false,
    //       questionType: "text",
    //     },
    //   ],
    // },
  ]);

  const [expandedCategories, setExpandedCategories] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectOption, setSelectOption] = useState([]);
  const [optionText, setOptionText] = useState("");
  const [gradingCriteria, setGradingCriteria] = useState([
    { score: 0, remarks: "" },
    { score: 0, remarks: "" },
    { score: 0, remarks: "" },
    { score: 0, remarks: "" },
    { score: 0, remarks: "" },
  ]);
  const [isCatDelOpen, setIsCatDelOpen] = useState(false);
  const [isQuestionDelOpen, setIsQuestionDelOpen] = useState(false);
  // Snapshot of the question's API-shaped fields at drawer-open time.
  // Used to compute a diff on save so we only PATCH what changed.
  const [originalQuestion, setOriginalQuestion] = useState(null);
  // Inline error for the question-text field (set on 409 duplicate-question).
  const [questionTextError, setQuestionTextError] = useState("");

  const {
    activeForms,
    formCategories,
    isLoading: isLoadingApi,
    isAddingQuestion,
    isDeleting,
  } = useSelector((store) => store.formsManagement);

  useEffect(() => {
    if (activeForms) dispatch(getCategoryByForm(activeForms?.form_id));
  }, [activeForms]);

  useEffect(() => {
    if (formCategories) {
      const sortedCategories = [...formCategories].sort(
        (a, b) => (a.index ?? 0) - (b.index ?? 0)
      );

      setCategories(
        sortedCategories.map((item) => ({
          name: item.category_name,
          id: item.category_id,
          index: item.index,
          questions:
            item?.questions?.map((q) => ({
              id: q?.question_id,
              text: q?.question_text,
              questionType: q?.question_type,
              select_options: q?.select_options,
              points: q?.max_points,
              isOptional: q?.optional,
              questions_criteria: q?.questions_criteria,
              allowNotes: q?.comments_notes,
            })) || [],
          totalScore: item?.questions?.reduce(
            (sum, q) => sum + (q?.max_points || 0),
            0
          ),
        }))
      );
    }
  }, [formCategories]);

  const RemoveFromSelect = (item, selectedList, setselectedList) => {
    let temp = [...selectedList];
    temp = temp.filter((items) => items != item);
    setselectedList(temp);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleTotalScoreChange = (e) => {
  //   const value = Number(e) || 0;

  //   const criteriaCount = gradingCriteria.length;
  //   const equalScore = parseFloat((value / criteriaCount).toFixed(2)); // divide equally

  //   const updatedCriteria = gradingCriteria.map((item) => ({
  //     ...item,
  //     score: equalScore,
  //   }));

  //   setGradingCriteria(updatedCriteria);
  // };

  const handleTotalScoreChange = (e, questionType) => {
    const totalScore = Number(e) || 0;
    const type = questionType || formData.questionType;

    if (type === "boolean") {
      setGradingCriteria([
        { score: 0, remarks: "No" },
        { score: totalScore, remarks: "Yes" },
      ]);
      return;
    }

    if (type === "multiselect") {
      const count = selectOption.length || 1;
      const step = totalScore / count;
      setGradingCriteria(
        selectOption.length > 0
          ? selectOption.map((opt, i) => ({
              score: parseFloat(((i + 1) * step).toFixed(2)),
              remarks: gradingCriteria[i]?.remarks || "",
            }))
          : [{ score: 0, remarks: "" }]
      );
      return;
    }

    const criteriaCount = gradingCriteria.length;

    if (!criteriaCount) return;

    const step = totalScore / criteriaCount;

    const updatedCriteria = gradingCriteria.map((item, index) => ({
      ...item,
      score: parseFloat(((index + 1) * step).toFixed(2)),
    }));

    setGradingCriteria(updatedCriteria);
  };

  const handleRemarkChange = (index, value) => {
    const updatedCriteria = [...gradingCriteria];
    updatedCriteria[index].remarks = value;
    setGradingCriteria(updatedCriteria);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Open drawer for adding category
  const openAddCategoryDrawer = () => {
    setFormData({ categoryName: "", categoryTotal: 0 });
    setDrawerType("addCategory");
    setDrawerOpen(true);
  };

  // Open drawer for adding question
  const openAddQuestionDrawer = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setFormData({
      questionText: "",
      questionPoints: 0,
      questionCode: "",
      isOptional: false,
      allowNotes: false,
      questionType: "text",
    });
    setDrawerType("addQuestion");
    setDrawerOpen(true);
    setGradingCriteria([
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
    ]);
    setSelectOption([]);
  };

  // Open drawer for editing question
  const openEditQuestionDrawer = (categoryId, question) => {
    setSelectedCategoryId(categoryId);
    setSelectedQuestionId(question.id);
    setQuestionTextError("");
    setFormData({
      questionText: question.text,
      questionPoints: question.points,
      questionCode: question.code,
      isOptional: question.isOptional || false,
      allowNotes: question.allowNotes || false,
      questionType: question.questionType || "text",
    });

    // Normalize criteria across all known shapes the backend has used:
    //   - New shape:    questions_criteria: [ { score, remarks, ... }, ... ]   ← array directly
    //   - Legacy shape: questions_criteria: { criteria: [ ... ] }
    //   - Add flow:     grading_criteria:   [ ... ]
    // Falls back to a 5-row empty grid so the render path (which spreads
    // gradingCriteria with `[...gradingCriteria]`) never crashes.
    const rawCriteria = question?.questions_criteria;
    let incomingCriteria;
    if (Array.isArray(rawCriteria)) {
      incomingCriteria = rawCriteria;
    } else if (Array.isArray(rawCriteria?.criteria)) {
      incomingCriteria = rawCriteria.criteria;
    } else if (Array.isArray(question?.grading_criteria)) {
      incomingCriteria = question.grading_criteria;
    } else {
      incomingCriteria = [
        { score: 0, remarks: "" },
        { score: 0, remarks: "" },
        { score: 0, remarks: "" },
        { score: 0, remarks: "" },
        { score: 0, remarks: "" },
      ];
    }
    setGradingCriteria(incomingCriteria);
    setSelectOption(question?.select_options ?? []);

    // Snapshot the question in API-shaped form so we can diff on save.
    setOriginalQuestion({
      question_text: question.text ?? "",
      question_type: question.questionType ?? "text",
      max_points: question.points ?? 0,
      optional: !!question.isOptional,
      comments_notes: !!question.allowNotes,
      select_options: question?.select_options ?? [],
      // Snapshot the same normalized array so the JSON.stringify diff
      // compares apples to apples on save.
      grading_criteria: incomingCriteria,
    });

    setDrawerType("editQuestion");
    setDrawerOpen(true);
  };

  const openEditCategoryDrawer = (category) => {
    setSelectedCategoryId(category.id);
    setFormData({ categoryName: category.name, categoryTotal: 0 });
    setDrawerType("editCategory");
    setDrawerOpen(true);
  };

  const handleCategorySuccess = (category) => {
    if (category == 409) {
      AntDNotification({
        status: "error",
        title: "Error adding category",
        description:
          "This category already exists. Please enter a different one.",
        duration: 5,
      });
      return;
    }
    if (category) {
      const newCategory = {
        id:
          category.category_id ||
          Math.max(...categories.map((c) => c.id), 0) + 1,
        name: category.name || formData.categoryName,
        totalScore: category.totalScore || formData.categoryTotal,
        questions: category.questions || [],
        index: Math.max(...categories.map((c) => c.index), 0) + 1,
      };
      setCategories([...categories, newCategory]);
      AntDNotification({
        status: "success",
        title: "Added Category!",
        description: "Category created successfully",
        duration: 5,
      });
    } else {
      AntDNotification({
        status: "error",
        title: "Error adding category",
        description: "Failed to add Category, please try again",
        duration: 5,
      });
    }
    setDrawerOpen(false);
  };

  const handleQuestionSuccess = (question) => {
    if (question == 409) {
      AntDNotification({
        status: "error",
        title: "Error adding question",
        description:
          "This question already exists. Please enter a different one.",
        duration: 5,
      });
      return;
    }
    if (question) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === selectedCategoryId) {
          const newQuestion = {
            id: question?.question_id,
            text: formData.questionText,
            points: formData.questionPoints,
            isOptional: formData.isOptional,
            allowNotes: formData.allowNotes,
            questionType: formData.questionType,
            select_options:
              formData.questionType == "multiselect" ? selectOption : [],
            grading_criteria: gradingCriteria,
          };

          return {
            ...cat,
            questions: [...cat.questions, newQuestion],
            totalScore: cat.totalScore
              ? cat.totalScore
              : 0 + formData.questionPoints,
          };
        }
        return cat;
      });
      setCategories(updatedCategories);
      AntDNotification({
        status: "success",
        title: "Added Question!",
        description: "Question added successfully",
        duration: 5,
      });
    } else {
      AntDNotification({
        status: "error",
        title: "Error adding question",
        description: "Failed to add question, please try again",
        duration: 5,
      });
    }
    setDrawerOpen(false);
  };
  const handleCategoryUpdateSuccess = (response) => {
    if (response == 409) {
      AntDNotification({
        status: "error",
        title: "Error adding question",
        description:
          "This question already exists. Please enter a different one.",
        duration: 5,
      });
      return;
    }
    if (response) {
      const updatedCategories = categories.map((cat) =>
        cat.id === selectedCategoryId
          ? { ...cat, name: formData.categoryName }
          : cat
      );

      setCategories(updatedCategories);

      AntDNotification({
        status: "success",
        title: "Updated!",
        description: "Category updated successfully",
        duration: 5,
      });
    } else {
      AntDNotification({
        status: "error",
        title: "Error updating category",
        description: "Failed to add category, please try again",
        duration: 5,
      });
    }
    setDrawerOpen(false);
  };
  const handleDrawerSubmit = async () => {
    try {
      setIsLoading(true);

      if (drawerType === "addCategory") {
        // Call API to create category
        const categoryData = {
          category_name: formData.categoryName,
          form_id: activeForms?.form_id,
          form_type: activeForms?.form_type,
          // totalScore: formData.categoryTotal,
        };

        // const response = await apiCalls.createCategory(categoryData);

        dispatch(createCategory(categoryData, handleCategorySuccess));
      } else if (drawerType === "addQuestion") {
        // Call API to create question
        const questionData = {
          question_text: formData.questionText,
          max_points: formData.questionPoints,
          optional: formData.isOptional,
          comments_notes: formData.allowNotes,
          question_type: formData.questionType ? formData.questionType : "text",
          form_id: activeForms?.form_id,
          category_id: selectedCategoryId,
          select_options:
            formData.questionType == "multiselect" ? selectOption : [],
          grading_criteria: {
            criteria: gradingCriteria,
          },
        };
        dispatch(createQuestion(questionData, handleQuestionSuccess));
        // handleQuestionSuccess({
        //   question_id: 18,
        // });
        // const response = await apiCalls.createQuestion(
        //   selectedCategoryId,
        //   questionData
        // );
      } else if (drawerType === "editCategory") {
        const categoryData = {
          category_name: formData.categoryName,
        };
        dispatch(
          updateCategory(
            selectedCategoryId,
            categoryData,
            handleCategoryUpdateSuccess
          )
        );
      } else if (drawerType === "editQuestion") {
        // Build the candidate payload in API-shape, then diff against the
        // snapshot captured when the drawer opened. Only changed keys are
        // PATCHed — untouched fields must NOT round-trip to the backend.
        const candidate = {
          question_text: (formData.questionText ?? "").toString(),
          question_type: formData.questionType ?? "text",
          max_points: Number(formData.questionPoints) || 0,
          optional: !!formData.isOptional,
          comments_notes: !!formData.allowNotes,
          select_options: Array.isArray(selectOption) ? selectOption : [],
          grading_criteria: gradingCriteria ?? null,
        };

        // Backend only stores select_options for select-type questions —
        // don't bother diffing it when the type doesn't use it.
        const fieldsToCompare = Object.keys(candidate).filter((k) => {
          if (k === "select_options" && candidate.question_type !== "select") {
            return false;
          }
          return true;
        });

        const changes = {};
        const original = originalQuestion || {};
        fieldsToCompare.forEach((key) => {
          // JSON.stringify gives us deep equality on the simple shapes we
          // deal with here (strings, numbers, booleans, arrays of
          // strings, plain criteria objects). Good enough — and avoids
          // pulling in lodash for one comparison.
          if (JSON.stringify(candidate[key]) !== JSON.stringify(original[key])) {
            changes[key] = candidate[key];
          }
        });

        if (Object.keys(changes).length === 0) {
          AntDNotification({
            status: "info",
            title: "No changes",
            description: "Nothing was modified.",
            duration: 3,
          });
          setDrawerOpen(false);
          setFormData({});
          setOriginalQuestion(null);
          return;
        }

        // Wrap the thunk in a promise so we can await it inside this try.
        await new Promise((resolve) => {
          dispatch(
            updateQuestionAction(selectedQuestionId, changes, (success, data) => {
              if (success) {
                // Could be { status: "no changes" } if the backend determined
                // nothing actually moved — treat as success either way.
                AntDNotification({
                  status: "success",
                  title: "Updated!",
                  description:
                    data?.status === "no changes"
                      ? "No changes were detected by the server."
                      : "Question updated successfully",
                  duration: 3,
                });

                // Patch local state with the candidate values for the keys
                // we sent — gives instant visual feedback without a full
                // form refetch. Recompute totalScore if max_points changed.
                setCategories((prev) =>
                  prev.map((cat) => {
                    if (cat.id !== selectedCategoryId) return cat;
                    const oldQuestion = cat.questions.find(
                      (q) => q.id === selectedQuestionId
                    );
                    const pointsDifference =
                      changes.max_points !== undefined
                        ? candidate.max_points - (oldQuestion?.points || 0)
                        : 0;
                    return {
                      ...cat,
                      questions: cat.questions.map((q) =>
                        q.id !== selectedQuestionId
                          ? q
                          : {
                              ...q,
                              text: candidate.question_text,
                              points: candidate.max_points,
                              isOptional: candidate.optional,
                              allowNotes: candidate.comments_notes,
                              questionType: candidate.question_type,
                              select_options: candidate.select_options,
                              questions_criteria:
                                changes.grading_criteria !== undefined
                                  ? { criteria: candidate.grading_criteria }
                                  : q.questions_criteria,
                            }
                      ),
                      totalScore: (cat.totalScore || 0) + pointsDifference,
                    };
                  })
                );

                setDrawerOpen(false);
                setFormData({});
                setOriginalQuestion(null);
                setQuestionTextError("");
              } else {
                // Map per-spec status codes onto the right surface.
                const status = data?.response?.status;
                const detail = data?.data?.detail || data?.message;
                if (status === 409) {
                  setQuestionTextError(
                    detail ||
                      "A question with this text already exists in this category."
                  );
                } else if (status === 404) {
                  AntDNotification({
                    status: "error",
                    title: "Question not found",
                    description:
                      detail || "This question was archived or deleted.",
                    duration: 4,
                  });
                  // Refetch the form so the stale question disappears.
                  if (activeForms?.form_id) {
                    dispatch(getCategoryByForm(activeForms.form_id));
                  }
                  setDrawerOpen(false);
                } else if (status === 422) {
                  AntDNotification({
                    status: "error",
                    title: "Validation error",
                    description:
                      typeof detail === "string"
                        ? detail
                        : "Please check the form fields.",
                    duration: 4,
                  });
                } else {
                  AntDNotification({
                    status: "error",
                    title: "Update failed",
                    description: detail || "Please try again.",
                    duration: 4,
                  });
                }
              }
              resolve();
            })
          );
        });
        return; // skip the generic setFormData({}) tail below
      }
      setFormData({});
    } catch (error) {
      AntDNotification({
        status: "error",
        title: "Error",
        description: error.message || "Something went wrong",
        duration: 3,
      });
      console.error("[v0] Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSuccess = (status) => {
    if (status) {
      setCategories(categories.filter((cat) => cat.id !== selectedCategoryId));
      AntDNotification({
        status: "success",
        title: "Deleted!",
        description: "Category deleted successfully",
        duration: 3,
      });
    } else {
      AntDNotification({
        status: "error",
        title: "Error",
        description: "Failed to delete category",
        duration: 3,
      });
    }
    setIsCatDelOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteCategory(selectedCategoryId, handleDeleteSuccess));
  };

  // Delete question

  const handleDeleteQuestionSuccess = (status) => {
    if (status) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === selectedCategoryId) {
          const questionToDelete = cat.questions.find(
            (q) => q.id === selectedQuestionId
          );
          return {
            ...cat,
            questions: cat.questions.filter((q) => q.id !== selectedQuestionId),
            totalScore: cat.totalScore - questionToDelete.points,
          };
        }
        return cat;
      });

      setCategories(updatedCategories);
      AntDNotification({
        status: "success",
        title: "Deleted!",
        description: "Question deleted successfully",
        duration: 3,
      });
    } else {
      AntDNotification({
        status: "error",
        title: "Error",
        description: "Failed to delete question",
        duration: 3,
      });
    }
    setIsQuestionDelOpen(false);
  };
  const handleDeleteQuestion = () => {
    dispatch(
      deleteQuestionAction(selectedQuestionId, handleDeleteQuestionSuccess)
    );
  };

  const deleteQuestion = async (categoryId, questionId) => {
    setSelectedCategoryId(categoryId);
    setSelectedQuestionId(questionId);
    setIsQuestionDelOpen(true);
  };

  const closeQuestionDrawer = () => {
    setDrawerOpen(false);
    setFormData({});
    setSelectOption([]);
    setGradingCriteria([
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
      { score: 0, remarks: "" },
    ]);
    // Clear edit-mode state so reopening the drawer doesn't carry over
    // a stale snapshot or a previous duplicate-question error.
    setOriginalQuestion(null);
    setQuestionTextError("");
  };

  const exportJSON = () => {
    const jsonData = exportQuestionnaireJSON(categories);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "questionnaire.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render drawer content based on type
  const renderDrawerContent = () => {
    if (drawerType === "addCategory" || drawerType === "editCategory") {
      return (
        <div className="">
          <div className="flex items-center ml-auto mt-5 mx-5 pb-5 gap-[15px] border-b border-[#0505050F]">
            <button
              onClick={closeQuestionDrawer}
              className={`w-[130px] min-h-[32px] ml-auto text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143]`}
            >
              Cancel
            </button>
            {drawerType !== "editCategory" && (
              <button
                type="submit"
                onClick={handleDrawerSubmit}
                disabled={isAddingQuestion}
                className={`w-[231px] min-h-[32px] text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143] disabled:opacity-50`}
              >
                {isAddingQuestion ? "Processing..." : "Save and Add Another"}
              </button>
            )}
            <button
              type="submit"
              onClick={handleDrawerSubmit}
              disabled={isAddingQuestion}
              className={`w-[130px] min-h-[32px] text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                isAddingQuestion
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#69C920] hover:bg-[#5CB518] text-white"
              }`}
            >
              {isAddingQuestion ? "Processing..." : "Save"}
            </button>
          </div>
          <div className="mt-5 mx-5">
            <label className="block text-[14px] font-semibold mb-3">
              Category Name
              <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Name your category"
              value={formData.categoryName || ""}
              onChange={(e) => handleFormChange("categoryName", e.target.value)}
              className="!bg-[#fbfbfb] !border-[#efefef] !rounded-[12px]"
            />
          </div>
        </div>
      );
    } else if (drawerType === "addQuestion" || drawerType === "editQuestion") {
      return (
        <div className="">
          <div className="flex items-center ml-auto mt-5 mx-5 pb-5 gap-[15px] border-b border-[#0505050F]">
            <button
              onClick={closeQuestionDrawer}
              className={`w-[130px] min-h-[32px] ml-auto text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143]`}
            >
              Cancel
            </button>
            {/* "Save and Add Another" is only for the add-new flow. */}
            {drawerType !== "editQuestion" && (
              <button
                type="submit"
                onClick={handleDrawerSubmit}
                disabled={isAddingQuestion}
                className={`w-[231px] min-h-[32px] text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143] disabled:opacity-50`}
              >
                {isAddingQuestion ? "Processing..." : "Save and Add Another"}
              </button>
            )}
            {/* Save button — shown for both add and edit. In edit mode it
                PATCHes only the changed fields via updateQuestionAction. */}
            <button
              type="submit"
              onClick={handleDrawerSubmit}
              disabled={isLoading || isAddingQuestion}
              className={`w-[130px] min-h-[32px] text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                isLoading || isAddingQuestion
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#69C920] hover:bg-[#5CB518] text-white"
              }`}
            >
              {isLoading || isAddingQuestion ? "Processing..." : "Save"}
            </button>
          </div>
          <div className="mt-5 mx-5 mb-5 space-y-6 text-[#163143] font-[400]">
            <div className="">
              <label className="block text-[14px] font-semibold mb-3">
                Mark as Optional?
              </label>
              <Checkbox
                checked={formData.isOptional || false}
                onChange={(e) =>
                  handleFormChange("isOptional", e.target.checked)
                }
              >
                Check if this question is optional.
              </Checkbox>
            </div>
            <div className="">
              <label className="block text-[14px] font-semibold mb-3">
                Add Additional Notes?
              </label>
              <Checkbox
                checked={formData.allowNotes || false}
                onChange={(e) =>
                  handleFormChange("allowNotes", e.target.checked)
                }
              >
                Allow users to provide additional notes
              </Checkbox>
            </div>

            <div className="">
              <label className="block text-[14px] font-semibold mb-3">
                Question Type
                <span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder="Select Question Type"
                value={formData.questionType || "text"}
                onChange={(value) => {
                  handleFormChange("questionType", value);
                  if (value === "boolean") {
                    const totalScore = Number(formData.questionPoints) || 0;
                    setGradingCriteria([
                      { score: 0, remarks: "No" },
                      { score: totalScore, remarks: "Yes" },
                    ]);
                  } else if (value === "multiselect") {
                    const totalScore = Number(formData.questionPoints) || 0;
                    const count = selectOption.length || 1;
                    const step = totalScore / count;
                    setGradingCriteria(
                      selectOption.length > 0
                        ? selectOption.map((opt, i) => ({
                            score: parseFloat(((i + 1) * step).toFixed(2)),
                            remarks: "",
                          }))
                        : [{ score: 0, remarks: "" }]
                    );
                  } else {
                    const totalScore = Number(formData.questionPoints) || 0;
                    const step = totalScore / 5;
                    setGradingCriteria(
                      Array.from({ length: 5 }, (_, i) => ({
                        score: parseFloat(((i + 1) * step).toFixed(2)),
                        remarks: "",
                      }))
                    );
                  }
                }}
                options={QUESTION_TYPE}
                className="w-[100%] custom-select"
                style={{ height: "44px" }}
              />
            </div>
            {formData.questionType == "multiselect" && (
              <div className="">
                <label className="block text-[14px] font-semibold mb-3">
                  Question Options
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Type Question option and press enter"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  onPressEnter={(e) => {
                    const val = e.target.value.trim();
                    if (!val) return;

                    const newOptions = [...selectOption, val];
                    setSelectOption(newOptions);

                    // Update grading criteria to match option count
                    const totalScore = Number(formData.questionPoints) || 0;
                    const count = newOptions.length;
                    const step = count > 0 ? totalScore / count : 0;
                    setGradingCriteria(
                      newOptions.map((opt, i) => ({
                        score: parseFloat(((i + 1) * step).toFixed(2)),
                        remarks: gradingCriteria[i]?.remarks || "",
                      }))
                    );

                    setOptionText("");
                  }}
                  className="w-full custom-select"
                  style={{ height: "44px" }}
                />
                <div className="mt-[10px] w-full flex flex-wrap gap-3">
                  {selectOption.length > 0 &&
                    selectOption.map((item) => (
                      <div
                        onClick={() => {
                          const newOptions = selectOption.filter(
                            (o) => o !== item
                          );
                          setSelectOption(newOptions);

                          // Update grading criteria to match new option count
                          const totalScore =
                            Number(formData.questionPoints) || 0;
                          const count = newOptions.length || 1;
                          const step = totalScore / count;
                          setGradingCriteria(
                            newOptions.length > 0
                              ? newOptions.map((opt, i) => ({
                                  score: parseFloat(
                                    ((i + 1) * step).toFixed(2)
                                  ),
                                  remarks: gradingCriteria[i]?.remarks || "",
                                }))
                              : [{ score: 0, remarks: "" }]
                          );
                        }}
                        className="cursor-pointer py-1  bg-[#DBFFDF] rounded-full flex items-center justify-center px-2 text-[14px] text-[#163143]"
                      >
                        {item}
                        <Icon
                          color="#163143"
                          fontSize={24}
                          className="pl-1"
                          icon="basil:cross-outline"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Question
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                placeholder="Enter your question"
                value={formData.questionText || ""}
                onChange={(e) => {
                  handleFormChange("questionText", e.target.value);
                  if (questionTextError) setQuestionTextError("");
                }}
                status={questionTextError ? "error" : ""}
                className="!bg-[#fbfbfb] !border-[#efefef] !rounded-[12px]"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {questionTextError && (
                <div className="text-[#C81E1E] text-[12px] mt-1">
                  {questionTextError}
                </div>
              )}
            </div>
            {/* <div>
              <label className="block text-[14px] font-semibold mb-3">
                Question Code
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., A1, B2"
                value={formData.questionCode || ""}
                onChange={(e) =>
                  handleFormChange("questionCode", e.target.value)
                }
                className="!bg-[#fbfbfb] !border-[#efefef] !rounded-[12px]"
              />
            </div> */}
            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Maximum Score/Points
                <span className="text-red-500">*</span>
              </label>
              {/* <Slider
                min={0}
                max={20}
                value={formData.questionPoints || 0}
                onChange={(value) => {
                  handleFormChange("questionPoints", value);
                  handleTotalScoreChange(value);
                }}
                marks={{ 1: "1", 10: "10", 20: "20" }}
              />
              <div className="text-center mt-2 text-[#163143] font-semibold">
                {formData.questionPoints}
              </div>
              */}
              <Select
                placeholder="Select Question Score"
                value={formData.questionPoints || 0}
                onChange={(value) => {
                  handleFormChange("questionPoints", value);
                  handleTotalScoreChange(value);
                }}
                options={QUESTION_SCORE}
                className="w-[100%] custom-select"
                style={{ height: "44px" }}
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Grading Criteria Breakdown
                <span className="text-red-500">*</span>
              </label>
              {formData.questionType === "boolean" ? (
                <div className="flex flex-col gap-3 mt-[10px]">
                  {[...gradingCriteria].reverse()?.map((item) => {
                    const originalIndex = item.remarks === "Yes" ? 1 : 0;
                    return (
                      <div key={originalIndex} className="relative w-full">
                        <label
                          className={`absolute left-3 top-2 text-[#163143] text-[14px] font-semibold transition-all duration-200
                          pointer-events-none z-10 bg-[#fbfbfb]
                          ${formData.questionText ? "top-0 text-xs px-1" : ""}
                        `}
                        >
                          {item.score} Points · {item.remarks}
                        </label>

                        <TextArea
                          placeholder="Explain how this question should be assessed..."
                          value={item.explanation || ""}
                          onChange={(e) => {
                            const updated = [...gradingCriteria];
                            updated[originalIndex].explanation = e.target.value;
                            setGradingCriteria(updated);
                          }}
                          className="!pt-[30px] !bg-[#fbfbfb] !border-[#efefef] !rounded-[12px] pt-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : formData.questionType === "multiselect" ? (
                gradingCriteria?.map((item, index) => (
                  <div className="relative w-full mt-[10px] bg-[#fbfbfb] border border-[#efefef] rounded-[12px] p-4" key={index}>
                    <div className="flex items-center gap-2 mb-3">
                      <InputNumber
                        min={0}
                        max={formData.questionPoints || 0}
                        value={item?.score}
                        onChange={(val) => {
                          const updated = [...gradingCriteria];
                          updated[index].score = val || 0;
                          setGradingCriteria(updated);
                        }}
                        className="!w-[120px] !rounded-[8px]"
                        style={{ height: "36px" }}
                      />
                      <span className="text-[14px] font-semibold text-[#163143]">
                        Points
                      </span>
                    </div>
                    <TextArea
                      placeholder="Explain how this question should be assessed..."
                      value={item.remarks}
                      onChange={(e) => handleRemarkChange(index, e.target.value)}
                      className="!bg-[#fbfbfb] !border-none !shadow-none !rounded-[12px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </div>
                ))
              ) : (
                gradingCriteria?.map((item, index) => (
                  <div className="relative w-full mt-[10px]" key={index}>
                    <label
                      className={`absolute left-3 top-2 text-[#163143] text-[14px] font-semibold transition-all duration-200
                      pointer-events-none z-10 bg-[#fbfbfb]
                      ${formData.questionText ? "top-0 text-xs px-1" : ""}
                    `}
                    >
                      {item?.score} Points
                    </label>

                    <TextArea
                      placeholder="Explain how this question should be assessed..."
                      value={item.remarks}
                      onChange={(e) => handleRemarkChange(index, e.target.value)}
                      className="!pt-[30px] !bg-[#fbfbfb] !border-[#efefef] !rounded-[12px] pt-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalScore = categories.reduce((sum, cat) => sum + cat.totalScore, 0);

  return isLoadingApi ? (
    <Skeleton className="w-[100%] h-[50vh]" rounded="rounded-[32px]" />
  ) : (
    <div className="mx-auto">
      <div className="flex items-center gap-4 mb-[10px] px-[10px] pb-[25px] border-b-1 border-b-[#D7E6E7]">
        <div className="text-[18px] text-[#163143]">Email QA Updated</div>
        <div className="flex items-center border border-[#D7E6E7] px-[16px] py-[1px] rounded-[30px] text-[14px] text-[#163143]">
          Form Total Score: {totalScore ? totalScore : 0}
        </div>
        <div
          onClick={openAddCategoryDrawer}
          className="group flex items-center border border-[#D7E6E7] px-[16px] py-[1px] rounded-[30px] text-[14px] text-[#163143] cursor-pointer hover:border-[#69C920] hover:bg-[#69C920] hover:text-[#fff] transition-all duration-200"
        >
          <Icon
            fontSize={24}
            className="pr-1 text-[#69C920] group-hover:text-white transition-all duration-200"
            icon="material-symbols:add-rounded"
          />
          <span>Add Category</span>
        </div>
        {/* <button
          onClick={exportJSON}
          className="ml-auto flex items-center border border-[#D7E6E7] px-[16px] py-[1px] rounded-[30px] text-[14px] text-[#163143] hover:border-[#0066cc] hover:text-[#0066cc] transition-all duration-200"
        >
          <Icon
            fontSize={20}
            className="pr-1"
            icon="material-symbols:download"
          />
          Export JSON
        </button> */}
      </div>

      <div className="space-y-4">
        <GenericAntDeleteModal
          title="Delete Category"
          message="Are you sure you want to delete this category? All questions in that category will be deleted."
          isOpen={isCatDelOpen}
          isLoading={isDeleting}
          onCancel={() => setIsCatDelOpen(false)}
          onConfirm={() => handleDelete()}
        />
        <GenericAntDeleteModal
          title="Delete Question"
          message="Are you sure you want to delete this question?"
          isOpen={isQuestionDelOpen}
          isLoading={isDeleting}
          onCancel={() => setIsQuestionDelOpen(false)}
          onConfirm={() => handleDeleteQuestion()}
        />
        {categories.map((category) => (
          <div
            key={category.id}
            className="border-b-1 border-b-[#D7E6E7] overflow-hidden"
          >
            {/* Category Header */}
            <div className="flex items-center p-4 cursor-pointer transition-colors">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center gap-3 text-left"
              >
                <div className="w-max text-[#16314380] text-[14px]">
                  {category.index}.
                </div>
                <div className="w-max bg-[#F1F5F5] px-[16px] py-[1px] rounded-[30px] text-[#163143] text-center font-poppins text-[14px] not-italic font-normal leading-6 tracking-[0.14px]">
                  {category.name}
                </div>
                <div className="flex items-center border border-[#D7E6E7] px-[16px] py-[1px] rounded-[30px] text-[14px] text-[#163143]">
                  Total Score: {category.totalScore ? category.totalScore : 0}
                </div>
              </button>

              <div
                onClick={() => openAddQuestionDrawer(category.id)}
                className="group flex items-center mx-[10px] border border-[#D7E6E7] px-[16px] py-[1px] rounded-[30px] text-[14px] text-[#163143] cursor-pointer hover:border-[#69C920] hover:bg-[#69C920] hover:text-[#fff] transition-all duration-200"
              >
                <Icon
                  fontSize={24}
                  className="pr-1 text-[#69C920] group-hover:text-white transition-all duration-200"
                  icon="material-symbols:add-rounded"
                />
                <span>Add Question</span>
              </div>
              <Button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "30px",
                  border: "1px solid #D7E6E7",
                  marginRight: "10px",
                }}
                type="text"
                icon={
                  <Icon
                    icon={"ant-design:delete-outlined"}
                    fontSize={16}
                    color="#FF3434"
                  />
                }
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setIsCatDelOpen(true);
                }}
              />
              <Button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "30px",
                  border: "1px solid #D7E6E7",
                }}
                type="text"
                icon={
                  <Icon icon={"tabler:edit"} fontSize={16} color="#69C920" />
                }
                onClick={() => openEditCategoryDrawer(category)}
              />
              <Button
                style={{
                  width: 32,
                  height: 32,
                  background: "#FFFFFF",
                  borderRadius: "42px",
                  border: "0.8px solid #D7E6E7",
                  marginLeft: "auto",
                }}
                type="text"
                icon={
                  <Icon
                    icon={
                      expandedCategories[category.id]
                        ? "iconamoon:arrow-up-2"
                        : "iconamoon:arrow-down-2"
                    }
                    fontSize={16}
                  />
                }
                onClick={() => toggleCategory(category.id)}
              />
            </div>

            {/* Category Content */}
            {expandedCategories[category.id] && (
              <div className="p-4 space-y-[32px]">
                {category.questions.map((question) => (
                  <div key={question.id} className="flex">
                    <span className="w-[90px] h-[42px] bg-[#FFFFFF] border border-[#D7E6E7] mr-[16px] rounded-[6px] px-[35px] py-[9px] font-semibold text-[#163143] text-[14px]">
                      {question.points}
                    </span>
                    <div className="w-[85%]">
                      <p className="text-[14px] text-[#163143] whitespace-pre-line">
                        {question.text}
                      </p>
                      {/* <span className="text-sm text-gray-600">
                        ({question.code})
                      </span> */}
                      {/* <div className="text-xs text-gray-500 mt-2">
                        {question.isOptional && "Optional • "}
                        {question.allowNotes && "Notes Allowed • "}
                        Type: {question.questionType}
                      </div> */}
                    </div>

                    <Button
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "42px",
                      }}
                      type="text"
                      icon={
                        <Icon
                          icon={"ant-design:delete-outlined"}
                          fontSize={16}
                          color="#FF3434"
                        />
                      }
                      onClick={() => deleteQuestion(category.id, question.id)}
                    />
                    <Button
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "42px",
                      }}
                      type="text"
                      icon={
                        <Icon
                          icon={"mdi:pencil-outline"}
                          fontSize={16}
                          color="#69C920"
                        />
                      }
                      onClick={() =>
                        openEditQuestionDrawer(category.id, question)
                      }
                    />
                  </div>
                ))}
                {isAddingQuestion && (
                  <Skeleton
                    className="w-[100%] h-[42px]"
                    rounded="rounded-[8px]"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Generic Drawer */}
      <GenericAntDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setFormData({});
        }}
        title={
          drawerType === "addCategory"
            ? "Add New Category"
            : drawerType === "addQuestion"
            ? "Add Question"
            : "Details"
        }
        onSubmit={handleDrawerSubmit}
        submitText={
          drawerType === "addCategory"
            ? "Create Category"
            : drawerType === "addQuestion"
            ? "Add Question"
            : "Update Question"
        }
      >
        {renderDrawerContent()}
      </GenericAntDrawer>
    </div>
  );
}
