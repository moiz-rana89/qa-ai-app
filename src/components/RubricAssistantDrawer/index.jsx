"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Drawer, Input } from "antd";
import { Icon } from "@iconify/react";

import {
  sendRubricAssistantMessage,
  runGradingPreview,
} from "../../reduxStore/action/rubricAssistant";
import { extractApiError } from "../../utils/helperFunctions";

const { TextArea } = Input;

// Slide-out chat panel for the AI Rubric Assistant.
// Two tabs:
//   Chat        — multi-turn rubric review
//   Test ticket — A2 grading-preview side-by-side (existing vs preview)
//
// Props:
//   open                — controlled visibility
//   onClose             — close handler (resets chat per spec)
//   context             — { form_id, category_id?, question_id? }
//                         auto-passed on the first chat message and pre-fills
//                         the test-on-ticket form_id input
//   contextLabel        — short string under the title (e.g. form name)
export default function RubricAssistantDrawer({
  open,
  onClose,
  context = {},
  contextLabel = "",
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("chat"); // "chat" | "test"

  // ── Chat state ──────────────────────────────────────────────────────────
  const [messages, setMessages] = useState([]); // { role, text, isError? }
  const [input, setInput] = useState("");
  const [draftCriteria, setDraftCriteria] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showDraftInput, setShowDraftInput] = useState(false);

  // ── Test-on-ticket state ────────────────────────────────────────────────
  const [testTicketId, setTestTicketId] = useState("");
  const [testFormId, setTestFormId] = useState(
    context?.form_id ? String(context.form_id) : ""
  );
  // Per-question overrides — pasted as `33: criteria text` lines.
  // Parsed on submit into { "33": "criteria text" }.
  const [overridesText, setOverridesText] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testError, setTestError] = useState("");

  const scrollRef = useRef(null);

  // Reset every time the drawer is reopened — spec says no cross-session
  // persistence; closing wipes the thread.
  useEffect(() => {
    if (open) {
      setTab("chat");
      setMessages([]);
      setInput("");
      setDraftCriteria("");
      setConversationId(null);
      setShowDraftInput(false);

      setTestTicketId("");
      setTestFormId(context?.form_id ? String(context.form_id) : "");
      setOverridesText("");
      setTestResult(null);
      setTestError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll to the latest chat message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  // ── Chat send ───────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    let body;
    if (conversationId) {
      // Subsequent turns: only message + conversation_id per spec.
      body = { message: text, conversation_id: conversationId };
    } else {
      // First turn. Per spec, `draft_criteria` and `form_id` are mutually
      // exclusive — if the user filled draft criteria, send only that;
      // otherwise send form_id (and optionally category_id / question_id).
      body = { message: text };
      const draft = draftCriteria.trim();
      if (draft) {
        body.draft_criteria = draft;
      } else if (context?.form_id != null) {
        body.form_id = context.form_id;
        if (context?.category_id != null)
          body.category_id = context.category_id;
        if (context?.question_id != null)
          body.question_id = context.question_id;
      }
    }

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
              text: extractApiError(
                data,
                "Something went wrong. Please try again."
              ),
              isError: true,
            },
          ]);
        }
        setSending(false);
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Test-on-ticket submit ───────────────────────────────────────────────
  // Parse the overrides textarea (one `qid: criteria` per line) into the
  // expected { "qid": "criteria" } object. Blank → no overrides sent.
  const parseOverrides = () => {
    const text = overridesText.trim();
    if (!text) return null;
    const out = {};
    text.split("\n").forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) return;
      const idx = line.indexOf(":");
      if (idx === -1) return; // skip malformed lines silently
      const qid = line.slice(0, idx).trim();
      const criteria = line.slice(idx + 1).trim();
      if (qid && criteria) out[qid] = criteria;
    });
    return Object.keys(out).length ? out : null;
  };

  const handleRunTest = () => {
    setTestError("");
    if (!testTicketId.trim()) {
      setTestError("Ticket ID is required.");
      return;
    }
    setTesting(true);
    setTestResult(null);

    const body = {
      ticket_id: testTicketId.trim(),
      source: "gorgias",
    };
    if (testFormId !== "" && testFormId != null) {
      const parsed = Number(testFormId);
      body.form_id = Number.isNaN(parsed) ? testFormId : parsed;
    }
    const overrides = parseOverrides();
    if (overrides) body.draft_criteria_overrides = overrides;

    dispatch(
      runGradingPreview(body, (success, data) => {
        setTesting(false);
        if (success) {
          setTestResult(data);
        } else {
          setTestError(extractApiError(data, "Failed to run preview."));
        }
      })
    );
  };

  // Build a per-question diff between existing and preview grades so the
  // user can see the rubric change's effect line-by-line.
  const buildQuestionDiff = () => {
    if (!testResult) return [];
    const previewCats =
      testResult?.preview_grade?.graded_form_json?.categories || [];
    const existingCats =
      testResult?.existing_grade?.graded_form_json?.categories || [];

    const existingByQid = {};
    existingCats.forEach((c) =>
      (c?.questions || []).forEach((q) => {
        if (q?.question_id != null) existingByQid[q.question_id] = q;
      })
    );

    const rows = [];
    previewCats.forEach((cat) => {
      (cat?.questions || []).forEach((pq) => {
        const eq = existingByQid[pq?.question_id];
        rows.push({
          category: cat?.category_name,
          question_id: pq?.question_id,
          text: pq?.text,
          max_points: pq?.max_points,
          existing_score: eq?.score ?? null,
          preview_score: pq?.score ?? null,
          note: pq?.note,
        });
      });
    });
    return rows;
  };

  const diffRows = testResult ? buildQuestionDiff() : [];

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
      width={520}
      closeIcon={
        <Icon icon="mdi:close" className="text-[#163143] text-[20px]" />
      }
      bodyStyle={{ padding: 0, display: "flex", flexDirection: "column" }}
    >
      {/* Tabs */}
      <div className="flex border-b border-[#EBF3F4] bg-white">
        {[
          { key: "chat", label: "Chat" },
          { key: "test", label: "Test on ticket" },
        ].map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-[13px] font-semibold transition-colors ${
                active
                  ? "text-[#69C920] border-b-2 border-[#69C920]"
                  : "text-[#7F8A92] hover:text-[#163143] border-b-2 border-transparent"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "chat" ? (
        <>
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
                  Ask the AI about clarity, measurability, or anchor scores
                  for this rubric.
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
                  <span className="text-[12px] text-[#7F8A92]">
                    Thinking…
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Draft criteria — first-message only */}
          <div className="border-t border-[#EBF3F4] bg-white">
            <button
              type="button"
              onClick={() => setShowDraftInput((v) => !v)}
              className="w-full px-4 py-2 flex items-center justify-between text-[12px] text-[#7F8A92] hover:text-[#163143] transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                <Icon
                  icon="mdi:text-box-edit-outline"
                  className="text-[14px]"
                />
                Draft criteria (optional)
                {draftCriteria && (
                  <span className="text-[#69C920] font-semibold">
                    ·  attached
                  </span>
                )}
              </span>
              <Icon
                icon={
                  showDraftInput ? "mdi:chevron-down" : "mdi:chevron-up"
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
                <div className="text-[11px] text-[#7F8A92] mt-1">
                  {conversationId
                    ? "Draft is only sent on the first message of a thread."
                    : "When set, this replaces the saved rubric — sent instead of form_id."}
                </div>
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
        </>
      ) : (
        // ── Test on ticket tab ────────────────────────────────────────────
        <div className="flex-1 overflow-y-auto bg-[#F8FAFA] p-4 space-y-4">
          <div className="bg-white border border-[#D7E6E7] rounded-[12px] p-4 space-y-3">
            <div className="text-[13px] text-[#7F8A92] leading-[18px]">
              See how a candidate rubric change would score a real ticket.
              Nothing is saved.
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#163143] mb-1.5">
                Ticket ID<span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={testTicketId}
                onChange={(e) => setTestTicketId(e.target.value)}
                placeholder="e.g. 12345"
                disabled={testing}
                style={{ height: 38, borderRadius: 18 }}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#163143] mb-1.5">
                Form ID
              </label>
              <Input
                value={testFormId}
                onChange={(e) => setTestFormId(e.target.value)}
                placeholder="Optional — defaults to ticket's stored form"
                disabled={testing}
                style={{ height: 38, borderRadius: 18 }}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#163143] mb-1.5">
                Draft criteria overrides{" "}
                <span className="text-[11px] text-[#7F8A92] font-normal">
                  (one per line — `question_id: criteria text`)
                </span>
              </label>
              <TextArea
                value={overridesText}
                onChange={(e) => setOverridesText(e.target.value)}
                placeholder={`33: Agent must greet by name. 0 if absent, 5 if present.\n34: Resolution confirmed in closing. 0 if absent, 10 if present.`}
                autoSize={{ minRows: 3, maxRows: 6 }}
                disabled={testing}
                className="!text-[12px] !rounded-[10px] !border-[#D7E6E7] !font-mono"
              />
            </div>
            {testError && (
              <div className="bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[10px] px-3 py-2 text-[12px]">
                {testError}
              </div>
            )}
            <button
              type="button"
              onClick={handleRunTest}
              disabled={testing}
              className={`w-full inline-flex items-center justify-center gap-2 h-[40px] rounded-full text-[13px] font-semibold transition-colors ${
                testing
                  ? "bg-[#F1F5F5] text-[#9CA3AF] cursor-not-allowed"
                  : "bg-[#69C920] text-white hover:bg-[#5ab61c]"
              }`}
            >
              <Icon
                icon={testing ? "eos-icons:loading" : "mdi:play-outline"}
                className="text-[18px]"
              />
              {testing ? "Grading…" : "Run grading preview"}
            </button>
          </div>

          {testResult && (
            <>
              {/* Existing vs Preview totals */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-[#D7E6E7] rounded-[12px] p-3">
                  <div className="text-[11px] uppercase tracking-wide text-[#7F8A92] font-semibold mb-1">
                    Existing
                  </div>
                  <div className="text-[22px] font-bold text-[#163143] tabular-nums">
                    {testResult?.existing_grade?.final_score ?? "—"}
                    <span className="text-[13px] text-[#7F8A92] font-normal">
                      {" "}
                      / {testResult?.existing_grade?.max_score ?? "—"}
                    </span>
                  </div>
                  {testResult?.existing_grade?.percentage_score != null && (
                    <div className="text-[12px] text-[#7F8A92] tabular-nums">
                      {Number(
                        testResult.existing_grade.percentage_score
                      ).toFixed(1)}
                      %
                    </div>
                  )}
                </div>
                <div className="bg-[#E4FAED] border border-[#69C920] rounded-[12px] p-3">
                  <div className="text-[11px] uppercase tracking-wide text-[#1F8B3F] font-semibold mb-1">
                    Preview
                  </div>
                  <div className="text-[22px] font-bold text-[#163143] tabular-nums">
                    {testResult?.preview_grade?.final_score ?? "—"}
                    <span className="text-[13px] text-[#7F8A92] font-normal">
                      {" "}
                      / {testResult?.preview_grade?.max_score ?? "—"}
                    </span>
                  </div>
                  {testResult?.preview_grade?.percentage_score != null && (
                    <div className="text-[12px] text-[#1F8B3F] tabular-nums">
                      {Number(
                        testResult.preview_grade.percentage_score
                      ).toFixed(1)}
                      %
                    </div>
                  )}
                </div>
              </div>

              {/* Per-question diff */}
              <div className="bg-white border border-[#D7E6E7] rounded-[12px] overflow-hidden">
                <div className="px-3 py-2 border-b border-[#EBF3F4] text-[12px] font-semibold text-[#7F8A92] uppercase tracking-wide">
                  Per-question scores
                </div>
                <div className="divide-y divide-[#EBF3F4]">
                  {diffRows.length === 0 ? (
                    <div className="px-3 py-4 text-[12px] text-[#7F8A92] text-center">
                      No graded questions returned.
                    </div>
                  ) : (
                    diffRows.map((r, i) => {
                      const delta =
                        r.existing_score != null && r.preview_score != null
                          ? Number(r.preview_score) -
                            Number(r.existing_score)
                          : null;
                      const deltaColor =
                        delta == null
                          ? "#7F8A92"
                          : delta > 0
                          ? "#1F8B3F"
                          : delta < 0
                          ? "#C81E1E"
                          : "#7F8A92";
                      return (
                        <div key={i} className="px-3 py-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] text-[#7F8A92] truncate">
                                {r.category} · Q{r.question_id}
                              </div>
                              <div className="text-[12px] text-[#163143] line-clamp-2">
                                {r.text}
                              </div>
                            </div>
                            <div className="shrink-0 text-right text-[12px] tabular-nums">
                              <div className="text-[#7F8A92]">
                                {r.existing_score ?? "—"}{" "}
                                <span className="text-[11px] text-[#9CA3AF]">
                                  was
                                </span>
                              </div>
                              <div className="font-semibold text-[#163143]">
                                {r.preview_score ?? "—"} / {r.max_points ?? "—"}
                              </div>
                              {delta != null && (
                                <div
                                  className="text-[11px] font-semibold"
                                  style={{ color: deltaColor }}
                                >
                                  {delta > 0 ? "+" : ""}
                                  {delta}
                                </div>
                              )}
                            </div>
                          </div>
                          {r.note && (
                            <div className="text-[11px] text-[#7F8A92] mt-1 italic">
                              {r.note}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Drawer>
  );
}
