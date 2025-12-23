import { Tag } from "antd";
import {
  FileTextOutlined,
  FileImageOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";

const ConversationScreen = ({
  ticketSubject,
  tags = [],
  messages = [],
  data,
}) => {
  console.log('tags', tags)
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getFileIcon = (filename) => {
    if (!filename) return <PaperClipOutlined className="text-blue-600" />;

    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext)) {
      return <FileImageOutlined className="text-blue-600" />;
    }
    return <FileTextOutlined className="text-blue-600" />;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header with Subject and Tags */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-[14px] font-[400px] text-[#163143] mb-4">
          Subject: {ticketSubject}
        </h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[12px] text-[#000000] bg-[#DBFFDF] px-[16px] py-[2px] rounded-[30px]">
                {tag.name || ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-b-0"
          >
            {/* Message Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
                    Full Name:{" "}
                    {message.firstname && message.lastname
                      ? `${message.firstname} ${message.lastname}`
                      : message.firstname || message.lastname || "Unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[12px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
                    Email:{" "}
                    {message.sender.match(/<(.+)>/)?.[1] || message.sender}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
                  {formatDateTime(message.created_datetime)}
                </span>
              </div>
            </div>

            {/* Message Body */}
            {message.message_body && (
              <div className="text-[#163143E5] text-[14px] leading-relaxed mb-4 whitespace-pre-wrap">
                {message.message_body}
              </div>
            )}

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {message.attachments.map((attachment, attIndex) => (
                  <div className="flex items-center gap-2 text-[12px] bg-[#F1F5F5] px-[16px] py-[2px] rounded-[30px]">
                    <span> {attachment.filename}</span>
                    <span className="text-[#69C920]">
                      <Icon icon="fluent:open-12-regular" fontSize={16} />
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Internal Note */}
            {message.internal_note && (
              <div className="bg-[#FFF7D8] text-[#163143] rounded-[16px] p-4 mt-8">
                <div className="text-[14px] font-[400px] mb-1">
                  Internal Note
                </div>
                <div className="text-[14px] italic">
                  {message.internal_note}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationScreen;
