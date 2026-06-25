import Api from "../lib/api";

// Multi-turn chat for the AI Rubric Assistant.
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

// Grading-preview (A2) — runs the AI grader on a real ticket without
// saving anything. Accepts an optional `draft_criteria_overrides` map
// so QA can see how candidate rubric changes would score the ticket.
//
// body: { ticket_id, source?, form_id?, draft_criteria_overrides? }
// response: { ticket_id, existing_grade, preview_grade, conversation_json,
//             agent_id, form_id, channel, account, source, graded_at }
export const runGradingPreview = (body, handleResponse) => () => {
  Api.post(`/qa_ai_apis/grading-preview`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error running grading preview:", err);
    });
};
