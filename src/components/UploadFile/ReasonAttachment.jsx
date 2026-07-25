import React, { useEffect, useState } from "react";
import { Upload, message, Progress } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { refreshTokenAuth } from "../../reduxStore/action/auth";

const baseURL = import.meta.env.VITE_API_URL;

// Custom Upload Icon as React component
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
      fill="#163143"
    />
  </svg>
);

const ReasonAttachment = ({ fileInfo, setFileInfo }) => {
  const [progress, setProgress] = useState(0);

  const uploadUrl = `${baseURL}/workforce/reports/upload`;

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,

    customRequest: async (options) => {
      const { file, onSuccess, onError, onProgress } = options;

      const formData = new FormData();
      formData.append("file", file);

      const uploadFile = async (isRetry = false) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl);
          xhr.withCredentials = true;

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setProgress(percent);
              onProgress?.({ percent });
            }
          };

          xhr.onload = async () => {
            console.log("Upload status:", xhr.status);

            // 🔴 If unauthorized and not retried yet
            if (xhr.status === 401 && !isRetry) {
              try {
                console.log("401 received. Refreshing token...");
                await refreshTokenAuth();
                console.log("Token refreshed. Retrying upload...");

                // retry once
                const retryResult = await uploadFile(true);
                return resolve(retryResult);
              } catch (err) {
                console.log("Refresh failed");
                return reject(err);
              }
            }

            // ✅ Success
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                return resolve(data);
              } catch (err) {
                return reject(err);
              }
            }

            // ❌ Any other error
            return reject(new Error("Upload failed"));
          };

          xhr.onerror = () => {
            reject(new Error("Upload failed"));
          };

          xhr.send(formData);
        });
      };

      try {
        const data = await uploadFile(false);

        setFileInfo({
          name: file.name,
          url: data.s3_object_url,
        });

        message.success("File uploaded successfully");
        onSuccess?.(data, file);
      } catch (err) {
        message.error("Upload failed");
        onError?.(err);
      }
    },
  };
  const handleRemove = () => {
    setFileInfo(null);
    setProgress(0);
  };

  return (
    <div style={{ textAlign: "left" }}>
      {/* <p className="mb-[10px] text-[#163143] font-poppins text-[16px] not-italic font-semibold leading-[20.5px]">
        {fileInfo ? "Uploaded" : "Upload"} File
      </p> */}
      {!fileInfo && (
        <Upload {...props} style={{ width: "100%" }}>
          <div
            style={{
              background: "#FBFBFB",
              width: "100%",
              height: "45px",
              border: "1px solid #e0e0e0",
              borderRadius: "50px",
              padding: "10px 10px",
              fontWeight: 400,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                alignItems: "center",
                cursor: "pointer",
                color: "#16314380",
              }}
            >
              <span>Click to Upload</span>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <UploadIcon />
            </div>
          </div>
        </Upload>
      )}

      {/* Progress bar while uploading */}
      {progress > 0 && progress < 100 && (
        <div style={{ marginTop: "10px", width: "250px" }}>
          <Progress percent={progress} size="small" strokeColor="#69C920" />
        </div>
      )}

      {/* Uploaded file with delete option */}
      {fileInfo && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <a
            href={fileInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff", textDecoration: "underline" }}
          >
            {fileInfo.name}
          </a>
          <CloseOutlined
            onClick={handleRemove}
            style={{
              color: "red",
              cursor: "pointer",
              fontSize: "14px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReasonAttachment;
