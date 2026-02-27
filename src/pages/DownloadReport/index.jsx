import { Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AntDRangePicker from "../../components/AntDRangePicker";
import {
  getAgentsNameForDownload,
  getClientsNameForDownload,
  getDownloadReport,
  getEventTypesForDownload,
} from "../../reduxStore/action/formsManagement";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import {
  EVENT_TYPES,
  EVENT_TYPES_PC,
  EVENT_TYPES_TICKET_MONITORING,
} from "../../utils/constants";

const REPORTCATEGORY = [
  {
    id: "ticket_monitoring_form",
    title: "Ticket Monitoring",
  },
  {
    id: "performance_coaching_form",
    title: "Performance Coaching",
  },
];
const REPORTFORMAT = [
  {
    id: "expanded",
    title: "Expanded",
    description: `Best for reviewing one report in detail
Includes organized insights and summaries. One report type only.`,
  },
  {
    id: "raw",
    title: "Raw",
    description: `Best for analysis and custom reporting
Includes full, unfiltered data. Multiple report types allowed.`,
  },
];
export const DownloadReport = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    selectedReportCat: null,
    selectedReportFormat: null,
    event_type: [],
    client_name: null,
    agent_name: null,
    date: null,
  });
  const [loader, setLoader] = useState();

  const [loaderForTypes, setLoaderForTypes] = useState();
  const { eventTypesForDownload } = useSelector(
    (store) => store.formsManagement
  );
  const user = useSelector((state) => state.auth.user);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeReportCategory = (value) => {
    setFormData({
      ...formData,
      selectedReportCat: value,
      event_type: [],
    });
  };

  const handleSubmit = () => {
    if (!formData?.selectedReportCat) {
      toast.error("Please select Report Category");
      return;
    }
    if (!formData?.selectedReportFormat) {
      toast.error("Please select Report Format");
      return;
    }
    if (
      !formData?.event_type?.length > 0 &&
      formData?.selectedReportFormat == "expanded"
    ) {
      toast.error("Please select Form Type");
      return;
    }
    if (!(formData?.date?.[0]?.length > 0 && formData?.date?.[0]?.length > 0)) {
      toast.error("Please select Start and end date");
      return;
    }
    const params = {
      ...formData,
      event_type: formData?.event_type?.map((item) => item?.value),
      updated_by_tl: user?.name,
    };
    dispatch(getDownloadReport(setLoader, toast, params));
  };
  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="text-[#163143] text-[24px] font-semibold">
        Download Report
      </div>
      <div className="font-semibold pr-2 mt-[30px] text-[20px] text-[#163143]">
        Customize Your Report
      </div>
      <div className="mt-2 py-[35px] px-[24px] h-full border border-[#D7E6E7] rounded-[24px] bg-[#FFF] overflow-y-auto">
        <div>
          <label
            htmlFor="report-cat"
            className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]"
          >
            Report Category<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {REPORTCATEGORY.map((type) => (
              <button
                key={type?.id}
                type="button"
                onClick={() => {
                  handleChangeReportCategory(type?.id);
                }}
                className={`p-4 rounded-[16px] border-1 text-left transition-all duration-200 ${
                  formData?.selectedReportCat?.includes(type?.id)
                    ? "border-[#86FE96] bg-[#86FE960A]"
                    : "border-[#D7E6E7] bg-[#FFFFFF] hover:border-[#86FE96]"
                }`}
              >
                <span className="text-[16px]">{type?.title}</span>
              </button>
            ))}
          </div>
          <div className="my-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="2"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 1H100" stroke="#D7E6E7" />
            </svg>
          </div>
        </div>

        <div>
          <label
            htmlFor="report-cat"
            className="text-[#163143] font-poppins text-[14px] not-italic font-semibold leading-[20.5px]"
          >
            Choose Your Report Format
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {REPORTFORMAT.map((type) => (
              <button
                key={type?.id}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    selectedReportFormat: type?.id,
                    event_type: [],
                  })
                }
                className={`p-4 rounded-[16px] border-1 text-left transition-all duration-200 ${
                  formData?.selectedReportFormat?.includes(type?.id)
                    ? "border-[#86FE96] bg-[#86FE960A]"
                    : "border-[#D7E6E7] bg-[#FFFFFF] hover:border-[#86FE96]"
                }`}
              >
                <div className="flex flex-col text-[12px]">
                  <span className="font-[500px]">{type?.title}</span>
                  <span className="whitespace-pre-wrap font-[400px]">
                    {type?.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="my-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="2"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 1H100" stroke="#D7E6E7" />
            </svg>
          </div>
        </div>

        <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          <div>
            <label className="block font-semibold text-[14px] mb-3">
              Date
              <span className="text-red-500">*</span>
            </label>
            <AntDRangePicker
              startPlaceholder="Select date"
              className="h-[50px] !w-[100%] !bg-[#FBFBFB] !border-[#efefef]"
              onChange={(e) => {
                handleChange("date", e);
              }}
            />
          </div>
          <div>
            <label className="block font-semibold text-[14px] mb-3">
              Type
              {formData?.selectedReportFormat == "expanded" && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <UnifiedDropdown
              name="Type"
              className="bg-[#FBFBFB] border-[#efefef] h-[50px] flex items-center justify-between px-3"
              fullwidthDropdown={true}
              // data={eventTypesForDownload}
              data={
                formData?.selectedReportCat == "ticket_monitoring_form"
                  ? EVENT_TYPES_TICKET_MONITORING
                  : formData?.selectedReportCat == "performance_coaching_form"
                  ? EVENT_TYPES_PC
                  : EVENT_TYPES
              }
              isLoading={loaderForTypes}
              selectedList={formData?.event_type}
              // setselectedList={(e) => handleChange("event_type", e)}
              setselectedList={(e) => handleChange("event_type", e)}
              multiSelect={
                formData?.selectedReportFormat == "expanded" ? false : true
              }
              displayKey="label"
              valueKey="value"
              searchKeys={["label"]}
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
