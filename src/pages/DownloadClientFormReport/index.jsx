import { Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AntDRangePicker from "../../components/AntDRangePicker";
import {
  getAgentsNameForDownload,
  getClientsNameForCSFDownload,
  getClientsNameForDownload,
  getDownloadCSFReport,
  getDownloadReport,
  getEventTypesForDownload,
} from "../../reduxStore/action/formsManagement";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";

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
export const DownloadClientFormReport = () => {
  const user = JSON.parse(localStorage.getItem("user_details"));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    selectedReportFormat: null,
    client_name: [],
    date: null,
  });
  const [loader, setLoader] = useState();

  const [loaderForClients, setLoaderForClients] = useState();

  const { clientNamesForDownload } = useSelector(
    (store) => store.formsManagement
  );
  useEffect(() => {
    dispatch(getClientsNameForCSFDownload(setLoaderForClients, user?.name));
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData?.client_name?.lenght <= 0) {
      toast.error("Please select Clients");
      return;
    }
    if (!formData?.selectedReportFormat) {
      toast.error("Please select Report Format");
      return;
    }
    if (!(formData?.date?.[0]?.length > 0 && formData?.date?.[0]?.length > 0)) {
      toast.error("Please select Start and end date");
      return;
    }
    dispatch(
      getDownloadCSFReport(setLoader, toast, {
        ...formData,
        updated_by_tl: user?.name,
      })
    );
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
            Select Client<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <UnifiedDropdown
              name="Clients"
              className="bg-[#FBFBFB] border-[#efefef] h-[50px] flex items-center justify-between px-3"
              data={clientNamesForDownload}
              isLoading={loaderForClients}
              selectedList={formData?.client_name}
              setselectedList={(e) => handleChange("client_name", e)}
              multiSelect={
                formData?.selectedReportFormat == "expanded" ? false : true
              }
            />
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
                onClick={() => {
                  if (
                    type?.id == "expanded" &&
                    formData?.client_name?.length > 1
                  ) {
                    setFormData({
                      ...formData,
                      selectedReportFormat: type?.id,
                      client_name: [formData?.client_name?.[0]],
                    });
                  } else {
                    handleChange("selectedReportFormat", type?.id);
                  }
                }}
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

        <div className="mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
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
