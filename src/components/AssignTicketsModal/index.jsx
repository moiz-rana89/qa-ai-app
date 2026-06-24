"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, InputNumber, Radio } from "antd";
import { Icon } from "@iconify/react";

import { CustomButton } from "../Buttons/CustomButton";
import { assignTickets } from "../../reduxStore/action/assignTickets";

// Eligibility window per role — surfaced to the user as a small note so
// they know zeroes mean "no eligible tickets in that window," not a bug.
const ELIGIBILITY_DAYS = { tl: 20, qas: 15 };

const isValidEmail = (s) => /^\S+@\S+\.\S+$/.test((s || "").trim());

export default function AssignTicketsModal({ open, onClose, clients = [] }) {
  const dispatch = useDispatch();

  // ── Form state ──────────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tl"); // "tl" | "qas"
  const [mode, setMode] = useState("total"); // "total" | "per_client"
  const [total, setTotal] = useState(30);
  // { [clientName]: count } — only entries with count > 0 are sent
  const [perClient, setPerClient] = useState({});

  // ── Submit + result state ───────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ── Inline validation errors ────────────────────────────────────────────
  const [emailError, setEmailError] = useState("");
  const [modeError, setModeError] = useState("");

  // Reset everything when the modal is reopened — clean slate each time
  useEffect(() => {
    if (open) {
      setEmail("");
      setRole("tl");
      setMode("total");
      setTotal(30);
      setPerClient({});
      setResult(null);
      setErrorMessage("");
      setEmailError("");
      setModeError("");
      setSubmitting(false);
    }
  }, [open]);

  // ── Derived values ──────────────────────────────────────────────────────
  // Real-time per-client total for the summary row
  const perClientTotal = useMemo(
    () =>
      Object.values(perClient).reduce(
        (acc, n) => acc + (Number(n) > 0 ? Number(n) : 0),
        0
      ),
    [perClient]
  );

  // Strip zero/empty values — what we'll actually send to the API
  const perClientCleaned = useMemo(
    () =>
      Object.entries(perClient).reduce((acc, [k, v]) => {
        const n = Number(v);
        if (n > 0) acc[k] = n;
        return acc;
      }, {}),
    [perClient]
  );

  // Normalize the clients prop into a flat name list (works for either
  // strings or { client } objects coming from getClientNames).
  const clientList = useMemo(() => {
    if (!Array.isArray(clients)) return [];
    return clients
      .map((c) => (typeof c === "string" ? c : c?.client || c?.name))
      .filter(Boolean);
  }, [clients]);

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    let ok = true;
    setEmailError("");
    setModeError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      ok = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      ok = false;
    }

    if (mode === "total") {
      if (!total || total < 1) {
        setModeError("Total must be at least 1.");
        ok = false;
      }
    } else {
      if (Object.keys(perClientCleaned).length === 0) {
        setModeError("Set a count of 1 or more for at least one client.");
        ok = false;
      }
    }

    return ok;
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (submitting) return;
    if (!validate()) return;

    setErrorMessage("");
    setSubmitting(true);

    // The spec says: send EITHER total OR per_client, never both.
    const body =
      mode === "total"
        ? { email: email.trim(), role, total }
        : { email: email.trim(), role, per_client: perClientCleaned };

    dispatch(
      assignTickets(body, (success, dataOrErr) => {
        setSubmitting(false);
        if (success) {
          setResult(dataOrErr);
        } else {
          const status = dataOrErr?.response?.status;
          const detail = dataOrErr?.data?.detail || dataOrErr?.message;
          if (status === 404) {
            setErrorMessage("No user found with that email.");
          } else if (status === 400) {
            // 400 detail contains the actual role-mismatch / config message
            setErrorMessage(detail || "Request rejected. Check the role.");
          } else if (status === 500) {
            setErrorMessage("Server error, please try again.");
          } else {
            setErrorMessage(detail || "Something went wrong.");
          }
        }
      })
    );
  };

  const handleAssignMore = () => {
    // Keep email + role, reset assignment details and result
    setResult(null);
    setErrorMessage("");
    setMode("total");
    setTotal(30);
    setPerClient({});
  };

  // ── Render helpers ──────────────────────────────────────────────────────
  const renderForm = () => (
    <div className="space-y-5">
      {/* Step 1 — Target */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
        <div>
          <label className="block text-[#163143] font-poppins text-[13px] font-semibold mb-1.5">
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder="user@talentpop.co"
            status={emailError ? "error" : ""}
            disabled={submitting}
            style={{ height: 40, borderRadius: 20 }}
          />
          {emailError && (
            <div className="text-[#C81E1E] text-[11px] mt-1">{emailError}</div>
          )}
        </div>
        <div>
          <label className="block text-[#163143] font-poppins text-[13px] font-semibold mb-1.5">
            Role<span className="text-red-500 ml-1">*</span>
          </label>
          <Radio.Group
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            disabled={submitting}
            buttonStyle="solid"
            className="!w-full"
          >
            <Radio.Button value="tl" style={{ width: "50%", textAlign: "center" }}>
              TL
            </Radio.Button>
            <Radio.Button value="qas" style={{ width: "50%", textAlign: "center" }}>
              QAS
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Eligibility note */}
      <div className="text-[12px] text-[#7F8A92] bg-[#F8FAFA] border border-[#EBF3F4] rounded-[10px] px-3 py-2 flex items-start gap-2">
        <Icon
          icon="mdi:information-outline"
          className="text-[16px] text-[#69C920] shrink-0 mt-[1px]"
        />
        Only tickets from the last <strong>{ELIGIBILITY_DAYS[role]} days</strong>{" "}
        are eligible for {role.toUpperCase()} assignment.
      </div>

      {/* Step 2 — Mode */}
      <div>
        <label className="block text-[#163143] font-poppins text-[13px] font-semibold mb-1.5">
          Assignment Mode
        </label>
        <Radio.Group
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setModeError("");
          }}
          disabled={submitting}
          className="!w-full"
        >
          <Radio value="total" className="!mr-6">
            Global total
          </Radio>
          <Radio value="per_client">Per client</Radio>
        </Radio.Group>

        {mode === "total" ? (
          <div className="mt-3 bg-[#F8FAFA] border border-[#EBF3F4] rounded-[12px] p-4">
            <label className="block text-[13px] font-semibold text-[#163143] mb-1.5">
              Total tickets
            </label>
            <InputNumber
              min={1}
              value={total}
              onChange={(v) => setTotal(v ?? 1)}
              disabled={submitting}
              style={{ width: 140, borderRadius: 20 }}
            />
            <div className="text-[11px] text-[#7F8A92] mt-2">
              Randomly sampled across all clients.
            </div>
          </div>
        ) : (
          <div className="mt-3 bg-[#F8FAFA] border border-[#EBF3F4] rounded-[12px] p-4 max-h-[260px] overflow-y-auto">
            {clientList.length === 0 ? (
              <div className="text-[12px] text-[#7F8A92] py-4 text-center">
                No clients available to assign from.
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {clientList.map((name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[13px] text-[#163143] truncate flex-1">
                        {name}
                      </span>
                      <InputNumber
                        min={0}
                        value={perClient[name] ?? 0}
                        onChange={(v) =>
                          setPerClient((prev) => ({
                            ...prev,
                            [name]: v ?? 0,
                          }))
                        }
                        disabled={submitting}
                        style={{ width: 90, borderRadius: 16 }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D7E6E7] text-[13px] font-semibold text-[#163143]">
                  <span>Total</span>
                  <span className="tabular-nums">{perClientTotal}</span>
                </div>
              </>
            )}
          </div>
        )}
        {modeError && (
          <div className="text-[#C81E1E] text-[11px] mt-1">{modeError}</div>
        )}
      </div>

      {/* Step 3 — Preview summary */}
      <div className="bg-white border border-[#D7E6E7] rounded-[12px] p-4">
        <div className="text-[12px] font-semibold text-[#7F8A92] uppercase tracking-wide mb-2">
          Preview
        </div>
        <div className="grid grid-cols-[110px_1fr] gap-y-1.5 gap-x-3 text-[13px]">
          <div className="text-[#7F8A92]">Assigning to</div>
          <div className="text-[#163143]">
            {email || <em className="text-[#9CA3AF]">—</em>}{" "}
            <span className="text-[11px] uppercase tracking-wide bg-[#F1F5F5] text-[#163143] px-2 py-[1px] rounded-full ml-1">
              {role}
            </span>
          </div>
          <div className="text-[#7F8A92]">Mode</div>
          <div className="text-[#163143]">
            {mode === "total" ? "Global total" : "Per client"}
          </div>
          {mode === "total" ? (
            <>
              <div className="text-[#7F8A92]">Total</div>
              <div className="text-[#163143] font-semibold tabular-nums">
                {total}
              </div>
            </>
          ) : Object.keys(perClientCleaned).length > 0 ? (
            <>
              {Object.entries(perClientCleaned).map(([name, n]) => (
                <>
                  <div key={`l-${name}`} className="text-[#7F8A92] truncate">
                    {name}
                  </div>
                  <div
                    key={`v-${name}`}
                    className="text-[#163143] tabular-nums"
                  >
                    {n}
                  </div>
                </>
              ))}
              <div className="text-[#7F8A92] border-t border-[#D7E6E7] pt-1 mt-1">
                Total
              </div>
              <div className="text-[#163143] font-semibold tabular-nums border-t border-[#D7E6E7] pt-1 mt-1">
                {perClientTotal}
              </div>
            </>
          ) : (
            <>
              <div className="text-[#7F8A92]">Total</div>
              <div className="text-[#9CA3AF]">—</div>
            </>
          )}
        </div>
      </div>

      {/* Inline error from API */}
      {errorMessage && (
        <div className="bg-[#FFECEC] border border-[#DC2626] text-[#DC2626] rounded-[12px] px-4 py-3 text-[13px] flex items-start gap-2">
          <Icon
            icon="mdi:alert-circle-outline"
            className="text-[18px] shrink-0 mt-[1px]"
          />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <CustomButton
          text="Cancel"
          textColor="#163143"
          bg="white"
          borderColor="#D7E6E7"
          width={110}
          onclick={onClose}
        />
        <CustomButton
          text={submitting ? "Assigning…" : "Assign Tickets"}
          textColor="white"
          bg="#69C920"
          borderColor={undefined}
          width={170}
          onclick={handleSubmit}
        />
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-4 pt-2">
      <div className="flex items-start gap-3 bg-[#E4FAED] border border-[#1F8B3F] rounded-[12px] px-4 py-3">
        <Icon
          icon="mdi:check-circle"
          className="text-[#1F8B3F] text-[24px] shrink-0"
        />
        <div>
          <div className="text-[15px] font-semibold text-[#163143]">
            {result?.assigned ?? 0} ticket
            {result?.assigned === 1 ? "" : "s"} assigned to{" "}
            {result?.target_email}
          </div>
          <div className="text-[12px] text-[#7F8A92] mt-0.5">
            Role: <span className="font-semibold">{result?.role}</span>
            {result?.target_id ? (
              <>
                {" · "}Target ID:{" "}
                <span className="font-mono">{result.target_id}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {result?.breakdown && Object.keys(result.breakdown).length > 0 && (
        <div className="bg-white border border-[#D7E6E7] rounded-[12px] p-4">
          <div className="text-[12px] font-semibold text-[#7F8A92] uppercase tracking-wide mb-2">
            Breakdown
          </div>
          <div className="grid grid-cols-[1fr_60px] gap-y-1.5 gap-x-3 text-[13px]">
            {Object.entries(result.breakdown).map(([name, n]) => (
              <>
                <div key={`bl-${name}`} className="text-[#163143] truncate">
                  {name}
                </div>
                <div
                  key={`bv-${name}`}
                  className="text-[#163143] tabular-nums text-right font-semibold"
                >
                  {n}
                </div>
              </>
            ))}
          </div>
        </div>
      )}

      {result?.assigned === 0 && (
        <div className="text-[12px] text-[#7F8A92] bg-[#F8FAFA] border border-[#EBF3F4] rounded-[10px] px-3 py-2 flex items-start gap-2">
          <Icon
            icon="mdi:information-outline"
            className="text-[16px] text-[#7F8A92] shrink-0 mt-[1px]"
          />
          No tickets were assigned — either there were no eligible
          unassigned tickets in the window, or this user already has them.
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <CustomButton
          text="Close"
          textColor="#163143"
          bg="white"
          borderColor="#D7E6E7"
          width={110}
          onclick={onClose}
        />
        <CustomButton
          text="Assign More"
          textColor="white"
          bg="#69C920"
          borderColor={undefined}
          width={140}
          onclick={handleAssignMore}
        />
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      destroyOnClose
      title={
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:ticket-account"
            className="text-[#69C920] text-[22px]"
          />
          <span className="text-[#163143] text-[16px] font-semibold">
            Assign Tickets
          </span>
        </div>
      }
    >
      {result ? renderResult() : renderForm()}
    </Modal>
  );
}
