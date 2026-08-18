"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Drawer, Input } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import { CustomButton } from "../../components/Buttons/CustomButton";
import { getDIMemberAudit, updateDIMember } from "../../reduxStore/action/dataIntegrity";
import { extractApiError, humanizeKey } from "../../utils/helperFunctions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { key: "helpdesk_user_id", label: "Helpdesk User ID" },
  { key: "helpdesk_user_email", label: "Hub Desk User Email" },
  { key: "helpdesk_client_id", label: "Hub Desk Client ID" },
];

const Avatar = ({ name }) => {
  const letter = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="w-[28px] h-[28px] rounded-full bg-[#394E5E] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
      {letter}
    </div>
  );
};

export default function EditMemberDrawer({
  open,
  member,
  canEdit,
  onClose,
  onSaved, // called after a save that should refresh the list
}) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [audit, setAudit] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);

  useEffect(() => {
    if (open && member) {
      setForm({
        helpdesk_user_id: member.helpdesk_user_id || "",
        helpdesk_user_email: member.helpdesk_user_email || "",
        helpdesk_client_id: member.helpdesk_client_id || "",
      });
      setAudit(null);
      setAuditLoading(true);
      dispatch(
        getDIMemberAudit(member.member_id, (success, data) => {
          setAuditLoading(false);
          if (success) {
            setAudit(data);
          } else {
            toast.error(extractApiError(data, "Failed to load audit history."));
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, member?.member_id]);

  if (!open || !member) return null;

  // Editing requires both a global can_edit flag and a linked HubSpot
  // ticket — a member with no ticket 409s on PATCH, so the fields are
  // shown read-only rather than letting the user hit that wall.
  const editable = canEdit && !!member.hubspot_ticket_id;

  const handleErr = (data, fallback) => {
    const status = data?.response?.status ?? data?.status;
    if (status === 403) {
      toast.error("You don't have permission to edit this record.");
    } else if (status === 404) {
      toast.error("This record is no longer available.");
      onSaved?.();
      onClose?.();
    } else if (status === 409) {
      toast.error(
        "This member has no linked HubSpot ticket — link one in HubSpot first."
      );
    } else if (status === 500) {
      // HubSpot wrote successfully but the local mirror failed — surface
      // this verbatim, and never auto-retry (the value would double-write).
      toast.error(data?.data?.detail || extractApiError(data, fallback));
    } else if (status === 502) {
      toast.error(
        "HubSpot is unreachable right now — nothing changed, safe to retry."
      );
    } else {
      toast.error(extractApiError(data, fallback));
    }
  };

  const handleSave = () => {
    const body = {};
    FIELDS.forEach(({ key }) => {
      const next = (form[key] || "").trim();
      const prev = member[key] || "";
      if (next !== prev) {
        body[key] = next;
      }
    });

    if (Object.keys(body).length === 0) {
      toast("No changes to save");
      return;
    }
    if (Object.values(body).some((v) => !v)) {
      toast.error("Fields cannot be blank.");
      return;
    }
    if (body.helpdesk_user_email && !EMAIL_RE.test(body.helpdesk_user_email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    setSaving(true);
    dispatch(
      updateDIMember(member.member_id, body, (success, data) => {
        setSaving(false);
        if (success) {
          if (data?.updated === false) {
            toast("No changes to save");
          } else {
            toast.success("Member updated");
            onSaved?.();
          }
          onClose?.();
        } else {
          handleErr(data, "Failed to update member.");
        }
      })
    );
  };

  const hasChanges = FIELDS.some(
    ({ key }) => (form[key] || "").trim() !== (member[key] || "")
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={520}
      closable={false}
      title={
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#163143] text-[16px] font-semibold">
            {member.agent_name || "Member"}
          </span>
          <button
            onClick={onClose}
            className="text-[#163143] hover:bg-[#F1F5F5] rounded p-1"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="text-[20px]" />
          </button>
        </div>
      }
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!editable && (
            <div className="text-[12px] text-[#7F8A92] bg-[#F8FAFA] border border-[#EBF3F4] rounded-[10px] px-3 py-2">
              {member.hubspot_ticket_id
                ? "You don't have permission to edit this record."
                : "This member has no linked HubSpot ticket, so it can't be edited here."}
            </div>
          )}

          <div className="space-y-4">
            {FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[13px] font-semibold text-[#163143] mb-1.5">
                  {label}
                </label>
                {editable ? (
                  <Input
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    style={{ height: 40, borderRadius: 20 }}
                  />
                ) : (
                  <div className="text-[14px] text-[#163143] px-1 py-2">
                    {member[key] || <span className="text-[#7F8A92]">—</span>}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editable && (
            <div className="flex justify-end gap-2">
              <CustomButton
                text="Cancel"
                textColor="#163143"
                bg="white"
                borderColor="#D7E6E7"
                width={100}
                onclick={onClose}
              />
              <CustomButton
                text={saving ? "Saving…" : "Save"}
                textColor="white"
                bg={hasChanges ? "#69C920" : "#B9E39A"}
                borderColor={undefined}
                width={100}
                onclick={!saving && hasChanges ? handleSave : undefined}
              />
            </div>
          )}

          {/* Audit History */}
          <div className="pt-2 border-t border-[#EBF3F4]">
            <div className="text-[12px] uppercase tracking-wide font-semibold text-[#7F8A92] mb-3 mt-4">
              Audit History
            </div>
            {auditLoading ? (
              <div className="text-[12px] text-[#7F8A92] py-4 text-center">
                Loading…
              </div>
            ) : !audit?.data?.length ? (
              <div className="text-[12px] text-[#7F8A92] py-4 text-center bg-[#F8FAFA] rounded-[10px] border border-[#EBF3F4]">
                No edits recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {audit.data.map((entry) => (
                  <div key={entry.id} className="flex gap-2">
                    <Avatar name={entry.changed_by} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-[13px] font-semibold text-[#163143] truncate">
                          {entry.changed_by || "—"}
                        </span>
                        {entry.changed_by_role && (
                          <span className="text-[11px] text-[#7F8A92]">
                            ({entry.changed_by_role})
                          </span>
                        )}
                        <span className="text-[11px] text-[#7F8A92]">
                          ·{" "}
                          {entry.created_at
                            ? dayjs(entry.created_at).format("MMM D, h:mm A")
                            : ""}
                        </span>
                      </div>
                      <div className="text-[13px] text-[#163143] mt-0.5">
                        <span className="font-medium">
                          {humanizeKey(entry.field)}
                        </span>
                        {": "}
                        <span className="text-[#7F8A92]">
                          {entry.old_value ?? "—"}
                        </span>
                        {" → "}
                        <span>{entry.new_value ?? "—"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
