"use client";
import { Select, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomSelect from "../../../components/CustomSelect";

const { TextArea } = Input;

const QuestionItem = ({
  question,
  index,
  score,
  note,
  onScoreChange,
  onNotesChange,
}) => {
  const generateScoreOptions = () => {
    const options = [];
    const maxPoints = question.max_points;
    const step = 1;

    for (let i = 0; i <= maxPoints; i += step) {
      options.push({
        value: i,
        label: i.toFixed(step < 1 ? 1 : 0),
      });
    }

    return options;
  };

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <CustomSelect
          value={score}
          onChange={(value) => onScoreChange(question.question_id, value)}
          placeholder="0.00"
          options={generateScoreOptions()}
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="text-[14px] text-[#163143] whitespace-pre-line">
          {question.text}
          {/* <span className="text-gray-500 ml-2">
            ({question.max_points} point{question.max_points !== 1 ? "s" : ""})
          </span> */}
        </div>

        <textarea
          value={note}
          onChange={(e) => onNotesChange(question.question_id, e.target.value)}
          placeholder="Add notes here..."
          className="w-full text-[12px] mt-4 px-2 py-2 bg-[#FFFFFF] border border-[#D7E6E7] rounded-[12px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] transition-all duration-200 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          rows={3}
        />
      </div>
    </div>
  );
};

export default QuestionItem;
