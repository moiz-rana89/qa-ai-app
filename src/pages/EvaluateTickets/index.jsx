import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AntDNotification } from "../../components/AntDNotification";
import AntDRangePicker from "../../components/AntDRangePicker/index";
import AntDTable from "../../components/AntDTable";
import MainPageButton from "../../components/Buttons/MainPageButton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import GenericAntDeleteModal from "../../components/GenericAntDeleteModal";
import GenericAntDrawer from "../../components/GenericAntDrawer";
import Skeleton from "../../components/Skeleton";
import { getAllEvaluteTickets } from "../../reduxStore/action/evalute";
import {
  getAgentName,
  getClientNames,
  getQasName,
  getTeamLeadName,
  setSelectedFormToEvaluate,
} from "../../reduxStore/action/formsManagement";
import {
  formatDateTimePlainEnglish,
  RemoveFromSelect,
  roundTo,
} from "../../utils/helperFunctions";

function EvaluateTickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [open, setOpen] = useState(false);
  const [selectedRow, setselectedRow] = useState([]);
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });
  const [selectedClients, setSelectedClients] = useState([]);
  const userDetails = useSelector((state) => state.auth.user);

  const [selectedQas, setSelectedQas] = useState(
    userDetails?.role == "admin" || userDetails?.role == "dev"
      ? []
      : userDetails?.role == "qas"
      ? [{ owner: userDetails?.owner_id }]
      : []
  );
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [selectedTL, setSelectedTL] = useState(
    userDetails?.role == "admin" || userDetails?.role == "dev"
      ? []
      : userDetails?.role != "qas"
      ? [{ teamlead_id: userDetails?.owner_id }]
      : []
  );
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingTL, setIsLoadingTL] = useState(false);

  const { isLoading, allFormsTickets } = useSelector((store) => store?.evalute);
  const {
    clientNames,
    isLoadingClients,
    qasNames,
    isLoadingQas,
    agentNames,
    teamLeadNames,
  } = useSelector((store) => store.formsManagement);

  const getData = (sorting, pagination, filters) => {
    dispatch(
      getAllEvaluteTickets({ ...sorting, ...pagination }, { ...filters })
    );
  };
  useEffect(() => {
    dispatch(getClientNames());
    dispatch(getQasName());
    dispatch(getTeamLeadName(setIsLoadingTL));
    dispatch(getAgentName(setIsLoadingAgent));
  }, []);
  useEffect(() => {
    // if (type) {
    // let selectedQasLocal = [...selectedQas];
    // let selectedTLLocal = [...selectedTL];

    getData(pagination, sorting, {
      client_id: selectedClients.map((item) => item.client_id),
      assigned_to_qas: selectedQas?.map((item) => item.owner),
      agent_id: selectedAgents?.map((item) => item.user_id),
      assigned_to_tl: selectedTL?.map((item) => item.teamlead_id),
    });
    // }
  }, [
    pagination,
    sorting,
    selectedClients,
    selectedQas,
    selectedAgents,
    selectedTL,
  ]);

  const columns = [
    {
      title: "Evaluated Date",
      dataIndex: "evaluation_date",
      key: "evaluation_date",
      width: 250,
      fixed: "left",
      render: (_, { evaluation_date }) => (
        <div>
          {evaluation_date && formatDateTimePlainEnglish(evaluation_date)}
        </div>
      ),
    },
    {
      title: "QAS Name",
      dataIndex: "assigned_to_qas",
      key: "assigned_to_qas",
      width: 120,
      disableSort: true,
      render: (_, { assigned_to_qas }) => <div>{assigned_to_qas}</div>,
    },
    {
      title: "TL Name",
      dataIndex: "assigned_to_tl",
      key: "assigned_to_tl",
      width: 120,
      disableSort: true,
      render: (_, { assigned_to_tl }) => <div>{assigned_to_tl}</div>,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      width: 120,
      render: (_, { due_date }) => (
        <div>{due_date && formatDateTimePlainEnglish(due_date)}</div>
      ),
    },
    {
      title: "Agent ID",
      dataIndex: "agent_id",
      key: "agent_id",
      width: 150,
      disableSort: true,
    },
    {
      title: "Client ID",
      dataIndex: "client_id",
      key: "client_id",
      width: 150,
      disableSort: true,
    },
    {
      title: "Form ID",
      dataIndex: "form_id",
      key: "form_id",
      width: 150,
      disableSort: true,
    },
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      key: "ticket_id",
      width: 150,
      disableSort: true,
    },
    {
      title: "Max Score",
      dataIndex: "max_score",
      key: "max_score",
      width: 150,
      disableSort: true,
    },
    {
      title: "Percentage Score",
      dataIndex: "percentage_score",
      key: "percentage_score",
      width: 200,
      render: (_, { percentage_score }) => (
        <div>{percentage_score && roundTo(percentage_score, 2)}</div>
      ),
    },
    {
      title: "Final Score",
      dataIndex: "final_score",
      key: "final_score",
      width: 150,
      render: (_, { final_score }) => (
        <div>{final_score && roundTo(final_score, 2)}</div>
      ),
    },
    // {
    //   title: "Evaluation Date",
    //   dataIndex: "evaluation_date",
    //   key: "evaluation_date",
    //   width: 250,
    //   render: (_, { evaluation_date }) => (
    //     <div>{evaluation_date && formatDateTimePlainEnglish(evaluation_date)}</div>
    //   ),
    // },
    {
      title: "Evaluated By TL Date",
      dataIndex: "evaluated_by_tl_date",
      key: "evaluated_by_tl_date",
      width: 250,
      render: (_, { evaluated_by_tl_date }) => (
        <div>
          {evaluated_by_tl_date &&
            formatDateTimePlainEnglish(evaluated_by_tl_date)}
        </div>
      ),
    },
    {
      title: "Evaluated By QAS Date",
      dataIndex: "evaluated_by_qas_date",
      key: "evaluated_by_qas_date",
      width: 250,
      render: (_, { evaluated_by_qas_date }) => (
        <div>
          {evaluated_by_qas_date &&
            formatDateTimePlainEnglish(evaluated_by_qas_date)}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 250,
      render: (_, { created_at }) => (
        <div>{created_at && formatDateTimePlainEnglish(created_at)}</div>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 250,
      render: (_, { updated_at }) => (
        <div>{updated_at && formatDateTimePlainEnglish(updated_at)}</div>
      ),
    },
  ];

  const handleEvalute = () => {
    navigate("/evalute-form");
  };
  const onChange = (date) => {
    getData({ page: 1, size: 10 }, sorting, {
      client_id: selectedClients.map((item) => item.client_id),
      assigned_to_qas: selectedQas?.map((item) => item.owner),
      agent_id: selectedAgents?.map((item) => item.user_id),
      assigned_to_tl: selectedTL?.map((item) => item.teamlead_id),
      due_date_from: date[0],
      due_date_to: date[1],
    });
    // setPagination({ page: 1, size: 10 });
  };
  return (
    <div className="m-[25px]">
      <div className="w-full flex flex-col mb-5 ">
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
              {/* <DatePicker
                open={open}
                onOpenChange={setOpen}
                onChange={onChange}
                placeholder="Select Due Date"
                prefix={
                  <Icon
                    icon="majesticons:calendar"
                    width={18}
                    style={{ color: "#69C920", marginRight: "5px" }}
                  />
                }
                suffixIcon={
                  <Icon
                    icon="icon-park-outline:down"
                    color="#163143"
                    width={18}
                    style={{
                      fontSize: 12,
                      transition: "transform 0.2s ease",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                }
                style={{ borderRadius: "32px" }}
              /> */}
              <AntDRangePicker onChange={onChange} />
            </div>
            <div className="flex space-x-0 flex-wrap gap-3 pl-3">
              <UnifiedDropdown
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
                className="h-[44px] w-[100%] border-[#d9d9d9] bg-white"
              />
            </div>
            {userDetails?.role == "qas" ? null : (
              <div className="flex space-x-0 flex-wrap gap-3 pl-3">
                <UnifiedDropdown
                  placeholder="Select QAS for this form"
                  name="QAS"
                  data={qasNames}
                  isLoading={isLoadingQas}
                  selectedList={selectedQas}
                  setselectedList={setSelectedQas}
                  multiSelect={true}
                  displayKey="name"
                  valueKey="owner"
                  searchKeys={["name"]}
                  className="h-[44px] w-[100%] border-[#d9d9d9] bg-white"
                />
              </div>
            )}

            <div className="flex space-x-0 flex-wrap gap-3 pl-3">
              <UnifiedDropdown
                placeholder="Select Agents for this form"
                name="Agents"
                data={agentNames}
                isLoading={isLoadingAgent}
                selectedList={selectedAgents}
                setselectedList={setSelectedAgents}
                multiSelect={true}
                displayKey="user_name"
                valueKey="user_id"
                searchKeys={["user_name"]}
                className="h-[44px] w-[100%] border-[#d9d9d9] bg-white"
              />
            </div>
            {userDetails?.role != "qas" ? null : (
              <div className="flex space-x-0 flex-wrap gap-3 pl-3">
                <UnifiedDropdown
                  placeholder="Select Team Leads for this form"
                  name="Team Leads"
                  data={teamLeadNames}
                  isLoading={isLoadingTL}
                  selectedList={selectedTL}
                  setselectedList={setSelectedTL}
                  multiSelect={true}
                  displayKey="teamleads"
                  valueKey="teamlead_id"
                  searchKeys={["teamleads"]}
                  className="h-[44px] w-[100%] border-[#d9d9d9] bg-white"
                />
              </div>
            )}
            {(userDetails?.role == "admin" || userDetails?.role == "dev") && (
              <div className="flex space-x-0 flex-wrap gap-3 pl-3">
                <UnifiedDropdown
                  placeholder="Select Team Leads for this form"
                  name="Team Leads"
                  data={teamLeadNames}
                  isLoading={isLoadingTL}
                  selectedList={selectedTL}
                  setselectedList={setSelectedTL}
                  multiSelect={true}
                  displayKey="teamleads"
                  valueKey="teamlead_id"
                  searchKeys={["teamleads"]}
                  className="h-[44px] w-[100%] border-[#d9d9d9] bg-white"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-semibold">{"Evaluate Tickets"}</span>
          <div className="ml-auto">
            <button
              onClick={handleEvalute}
              disabled={!selectedRow?.length > 0}
              className={`w-[160px] min-h-[40px] ml-auto text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                !selectedRow?.length > 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#69C920] hover:bg-[#5CB518] text-white"
              }`}
            >
              <span className="font-medium ml-1 text-[14px] font-poppins">
                {"Evaluate"}
              </span>
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="w-[100%] h-[50vh]" rounded="rounded-[32px]" />
      ) : (
        <AntDTable
          columns={columns}
          data={allFormsTickets?.data}
          total={allFormsTickets?.pagination?.totalRecords}
          current={allFormsTickets?.pagination?.currentPage}
          pageSize={allFormsTickets?.pagination?.pageSize}
          rowKey={"id"}
          onPageChange={(page) => {
            setPagination({
              ...pagination,
              page: page,
            });
          }}
          onPageSizeChange={(size) => {
            if (size != pagination.size) {
              setPagination({
                ...pagination,
                size: size,
              });
            }
          }}
          onSortChange={(columnKey, order) => {
            setSorting({ sort_by: columnKey, sort_order: order });
          }}
          pagination={true}
          sorting={sorting}
          // bordered={true}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              setselectedRow(selectedRows);
              dispatch(setSelectedFormToEvaluate(selectedRows));
            },
          }}
        />
      )}
    </div>
  );
}

export default EvaluateTickets;
