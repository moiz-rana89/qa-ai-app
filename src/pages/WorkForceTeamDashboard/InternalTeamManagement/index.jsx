import React, { useEffect, useRef, useState } from "react";
// import { Filter } from "lucide-react";

import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import EditWorkforceTem from "./EditWorkforceTem";
import { useDispatch, useSelector } from "react-redux";
import {
  getAOMFiltersList,
  getAomList,
  getAttendanceRecords,
  getDepartmentDirectorList,
  getDepartmentList,
  getDepartmentManagerList,
  getDisputedAttendanceRecords,
  getMemberFilterData,
  getOMFiltersList,
  getOPSTLFiltersList,
  getSomList,
  getTeamLeadList,
} from "../../../reduxStore/action/workforcedashboard";
import { ColumnDataInternalTeam } from "../../../utils/tablesColumns";
import DownloadCSVButton from "../../../components/Buttons/DownloadCSVButton";
import Skeleton from "../../../components/Skeleton";
import AntDTable from "../../../components/AntDTable";
import { Tab, Tabs } from "../../../components/Tabs/Tabs";

export default function InternalTeamManagement() {
  const isMounted = useRef(false);
  const isTabEffectInitialMount = useRef(true);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [departmentFilter, setDepartmentFilter] = useState();
  const [teamLeadsFilters, setTeamLeadsFilters] = useState();
  const [csmFilters, setCsmFilters] = useState();
  const [agentFilters, setAgentFilters] = useState();
  const [omFilters, setOmFilters] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [currentpage, setcurrentpage] = useState(1);
  const [filterParams, setFilterParams] = useState({});
  const [sortBy, setsortBy] = useState("");
  const [sortOrder, setsortOrder] = useState("desc");
  const [aomFilters, setAomFilters] = useState();
  const [somFilters, setSomFilters] = useState();

  const [currentpageSize, setcurrentpageSize] = useState(10);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });

  const [omDropDownFilters, setOmDropDownFilters] = useState();
  const [aomDropDownFilters, setAomDropDownFilters] = useState();
  const [opsDropDownFilters, setOpsDropDownFilters] = useState();

  const [isLoadingOM, setIsLoadingOM] = useState(false);
  const [isLoadingAOM, setIsLoadingAOM] = useState(false);
  const [isLoadingOPSTL, setIsLoadingOPSTL] = useState(false);
  const [isLoadingDepartment, setIsLoadingDepartment] = useState(false);
  const [CurrntActiveTab, setCurrntActiveTab] = useState("Unresolved");

  const userDetails = useSelector((state) => state.auth.user);

  const {
    attendanceRecords,
    isLoading,
    departmentList,
    departmentManagerList,
    departmentDirectorList,
    teamLeadList,
    memberFilterData: agentList,
    aomList,
    somList,
    opsTLFilterData,
    omFilterData,
    aomFilterData,
    attendanceDisputedRecords,
  } = useSelector((store) => store.workforcedashboard);
  const [isLoadingAgent, setisLoadingAgent] = useState();

  const fetchData = (params) => {
    if (CurrntActiveTab == "Disputed by WFA") {
      dispatch(
        getDisputedAttendanceRecords({
          ...params,
          role: userDetails?.role,
          tl_name: userDetails?.name,
        })
      );
    } else {
      dispatch(getAttendanceRecords(params, true));
    }
  };

  useEffect(() => {
    dispatch(getDepartmentList(setIsLoadingDepartment));
    dispatch(getTeamLeadList(setIsLoadingDepartment));
    dispatch(getDepartmentManagerList(setIsLoadingDepartment));
    dispatch(getDepartmentDirectorList(setIsLoadingDepartment));
    dispatch(getMemberFilterData(setisLoadingAgent));

    dispatch(getOMFiltersList(setIsLoadingOM));
    dispatch(getAOMFiltersList(setIsLoadingAOM));
    dispatch(getOPSTLFiltersList(setIsLoadingOPSTL));
  }, []);

  useEffect(() => {
    if (!userDetails) return;
    let roleObject = {};
    if (userDetails?.role == "tl" || userDetails?.role == "dtl") {
      roleObject = { team_lead_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "om") {
      roleObject = { om_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "csm") {
      roleObject = { csm_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "som") {
      roleObject = {
        senior_operations_manager: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "aom") {
      roleObject = {
        aom_id: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "itl") {
      roleObject = {
        team_lead_id: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "dm") {
      roleObject = {
        operations_manager_id: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "dd") {
      roleObject = {
        csm: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "ops") {
      roleObject = {
        ops_team_lead_id: [parseInt(userDetails?.owner_id)],
      };
    }
    const params = {
      department: departmentFilter,
      agent_name: agentFilters?.map((item) => item?.user_name),
      team_lead_id: teamLeadsFilters?.map((item) =>
        parseInt(item?.team_lead_id)
      ),
      operations_manager_id: omFilters?.map((item) =>
        parseInt(item?.department_manager_id)
      ),
      csm: csmFilters?.map((item) => item?.department_director_id),
      associate_operations_manager_id: aomFilters?.map((item) =>
        parseInt(item?.id)
      ),
      senior_operations_manager: somFilters?.map((item) => parseInt(item?.id)),
      om_id: omDropDownFilters?.map((item) =>
        parseInt(item?.operations_manager_id)
      ),
      aom_id: aomDropDownFilters?.map((item) =>
        parseInt(item?.associate_operations_manager)
      ),
      ops_team_lead_id: opsDropDownFilters?.map((item) =>
        parseInt(item?.ops_team_lead_id)
      ),
      sort_order: sortOrder,
      sort_by: sortBy,
      page: 1,
    };
    setcurrentpage(1);
    fetchData({ ...params, ...roleObject });
    setFilterParams({ ...params, ...roleObject });
  }, [
    departmentFilter,
    agentFilters,
    teamLeadsFilters,
    omFilters,
    aomFilters,
    somFilters,
    csmFilters,
    sortBy,
    sortOrder,
    omDropDownFilters,
    opsDropDownFilters,
    aomDropDownFilters,
    userDetails,
  ]);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (currentpage > 0) {
      const params = {
        ...filterParams,
        page: currentpage,
        size: currentpageSize,
      };
      fetchData(params);
    }
  }, [currentpage, currentpageSize]);

  useEffect(() => {
    if (isTabEffectInitialMount.current) {
      isTabEffectInitialMount.current = false;
      return;
    }
    const params = {
      ...filterParams,
      sort_order: "desc",
      sort_by: null,
      page: 1,
      pageSize: 10,
    };
    fetchData(params);
    setcurrentpage(1);
  }, [CurrntActiveTab]);

  const handleEditClick = (selected) => {
    setIsOpen(true);
    setSelectedReport(selected);
  };

  const handleCSVDownload = () => {
    const params = {
      ...filterParams,
      page: undefined,
      csv: true,
    };
    fetchData(params);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="pt-7 flex items-center pl-8">
        <span className="text-2xl font-semibold">Attendance Management</span>
      </div>
      <EditWorkforceTem
        open={isOpen}
        setOpen={setIsOpen}
        selectedReport={selectedReport}
        role={userDetails?.role}
        userName={userDetails?.name}
        filterParams={filterParams}
        fetchData={fetchData}
        activeTab={CurrntActiveTab}
      />
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            {/* <Filter fill="black" className="h-[45%]" /> */}
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <UnifiedDropdown
              name="Department"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={departmentList}
              isLoading={isLoadingDepartment}
              selectedList={departmentFilter}
              setselectedList={setDepartmentFilter}
              multiSelect={true}
            />
            <UnifiedDropdown
              name="Members"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={agentList}
              isLoading={isLoadingAgent}
              selectedList={agentFilters}
              setselectedList={setAgentFilters}
              multiSelect={true}
              displayKey="user_name"
              valueKey="user_id"
              searchKeys={["user_name"]}
            />
            {userDetails?.role === "tl" ||
            userDetails?.role === "itl" ? null : (
              <UnifiedDropdown
                name="Team Leads"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={teamLeadList}
                isLoading={isLoadingDepartment}
                selectedList={teamLeadsFilters}
                setselectedList={setTeamLeadsFilters}
                multiSelect={true}
                displayKey="team_lead"
                valueKey="team_lead_id"
                searchKeys={["team_lead"]}
              />
            )}
            {userDetails?.role === "om" || userDetails?.role === "dm" ? null : (
              <UnifiedDropdown
                name="Dept. Manager"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={departmentManagerList}
                isLoading={isLoadingDepartment}
                selectedList={omFilters}
                setselectedList={setOmFilters}
                multiSelect={true}
                displayKey="department_manager"
                valueKey="department_manager_id"
                searchKeys={["department_manager"]}
              />
            )}
            {userDetails?.role === "csm" ||
            userDetails?.role === "dd" ? null : (
              <UnifiedDropdown
                name="Dept. Director"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={departmentDirectorList}
                isLoading={isLoadingDepartment}
                selectedList={csmFilters}
                setselectedList={setCsmFilters}
                multiSelect={true}
                displayKey="department_director"
                valueKey="department_director"
                searchKeys={["department_director"]}
              />
            )}
            {userDetails?.role === "om" ? null : (
              <UnifiedDropdown
                name="Operations Manager"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={omFilterData}
                isLoading={isLoadingOM}
                selectedList={omDropDownFilters}
                setselectedList={setOmDropDownFilters}
                multiSelect={true}
                displayKey="operations_manager"
                valueKey="operations_manager_id"
                searchKeys={["operations_manager"]}
              />
            )}
            {userDetails?.role === "aom" ? null : (
              <UnifiedDropdown
                name="Associate Operations Manager"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={aomFilterData}
                isLoading={isLoadingAOM}
                selectedList={aomDropDownFilters}
                setselectedList={setAomDropDownFilters}
                multiSelect={true}
                displayKey="associate_operations_manager_name_tpa"
                valueKey="associate_operations_manager"
                searchKeys={["associate_operations_manager_name_tpa"]}
              />
            )}
            {userDetails?.role === "ops" ? null : (
              <UnifiedDropdown
                name="OPS Team Lead"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={opsTLFilterData}
                isLoading={isLoadingOPSTL}
                selectedList={opsDropDownFilters}
                setselectedList={setOpsDropDownFilters}
                multiSelect={true}
                displayKey="ops_team_lead"
                valueKey="ops_team_lead_id"
                searchKeys={["ops_team_lead"]}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full  overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide pl-8">
        <div className="w-[75vw] pb-[50px] pt-2 space-y-9 ml-8  ">
          <Tabs setCurrntActiveTab={setCurrntActiveTab}>
            <Tab data-label={"Unresolved"} labelData={""}>
              <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide">
                <div className="flex items-center w-[100%] mb-[20px]">
                  <span className="text-xl font-semibold">
                    {"Attendance Reporting Alerts"}
                  </span>
                  <div className="ml-auto mr-[15px]">
                    <DownloadCSVButton onClick={handleCSVDownload} />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="w-full h-[75vh]" />
                ) : (
                  <AntDTable
                    columns={ColumnDataInternalTeam}
                    data={attendanceRecords?.data}
                    bordered={true}
                    total={attendanceRecords?.pagination?.totalRecords}
                    current={attendanceRecords?.pagination?.currentPage}
                    pageSize={attendanceRecords?.pagination?.pageSize}
                    rowKey={"id"}
                    onPageChange={setcurrentpage}
                    onPageSizeChange={setcurrentpageSize}
                    onEdit={handleEditClick}
                    onSortChange={(columnKey, order) => {
                      setSorting({ sort_by: columnKey, sort_order: order });
                      setsortBy(columnKey);
                      setsortOrder(
                        order == "ascend"
                          ? "asc"
                          : order == "descend"
                          ? "desc"
                          : null
                      );
                    }}
                    sorting={sorting}
                    pagination={true}
                  />
                )}
              </div>
            </Tab>

            <Tab data-label={"Disputed by WFA"} labelData={""}>
              <div className="w-full  overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide">
                <div className="flex items-center w-[100%] mb-[20px]">
                  <span className="text-xl font-semibold">
                    {"Attendance Reporting Alerts"}
                  </span>
                  <div className="ml-auto mr-[15px]">
                    <DownloadCSVButton onClick={handleCSVDownload} />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="w-full h-[75vh]" />
                ) : (
                  <AntDTable
                    columns={ColumnDataInternalTeam}
                    data={attendanceDisputedRecords?.data}
                    bordered={true}
                    total={attendanceDisputedRecords?.pagination?.totalRecords}
                    current={attendanceDisputedRecords?.pagination?.currentPage}
                    pageSize={attendanceDisputedRecords?.pagination?.pageSize}
                    rowKey={"id"}
                    onPageChange={setcurrentpage}
                    onPageSizeChange={setcurrentpageSize}
                    onEdit={handleEditClick}
                    onSortChange={(columnKey, order) => {
                      setSorting({ sort_by: columnKey, sort_order: order });
                      setsortBy(columnKey);
                      setsortOrder(
                        order == "ascend"
                          ? "asc"
                          : order == "descend"
                          ? "desc"
                          : null
                      );
                    }}
                    sorting={sorting}
                    pagination={true}
                  />
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      {/* <div className="w-full  overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide pl-8">
        <WorkforceAttendanceTable
          handleEditClick={handleEditClick}
          data={attendanceRecords}
          fetchData={fetchData}
          isLoading={isLoading}
          setcurrentpage={setcurrentpage}
          currentpage={currentpage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setsortBy={setsortBy}
          setsortOrder={setsortOrder}
          handleCSVDownload={handleCSVDownload}
          isEdit={true}
          ColumnData={ColumnDataInternalTeam}
          emptyMessage="None of your team members has any unresolved attendance issues at the moment."
        />
      </div> */}
    </div>
  );
}
