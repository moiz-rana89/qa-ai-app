// Mock API calls - Replace these with your actual API endpoints
export const apiCalls = {
  // Create a new category
  createCategory: async (categoryData) => {
    try {
      console.log("[v0] Creating category:", categoryData);
      // Replace with your actual API endpoint
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      console.log("[v0] Category created:", data);
      return data; // Expected to return { id, name, totalScore, questions: [] }
    } catch (error) {
      console.error("[v0] Error creating category:", error);
      throw error;
    }
  },

  // Create a new question in a category
  createQuestion: async (categoryId, questionData) => {
    try {
      console.log(
        "[v0] Creating question for category:",
        categoryId,
        questionData
      );
      // Replace with your actual API endpoint
      const response = await fetch(`/api/categories/${categoryId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const data = await response.json();
      console.log("[v0] Question created:", data);
      return data; // Expected to return { id, text, points, code, ...other fields }
    } catch (error) {
      console.error("[v0] Error creating question:", error);
      throw error;
    }
  },

  // Update an existing question
  updateQuestion: async (categoryId, questionId, questionData) => {
    try {
      console.log("[v0] Updating question:", questionId, questionData);
      const response = await fetch(
        `/api/categories/${categoryId}/questions/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      const data = await response.json();
      console.log("[v0] Question updated:", data);
      return data;
    } catch (error) {
      console.error("[v0] Error updating question:", error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    try {
      console.log("[v0] Deleting category:", categoryId);
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      console.log("[v0] Category deleted");
      return true;
    } catch (error) {
      console.error("[v0] Error deleting category:", error);
      throw error;
    }
  },

  // Delete a question
  deleteQuestion: async (categoryId, questionId) => {
    try {
      console.log("[v0] Deleting question:", questionId);
      const response = await fetch(
        `/api/categories/${categoryId}/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      console.log("[v0] Question deleted");
      return true;
    } catch (error) {
      console.error("[v0] Error deleting question:", error);
      throw error;
    }
  },
};

// Export the questionnaire data as JSON
export const exportQuestionnaireJSON = (categories) => {
  return JSON.stringify(
    {
      totalScore: categories.reduce((sum, cat) => sum + cat.totalScore, 0),
      categories: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        totalScore: cat.totalScore,
        questions: cat.questions.map((q) => ({
          id: q.id,
          text: q.text,
          points: q.points,
          code: q.code,
          isOptional: q.isOptional || false,
          allowNotes: q.allowNotes || false,
          questionType: q.questionType || "text",
        })),
      })),
    },
    null,
    2
  );
};
