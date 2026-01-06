import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDNotification } from "../../components/AntDNotification";
import AntDTable from "../../components/AntDTable";
import MainPageButton from "../../components/Buttons/MainPageButton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import GenericAntDeleteModal from "../../components/GenericAntDeleteModal";
import GenericAntDrawer from "../../components/GenericAntDrawer";
import Skeleton from "../../components/Skeleton";
import {
  deleteForm,
  duplicateForm,
  getAllForms,
  getClientNames,
  setActiveForms,
  updateForms,
} from "../../reduxStore/action/formsManagement";
import {
  formatDateTimeEnglish,
  RemoveFromSelect,
} from "../../utils/helperFunctions";

function AllForms({ setCreateNew, getData }) {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);

  const [selectedRow, setselectedRow] = useState({});
  const [sorting, setSorting] = useState({ sort_by: null, sort_order: null });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);

  // useEffect(() => {
  //   // if (type) {
  //     getData();
  //   // }
  // }, [pagination, sorting]);
  const { allForms, isLoading, isDeleting, clientNames, isLoadingClients } =
    useSelector((store) => store.formsManagement);

  const handleEditClientSuccess = (status) => {
    if (status?.status == "success") {
      AntDNotification(status);
      setDrawerOpen(false);
      dispatch(getAllForms({ page: 1, size: 10 }, null));
    } else {
      AntDNotification(status);
    }
  };

  const handleDrawerEditClient = () => {
    const params = {
      clients: selectedClients?.map((item) => {
        return { client_name: item.client, client_id: item.client_id };
      }),
    };
    dispatch(
      updateForms(selectedRow?.form_id, params, handleEditClientSuccess)
    );
  };

  const handleDeleteSuccess = (status) => {
    if (status) {
      AntDNotification({
        status: "success",
        title: "Deleted!",
        description: "Form deleted successfully",
        duration: 5,
      });
      getData();
    } else {
      AntDNotification({
        status: "error",
        title: "Error deleting form",
        description: "Failed to delete form, please try again",
        duration: 5,
      });
    }
    setIsDeleteOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteForm(selectedRow?.form_id, handleDeleteSuccess));
  };
  const handleDuplicateSuccess = (status) => {
    if (status) {
      AntDNotification({
        status: "success",
        title: "Duplicate Form!",
        description: "Duplicate Form created successfully",
        duration: 5,
      });
      getData();
    } else {
      AntDNotification({
        status: "error",
        title: "Error!",
        description: "Failed to duplicate form, please try again",
        duration: 5,
      });
    }
    setIsDuplicateOpen(false);
  };

  const handleDuplicate = () => {
    dispatch(duplicateForm(selectedRow?.form_id, handleDuplicateSuccess));
  };
  const columns = [
    {
      title: "Form Name",
      dataIndex: "form_name",
      key: "form_name",
      width: 200,
      fixed: "left",
    },
    {
      title: "# of Clients",
      dataIndex: "clients",
      key: "clients",
      width: 120,
      disableSort: true,
      render: (_, { clients }) => <div>{clients?.length}</div>,
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 120,
      disableSort: true,
    },
    {
      title: "Type",
      dataIndex: "form_type",
      key: "form_type",
      width: 150,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      width: 150,
    },
    {
      title: "Modified Date",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
      render: (_, { updated_at }) => (
        <div>{formatDateTimeEnglish(updated_at)}</div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (_, { created_at }) => (
        <div>{formatDateTimeEnglish(created_at)}</div>
      ),
    },
  ];

  const clientColumns = [
    {
      title: "Clients Name",
      dataIndex: "client_name",
      key: "client_name",
      width: 200,
      fixed: "left",
      disableSort: true,
    },
    {
      title: "QA Assigned",
      dataIndex: "qas",
      key: "qas",
      width: 180,
      render: (_, { qas }) => (
        <div className="flex flex-col gap-[5px]">
          {qas?.map((item, i) => (
            <div
              key={i}
              // className={`px-3 py-3 mr-3 mt-1 rounded-[8px] cursor-pointer text-sm bg-[#DBFFDF] text-[#163143]`}
            >
              {item?.qas_name}
            </div>
          ))}
        </div>
      ),
      disableSort: true,
    },
    {
      title: "Platform",
      dataIndex: "helpdesk",
      key: "helpdesk",
      width: 150,
      disableSort: true,
    },
    {
      title: "Headcount",
      dataIndex: "qas_id",
      key: "qas_id",
      width: 100,
      disableSort: true,
    },
  ];

  const dropdownOptions = [
    {
      label: "Edit",
      onClick: (row) => {
        dispatch(setActiveForms(row));
        setCreateNew(true);
      },
    },

    {
      label: "Edit Clients",
      onClick: (row) => {
        setselectedRow(row);
        setDrawerOpen(true);
        dispatch(getClientNames());
        setSelectedClients(
          row?.clients?.map((item) => {
            return { client: item.client_name, client_id: item.client_id };
          })
        );
      },
    },
    {
      label: "Duplicate Form",
      onClick: (row) => {
        setselectedRow(row);
        setIsDuplicateOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (row) => {
        setselectedRow(row);
        setIsDeleteOpen(true);
      },
    },
  ];
  const expandedRowRender = (record) => (
    <AntDTable columns={clientColumns} data={record ? record?.clients : []} />
  );
  return (
    <div>
      <GenericAntDeleteModal
        title="Delete Form"
        message="Are you sure you want to delete this form?"
        isOpen={isDeleteOpen}
        isLoading={isDeleting}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <GenericAntDeleteModal
        title="Duplicate Form"
        message="Are you sure you want to create duplicate of this form?"
        isOpen={isDuplicateOpen}
        isLoading={isDeleting}
        onCancel={() => setIsDuplicateOpen(false)}
        onConfirm={handleDuplicate}
      />
      <GenericAntDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          // setFormData({});
        }}
        title={"Edit Clients"}
        onSubmit={() => {}}
        submitText={"Update Question"}
      >
        <div className="">
          <div className="flex items-center ml-auto gap-[15px] border-b border-[#0505050F] pb-[25px]">
            <button
              onClick={() => {
                setDrawerOpen(false);
              }}
              className={`w-[130px] min-h-[32px] ml-auto text-[14px] font-sm rounded-full border border-[#D7E6E7] bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#163143]`}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleDrawerEditClient}
              disabled={isLoading}
              className={`w-[130px] min-h-[32px] text-[14px] font-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#69C920] hover:bg-[#5CB518] text-white"
              }`}
            >
              {isLoading ? "Processing..." : "Save"}
            </button>
          </div>
          <div>
            <label className="block text-[14px] font-semibold mb-3">
              Select Client for This Form
              <span className="text-red-500">*</span>
            </label>
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
              className="h-[44px] w-[100%] border-[#d9d9d9]"
            />
          </div>
          <div className="w-[100%] h-[100%] overflow-y-scroll mt-[10px] flex flex-wrap gap-3 ">
            {selectedClients.length > 0 &&
              selectedClients.map((item) => (
                <div
                  onClick={() =>
                    RemoveFromSelect(item, selectedClients, setSelectedClients)
                  }
                  className="cursor-pointer py-1  bg-[#DBFFDF] rounded-full flex items-center justify-center px-2 text-[14px] text-[#163143]"
                >
                  {item?.client}
                  <Icon
                    color="#163143"
                    fontSize={24}
                    className="pl-1"
                    icon="basil:cross-outline"
                  />
                </div>
              ))}
          </div>
        </div>
      </GenericAntDrawer>
      <div className=" w-full flex flex-col mb-5 ">
        <div className="flex items-center">
          <span className="text-xl font-semibold">{"Forms"}</span>
          <div className="ml-auto">
            <MainPageButton
              icon="formkit:add"
              buttonTittle="Add New Form"
              onClick={() => setCreateNew(true)}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="w-[100%] h-[50vh]" rounded="rounded-[32px]" />
      ) : (
        <AntDTable
          columns={columns}
          data={allForms ? allForms?.data : []}
          total={allForms?.pagination?.totalRecords}
          current={allForms?.pagination?.currentPage}
          pageSize={allForms?.pagination?.pageSize}
          rowKey={"form_id"}
          onPageChange={(page) => {
            setPagination({
              ...pagination,
              page: page,
            });
            getData(sorting, {
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
              getData(sorting, {
                ...pagination,
                size: size,
              });
            }
          }}
          onSortChange={(columnKey, order) => {
            setSorting({ sort_by: columnKey, sort_order: order });
            getData({ sort_by: columnKey, sort_order: order }, pagination);
          }}
          dropdownOptions={dropdownOptions}
          pagination={true}
          sorting={sorting}
          // bordered={true}
          // rowSelection={{
          //   onChange: (selectedRowKeys, selectedRows) => {
          //     console.log("Selected:", selectedRowKeys, selectedRows);
          //   },
          // }}
          expandable={{
            expandedRowRender,
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>Details for {record.name}</p>
            //   ),
          }}
        />
      )}
    </div>
  );
}

export default AllForms;
