import React, { useEffect, useState } from "react";
import CMLayout from "../../CMLayout"; // Adjust path as necessary
import Header from "../../../../../components/common/Header"; // Adjust path as necessary
import {
  Table,
  Button,
  Input,
  Select,
  Checkbox,
  Typography,
  Flex,
  Space,
  Popconfirm,
} from "antd"; // Import Ant Design components
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableFooter from "@/pages/dashboard/TableFooter";
import { formatToMonthDayYear } from "@/utilities/time";
import { useDispatch } from "react-redux";
import UserActions from "@/redux/user/actions";
import { useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import CustomerSelectors from "@/redux/customer/selectors";
import { assign } from "lodash";
import SkillArchitectureActions from "@/redux/skillArchitecture/actions";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";

const { Title } = Typography;

// Mock data - replace with actual data source and logic

const CXSkillArchitectureAssign = () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const customerId = parts[2];
  const cxId = parts[4];
  const users = useSelector(UserSelectors.getUsers);
  users?.map((user) => {
    user.key = user._id;
  });
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const selectedSkillArchitectures = useSelector((state) =>
    SkillArchitectureSelectors.getRecordById(state, cxId)
  );
  // const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    // {
    //   title: "Department",
    //   dataIndex: "department",
    //   key: "department",
    // },
    // {
    //   title: "Project Stage",
    //   dataIndex: "projectStage",
    //   key: "projectStage",
    //   render: (text) => (
    //     <Select
    //       defaultValue={text}
    //       style={{ width: 120 }}
    //       bordered={false}
    //       suffixIcon={<DownOutlined />}
    //     >
    //       {projectStageOptions.map((option) => (
    //         <Select.Option key={option.value} value={option.value}>
    //           <Tag>{option.label}</Tag>
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    // },
    // {
    //   title: "Location",
    //   dataIndex: "location",
    //   key: "location",
    // },
    // {
    //   title: "Start Date",
    //   dataIndex: "startDate",
    //   key: "startDate",
    //   render: (date) => formatToMonthDayYear(date),
    // },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    // },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button
    //         type="text"
    //         icon={<EditOutlined style={{ color: "#9D43FE" }} />}
    //       />
    //       <Popconfirm
    //         title="Are you sure?"
    //         okText="Yes"
    //         cancelText="No"
    //         onConfirm={() => {
    //           dispatch(UserActions.deleteUser(record._id));
    //         }}
    //       >
    //         <Button
    //           icon={<DeleteOutlined style={{ color: "#9D43FE" }} />}
    //           type="link"
    //           style={{ padding: 0, color: "#1677ff" }}
    //         />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
  const handleRowSelection = (selectedRowKeys) => {
    console.log("selectedRowKeys:", selectedRowKeys);
    setSelectedUsers(selectedRowKeys);
  };

  useEffect(() => {
    if (selectedSkillArchitectures?.assigned) {
      setSelectedUsers(selectedSkillArchitectures?.assigned);
    }
  }, [selectedSkillArchitectures]);
  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management / CX Skill Architecture / Assign" />
      <div style={{ padding: "24px" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <div>
            <Select
              defaultValue="Status: All"
              style={{ width: 120, marginRight: 16 }}
            >
              <Select.Option value="all">Status: All</Select.Option>
              {/* Add other status options */}
            </Select>
            <Button style={{ marginRight: 16 }}>Bulk Action</Button>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Button type="primary" style={{ marginLeft: 8 }}>
              Search
            </Button>
          </div>
          <Button
            onClick={() => {
              dispatch(
                SkillArchitectureActions.updateRecord(customerId, cxId, {
                  assigned: selectedUsers,
                })
              );
              window.location.href = `/customers/${customerId}/cx-skills-architecture`;
            }}
            type="primary"
          >
            Assign Skill Architecture
          </Button>
        </Flex>
        <Table
          className="inventory-table-with-footer"
          style={{ overflow: "auto" }}
          columns={columns}
          dataSource={users}
          rowSelection={{
            type: "checkbox",
            onChange: handleRowSelection,
            selectedRowKeys: selectedUsers,
          }}
          pagination={false}
          footer={() => <TableFooter />}
        />
      </div>
    </CMLayout>
  );
};

export default CXSkillArchitectureAssign;
