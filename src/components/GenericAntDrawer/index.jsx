"use client";

import { Icon } from "@iconify/react";
import { Drawer, Button, Space } from "antd";

export default function GenericAntDrawer({
  open = false,
  onClose = () => {},
  title = "Drawer",
  children = null,
  onSubmit = null,
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
}) {
  return (
    <Drawer
      title={title}
      open={open}
      closable={false}
      onCancel={onClose}
      // mask={{ blur: false }}
      extra={
        <div onClick={onClose} className="cursor-pointer">
          <Icon icon="charm:cross" color="#163143" fontSize={24} />
        </div>
      }
      // footer={[
      //   <Button key="cancel" onClick={onClose}>
      //     {cancelText}
      //   </Button>,
      //   onSubmit && (
      //     <Button
      //       key="submit"
      //       type="primary"
      //       loading={isLoading}
      //       onClick={onSubmit}
      //     >
      //       {submitText}
      //     </Button>
      //   ),
      // ]}
      width={750}
    >
      {children}
    </Drawer>
  );
}
