import React, { useState } from "react";
import GenericAntdTabs from "../../components/GenericAntdTabs";
import { Icon } from "@iconify/react";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import { ATT_REASONS_STATUS } from "../../utils/constants";
import AllForms from "./AllForms";
import { CreateEditForms } from "./CreateEditForms";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllForms,
  getFormNamesFilter,
} from "../../reduxStore/action/formsManagement";
const FormsManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [formName, setFormName] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [filterLoader, setFilterLoader] = useState(false);
  // getFormNamesFilter
  const dispatch = useDispatch();
  const { formNames } = useSelector((store) => store.formsManagement);
  useEffect(() => {
    dispatch(getFormNamesFilter(setFilterLoader));
    dispatch(
      getAllForms(
        { page: 1, size: 10, form: formName },
        activeTab == "all" ? null : activeTab
      )
    );
  }, []);

  const getData = (sortingParam, paginationParam) => {
    dispatch(
      getAllForms(
        { ...sortingParam, ...paginationParam },
        activeTab == "all" ? null : activeTab
      )
    );
  };

  const handleFilterSelect = (value) => {
    setFormName(value);
    dispatch(
      getAllForms(
        { page: 1, size: 10, form: value },
        activeTab == "all" ? null : activeTab
      )
    );
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
    dispatch(
      getAllForms(
        { page: 1, size: 10, form: formName },
        value == "all" ? null : value
      )
    );
  };
  const tabs = [
    {
      key: "all",
      label: "All",
      //   icon: UserOutlined,
      content: <AllForms setCreateNew={setCreateNew} getData={getData} />,
    },
    {
      key: "QA",
      label: "Quality Assurance",
      //   icon: SettingOutlined,
      content: <AllForms setCreateNew={setCreateNew} getData={getData} />,
    },
    {
      key: "RCA",
      label: "RCA",
      content: <AllForms setCreateNew={setCreateNew} getData={getData} />,
    },
    {
      key: "Shadowing",
      label: "Shadowing",
      content: <AllForms setCreateNew={setCreateNew} getData={getData} />,
    },
  ];

  return createNew ? (
    <CreateEditForms setCreateNew={setCreateNew} getData={getData} />
  ) : (
    <div className="w-full h-full flex flex-col p-8">
      <div className="text-[#163143] text-[24px] font-semibold">
        Forms Management
      </div>
      <div className="flex items-center py-6 gap-1">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            <Icon
              icon="basil:filter-solid"
              color="#163143"
              className="h-[45%]"
            />
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <UnifiedDropdown
              name="Form Name"
              className="bg-white flex items-center justify-between px-3 border-[#D7E6E7]"
              data={formNames}
              isLoading={filterLoader}
              selectedList={formName}
              setselectedList={handleFilterSelect}
              multiSelect={true}
              displayKey="form_name"
              valueKey="form_id"
              searchKeys={["form_name"]}
            />
          </div>
        </div>
      </div>
      <div className="pt-2 h-full overflow-y-auto">
        <GenericAntdTabs
          items={tabs}
          activeKey={activeTab}
          onChange={(key) => handleTabChange(key)}
          // extra={<Button type="primary">Save</Button>}
        />
      </div>
    </div>
  );
};

export default FormsManagement;
