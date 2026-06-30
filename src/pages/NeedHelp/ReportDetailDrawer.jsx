"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Input, Modal, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import { CustomButton } from "../../components/Buttons/CustomButton";
import {
  addReportComment,
  decideReport,
  deleteReport,
  getReportById,
  resolveReport,
  updateReport,
} from "../../reduxStore/action/needHelp";
import { extractApiError } from "../../utils/helperFunctions";

const { TextArea } = Input;

// Pill helpers — reuse the same status/decision logic as the list page.
const statusPill = (resolved) =>
  resolved
    ? { label: "Resolved", bg: "#E4FAED", fg: "#1F8B3F" }
    : { label: "Pending", bg: "#FFF7D8", fg: "#B86E00" };

const decisionPill = (d) => {
  if (d === true) return { label: "Approved", bg: "#E4FAED", fg: "#1F8B3F" };
  if (d === false) return { label: "Denied", bg: "#FFECEC", fg: "#C81E1E" };
  return { label: "Awaiting Decision", bg: "#F1F5F5", fg: "#163143" };
};

const typeBadge = (type) =>
  type === "Feature"
    ? { bg: "#E0EEFB", fg: "#1A56DB" }
    : { bg: "#FFECEC", fg: "#C81E1E" };

const Pill = ({ label, bg, fg }) => (
  <span
    className="inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-semibold"
    style={{ background: bg, color: fg }}
  >
    {label}
  </span>
);

// Tiny circular avatar from a display name's initial.
const Avatar = ({ name }) => {
  const letter = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="w-[28px] h-[28px] rounded-full bg-[#394E5E] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
      {letter}
    </div>
  );
};

export default function ReportDetailDrawer({
  open,
  reportId,
  onClose,
  onChanged, // called after any mutation so the parent can refresh the list
  roleFlags = {}, // { isAdmin, isOM, isEngineer }
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);

  // Per-action in-flight flags
  const [busy, setBusy] = useState({
    resolve: false,
    approve: false,
    deny: false,
    retract: false,
  });
  const [posting, setPosting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [retractOpen, setRetractOpen] = useState(false);

  // Edit mode + form state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);

  const commentsEndRef = useRef(null);

  const fetchDetail = () => {
    if (reportId == null) return;
    setLoading(true);
    dispatch(
      getReportById(reportId, (success, data) => {
        if (success) {
          setReport(data);
          setComments(data?.comments || []);
        } else {
          const status = data?.response?.status;
          if (status === 404) {
            toast.error("Report not found");
            onClose?.();
          } else if (status === 403) {
            toast.error("You don't have permission to perform this action");
            onClose?.();
          } else {
            toast.error(extractApiError(data, "Failed to load report."));
          }
        }
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    if (open && reportId != null) {
      // Reset transient state every time the drawer is reopened
      setReport(null);
      setComments([]);
      setCommentText("");
      setEditing(false);
      setEditForm({});
      setRetractOpen(false);
      fetchDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reportId]);

  useEffect(() => {
    // Scroll to the latest comment whenever the comment list grows
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments.length]);

  if (!open) return null;

  // ── Permission flags ────────────────────────────────────────────────────
  const isOwn =
    !!report?.submitted_by &&
    user?.email &&
    String(report.submitted_by).toLowerCase() === String(user.email).toLowerCase();
  const isResolved = !!report?.resolved_by_eng;
  const canEditOrRetract = isOwn && !isResolved;
  const canResolve = roleFlags.isAdmin || roleFlags.isEngineer;
  const canApprove =
    (roleFlags.isAdmin || roleFlags.isOM) &&
    report?.decision_by_stakeholder !== true;
  const canDeny =
    (roleFlags.isAdmin || roleFlags.isOM) &&
    report?.decision_by_stakeholder !== false;

  // ── Common error handling shorthand ─────────────────────────────────────
  const handleErr = (data, fallback) => {
    const status = data?.response?.status;
    if (status === 403) {
      toast.error("You don't have permission to perform this action");
    } else {
      toast.error(extractApiError(data, fallback));
    }
  };

  // ── Edit ────────────────────────────────────────────────────────────────
  const beginEdit = () => {
    setEditForm({
      description: report?.description || "",
      page_link: report?.page_link || "",
      loom_recording_link: report?.loom_recording_link || "",
    });
    setEditing(true);
  };
  const cancelEdit = () => {
    setEditing(false);
    setEditForm({});
  };
  const saveEdit = () => {
    // Diff against the original — only send changed fields
    const body = {};
    if ((editForm.description || "") !== (report?.description || "")) {
      body.description = editForm.description || "";
    }
    if ((editForm.page_link || "") !== (report?.page_link || "")) {
      body.page_link = editForm.page_link || "";
    }
    if (
      (editForm.loom_recording_link || "") !==
      (report?.loom_recording_link || "")
    ) {
      body.loom_recording_link = editForm.loom_recording_link || "";
    }

    if (Object.keys(body).length === 0) {
      toast("No changes to save");
      setEditing(false);
      return;
    }
    if (body.description !== undefined && body.description.trim().length < 70) {
      toast.error("Description must be at least 70 characters.");
      return;
    }

    setSavingEdit(true);
    dispatch(
      updateReport(reportId, body, (success, data) => {
        setSavingEdit(false);
        if (success) {
          toast.success("Report updated");
          setEditing(false);
          fetchDetail();
          onChanged?.();
        } else {
          handleErr(data, "Failed to update report.");
        }
      })
    );
  };

  // ── Retract ─────────────────────────────────────────────────────────────
  const confirmRetract = () => {
    setBusy((b) => ({ ...b, retract: true }));
    dispatch(
      deleteReport(reportId, (success, data) => {
        setBusy((b) => ({ ...b, retract: false }));
        if (success) {
          toast.success("Report retracted");
          setRetractOpen(false);
          onChanged?.();
          onClose?.();
        } else {
          handleErr(data, "Failed to retract report.");
        }
      })
    );
  };

  // ── Resolve / Approve / Deny ────────────────────────────────────────────
  const handleResolve = () => {
    setBusy((b) => ({ ...b, resolve: true }));
    dispatch(
      resolveReport(reportId, (success, data) => {
        setBusy((b) => ({ ...b, resolve: false }));
        if (success) {
          toast.success("Marked as resolved");
          setReport((r) => (r ? { ...r, resolved_by_eng: true } : r));
          onChanged?.();
        } else {
          handleErr(data, "Failed to resolve report.");
        }
      })
    );
  };
  const handleDecision = (decision) => {
    const key = decision ? "approve" : "deny";
    setBusy((b) => ({ ...b, [key]: true }));
    dispatch(
      decideReport(reportId, decision, (success, data) => {
        setBusy((b) => ({ ...b, [key]: false }));
        if (success) {
          toast.success(decision ? "Report approved" : "Report denied");
          setReport((r) =>
            r ? { ...r, decision_by_stakeholder: decision } : r
          );
          onChanged?.();
        } else {
          handleErr(data, "Failed to update decision.");
        }
      })
    );
  };

  // ── Comments ────────────────────────────────────────────────────────────
  const handlePostComment = () => {
    const body = commentText.trim();
    if (!body) return;
    setPosting(true);
    dispatch(
      addReportComment(reportId, { body }, (success, data) => {
        setPosting(false);
        if (success) {
          // Optimistic append — append the returned row (or a local synth
          // when the response is sparse) and clear the textarea.
          setComments((prev) => [
            ...prev,
            {
              id: data?.id ?? `local-${Date.now()}`,
              body: data?.body ?? body,
              created_by: data?.created_by ?? user?.email,
              created_by_name: user?.name || user?.email,
              created_at: data?.created_at ?? new Date().toISOString(),
            },
          ]);
          setCommentText("");
        } else {
          handleErr(data, "Failed to post comment.");
        }
      })
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────
  const t = typeBadge(report?.report_type);
  const sp = statusPill(report?.resolved_by_eng);
  const dp = decisionPill(report?.decision_by_stakeholder);
  const showSubmittedBy = roleFlags.isAdmin || roleFlags.isOM;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={620}
      title={
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {report?.report_type && (
              <span
                className="inline-flex items-center px-2 py-[2px] rounded-full text-[11px] font-semibold"
                style={{ background: t.bg, color: t.fg }}
              >
                {report.report_type}
              </span>
            )}
            <span className="text-[#163143] text-[15px] font-semibold">
              Report #{report?.id ?? reportId}
            </span>
            {report?.created_at && (
              <span className="text-[#7F8A92] text-[12px]">
                · submitted {dayjs(report.created_at).format("MMM D, YYYY")}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#163143] hover:bg-[#F1F5F5] rounded p-1"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="text-[20px]" />
          </button>
        </div>
      }
      closable={false}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col h-full">
        {loading || !report ? (
          <div className="flex-1 flex items-center justify-center text-[#7F8A92] py-20">
            <Icon
              icon="eos-icons:loading"
              className="text-[28px] text-[#69C920] mr-2"
            />
            Loading…
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Status + decision pills + submitted by */}
              <div className="flex flex-wrap items-center gap-2">
                <Pill {...sp} />
                <Pill {...dp} />
                {showSubmittedBy && report?.submitted_by_name && (
                  <Tooltip title={report.submitted_by} placement="bottom">
                    <span className="text-[12px] text-[#7F8A92] cursor-help">
                      · Submitted by{" "}
                      <span className="text-[#163143] font-medium">
                        {report.submitted_by_name}
                      </span>
                    </span>
                  </Tooltip>
                )}
              </div>

              {/* Body — read vs edit */}
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#163143] mb-1.5">
                      Description<span className="text-red-500 ml-1">*</span>
                    </label>
                    <TextArea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      autoSize={{ minRows: 4, maxRows: 10 }}
                      className="!rounded-[12px] !border-[#D7E6E7]"
                    />
                    <div
                      className={`text-[11px] mt-1 ${
                        (editForm.description || "").trim().length < 70
                          ? "text-[#C81E1E]"
                          : "text-[#7F8A92]"
                      }`}
                    >
                      {(editForm.description || "").trim().length} / 70 min
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#163143] mb-1.5">
                      Page link
                    </label>
                    <Input
                      value={editForm.page_link}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          page_link: e.target.value,
                        }))
                      }
                      placeholder="https://…"
                      style={{ height: 40, borderRadius: 20 }}
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#163143] mb-1.5">
                      Loom recording link
                    </label>
                    <Input
                      value={editForm.loom_recording_link}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          loom_recording_link: e.target.value,
                        }))
                      }
                      placeholder="https://www.loom.com/…"
                      style={{ height: 40, borderRadius: 20 }}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <CustomButton
                      text="Cancel"
                      textColor="#163143"
                      bg="white"
                      borderColor="#D7E6E7"
                      width={100}
                      onclick={cancelEdit}
                    />
                    <CustomButton
                      text={savingEdit ? "Saving…" : "Save changes"}
                      textColor="white"
                      bg="#69C920"
                      borderColor={undefined}
                      width={150}
                      onclick={saveEdit}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[#163143] text-[14px] leading-[22px] whitespace-pre-wrap break-words">
                    {report?.description || (
                      <em className="text-[#9CA3AF]">(no description)</em>
                    )}
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-y-2 gap-x-3 text-[13px]">
                    {report?.page_link && (
                      <>
                        <div className="text-[#7F8A92]">Page link</div>
                        <a
                          href={report.page_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1A56DB] underline break-all"
                        >
                          {report.page_link}
                        </a>
                      </>
                    )}
                    {report?.loom_recording_link && (
                      <>
                        <div className="text-[#7F8A92]">Loom</div>
                        <a
                          href={report.loom_recording_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1A56DB] underline break-all"
                        >
                          {report.loom_recording_link}
                        </a>
                      </>
                    )}
                    {report?.client_name && (
                      <>
                        <div className="text-[#7F8A92]">Client</div>
                        <div className="text-[#163143]">
                          {report.client_name}
                        </div>
                      </>
                    )}
                    {report?.agent_name && (
                      <>
                        <div className="text-[#7F8A92]">Agent</div>
                        <div className="text-[#163143]">
                          {report.agent_name}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EBF3F4]">
                    {canEditOrRetract && (
                      <>
                        <button
                          type="button"
                          onClick={beginEdit}
                          className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold border border-[#D7E6E7] text-[#163143] bg-white hover:bg-[#F1F5F5]"
                        >
                          <Icon icon="mdi:pencil-outline" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setRetractOpen(true)}
                          className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold border border-[#FDCFCF] text-[#C81E1E] bg-white hover:bg-[#FFECEC]"
                        >
                          <Icon icon="mdi:close-circle-outline" /> Retract
                        </button>
                      </>
                    )}
                    {canResolve && !report?.resolved_by_eng && (
                      <button
                        type="button"
                        onClick={handleResolve}
                        disabled={busy.resolve}
                        className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] disabled:opacity-50"
                      >
                        <Icon
                          icon={busy.resolve ? "eos-icons:loading" : "mdi:check"}
                        />
                        {busy.resolve ? "Resolving…" : "Mark Resolved"}
                      </button>
                    )}
                    {canApprove && (
                      <button
                        type="button"
                        onClick={() => handleDecision(true)}
                        disabled={busy.approve}
                        className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold text-white bg-[#1F8B3F] hover:opacity-90 disabled:opacity-50"
                      >
                        <Icon
                          icon={
                            busy.approve
                              ? "eos-icons:loading"
                              : "mdi:thumb-up-outline"
                          }
                        />
                        {busy.approve ? "Approving…" : "Approve"}
                      </button>
                    )}
                    {canDeny && (
                      <button
                        type="button"
                        onClick={() => handleDecision(false)}
                        disabled={busy.deny}
                        className="inline-flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold text-white bg-[#C81E1E] hover:opacity-90 disabled:opacity-50"
                      >
                        <Icon
                          icon={
                            busy.deny
                              ? "eos-icons:loading"
                              : "mdi:thumb-down-outline"
                          }
                        />
                        {busy.deny ? "Denying…" : "Deny"}
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Comments */}
              <div className="pt-2">
                <div className="text-[12px] uppercase tracking-wide font-semibold text-[#7F8A92] mb-3">
                  Comments
                </div>
                {comments.length === 0 ? (
                  <div className="text-[12px] text-[#7F8A92] py-4 text-center bg-[#F8FAFA] rounded-[10px] border border-[#EBF3F4]">
                    No comments yet. Be the first.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {comments.map((c) => (
                      <div key={c.id} className="flex gap-2">
                        <Avatar name={c.created_by_name || c.created_by} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[13px] font-semibold text-[#163143] truncate">
                              {c.created_by_name || c.created_by || "—"}
                            </span>
                            <span className="text-[11px] text-[#7F8A92]">
                              ·{" "}
                              {c.created_at
                                ? dayjs(c.created_at).format(
                                    "MMM D, h:mm A"
                                  )
                                : ""}
                            </span>
                          </div>
                          <div className="text-[13px] text-[#163143] whitespace-pre-wrap break-words mt-0.5">
                            {c.body}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={commentsEndRef} />
                  </div>
                )}

                <div className="mt-3">
                  <TextArea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Leave a comment…"
                    autoSize={{ minRows: 2, maxRows: 5 }}
                    disabled={posting}
                    className="!rounded-[12px] !border-[#D7E6E7]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={handlePostComment}
                      disabled={posting || !commentText.trim()}
                      className={`inline-flex items-center gap-1 px-4 py-[8px] rounded-full text-[13px] font-semibold transition-colors ${
                        posting || !commentText.trim()
                          ? "bg-[#F1F5F5] text-[#9CA3AF] cursor-not-allowed"
                          : "bg-[#69C920] text-white hover:bg-[#5ab61c]"
                      }`}
                    >
                      <Icon
                        icon={posting ? "eos-icons:loading" : "mdi:send"}
                      />
                      {posting ? "Posting…" : "Post Comment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Retract confirm */}
      <Modal
        open={retractOpen}
        onCancel={() => setRetractOpen(false)}
        onOk={confirmRetract}
        okText={busy.retract ? "Retracting…" : "Retract"}
        cancelText="Keep report"
        okButtonProps={{
          danger: true,
          loading: busy.retract,
        }}
        title="Retract this report?"
      >
        <p className="text-[13px] text-[#163143]">
          Are you sure? This cannot be undone.
        </p>
      </Modal>
    </Drawer>
  );
}
