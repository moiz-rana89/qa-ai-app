import { Icon } from "@iconify/react";
import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDNotification } from "../../../components/AntDNotification";
import GenericAntDeleteModal from "../../../components/GenericAntDeleteModal";
import {
  enableForm,
  getAllForms,
  setActiveForms,
} from "../../../reduxStore/action/formsManagement";
import { FormDetails } from "./FormDetails";
import { FormSetting } from "./FormSetting";

export const CreateEditForms = ({ setCreateNew }) => {
  const [isFormPublishOpen, setIsFormPublishOpen] = useState();
  const { activeForms, isDeleting } = useSelector(
    (store) => store.formsManagement
  );

  const dispatch = useDispatch();
  const handleEnableFormSuccess = (status) => {
    if (status) {
      AntDNotification({
        status: "success",
        title: activeForms?.is_enabled
          ? "Form Unpublished!"
          : "Form Published!",
        description: activeForms?.is_enabled
          ? "Form Unpublished successfully"
          : "Form saved and published successfully",
        duration: 5,
      });
      setCreateNew(false);
    } else {
      AntDNotification({
        status: "error",
        title: "Error Updating form",
        description: "Failed to Update form, please try again",
        duration: 5,
      });
    }
  };

  const handleEnableButton = () => {
    dispatch(
      enableForm(
        activeForms?.form_id,
        !activeForms?.is_enabled,
        handleEnableFormSuccess
      )
    );
  };
  return (
    <div className="w-full h-full flex flex-col">
      <GenericAntDeleteModal
        title={activeForms?.is_enabled ? "Unpublish Form" : "Publish Form?"}
        message={
          activeForms?.is_enabled
            ? "You’re about to unpublish this form. Once unpublished, it will no longer be accessible to the assigned clients."
            : "You’re about to publish this form. Once published, it will be assigned to all selected clients."
        }
        isOpen={isFormPublishOpen}
        isLoading={isDeleting}
        onCancel={() => setIsFormPublishOpen(false)}
        onConfirm={() => handleEnableButton()}
      />
      <div className="flex items-center text-[#163143] min-h-[67px] max-h-[63px] p-5  border-l border-[#EBF3F4] bg-white shadow-[0px_1px_16px_rgba(22,49,67,0.08)]">
        <h1 className="text-[16px] font-semibold">
          {activeForms ? "Edit Form" : "Create Form"}
        </h1>
        {activeForms?.form_name && (
          <div className="ml-5 bg-[#F1F5F5] px-[16px] py-[1px] rounded-[30px] text-[#163143] text-center font-poppins text-[14px] not-italic font-normal leading-6 tracking-[0.14px]">
            {activeForms?.form_name}
          </div>
        )}
        <div className="flex items-center ml-auto gap-[15px]">
          <button
            onClick={() => {
              dispatch(setActiveForms(null));
              setCreateNew(false);
              dispatch(getAllForms({ page: 1, size: 10 }, null));
            }}
            className={`w-[160px] min-h-[40px] ml-auto text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143]`}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => setIsFormPublishOpen(true)}
            disabled={activeForms ? false : true}
            className={`w-[160px] min-h-[40px] ml-auto text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
              !activeForms
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#69C920] hover:bg-[#5CB518] text-white"
            }`}
          >
            {activeForms?.is_enabled ? "Unpublish Form" : "Publish Form"}
          </button>
        </div>
      </div>

      <div className="h-[100%] space-y-4 overflow-y-scroll py-8 px-4 sm:px-6 lg:px-8">
        <FormSetting />
        {activeForms && <FormDetails />}
      </div>
    </div>
  );
};
