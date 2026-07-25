import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAgentFilterData,
  getAomList,
  getAttendanceRecords,
  getClientsFilterList,
  getCSMFilterData,
  getDisputedAttendanceRecords,
  getOMFilterData,
  getOPSTLFiltersList,
  getTeamListFilterData,
} from "../../../reduxStore/action/workforcedashboard";
import UnifiedDropdown from "../../../components/Dropdown/UnifiedDropdown";
import { ColumnDataRemoteTeam } from "../../../utils/tablesColumns";
import AntDTable from "../../../components/AntDTable";
import Skeleton from "../../../components/Skeleton";
import EditRemoteTeam from "./EditRemoteTeam";
import DownloadCSVButton from "../../../components/Buttons/DownloadCSVButton";
import { Tabs, Tab } from "../../../components/Tabs/Tabs";

export default function RemoteTeamManagement() {
  const isMounted = useRef(false);
  const isTabEffectInitialMount = useRef(true);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [clientsFilter, setClientsFilter] = useState();
  const [teamLeadsFilters, setTeamLeadsFilters] = useState();
  const [csmFilters, setCsmFilters] = useState();
  const [agentFilters, setAgentFilters] = useState();
  const [omFilters, setOmFilters] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpageSize, setcurrentpageSize] = useState(10);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });

  const [filterParams, setFilterParams] = useState({});
  const [sortBy, setsortBy] = useState("");
  const [sortOrder, setsortOrder] = useState("desc");
  const [aomFilters, setAomFilters] = useState();
  const [somFilters, setSomFilters] = useState();
  const [isLoadingDepartment, setIsLoadingDepartment] = useState(false);

  const [opsDropDownFilters, setOpsDropDownFilters] = useState();
  const [isLoadingOPSTL, setIsLoadingOPSTL] = useState(false);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [isLoadingCsm, setIsLoadingCsm] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingOm, setIsLoadingOm] = useState(false);

  const [CurrntActiveTab, setCurrntActiveTab] = useState("Unresolved");

  const userDetails = useSelector((state) => state.auth.user);

  const {
    attendanceRecords,
    isLoading,
    aomList,
    somList,
    opsTLFilterData,
    clientsList,
    teamList,
    csmList,
    agentList,
    omList,
    attendanceDisputedRecords,
  } = useSelector((store) => store.workforcedashboard);

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
      dispatch(getAttendanceRecords(params));
    }
  };

  useEffect(() => {
    dispatch(getAomList(setIsLoadingDepartment));
    dispatch(getOPSTLFiltersList(setIsLoadingOPSTL));
    dispatch(getClientsFilterList(setIsLoadingClient));
    dispatch(getTeamListFilterData(setIsLoadingTeam));
    dispatch(getCSMFilterData(setIsLoadingCsm));
    dispatch(getAgentFilterData(setIsLoadingAgent));
    dispatch(getOMFilterData(setIsLoadingOm));

    // dispatch(getSomList(setIsLoadingDepartment));
  }, []);

  useEffect(() => {
    if (!userDetails) return;
    let roleObject = {};
    if (
      userDetails?.role == "tl" ||
      userDetails?.role == "dtl" ||
      userDetails?.role == "itl"
    ) {
      roleObject = { team_lead_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "om") {
      roleObject = { operations_manager_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "csm") {
      roleObject = { csm_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role == "som") {
      roleObject = {
        senior_operations_manager: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "aom") {
      roleObject = {
        associate_operations_manager_id: [parseInt(userDetails?.owner_id)],
      };
    } else if (userDetails?.role == "ops") {
      roleObject = {
        ops_team_lead_id: [parseInt(userDetails?.owner_id)],
      };
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
      associate_operations_manager_id: aomFilters?.map((item) =>
        parseInt(item?.id)
      ),
      senior_operations_manager: somFilters?.map((item) => parseInt(item?.id)),
      csm_id: csmFilters?.map((item) => parseInt(item?.csm_id)),
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
    clientsFilter,
    agentFilters,
    teamLeadsFilters,
    omFilters,
    csmFilters,
    aomFilters,
    somFilters,
    sortBy,
    sortOrder,
    opsDropDownFilters,
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
      <EditRemoteTeam
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
            <UnifiedDropdown
              name="Agents"
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
            userDetails?.role === "dtl" ? null : (
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
            {userDetails?.role === "om" ||
            userDetails?.role === "tl" ||
            userDetails?.role === "dtl" ? null : (
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
            {userDetails?.role === "csm" ? null : (
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

            {userDetails?.role === "aom" ? null : (
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
                    columns={ColumnDataRemoteTeam}
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
                    {"Attendance Alerts"}
                  </span>
                  <div className="ml-auto mr-[15px]">
                    <DownloadCSVButton onClick={handleCSVDownload} />
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="w-full h-[75vh]" />
                ) : (
                  <AntDTable
                    columns={ColumnDataRemoteTeam}
                    data={attendanceDisputedRecords?.data}
                    bordered={true}
                    total={attendanceDisputedRecords?.pagination?.totalRecords}
                    current={attendanceDisputedRecords?.pagination?.currentPage}
                    pageSize={attendanceDisputedRecords?.pagination?.pageSize}
                    rowKey={"id"}
                    onEdit={handleEditClick}
                    onPageChange={setcurrentpage}
                    onPageSizeChange={setcurrentpageSize}
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

        {/* <WorkforceAttendanceTable
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
          ColumnData={ColumnDataRemoteTeam}
          emptyMessage="None of your team members has any unresolved attendance issues at the moment."
        /> */}
      </div>
    </div>
  );
}
