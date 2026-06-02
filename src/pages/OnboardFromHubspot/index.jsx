"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Select, Modal, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import { CustomButton } from "../../components/Buttons/CustomButton";
import { onboardUserFromHubspot } from "../../reduxStore/action/userOnboarding";

// Allowed role values per spec (29 total). Sent lowercase to the backend.
// Labels are friendlier wherever the meaning is well-known; everything
// else falls back to the uppercased code so the admin can still pick it.
const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "dev", label: "Developer" },
  { value: "tl", label: "Team Lead" },
  { value: "dtl", label: "Department Team Lead" },
  { value: "itl", label: "Internal Team Lead" },
  { value: "dm", label: "Department Manager" },
  { value: "dd", label: "Department Director" },
  { value: "om", label: "Operations Manager" },
  { value: "aom", label: "Associate Operations Manager" },
  { value: "som", label: "Senior Operations Manager" },
  { value: "csm", label: "Customer Success Manager" },
  { value: "cstm", label: "Customer Service Team Member" },
  { value: "wfa", label: "WFA" },
  { value: "wf", label: "WF" },
  { value: "qa", label: "QA" },
  { value: "engineer", label: "Engineer" },
  { value: "sales", label: "Sales" },
  { value: "ops", label: "Operations" },
  { value: "training", label: "Training" },
  { value: "conceirge", label: "Concierge" },
  { value: "sdr", label: "SDR" },
  { value: "marketing", label: "Marketing" },
  { value: "partnership", label: "Partnership" },
  { value: "obs", label: "OBS" },
  { value: "hr", label: "HR" },
  { value: "hr_lead", label: "HR Lead" },
  { value: "is", label: "IS" },
  { value: "rs", label: "RS" },
  { value: "rm", label: "RM" },
];

export default function OnboardFromHubspot() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [position, setPosition] = useState("");

  // Field-specific error messages. `emailError` covers both client-side
  // validation and the 404 "no HubSpot user found" backend error.
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [positionError, setPositionError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState(null); // success modal data
  const [passwordCopied, setPasswordCopied] = useState(false);

  const resetForm = () => {
    setEmail("");
    setRole(undefined);
    setPosition("");
    setEmailError("");
    setRoleError("");
    setPositionError("");
  };

  const validate = () => {
    let ok = true;
    setEmailError("");
    setRoleError("");
    setPositionError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required.");
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      ok = false;
    }
    if (!role) {
      setRoleError("Role is required.");
      ok = false;
    }
    if (!position.trim()) {
      setPositionError("Position is required.");
      ok = false;
    }
    return ok;
  };

  // Map a Pydantic-style 422 error payload back onto the right field.
  // Backend shape:
  //   { detail: [ { loc: ["body","role"], msg: "...", type: "..." }, ... ] }
  const handle422 = (errData) => {
    const detail = errData?.data?.detail || errData?.detail;
    if (!Array.isArray(detail)) {
      toast.error("Validation error. Please check the form.");
      return;
    }
    detail.forEach((d) => {
      const field = Array.isArray(d?.loc) ? d.loc[d.loc.length - 1] : null;
      const msg = d?.msg || "Invalid value.";
      if (field === "email") setEmailError(msg);
      else if (field === "role") setRoleError(msg);
      else if (field === "position") setPositionError(msg);
      else toast.error(msg);
    });
  };

  const handleSubmit = () => {
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    const body = {
      email: email.trim(),
      role,
      position: position.trim(),
    };

    dispatch(
      onboardUserFromHubspot(body, (success, dataOrErr) => {
        if (success) {
          setCreatedUser(dataOrErr);
          setPasswordCopied(false);
          resetForm();
          toast.success("User onboarded successfully");
        } else {
          const status = dataOrErr?.response?.status;
          const errData = dataOrErr?.data;

          if (status === 404) {
            setEmailError(
              errData?.detail ||
                `No HubSpot user found for email: ${body.email}`
            );
          } else if (status === 422) {
            handle422(dataOrErr);
          } else if (status === 500) {
            toast.error(
              errData?.detail ||
                "An error occurred while accessing the database."
            );
          } else {
            toast.error(
              errData?.detail ||
                dataOrErr?.message ||
                "Failed to onboard user. Please try again."
            );
          }
        }
        setSubmitting(false);
      })
    );
  };

  const handleCopyPassword = async () => {
    if (!createdUser?.password) return;
    try {
      await navigator.clipboard.writeText(createdUser.password);
      setPasswordCopied(true);
      toast.success("Password copied to clipboard");
      setTimeout(() => setPasswordCopied(false), 2500);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-7 px-8 flex items-center justify-between">
        <span className="text-2xl font-semibold text-[#163143]">
          Onboard from HubSpot
        </span>
      </div>

      {/* Form card */}
      <div className="mx-8 mt-6 mb-8 bg-white rounded-[16px] border border-[#D7E6E7] p-8 max-w-[640px]">
        <p className="text-[#7F8A92] text-[14px] mb-6">
          Provision a new internal user by looking them up in HubSpot. The
          email must already exist in HubSpot — a plaintext password will be
          generated on creation and shown once.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-[#163143] font-poppins text-[14px] font-semibold mb-2">
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder="user@talentpopteam.co"
            status={emailError ? "error" : ""}
            disabled={submitting}
            style={{ height: 44, borderRadius: 24 }}
          />
          {emailError && (
            <div className="text-[#C81E1E] text-[12px] mt-1">{emailError}</div>
          )}
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-[#163143] font-poppins text-[14px] font-semibold mb-2">
            Role<span className="text-red-500 ml-1">*</span>
          </label>
          <Select
            showSearch
            placeholder="Select a role"
            value={role}
            onChange={(v) => {
              setRole(v);
              if (roleError) setRoleError("");
            }}
            options={ROLE_OPTIONS}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase()) ||
              (option?.value ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            status={roleError ? "error" : ""}
            disabled={submitting}
            className="w-full custom-select-forms"
            style={{ height: 44 }}
            optionRender={(opt) => (
              <div className="flex items-center justify-between">
                <span>{opt.label}</span>
                <span className="text-[11px] text-[#7F8A92] font-mono">
                  {opt.value}
                </span>
              </div>
            )}
          />
          {roleError && (
            <div className="text-[#C81E1E] text-[12px] mt-1">{roleError}</div>
          )}
        </div>

        {/* Position */}
        <div className="mb-6">
          <label className="block text-[#163143] font-poppins text-[14px] font-semibold mb-2">
            Position<span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              if (positionError) setPositionError("");
            }}
            placeholder="e.g. Remote Team Lead"
            status={positionError ? "error" : ""}
            disabled={submitting}
            style={{ height: 44, borderRadius: 24 }}
          />
          {positionError && (
            <div className="text-[#C81E1E] text-[12px] mt-1">
              {positionError}
            </div>
          )}
          <div className="text-[#7F8A92] text-[12px] mt-1">
            Free text — will be saved as the user's job title.
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <CustomButton
            text="Reset"
            textColor="#163143"
            bg="white"
            borderColor="#D7E6E7"
            width={120}
            onclick={resetForm}
          />
          <CustomButton
            text={submitting ? "Onboarding…" : "Onboard User"}
            textColor="white"
            bg="#69C920"
            borderColor={undefined}
            width={160}
            onclick={handleSubmit}
          />
        </div>
      </div>

      {/* Success modal — shows the generated password once */}
      <Modal
        open={!!createdUser}
        title={
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:check-circle"
              className="text-[#1F8B3F] text-[22px]"
            />
            <span className="text-[#163143] text-[18px] font-semibold">
              User onboarded
            </span>
          </div>
        }
        onCancel={() => setCreatedUser(null)}
        onOk={() => setCreatedUser(null)}
        okText="Done"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: { background: "#69C920", borderColor: "#69C920" },
        }}
        destroyOnClose
      >
        {createdUser && (
          <div className="space-y-4 pt-2">
            <div className="bg-[#FFF7D8] border border-[#F0B400] rounded-[12px] px-4 py-3 text-[13px] text-[#7A5A00]">
              <Icon
                icon="mdi:alert-outline"
                className="inline align-[-3px] mr-1 text-[16px]"
              />
              Copy the password now — it will not be shown again.
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-y-2 gap-x-3 text-[14px]">
              <div className="text-[#7F8A92]">Name</div>
              <div className="text-[#163143] font-semibold">
                {createdUser.name || "—"}
              </div>

              <div className="text-[#7F8A92]">Email</div>
              <div className="text-[#163143] break-all">
                {createdUser.email}
              </div>

              <div className="text-[#7F8A92]">Role</div>
              <div className="text-[#163143] font-mono">
                {createdUser.role}
              </div>

              <div className="text-[#7F8A92]">Job Title</div>
              <div className="text-[#163143]">
                {createdUser.job_title || "—"}
              </div>
            </div>

            <div>
              <div className="text-[#7F8A92] text-[13px] mb-1">
                Generated Password
              </div>
              <div className="flex items-stretch gap-2">
                <div className="flex-1 bg-[#F1F5F5] border border-[#D7E6E7] rounded-[10px] px-3 py-[10px] font-mono text-[14px] text-[#163143] break-all">
                  {createdUser.password}
                </div>
                <Tooltip
                  title={passwordCopied ? "Copied" : "Copy to clipboard"}
                >
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="inline-flex items-center justify-center w-[44px] rounded-[10px] border border-[#D7E6E7] bg-white hover:bg-[#F1F5F5] hover:border-[#69C920] transition-colors"
                    aria-label="Copy password"
                  >
                    <Icon
                      icon={
                        passwordCopied
                          ? "mdi:check"
                          : "mdi:content-copy"
                      }
                      className={
                        passwordCopied ? "text-[#1F8B3F]" : "text-[#69C920]"
                      }
                      fontSize={18}
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
