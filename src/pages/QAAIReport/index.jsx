import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AntDRangePicker from "../../components/AntDRangePicker";
import { getQAAIReport } from "../../reduxStore/action/formsManagement";

export const QAAIReport = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = () => {
    if (!(date?.[0]?.length > 0 && date?.[1]?.length > 0)) {
      toast.error("Please select Start and end date");
      return;
    }
    dispatch(
      getQAAIReport(setLoader, toast, {
        tl_name: user?.name,
        start_date: date[0],
        end_date: date[1],
        admin: ["admin", "dev", "wfa"].includes(user?.role),
      })
    );
  };

  return (
    <div className="w-full flex flex-col p-8">
      <div className="flex items-center justify-between">
        <div className="text-[#163143] text-[24px] font-semibold">
          Download Report
        </div>
      </div>
      <div className="font-semibold pr-2 mt-[30px] text-[20px] text-[#163143]">
        Customize Your Report
      </div>
      <div className="mt-2 py-[35px] px-[24px] border border-[#D7E6E7] rounded-[24px] bg-[#FFF]">
        <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          <div>
            <label className="block font-semibold text-[14px] mb-3">
              Date
              <span className="text-red-500">*</span>
            </label>
            <AntDRangePicker
              startPlaceholder="Select date"
              className="h-[50px] !w-[100%] !bg-[#FBFBFB] !border-[#efefef]"
              onChange={(e) => setDate(e)}
            />
          </div>
        </div>

        <div className="flex items-center mt-[52px]">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loader}
            className={`w-[213px] min-h-[40px] text-[14px] font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
              loader
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#69C920] hover:bg-[#5CB518] text-white"
            }`}
          >
            {loader ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};
