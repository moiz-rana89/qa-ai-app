import React, { useRef, useState, useEffect } from "react";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { refreshTokenAuth } from "../../reduxStore/action/auth";

/* =========================
   Upload Icon
========================= */
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    style={{ marginRight: "8px" }}
  >
    <path
      d="M7.50056 5.67008H9.15011V13.2214C9.15011 13.3196 9.23047 13.4 9.32868 13.4H10.668C10.7662 13.4 10.8465 13.3196 10.8465 13.2214V5.67008H12.5006C12.6501 5.67008 12.7327 5.4982 12.6412 5.38213L10.1412 2.21695C10.1245 2.19561 10.1031 2.17835 10.0788 2.16648C10.0544 2.15461 10.0277 2.14844 10.0006 2.14844C9.97346 2.14844 9.94671 2.15461 9.92234 2.16648C9.89798 2.17835 9.87664 2.19561 9.85993 2.21695L7.35993 5.3799C7.26842 5.4982 7.351 5.67008 7.50056 5.67008ZM18.1702 12.5518H16.8309C16.7327 12.5518 16.6523 12.6321 16.6523 12.7303V16.1678H3.34877V12.7303C3.34877 12.6321 3.26842 12.5518 3.1702 12.5518H1.83092C1.7327 12.5518 1.65234 12.6321 1.65234 12.7303V17.15C1.65234 17.5451 1.97154 17.8643 2.36663 17.8643H17.6345C18.0296 17.8643 18.3488 17.5451 18.3488 17.15V12.7303C18.3488 12.6321 18.2684 12.5518 18.1702 12.5518Z"
      fill="#69C920"
    />
  </svg>
);

/* =========================
   Animated dots style
========================= */
const dotsStyle = {
  display: "inline-block",
  marginLeft: "5px",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#69C920",
  animation: "upload-bounce 1.4s infinite ease-in-out both",
};

/* =========================
   Component
========================= */
const UploadFile = ({ fileInfo = [], setFileInfo, required, reqNotes }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadUrl = `${import.meta.env.VITE_API_URL}/workforce/reports/upload`;

  /* Inject keyframes SAFELY */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes upload-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // const handleFilesSelected = (event) => {
  //   const files = Array.from(event.target.files || []);
  //   if (!files.length) return;

  //   setUploading(true);

  //   const formData = new FormData();
  //   files.forEach((file) => formData.append("files", file));

  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", uploadUrl);
  //   xhr.withCredentials = true;

  //   xhr.onload = () => {
  //     try {
  //       const data = JSON.parse(xhr.responseText);
  //       if (!data.files) throw new Error();

  //       const mappedFiles = data.files.map((f) => ({
  //         name: f.filename,
  //         url: f.s3_url,
  //       }));

  //       setFileInfo((prev) => [...(prev || []), ...mappedFiles]);
  //       message.success("Files uploaded successfully");
  //     } catch {
  //       message.error("Upload failed or invalid response");
  //     } finally {
  //       setUploading(false);
  //       if (fileInputRef.current) fileInputRef.current.value = "";
  //     }
  //   };

  //   xhr.onerror = () => {
  //     message.error("Upload failed");
  //     setUploading(false);
  //   };

  //   xhr.send(formData);
  // };

  const handleFilesSelected = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      await uploadFiles(formData, false);
    } catch (err) {
      message.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const uploadFiles = (formData, isRetry = false) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", uploadUrl);
      xhr.withCredentials = true;

      xhr.onload = async () => {
        console.log("Upload status:", xhr.status);

        // 🔴 Handle 401
        if (xhr.status === 401 && !isRetry) {
          try {
            console.log("401 detected. Refreshing...");
            await refreshTokenAuth();
            console.log("Refresh success. Retrying upload...");
            return resolve(uploadFiles(formData, true));
          } catch (err) {
            console.log("Refresh failed.");
            return reject(err);
          }
        }

        // ❌ If still failing after retry
        if (xhr.status >= 400) {
          return reject(new Error("Upload failed"));
        }

        // ✅ Success
        try {
          const data = JSON.parse(xhr.responseText);
          if (!data.files) throw new Error();

          const mappedFiles = data.files.map((f) => ({
            name: f.filename,
            url: f.s3_url,
          }));

          setFileInfo((prev) => [...(prev || []), ...mappedFiles]);
          message.success("Files uploaded successfully");

          return resolve(data);
        } catch (err) {
          return reject(err);
        }
      };

      xhr.onerror = () => reject(new Error("Upload failed"));

      xhr.send(formData);
    });
  };

  const removeFile = (name) => {
    setFileInfo((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <div style={{ textAlign: "left" }}>
      <p className="text-[#163143] font-poppins text-[16px] font-semibold">
        Upload Files {required && <span className="text-red-500">*</span>}
      </p>
      {required && (
        <div className="text-[#7F8A92] font-poppins text-[14px]">
          <div>Required Proof:</div>
          <div className="ml-[5px] whitespace-pre-wrap">
            {/* • Employer-approved maternity leave approval (if applicable) Medical
          certificate */}
            {reqNotes}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFilesSelected}
        style={{ display: "none" }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "50px",
          padding: "6px 20px",
          display: "flex",
          alignItems: "center",
          background: "#fff",
          cursor: uploading ? "not-allowed" : "pointer",
          marginTop: "10px",
        }}
      >
        {!uploading && <UploadIcon />}
        {uploading ? (
          <span style={{ display: "flex", alignItems: "center" }}>
            Uploading
            <span style={{ ...dotsStyle, animationDelay: "0s" }} />
            <span style={{ ...dotsStyle, animationDelay: "0.2s" }} />
            <span style={{ ...dotsStyle, animationDelay: "0.4s" }} />
          </span>
        ) : (
          "Click to Upload"
        )}
      </button>

      {fileInfo?.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          {fileInfo.map((file) => (
            <div key={file.name} style={{ display: "flex", gap: "8px" }}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <CloseOutlined
                onClick={() => removeFile(file.name)}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
