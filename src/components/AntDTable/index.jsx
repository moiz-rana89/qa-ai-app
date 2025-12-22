import React from "react";
import { Table, Dropdown, Menu, Button, Space, Pagination } from "antd";
import { Icon } from "@iconify/react";
import "./AntDTable.css"; // We'll put custom styles here

const AntDTable = ({
  columns = [],
  data = [],
  loading = false,
  pagination = false,
  pageSize = 10,
  total = 0,
  current = 1,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  rowSelection = null,
  expandable = null,
  fixedHeader = true,
  fixedColumns = true,
  bordered = false,
  dropdownOptions = [],
  rowKey,
  sorting,
}) => {
  // --- Add sorting to columns dynamically ---
  // const enhancedColumns = columns.map((col, index) => ({
  //   ...col,

  //   // enable/disable sorter based on your flag
  //   sorter: col.disableSort ? false : (a, b) => 0,

  //   sortDirections: ["ascend", "descend"],

  //   // capture header click (for sending index + direction)
  //   onHeaderCell: () => ({
  //     // onClick: () => {
  //     //   if (onSortChange && !col.disableSort) {
  //     //     onSortChange({
  //     //       index, // column index
  //     //       key: col.dataIndex,
  //     //       direction: col.sortOrder || null,
  //     //     });
  //     //   }
  //     // },
  //   }),
  // }));
  // const enhancedColumns = columns.map((col, index) => {
  //   const isSortedColumn = sorting.sort_by === col.dataIndex;
  //   return {
  //     ...col,
  //     sorter: col.disableSort ? false : true,

  //     // keep arrow active
  //     sortOrder: isSortedColumn ? sorting.sort_order : null,
  //   };
  // });
  const cycleOrder = (current) => {
    if (!current) return "ascend";
    if (current === "ascend") return "descend";
    return null;
  };

  const enhancedColumns = columns.map((col) => ({
    ...col,
    sortOrder: sorting?.sort_by === col.dataIndex ? sorting?.sort_order : null,
    sorter: col.disableSort ? false : true,

    onHeaderCell: () => ({
      onClick: () => {
        const nextOrder =
          col.dataIndex === sorting?.sort_by
            ? cycleOrder(sorting?.sort_order)
            : "ascend";

        const nextState = {
          field: col.dataIndex,
          order: nextOrder,
        };

        // setSortState(nextState);

        // send sort every click (even when null)
        onSortChange?.(nextState.field, nextState.order);
      },
    }),
  }));

  // --- Inject dropdown menu column at start ---
  const actionColumn = {
    title: "",
    key: "actions",
    fixed: fixedColumns ? "left" : false,
    width: 20,
    render: (_, record) =>
      dropdownOptions.length > 0 && (
        <Dropdown
          overlay={
            <Menu>
              {dropdownOptions.map((opt, i) => (
                <Menu.Item key={i} onClick={() => opt.onClick(record)}>
                  {opt.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            // style={{ width: "10px" }}
            type="text"
            icon={<Icon icon="nrk:more" />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      ),
  };

  const finalColumns = [actionColumn, ...enhancedColumns];

  // --- Custom expandable icon ---
  const expandableConfig = expandable
    ? {
        ...expandable,
        expandIcon: ({ expanded, onExpand, record }) => (
          <Button
            // style={{ width: "10px" }}
            type="text"
            icon={
              <Icon
                icon="material-symbols:keyboard-arrow-down"
                style={{
                  transition: "transform 0.3s",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            }
            onClick={(e) => onExpand(record, e)}
          />
        ),
      }
    : undefined;
  const handleTableChange = (pagination, filters, sorter) => {
    // if (onSortChange && sorter.column) {
    //   onSortChange(sorter.field, sorter.order);
    // }
  };

  return (
    <div className="generic-table-wrapper">
      <Table
        rowKey={(record) => record[`${rowKey}`] || record.key}
        columns={finalColumns}
        dataSource={data}
        loading={loading}
        bordered={bordered}
        onChange={handleTableChange}
        pagination={
          pagination
            ? {
                current,
                pageSize,
                total,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                position: ["bottomCenter"],
                onChange: (page, size) => {
                  onPageChange?.(page);
                  onPageSizeChange?.(size);
                },
                className: "custom-pagination",
              }
            : false
        }
        rowSelection={rowSelection || undefined}
        expandable={expandableConfig}
        scroll={
          fixedHeader || fixedColumns
            ? {
                x: fixedColumns ? "max-content" : undefined,
                // y: fixedHeader ? 500 : undefined,
              }
            : undefined
        }
      />
    </div>
  );
};

export default AntDTable;
