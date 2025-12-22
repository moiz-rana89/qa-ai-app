import { Icon } from "@iconify/react";
import { Button, Input, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "../../../components/Skeleton";
import CategoryWithQuestion from "./CategoryWithQuestion";

export const FormDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState(["test 1", "test 2"]);
  const RemoveFromSelect = (item, selectedList, setselectedList) => {
    let temp = [...selectedList];
    temp = temp.filter((items) => items != item);
    setselectedList(temp);
  };
  return (
    <div className="bg-[#FCFCFC] rounded-[24px]  border border-[#D7E6E7] p-8">
      <CategoryWithQuestion />
    </div>
  );
};
