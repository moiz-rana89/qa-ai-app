"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Drawer, Input } from "antd";
import { Icon } from "@iconify/react";

import { sendRubricAssistantMessage } from "../../reduxStore/action/rubricAssistant";

const { TextArea } = Input;

// Slide-out chat panel for the AI Rubric Assistant.
//
// Props:
//   open                — controlled visibility
//   onClose             — close handler (resets conversation per spec)
//   context             — { form_id, category_id?, question_id? } auto-passed
//                         on the first message
//   contextLabel        — short string shown under the title so the user
//                         knows what they're asking about (e.g. "Form: Email
//                         QA · Category: Inquiry Resolution · Q: A1")
export default function RubricAssistantDrawer({
  open,
  onClose,
  context = {},
  contextLabel = "",
}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]); // { role: "user"|"ai", text }
  const [input, setInput] = useState("");
  const [draftCriteria, setDraftCriteria] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showDraftInput, setShowDraftInput] = useState(false);

  const scrollRef = useRef(null);

  // Reset every time the drawer is reopened — spec says no cross-session
  // persistence; closing wipes the thread.
  useEffect(() => {
    if (open) {
      setMessages([]);
      setInput("");
      setDraftCriteria("");
      setConversationId(null);
      setShowDraftInput(false);
    }
  }, [open]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || sending) return;

    // Optimistically add the user message, then add an empty AI bubble
    // we'll fill in once the response lands.
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    // First turn passes the rubric context auto-populated by the caller;
    // subsequent turns only need the conversation_id.
    const body = conversationId
      ? { message: text, conversation_id: conversationId }
      : {
          message: text,
          form_id: context?.form_id ?? undefined,
          category_id: context?.category_id ?? undefined,
          question_id: context?.question_id ?? undefined,
          draft_criteria: draftCriteria.trim() || null,
        };

    dispatch(
      sendRubricAssistantMessage(body, (success, data) => {
        if (success) {
          if (data?.conversation_id && !conversationId) {
            setConversationId(data.conversation_id);
          }
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: data?.reply || "(no reply)" },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text:
                data?.data?.detail ||
                data?.message ||
                "Something went wrong. Please try again.",
              isError: true,
            },
          ]);
        }
        setSending(false);
      })
    );
  };

  const handleKeyDown = (e) => {
    // Cmd/Ctrl+Enter → send, Enter alone → new line (so the user can write
    // multi-line questions without accidentally submitting).
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-start gap-2">
          <Icon
            icon="mdi:robot-outline"
            className="text-[#69C920] text-[24px]"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[#163143] text-[16px] font-semibold">
                AI Rubric Assistant
              </span>
              <span className="text-[10px] uppercase tracking-wide font-semibold bg-[#FFF7D8] text-[#7A5A00] px-2 py-[2px] rounded-full">
                Beta
              </span>
            </div>
            {contextLabel && (
              <div className="text-[12px] text-[#7F8A92] mt-1 leading-tight">
                {contextLabel}
              </div>
            )}
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={460}
      closeIcon={<Icon icon="mdi:close" className="text-[#163143] text-[20px]" />}
      bodyStyle={{ padding: 0, display: "flex", flexDirection: "column" }}
    >
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FAFA]"
        style={{ minHeight: 0 }}
      >
        {messages.length === 0 && !sending && (
          <div className="text-center text-[#7F8A92] text-[13px] py-12">
            <Icon
              icon="mdi:message-question-outline"
              className="text-[42px] mx-auto mb-2 text-[#D7E6E7]"
            />
            <div>
              Ask the AI about clarity, measurability, or anchor scores for
              this rubric.
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-[14px] text-[13px] leading-[19px] whitespace-pre-wrap break-words ${
                m.role === "user"
                  ? "bg-[#69C920] text-white rounded-br-[4px]"
                  : m.isError
                  ? "bg-[#FFECEC] text-[#C81E1E] border border-[#FDCFCF] rounded-bl-[4px]"
                  : "bg-white text-[#163143] border border-[#D7E6E7] rounded-bl-[4px]"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#D7E6E7] rounded-[14px] rounded-bl-[4px] px-3 py-2 inline-flex items-center gap-2">
              <Icon
                icon="eos-icons:three-dots-loading"
                className="text-[#69C920] text-[24px]"
              />
              <span className="text-[12px] text-[#7F8A92]">Thinking…</span>
            </div>
          </div>
        )}
      </div>

      {/* Draft criteria optional input (collapsible) */}
      <div className="border-t border-[#EBF3F4] bg-white">
        <button
          type="button"
          onClick={() => setShowDraftInput((v) => !v)}
          className="w-full px-4 py-2 flex items-center justify-between text-[12px] text-[#7F8A92] hover:text-[#163143] transition-colors"
        >
          <span className="inline-flex items-center gap-1">
            <Icon icon="mdi:text-box-edit-outline" className="text-[14px]" />
            Draft criteria (optional)
            {draftCriteria && (
              <span className="text-[#69C920] font-semibold">·  attached</span>
            )}
          </span>
          <Icon
            icon={
              showDraftInput
                ? "mdi:chevron-down"
                : "mdi:chevron-up"
            }
            className="text-[16px]"
          />
        </button>
        {showDraftInput && (
          <div className="px-4 pb-3">
            <TextArea
              value={draftCriteria}
              onChange={(e) => setDraftCriteria(e.target.value)}
              placeholder="Paste unsaved criteria text for the AI to review…"
              autoSize={{ minRows: 2, maxRows: 5 }}
              disabled={!!conversationId}
              className="!text-[12px] !rounded-[10px] !border-[#D7E6E7]"
            />
            {conversationId && (
              <div className="text-[11px] text-[#7F8A92] mt-1">
                Draft is only sent on the first message of a thread.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-[#EBF3F4] bg-white p-3 flex items-end gap-2">
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this rubric…  (Ctrl/⌘+Enter to send)"
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={sending}
          className="!rounded-[16px] !border-[#D7E6E7] flex-1"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className={`shrink-0 inline-flex items-center justify-center w-[40px] h-[40px] rounded-full transition-colors ${
            sending || !input.trim()
              ? "bg-[#F1F5F5] text-[#9CA3AF] cursor-not-allowed"
              : "bg-[#69C920] text-white hover:bg-[#5ab61c]"
          }`}
          aria-label="Send message"
        >
          <Icon
            icon={sending ? "eos-icons:loading" : "mdi:send"}
            className="text-[18px]"
          />
        </button>
      </div>
    </Drawer>
  );
}
