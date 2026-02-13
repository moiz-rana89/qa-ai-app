import React, { useContext, useEffect, useRef, useState } from "react";

import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentFilterData,
  getAOMFiltersList,
  getAomList,
  getAttendanceReports,
  getClientsFilterList,
  getCSMFilterData,
  getDepartmentDirectorList,
  getDepartmentList,
  getDepartmentManagerList,
  getMemberFilterData,
  getOMFilterData,
  getOMFiltersList,
  getOPSTLFiltersList,
  getSomList,
  getTeamLeadList,
  getTeamListFilterData,
} from "../../../reduxStore/action/workforcedashboard";
import { Tab, Tabs } from "../../../components/Tabs/Tabs";
import {
  ColumnDataInternalTeam,
  ColumnDataRemoteTeam,
} from "../../../utils/tablesColumns";
import DownloadCSVButton from "../../../components/Buttons/DownloadCSVButton";
import Skeleton from "../../../components/Skeleton";
import AntDTable from "../../../components/AntDTable";
import EditWFAAttendance from "./EditWFAAttendance";

export default function WFAAttendanceReporting() {
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [clientsFilter, setClientsFilter] = useState();
  const [teamLeadsFilters, setTeamLeadsFilters] = useState();
  const [csmFilters, setCsmFilters] = useState();
  const [agentFilters, setAgentFilters] = useState();
  const [omFilters, setOmFilters] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [currentpage, setcurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });

  const [filterParams, setFilterParams] = useState({});
  const [sortBy, setsortBy] = useState("");
  const [sortOrder, setsortOrder] = useState("desc");
  const [resolutionTypeFilter, setResolutionTypeFilter] = useState();
  const [isLoadingDepartment, setIsLoadingDepartment] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState();
  const [teamLeadsInternalFilters, setTeamLeadsInternalFilters] = useState();
  const [departmentManagerFilter, setDepartmentManagerFilter] = useState();
  const [departmentDirectorFilter, setDepartmentDirectorFilter] = useState();
  const [greenCardFilter, setGreenCardFilter] = useState();
  const [aomFilters, setAomFilters] = useState();
  const [somFilters, setSomFilters] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [omDropDownFilters, setOmDropDownFilters] = useState();
  const [aomDropDownFilters, setAomDropDownFilters] = useState();
  const [opsDropDownFilters, setOpsDropDownFilters] = useState();

  const [isLoadingOM, setIsLoadingOM] = useState(false);
  const [isLoadingAOM, setIsLoadingAOM] = useState(false);
  const [isLoadingOPSTL, setIsLoadingOPSTL] = useState(false);

  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [isLoadingCsm, setIsLoadingCsm] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingOm, setIsLoadingOm] = useState(false);
  const [isLoadingMembers, setisLoadingMembers] = useState();

  const [CurrntActiveTab, setCurrntActiveTab] = useState("Remote Team");

  const reSetAllFilters = () => {
    setAgentFilters();
    setClientsFilter();
    setTeamLeadsFilters();
    setCsmFilters();
    setOmFilters();
    setFilterParams({
      pageSize: pageSize,
      startdate: startDate,
      enddate: endDate,
    });
    setsortBy("");
    setsortOrder("desc");
    setResolutionTypeFilter();
    setcurrentpage(1);
    setTeamLeadsInternalFilters();
    setDepartmentManagerFilter();
    setDepartmentDirectorFilter();
    setGreenCardFilter();
    setAomFilters();
    setOmDropDownFilters();
    setAomDropDownFilters();
    setOpsDropDownFilters();
  };

  const userDetails = useSelector((state) => state.auth.user);

  const {
    attendanceRecords,
    isLoading,
    departmentList,
    departmentManagerList,
    departmentDirectorList,
    teamLeadList,
    aomList,
    somList,
    memberFilterData,
    opsTLFilterData,
    omFilterData,
    aomFilterData,

    clientsList,
    teamList,
    csmList,
    agentList,
    omList,
  } = useSelector((store) => store.workforcedashboard);
  const fetchData = (params) => {
    if (CurrntActiveTab == "Internal Team") {
      dispatch(getAttendanceReports(params, true));
    } else if (CurrntActiveTab == "Remote Team") {
      dispatch(getAttendanceReports(params));
    }
  };

  useEffect(() => {
    dispatch(getDepartmentList(setIsLoadingDepartment));
    dispatch(getTeamLeadList(setIsLoadingDepartment));
    dispatch(getDepartmentManagerList(setIsLoadingDepartment));
    dispatch(getDepartmentDirectorList(setIsLoadingDepartment));
    dispatch(getAomList(setIsLoadingDepartment));
    dispatch(getMemberFilterData(setisLoadingMembers));
    dispatch(getOPSTLFiltersList(setIsLoadingOPSTL));

    dispatch(getClientsFilterList(setIsLoadingClient));
    dispatch(getTeamListFilterData(setIsLoadingTeam));
    dispatch(getCSMFilterData(setIsLoadingCsm));
    dispatch(getAgentFilterData(setIsLoadingAgent));
    dispatch(getOMFilterData(setIsLoadingOm));
    // dispatch(getSomList(setIsLoadingDepartment));
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // Set to true after the first render
      return; // Skip the effect for the first render
    }
    const params = {
      // ...filterParams,
      sort_order: "desc",
      sort_by: null,
      page: 1,
      pageSize: pageSize,
      startdate: startDate,
      enddate: endDate,
    };
    fetchData(params);
    reSetAllFilters();

    if (CurrntActiveTab == "Internal Team") {
      dispatch(getOMFiltersList(setIsLoadingOM));
      dispatch(getAOMFiltersList(setIsLoadingAOM));
    }
  }, [CurrntActiveTab]);

  useEffect(() => {
    let roleObject = {};
    if (userDetails?.role == "tl") {
      roleObject = { team_lead_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "om") {
      roleObject = { operations_manager_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "csm") {
      roleObject = { csm_id: [parseInt(userDetails?.owner_id)] };
    }
    const params = {
      client_name: clientsFilter?.map((item) => item?.client),
      agent_name: agentFilters?.map((item) => item?.user_name),
      team_lead_id: teamLeadsFilters?.map((item) =>
        parseInt(item?.teamlead_id)
      ),
      operations_manager_id: omFilters?.map((item) =>
        parseInt(item?.operations_manager_id)
      ),
      csm_id: csmFilters?.map((item) => parseInt(item?.csm_id)),
      associate_operations_manager_id: aomFilters?.map((item) =>
        parseInt(item?.id)
      ),
      senior_operations_manager: somFilters?.map((item) => parseInt(item?.id)),
      ops_team_lead_id: opsDropDownFilters?.map((item) =>
        parseInt(item?.ops_team_lead_id)
      ),
      reason_type: resolutionTypeFilter?.[0]?.value,
      green_card: greenCardFilter?.[0]?.value,
      sort_order: sortOrder,
      sort_by: sortBy,
      page: 1,
      pageSize: pageSize,
      startdate: startDate,
      enddate: endDate,
    };
    setcurrentpage(1);
    let dynamicParms = { ...params, ...roleObject };
    if (CurrntActiveTab == "Internal Team") {
      dynamicParms = {
        ...dynamicParms,
        department: departmentFilter,
        client_name: null,
        csm_id: null,
        team_lead_id: teamLeadsInternalFilters?.map((item) =>
          parseInt(item?.team_lead_id)
        ),
        operations_manager_id: departmentManagerFilter?.map((item) =>
          parseInt(item?.department_manager_id)
        ),
        csm: departmentDirectorFilter?.map(
          (item) => item?.department_director_id
        ),
        om_id: omDropDownFilters?.map((item) =>
          parseInt(item?.operations_manager_id)
        ),
        aom_id: aomDropDownFilters?.map((item) =>
          parseInt(item?.associate_operations_manager)
        ),
      };
      fetchData(dynamicParms);
    } else {
      fetchData(dynamicParms);
    }
    setFilterParams(dynamicParms);
  }, [
    departmentFilter,
    clientsFilter,
    agentFilters,
    teamLeadsFilters,
    omFilters,
    aomFilters,
    somFilters,
    csmFilters,
    sortBy,
    sortOrder,
    departmentDirectorFilter,
    departmentManagerFilter,
    teamLeadsInternalFilters,
    greenCardFilter,
    resolutionTypeFilter,
    startDate,
    endDate,
    omDropDownFilters,
    opsDropDownFilters,
    aomDropDownFilters,
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
        pageSize: pageSize,
      };
      fetchData(params);
    }
  }, [currentpage, pageSize]);

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
        <span className="text-2xl font-semibold">Attendance Reporting</span>
      </div>

      <EditWFAAttendance
        open={isOpen}
        setOpen={setIsOpen}
        selectedReport={selectedReport}
        role={userDetails?.role}
        filterParams={filterParams}
        userName={userDetails?.name}
        currentpage={currentpage}
        fetchData={fetchData}
        CurrntActiveTab={CurrntActiveTab}
      />
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            {/* <Filter fill="black" className="h-[45%]" /> */}
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            {/* <AttendanceDateRange
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            /> */}
            {CurrntActiveTab == "Remote Team" ? (
              <UnifiedDropdown
                name="Clients"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={clientsList}
                isLoading={isLoadingClient}
                selectedList={clientsFilter}
                setselectedList={setClientsFilter}
                multiSelect={true}
                displayKey="client"
                valueKey="client_id"
                searchKeys={["client"]}
              />
            ) : (
              <UnifiedDropdown
                name="Department"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={departmentList}
                isLoading={isLoadingDepartment}
                selectedList={departmentFilter}
                setselectedList={setDepartmentFilter}
                multiSelect={true}
              />
            )}

            <UnifiedDropdown
              name={CurrntActiveTab == "Remote Team" ? "Agents" : "Members"}
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={
                CurrntActiveTab == "Remote Team" ? agentList : memberFilterData
              }
              isLoading={
                CurrntActiveTab == "Remote Team"
                  ? isLoadingAgent
                  : isLoadingMembers
              }
              selectedList={agentFilters}
              setselectedList={setAgentFilters}
              multiSelect={true}
              displayKey="user_name"
              valueKey="user_id"
              searchKeys={["user_name"]}
            />

            {userDetails?.role === "tl"
              ? null
              : CurrntActiveTab == "Remote Team" && (
                  <UnifiedDropdown
                    name="Team Leads"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={teamList}
                    isLoading={isLoadingTeam}
                    selectedList={teamLeadsFilters}
                    setselectedList={setTeamLeadsFilters}
                    multiSelect={true}
                    displayKey="teamleads"
                    valueKey="teamlead_id"
                    searchKeys={["teamleads"]}
                  />
                )}
            {userDetails?.role === "tl"
              ? null
              : CurrntActiveTab == "Internal Team" && (
                  <UnifiedDropdown
                    name="Team Leads"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={teamLeadList}
                    isLoading={isLoadingDepartment}
                    selectedList={teamLeadsInternalFilters}
                    setselectedList={setTeamLeadsInternalFilters}
                    multiSelect={true}
                    displayKey="team_lead"
                    valueKey="team_lead_id"
                    searchKeys={["team_lead"]}
                  />
                )}
            {userDetails?.role === "om"
              ? null
              : CurrntActiveTab == "Remote Team" && (
                  <UnifiedDropdown
                    name="OM"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={omList}
                    isLoading={isLoadingOm}
                    selectedList={omFilters}
                    setselectedList={setOmFilters}
                    multiSelect={true}
                    displayKey="operations_manager"
                    valueKey="operations_manager_id"
                    searchKeys={["operations_manager"]}
                  />
                )}
            {userDetails?.role === "csm"
              ? null
              : CurrntActiveTab == "Remote Team" && (
                  <UnifiedDropdown
                    name="CSM"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={csmList}
                    isLoading={isLoadingCsm}
                    selectedList={csmFilters}
                    setselectedList={setCsmFilters}
                    multiSelect={true}
                    displayKey="csm"
                    valueKey="csm_id"
                    searchKeys={["csm"]}
                  />
                )}

            {userDetails?.role === "om"
              ? null
              : CurrntActiveTab == "Internal Team" && (
                  <UnifiedDropdown
                    name="Dept. Manager"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={departmentManagerList}
                    isLoading={isLoadingDepartment}
                    selectedList={departmentManagerFilter}
                    setselectedList={setDepartmentManagerFilter}
                    multiSelect={true}
                    displayKey="department_manager"
                    valueKey="department_manager_id"
                    searchKeys={["department_manager"]}
                  />
                )}
            {userDetails?.role === "csm"
              ? null
              : CurrntActiveTab == "Internal Team" && (
                  <UnifiedDropdown
                    name="Dept. Director"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={departmentDirectorList}
                    isLoading={isLoadingDepartment}
                    selectedList={departmentDirectorFilter}
                    setselectedList={setDepartmentDirectorFilter}
                    multiSelect={true}
                    displayKey="department_director"
                    valueKey="department_director"
                    searchKeys={["department_director"]}
                  />
                )}
            {userDetails?.role === "aom"
              ? null
              : CurrntActiveTab == "Remote Team" && (
                  <UnifiedDropdown
                    name="AOM"
                    className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                    data={aomList}
                    isLoading={isLoadingDepartment}
                    selectedList={aomFilters}
                    setselectedList={setAomFilters}
                    multiSelect={true}
                    displayKey="name"
                    valueKey="name"
                    searchKeys={["name"]}
                  />
                )}

            {userDetails?.role === "om"
              ? null
              : CurrntActiveTab == "Internal Team" && (
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
            {userDetails?.role === "aom"
              ? null
              : CurrntActiveTab == "Internal Team" && (
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

            <UnifiedDropdown
              name="Green Card"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              selectedList={greenCardFilter}
              setselectedList={setGreenCardFilter}
            />
            <UnifiedDropdown
              name="Resolution Type"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={[
                { label: "Valid", value: "VALID" },
                { label: "Invalid", value: "INVALID" },
              ]}
              selectedList={resolutionTypeFilter}
              setselectedList={setResolutionTypeFilter}
              displayKey="label"
              valueKey="value"
              searchKeys={["value"]}
            />
          </div>
        </div>
      </div>
      <div className=" w-full  overflow-y-scroll">
        <div className=" w-[75vw]  pb-[50px] pt-2 space-y-9 ml-8  ">
          <Tabs setCurrntActiveTab={setCurrntActiveTab}>
            <Tab data-label={"Remote Team"} labelData={""}>
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
                    columns={[
                      ...ColumnDataRemoteTeam,
                      {
                        title: "Updated by WFA",
                        width: 150,
                        dataIndex: "updated_by_wfa",
                        key: "updated_by_wfa",
                      },
                      {
                        title: "Updated by TL",
                        width: 150,
                        dataIndex: "updated_by_tl",
                        key: "updated_by_tl",
                      },
                    ]}
                    data={attendanceRecords?.data}
                    bordered={true}
                    total={attendanceRecords?.pagination?.totalRecords}
                    current={attendanceRecords?.pagination?.currentPage}
                    pageSize={attendanceRecords?.pagination?.pageSize}
                    rowKey={"id"}
                    onEdit={handleEditClick}
                    onPageChange={setcurrentpage}
                    onPageSizeChange={setPageSize}
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
              {/* <WorkforceAttendanceTable
                handleEditClick={handleEditClick}
                data={attendanceRecords}
                fetchData={fetchData}
                isLoading={isLoading}
                setcurrentpage={setcurrentpage}
                currentpage={currentpage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                sortBy={sortBy}
                sortOrder={sortOrder}
                setsortBy={setsortBy}
                setsortOrder={setsortOrder}
                handleCSVDownload={handleCSVDownload}
                isEdit={true}
                ColumnData={[
                  ...ColumnDataRemoteTeam,
                  {
                    name: "Updated by WFA",
                    width: 150,
                    keyword: "updated_by_wfa",
                    sorting: true,
                  },
                  {
                    name: "Updated by TL",
                    width: 150,
                    keyword: "updated_by_tl",
                    sorting: true,
                  },
                ]}
                title="Overview"
                emptyMessage="None of your team members has any unresolved attendance issues at the moment."
              /> */}
            </Tab>
            <Tab data-label={"Internal Team"} labelData={""}>
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
                    onEdit={handleEditClick}
                    onPageChange={setcurrentpage}
                    onPageSizeChange={setPageSize}
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
              {/* <WorkforceAttendanceTable
                handleEditClick={handleEditClick}
                data={attendanceRecords}
                fetchData={fetchData}
                isLoading={isLoading}
                setcurrentpage={setcurrentpage}
                currentpage={currentpage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                sortBy={sortBy}
                sortOrder={sortOrder}
                setsortBy={setsortBy}
                setsortOrder={setsortOrder}
                handleCSVDownload={handleCSVDownload}
                isEdit={true}
                ColumnData={ColumnDataInternalTeam}
                title="Overview"
                emptyMessage="None of your team members has any unresolved attendance issues at the moment."
              /> */}
            </Tab>
          </Tabs>

          {/* <TicketsStatisticsTable />
        <AgentKPISTable/> */}
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
          ColumnData={ColumnData}
        />
      </div> */}
    </div>
  );
}
