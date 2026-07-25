"use client";

import { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  getHubstaffOptions,
  updateScheduleMapping,
} from "../../reduxStore/action/scheduleManagement";

export default function EditMappingModal({
  open,
  setOpen,
  selectedSchedule,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [project, setProject] = useState(null);

  const { hubstaffOptions } = useSelector(
    (store) => store.scheduleManagement
  );

  useEffect(() => {
    if (open) {
      // Lazy load hubstaff options
      dispatch(getHubstaffOptions());
      setClient(selectedSchedule?.client || null);
      setClientId(selectedSchedule?.client_id || null);
      setProject(selectedSchedule?.project || null);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setClient(null);
    setClientId(null);
    setProject(null);
  };

  const handleClientChange = (value) => {
    const selected = hubstaffOptions?.hubstaff_clients?.find(
      (c) => c.id === value
    );
    setClient(selected?.name);
    setClientId(selected?.id);
  };

  const handleSave = () => {
    if (!clientId) {
      toast.error("Please select a client");
      return;
    }

    setLoading(true);
    dispatch(
      updateScheduleMapping(
        selectedSchedule?.id,
        {
          client: client,
          client_id: clientId,
          project: project,
        },
        (success) => {
          if (success) {
            toast.success("Mapping updated successfully");
            handleClose();
            onSuccess?.();
          } else {
            toast.error("Error updating mapping");
          }
          setLoading(false);
        }
      )
    );
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={true}
      closeIcon={<CloseOutlined className="text-[#163143]" />}
      width={480}
      centered
      destroyOnClose
    >
      <div className="flex flex-col gap-5 py-2">
        <h2 className="text-[20px] font-semibold text-[#163143]">
          Edit Mapping
        </h2>
        <p className="text-[14px] text-[#6B7280]">
          Map this schedule to a client and project for{" "}
          <span className="font-semibold text-[#163143]">
            {selectedSchedule?.member_name}
          </span>
        </p>

        {/* Client */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Client<span className="text-red-500">*</span>
          </label>
          <Select
            showSearch
            placeholder="Select Client"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={hubstaffOptions?.hubstaff_clients?.map((item) => ({
              value: item?.id,
              label: item?.name,
            }))}
            onChange={handleClientChange}
            value={clientId}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-[14px] font-semibold text-[#163143] mb-2">
            Project
          </label>
          <Select
            showSearch
            placeholder="Select Project"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={hubstaffOptions?.hubstaff_projects?.map((item) => ({
              value: item?.name,
              label: item?.name,
            }))}
            onChange={(value) => setProject(value)}
            value={project}
            className="w-full custom-select-forms"
            popupClassName="custom-select-dropdown"
            style={{ height: "44px" }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-full font-semibold text-[14px] text-[#163143] border border-[#D7E6E7] hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 rounded-full font-semibold text-[14px] text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Mapping"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
