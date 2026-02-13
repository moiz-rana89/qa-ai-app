import { Icon } from "@iconify/react";
import { Button, Input, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDNotification } from "../../../components/AntDNotification";
import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import {
  createForms,
  getClientNames,
  getQasName,
  updateForms,
} from "../../../reduxStore/action/formsManagement";
import {
  FORM_CHANNEL,
  FORM_HELPDESK,
  FORM_TYPES,
} from "../../../utils/formsConstant";

export const FormSetting = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    form_type: "",
    form_name: "",
    channels: [],
    helpdesk: "",
  });
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedQas, setSelectedQas] = useState([]);

  const {
    clientNames,
    isLoadingClients,
    isLoading,
    activeForms,
    qasNames,
    isLoadingQas,
  } = useSelector((store) => store.formsManagement);

  useEffect(() => {
    dispatch(getClientNames());
    dispatch(getQasName());
  }, []);

  useEffect(() => {
    if (activeForms) {
      setFormData(activeForms);
    } else {
      setIsOpen(true);
    }
  }, [activeForms]);

  useEffect(() => {
    if (activeForms && isOpen) {
      setFormData(activeForms);
      setSelectedClients(
        activeForms?.clients &&
          activeForms?.clients?.map((item) => {
            return { client: item.client_name, client_id: item.client_id };
          })
      );
      setFormData({
        ...formData,
        channels: activeForms?.channel,
        // helpdesk
      });
      setSelectedQas(
        activeForms?.clients?.[0]?.qas
          ? activeForms?.clients?.[0]?.qas?.map((item) => {
              return { owner: item.qas_id, name: item.qas_name };
            })
          : []
      );
    }
  }, [isOpen]);

  const RemoveFromSelect = (item, selectedList, setselectedList) => {
    let temp = [...selectedList];
    temp = temp.filter((items) => items != item);
    setselectedList(temp);
  };
  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormCreate = () => {
    const params = {
      ...formData,
      clients: selectedClients?.map((item) => {
        return { client_name: item.client, client_id: item.client_id };
      }),
      qas: selectedQas?.map((item) => {
        return { qas_id: parseInt(item?.owner), qas_name: item.name };
      }),
      channels: formData?.channels,
    };
    if (
      params?.clients?.length > 0 &&
      params?.channels?.length > 0 &&
      // params?.qas?.length > 0 &&
      params?.form_name &&
      params?.form_type
    ) {
      if (activeForms) {
        dispatch(updateForms(activeForms?.form_id, params, AntDNotification));
      } else {
        dispatch(createForms(params, AntDNotification));
      }
    } else {
      AntDNotification({
        status: "error",
        title: "Error adding form",
        description: "Please fill all required fields",
        duration: 5,
      });
    }
  };
  return (
    <div className="bg-[#FCFCFC] rounded-[24px]  border border-[#D7E6E7] p-8">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-max bg-[#F1F5F5] px-[16px] py-[1px] rounded-[30px] text-[#163143] text-center font-poppins text-[14px] not-italic font-normal leading-6 tracking-[0.14px]">
          Form Settings
        </div>
        <Button
          style={{
            width: 32,
            height: 32,
            background: "#FFFFFF",
            borderRadius: "42px",
            border: "0.8px solid #D7E6E7",
            marginLeft: "auto",
          }}
          type="text"
          icon={
            <Icon
              icon={isOpen ? "iconamoon:arrow-up-2" : "iconamoon:arrow-down-2"}
              fontSize={16}
            />
          }
        />
      </div>
      {isOpen && (
        <div className="mt-[32px]">
          <div className="space-y-6 text-[#163143] font-[400]">
            <div className="w-[50%]">
              <label className="block text-[14px] font-semibold mb-3">
                Form Name
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.form_name}
                onChange={(e) => handleFormChange("form_name", e.target.value)}
                placeholder="Please type form name"
                className="min-h-[44px] p-[13px_53px_13px_14px] font-poppins text-[#163143] bg-[#FFFFFF] border border-[#D7E6E7] rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#69C920] focus:border-[#69C920] hover:border-[#69C920] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Form Type
                <span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder="Select form type"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={FORM_TYPES?.map((item) => ({
                  value: item?.value,
                  label: item?.label,
                }))}
                onChange={(e) => handleFormChange("form_type", e)}
                value={formData.form_type ? formData.form_type : null}
                className="w-[50%]"
                style={{ height: "44px" }}
                //   loading={isLoadingAgent}
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Select Channel
                <span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                placeholder="Select channel here"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={FORM_CHANNEL?.map((item) => ({
                  value: item?.value,
                  label: item?.label,
                }))}
                onChange={(e) => handleFormChange("channels", e)}
                value={formData.channels ? formData.channels : null}
                className="w-[50%]"
                style={{ height: "44px" }}
                //   loading={isLoadingClient}
              ></Select>
            </div>
            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Select Helpdesk
                <span className="text-red-500">*</span>
              </label>
              <Select
                // showSearch
                placeholder="Select helpdesk here"
                options={FORM_HELPDESK?.map((item) => ({
                  value: item?.value,
                  label: item?.label,
                }))}
                onChange={(e) => handleFormChange("helpdesk", e)}
                value={formData.helpdesk ? formData.helpdesk : null}
                className="w-[50%]"
                style={{ height: "44px" }}
                //   loading={isLoadingClient}
              ></Select>
            </div>
            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Select Client for This Form
                <span className="text-red-500">*</span>
              </label>
              <UnifiedDropdown
                // showSearch
                // placeholder="Select Client for this form"
                // filterOption={(input, option) =>
                //   (option?.label ?? "")
                //     .toLowerCase()
                //     .includes(input.toLowerCase())
                // }
                // options={clientNames?.map((item) => ({
                //   value: item?.client_id,
                //   label: item?.client,
                // }))}
                // onChange={(e) => handleFormChange("client_names", e)}
                // value={formData.client_names ? formData.client_names : null}
                // className="w-[50%]"
                // style={{ height: "44px" }}
                // loading={isLoadingClients}
                placeholder="Select Client for this form"
                name="Clients"
                data={clientNames}
                isLoading={isLoadingClients}
                selectedList={selectedClients}
                setselectedList={setSelectedClients}
                multiSelect={true}
                displayKey="client"
                valueKey="client_id"
                searchKeys={["client"]}
                className="h-[44px] w-[50%] border-[#d9d9d9]"
              />
            </div>
            <div className=" w-[50%] flex flex-wrap gap-3 ">
              {selectedClients.length > 0 &&
                selectedClients.map((item) => (
                  <div
                    onClick={() =>
                      RemoveFromSelect(
                        item,
                        selectedClients,
                        setSelectedClients
                      )
                    }
                    className="cursor-pointer py-1  bg-[#DBFFDF] rounded-full flex items-center justify-center px-2 text-[14px] text-[#163143]"
                  >
                    {item?.client}
                    <Icon
                      color="#163143"
                      fontSize={24}
                      className="pl-1"
                      icon="basil:cross-outline"
                    />
                  </div>
                ))}
            </div>
            <div>
              <label className="block text-[14px] font-semibold mb-3">
                Select QAS for This Form
                {/* <span className="text-red-500">*</span> */}
              </label>
              <UnifiedDropdown
                placeholder="Select Client for this form"
                name="QAS"
                data={qasNames}
                isLoading={isLoadingQas}
                selectedList={selectedQas}
                setselectedList={setSelectedQas}
                multiSelect={true}
                displayKey="name"
                valueKey="owner"
                searchKeys={["name"]}
                className="h-[44px] w-[50%] border-[#d9d9d9]"
              />
            </div>
            <div className=" w-[50%] flex flex-wrap gap-3 ">
              {selectedQas.length > 0 &&
                selectedQas.map((item) => (
                  <div
                    onClick={() =>
                      RemoveFromSelect(item, selectedQas, setSelectedQas)
                    }
                    className="cursor-pointer py-1  bg-[#DBFFDF] rounded-full flex items-center justify-center px-2 text-[14px] text-[#163143]"
                  >
                    {item?.name}
                    <Icon
                      color="#163143"
                      fontSize={24}
                      className="pl-1"
                      icon="basil:cross-outline"
                    />
                  </div>
                ))}
            </div>

            <button
              type="submit"
              onClick={() => handleFormCreate()}
              disabled={isLoading}
              className={`w-[160px] min-h-[40px] ml-auto text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#69C920] hover:bg-[#5CB518] text-white"
              }`}
            >
              {isLoading
                ? "Processing..."
                : activeForms
                ? "Update Form"
                : "Create Form"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
