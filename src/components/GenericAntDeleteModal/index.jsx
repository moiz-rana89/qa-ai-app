"use client";

import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";

export const GenericAntDeleteModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}) => {
  const [loader, setLoader] = useState(isLoading);
  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading]);
  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      closable={true}
      closeIcon={
        <CloseOutlined className="text-[#163143] hover:text-gray-900" />
      }
      className="rounded-full"
      wrapClassName="generic-ant-modal-wrapper"
      bodyStyle={{
        padding: "16px 16px",
      }}
      style={{
        borderRadius: "32px",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h2 className="text-[24px] font-semibold text-[#163143] text-center">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-[#163143] text-base">{message}</p>

        {/* Buttons Container */}
        <div className="flex flex-col gap-3">
          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            disabled={loader}
            className={`w-full py-3 px-6 rounded-full font-semibold text-[16px] text-white transition-all duration-200 ${
              isDangerous
                ? "bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                : "bg-[#69C920]"
            } disabled:cursor-not-allowed`}
          >
            {loader ? "Loading..." : confirmText}
          </button>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            disabled={loader}
            className="w-full py-3 px-6 rounded-full font-semibold text-[16px] text-[#163143] border-1 border-[#D7E6E7] hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenericAntDeleteModal;
