import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientsFilterList,
  getOPSTLFiltersList,
  getCSMFilterData,
  getOMFilterData,
  getTeamListFilterData,
} from "../../reduxStore/action/workforcedashboard";
import {
  getClientsFilterQAList,
  getQASettingsList,
} from "../../reduxStore/action/qaSettings";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import { ColumnDataQASettings } from "../../utils/tablesColumns";
import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import EditQASettings from "./EditQASettings";
import { DatePicker } from "antd";
import { Icon } from "@iconify/react";
import moment from "moment";

export default function QASettings() {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [clientsFilter, setClientsFilter] = useState();
  const [teamLeadsFilters, setTeamLeadsFilters] = useState();
  const [csmFilters, setCsmFilters] = useState();
  const [omFilters, setOmFilters] = useState();
  const [dateFilter, setDateFilter] = useState(moment());

  const [currentpage, setcurrentpage] = useState(1);
  const [currentpageSize, setcurrentpageSize] = useState(10);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });
  const [filterParams, setFilterParams] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [isLoadingCsm, setIsLoadingCsm] = useState(false);
  const [isLoadingOm, setIsLoadingOm] = useState(false);

  const userDetails = useSelector((state) => state.auth.user);
  const { qaSettingsList, isLoading } = useSelector(
    (store) => store.qaSettings
  );
  const { clientsList, teamList, csmList, omList } = useSelector(
    (store) => store.workforcedashboard
  );

  const fetchData = (params) => {
    dispatch(getQASettingsList(params));
  };

  useEffect(() => {
    dispatch(getOPSTLFiltersList(() => {}));
    dispatch(getClientsFilterQAList(setIsLoadingClient));
    dispatch(getTeamListFilterData(setIsLoadingTeam));
    dispatch(getCSMFilterData(setIsLoadingCsm));
    dispatch(getOMFilterData(setIsLoadingOm));
  }, []);

  useEffect(() => {
    if (!userDetails) return;
    let roleObject = {};
    if (
      userDetails?.role === "tl" ||
      userDetails?.role === "dtl" ||
      userDetails?.role === "itl"
    ) {
      roleObject = { team_lead_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role === "om") {
      roleObject = { operations_manager_id: [parseInt(userDetails?.owner_id)] };
    } else if (userDetails?.role === "csm") {
      roleObject = { csm_id: [parseInt(userDetails?.owner_id)] };
    }
    const params = {
      client_name: clientsFilter?.map((item) => item?.client),
      team_lead_id: teamLeadsFilters?.map((item) =>
        parseInt(item?.teamlead_id)
      ),
      operations_manager_id: omFilters?.map((item) =>
        parseInt(item?.operations_manager_id)
      ),
      csm_id: csmFilters?.map((item) => parseInt(item?.csm_id)),
      date: dateFilter ? moment(dateFilter).format("YYYY-MM-DD") : undefined,
      sort_order: sortOrder,
      sort_by: sortBy || undefined,
      page: 1,
      size: currentpageSize,
    };
    setcurrentpage(1);
    fetchData({ ...params, ...roleObject });
    setFilterParams({ ...params, ...roleObject });
  }, [
    clientsFilter,
    teamLeadsFilters,
    omFilters,
    csmFilters,
    dateFilter,
    sortBy,
    sortOrder,
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

  const handleEditClick = (record) => {
    setIsOpen(true);
    setSelectedRow(record);
  };

  const handleEditClose = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  const handleSaveSuccess = () => {
    handleEditClose();
    const params = {
      ...filterParams,
      page: currentpage,
      size: currentpageSize,
    };
    fetchData(params);
  };

  const pagination = qaSettingsList?.pagination || {};
  const totalRecords = pagination?.totalRecords ?? pagination?.total ?? 0;
  const currentPage = pagination?.currentPage ?? pagination?.current ?? 1;
  const pageSize = pagination?.pageSize ?? currentpageSize;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="pt-7 flex items-center pl-8">
        <span className="text-2xl font-semibold">QA Settings</span>
      </div>
      <EditQASettings
        open={isOpen}
        onClose={handleEditClose}
        selectedRow={selectedRow}
        onSaveSuccess={handleSaveSuccess}
      />
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <UnifiedDropdown
              name="Clients"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={clientsList || []}
              isLoading={isLoadingClient}
              selectedList={clientsFilter}
              setselectedList={setClientsFilter}
              multiSelect={true}
              displayKey="account"
              valueKey="id"
              searchKeys={["account"]}
            />
            {userDetails?.role === "tl" ||
            userDetails?.role === "dtl" ? null : (
              <UnifiedDropdown
                name="TL"
                className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
                data={teamList || []}
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
                data={omList || []}
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
                data={csmList || []}
                isLoading={isLoadingCsm}
                selectedList={csmFilters}
                setselectedList={setCsmFilters}
                multiSelect={true}
                displayKey="csm"
                valueKey="csm_id"
                searchKeys={["csm"]}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide pl-8">
        <div className="w-[75vw] pb-[50px] pt-2 space-y-9 ml-8">
          <div className="flex items-center w-[100%] mb-[20px]">
            <span className="text-xl font-semibold">Attendance Alerts</span>
          </div>
          {isLoading ? (
            <Skeleton className="w-full h-[75vh]" />
          ) : (
            <AntDTable
              columns={ColumnDataQASettings}
              data={qaSettingsList?.data || []}
              bordered={true}
              total={totalRecords}
              current={currentPage}
              pageSize={pageSize}
              rowKey="id"
              onPageChange={setcurrentpage}
              onPageSizeChange={setcurrentpageSize}
              onEdit={handleEditClick}
              onSortChange={(columnKey, order) => {
                setSorting({ sort_by: columnKey, sort_order: order });
                setSortBy(columnKey);
                setSortOrder(
                  order === "ascend"
                    ? "asc"
                    : order === "descend"
                    ? "desc"
                    : null
                );
              }}
              sorting={sorting}
              pagination={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
