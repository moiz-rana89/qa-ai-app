import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import ArrayProgressBar from "../../components/ArrayProgressBar";

export default function EvaluteHeader({
  typeScores = 100,
  totalAiScore = 500,

  total,
  currentIndex,
  next,
  prev,
  id,
  aiJson,
  userJson,
  submit,
}) {
  const calculateScores = (categories = []) => {
    return categories.reduce(
      (acc, category) => {
        category?.questions?.forEach((q) => {
          acc.totalScore += Number(q.score) || 0;
          acc.maxScore += Number(q.max_points) || 0;
        });

        return acc;
      },
      { totalScore: 0, maxScore: 0 }
    );
  };

  return (
    <div className="w-full border-b border-[#D7E6E7] bg-white flex  h-[70px] justify-between pl-3 items-center">
      <div className=" w-full  justify-start  flex h-full">
        <div className=" flex w-[100%] items-center gap-5 justify-start">
          <div className="bg-white rounded-full border-[1px] border-[#D7E6E7] p-2">
            <Icon
              icon="ci:exit"
              className="rotate-180 text-[22px] text-[#FF5546]"
            />
          </div>
          <div className="flex items-center gap-3">
            <div
              onClick={prev}
              className="bg-white rounded-full border-[1px] border-[#D7E6E7] p-2"
            >
              <Icon icon="oui:arrow-left" />
            </div>
            <div
              onClick={next}
              className="bg-white rounded-full border-[1px] border-[#D7E6E7] p-2"
            >
              <Icon icon="oui:arrow-right" />
            </div>
          </div>

          <div className="w-[50%] flex items-center ">
            <ArrayProgressBar total={total} currentIndex={currentIndex} />
            <div className="text-[#163143] text-[14px] font-semibold ml-2">
              {currentIndex + 1}/{total}
            </div>
          </div>
          {totalAiScore && typeScores ? (
            <div className="ml-auto mr-5 flex">
              <div className="text-[#163143] text-[16px] font-semibold mr-2">
                AI Score:
              </div>
              <div className="text-[#69C920] text-[16px] font-semibold mr-2">
                {calculateScores(aiJson)?.totalScore}/
                {calculateScores(aiJson)?.maxScore}
              </div>
              <div className="ml-5 text-[#163143] text-[16px] font-semibold mr-2">
                Your Score:
              </div>
              <div className="text-[#69C920] text-[16px] font-semibold mr-8">
                {calculateScores(userJson)?.totalScore}/
                {calculateScores(userJson)?.maxScore}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className=" flex items-center gap-4 mr-4">
        <div
          onClick={() => submit(id)}
          className=" w-[120px] h-[40px] text-[14px] cursor-pointer font-medium bg-[#69C920] text-white rounded-full flex items-center justify-center "
        >
          {/* {isSubmitting ? "Submitting..." : "Submit"} */}
        </div>
      </div>
    </div>
  );
}
