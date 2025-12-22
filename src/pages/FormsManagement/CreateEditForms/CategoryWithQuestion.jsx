"use client";

import { useState } from "react";
import { Button, Slider, Input, Select, Checkbox } from "antd";
import { Icon } from "@iconify/react";
import { apiCalls, exportQuestionnaireJSON } from "../../../lib/api";
import GenericAntDrawer from "../../../components/GenericAntDrawer";
import { AntDNotification } from "../../../components/AntDNotification";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createQuestion,
  deleteCategory,
  deleteQuestionAction,
  getCategoryByForm,
  updateCategory,
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
      setCategories(
        formCategories?.map((item) => {
          return {
            name: item.category_name,
            id: item.category_id,
            questions:
              item?.questions?.map((item) => {
                return {
                  id: item?.question_id,
                  text: item?.question_text,
                  questionType: item?.question_type,
                  select_options: item?.select_options,
                  points: item?.max_points,
                  isOptional: item?.optional,
                  questions_criteria: item?.questions_criteria,
                  allowNotes: item?.comments_notes,
                };
              }) || [],
            totalScore: item?.questions?.reduce(
              (sum, q) => sum + (q?.max_points || 0),
              0
            ),
          };
        })
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

  const handleTotalScoreChange = (e) => {
    const totalScore = Number(e) || 0;
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
    setFormData({
      questionText: question.text,
      questionPoints: question.points,
      questionCode: question.code,
      isOptional: question.isOptional || false,
      allowNotes: question.allowNotes || false,
      questionType: question.questionType || "text",
    });
    setGradingCriteria(question?.questions_criteria?.criteria);
    setSelectOption(question?.select_options);
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
    if (category) {
      const newCategory = {
        id:
          category.category_id ||
          Math.max(...categories.map((c) => c.id), 0) + 1,
        name: category.name || formData.categoryName,
        totalScore: category.totalScore || formData.categoryTotal,
        questions: category.questions || [],
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
            grading_criteria: {
              criteria: [{ score: "0", remarks: "No greeting was given." }],
            },
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
          question_type: formData.questionType,
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
        // Call API to update question
        const questionData = {
          text: formData.questionText,
          points: formData.questionPoints,
          code: formData.questionCode,
          isOptional: formData.isOptional,
          allowNotes: formData.allowNotes,
          questionType: formData.questionType,
        };

        await apiCalls.updateQuestion(
          selectedCategoryId,
          selectedQuestionId,
          questionData
        );

        const updatedCategories = categories.map((cat) => {
          if (cat.id === selectedCategoryId) {
            const oldQuestion = cat.questions.find(
              (q) => q.id === selectedQuestionId
            );
            const pointsDifference =
              formData.questionPoints - oldQuestion.points;

            return {
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === selectedQuestionId
                  ? {
                      ...q,
                      text: formData.questionText,
                      points: formData.questionPoints,
                      code: formData.questionCode,
                      isOptional: formData.isOptional,
                      allowNotes: formData.allowNotes,
                      questionType: formData.questionType,
                    }
                  : q
              ),
              totalScore: cat.totalScore + pointsDifference,
            };
          }
          return cat;
        });

        setCategories(updatedCategories);

        AntDNotification({
          status: "success",
          title: "Updated!",
          description: "Question updated successfully",
          duration: 3,
        });
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
          <div className="flex items-center ml-auto gap-[15px] border-b border-[#0505050F] pb-[25px]">
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
          <div className="mt-5">
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
          <div className="flex items-center ml-auto gap-[15px] border-b border-[#0505050F] pb-[25px]">
            <button
              onClick={closeQuestionDrawer}
              className={`w-[130px] min-h-[32px] ml-auto text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143]`}
            >
              Cancel
            </button>
            {drawerType != "editQuestion" && (
              <button
                type="submit"
                onClick={handleDrawerSubmit}
                disabled={isAddingQuestion}
                className={`w-[231px] min-h-[32px] text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143] disabled:opacity-50`}
              >
                {isAddingQuestion ? "Processing..." : "Save and Add Another"}
              </button>
            )}
            {drawerType != "editQuestion" && (
              <button
                type="submit"
                onClick={handleDrawerSubmit}
                disabled={isLoading}
                className={`w-[130px] min-h-[32px] text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-[#69C920] hover:bg-[#5CB518] text-white"
                }`}
              >
                {isAddingQuestion ? "Processing..." : "Save"}
              </button>
            )}
          </div>
          <div className="mt-[10px] space-y-6 text-[#163143] font-[400]">
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
                onChange={(value) => handleFormChange("questionType", value)}
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

                    // Add to state array
                    setSelectOption((prev) => [...prev, val]);

                    // Clear input
                    setOptionText("");
                  }}
                  className="w-full custom-select"
                  style={{ height: "44px" }}
                />
                <div className="mt-[10px] w-[50%] flex flex-wrap gap-3">
                  {selectOption.length > 0 &&
                    selectOption.map((item) => (
                      <div
                        onClick={() =>
                          RemoveFromSelect(item, selectOption, setSelectOption)
                        }
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
                onChange={(e) =>
                  handleFormChange("questionText", e.target.value)
                }
                className="!bg-[#fbfbfb] !border-[#efefef] !rounded-[12px]"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
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
              {gradingCriteria?.map((item, index) => (
                <div className="relative w-full mt-[10px]">
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
                    className="!pt-[30px] !bg-[#fbfbfb] !border-[#efefef] !rounded-[12px] pt-10"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
              ))}
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
                        {console.log("question", question)}
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
                        <Icon icon={"mdi:eye"} fontSize={16} color="#69C920" />
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
