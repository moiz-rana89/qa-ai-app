import { useState } from "react";
// import "./App.css";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

// import { getAttendanceRecords } from "./reduxStore/action/workforcedashboard";
import AntDTable from "../components/AntDTable";

function TestTable() {
  const [data, setData] = useState([
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
    { id: 1, name: "John", age: 32, address: "New York" },
    { id: 2, name: "Jane", age: 28, address: "London" },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
  ];

  const dropdownOptions = [
    { label: "Edit", onClick: (row) => console.log("Edit", row) },
    { label: "Delete", onClick: (row) => console.log("Delete", row) },
  ];
  const expandedRowRender = () => <AntDTable columns={columns} data={data} />;
  return (
    <>
      <h1 className="text-4xl font-bold text-red-600">
        Tailwind CSS + Vite + React 🚀
      </h1>
      <AntDTable
        columns={columns}
        data={data}
        total={data.length}
        current={1}
        pageSize={10}
        onPageChange={(page) => console.log("Page:", page)}
        onPageSizeChange={(size) => console.log("Size:", size)}
        onSortChange={(columnKey) => console.log("Sort column:", columnKey)}
        // dropdownOptions={dropdownOptions}
        // rowSelection={{
        //   onChange: (selectedRowKeys, selectedRows) => {
        //     console.log("Selected:", selectedRowKeys, selectedRows);
        //   },
        // }}
        expandable={{
          expandedRowRender,
          // expandedRowRender: (record) => (
          //   <p style={{ margin: 0 }}>Details for {record.name}</p>
          // ),
        }}
      />
    </>
  );
}

export default TestTable;
