import Api from "../lib/api";

// Single endpoint for the AI Rubric Assistant chat.
// First turn: pass form/category/question context (or draft_criteria).
// Subsequent turns: pass conversation_id to continue the same thread.
//
// callback receives (success, data):
//   success=true  → data = { reply, conversation_id }
//   success=false → data is the Error from Api.xhr (.response?.status, .data)
export const sendRubricAssistantMessage = (body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/rubric-assistant/chat`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error in rubric assistant chat:", err);
    });
};
