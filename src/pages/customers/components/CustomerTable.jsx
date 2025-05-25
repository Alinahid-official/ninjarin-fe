import React from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Flex,
  Tabs,
  Popconfirm,
  Row,
  Col,
  Radio,
} from "antd";
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import BlankList from "@/components/common/BlankList";
import { useDispatch, useSelector } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import { GoPencil } from "react-icons/go";
import CustomerActions from "@/redux/customer/actions";
import CustomerCard from "./CustomerCard";
import TableFooter from "@/pages/dashboard/TableFooter";
import { Link } from "react-router-dom";
import { router } from "@/utilities/routes";

const OverviewHeader = ({ onClick }) => (
  <Flex justify="space-between" style={{ padding: 16 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <span style={{ color: "#000000", fontSize: 16 }}>Overview</span>
      <Select
        defaultValue="last7"
        style={{
          width: 120,
          border: "none",
        }}
        dropdownStyle={{ borderRadius: 8 }}
        bordered={false}
        options={[
          {
            value: "last7",
            label: <span style={{ color: "#757575" }}>Last 7 Days</span>,
          },
          {
            value: "last30",
            label: (
              <span style={{ fontWeight: 600, color: "#757575" }}>
                Last 30 Days
              </span>
            ),
          },
          {
            value: "thisMonth",
            label: (
              <span style={{ fontWeight: 600, color: "#757575" }}>
                This Month
              </span>
            ),
          },
        ]}
      />
    </div>
    <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
      Add Customer
    </Button>
  </Flex>
);

const CustomerTable = ({ handleAddCustomer }) => {
  const dispatch = useDispatch();
  const customers = useSelector(CustomerSelectors.getCustomers);
  const [viewType, setViewType] = React.useState("list"); // Add state for view type

  const tabItems = [
    {
      key: "all",
      label: (
        <span>
          All Customers <span style={{ marginLeft: 4 }}>12</span>
        </span>
      ),
    },
    {
      key: "consulting",
      label: (
        <span>
          Consulting <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "career",
      label: (
        <span>
          Career Mapping <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "recruitment",
      label: (
        <span>
          Recruitment <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "learning",
      label: (
        <span>
          Learning & Development <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "succession",
      label: (
        <span>
          Succession Planning <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
  ];

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "customer",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {text.charAt(0)}
          </div>
          <span
            onClick={() => {
              onCustomerClick(record);
            }}
            style={{ color: "#1677ff", cursor: "pointer" }}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Projects",
      dataIndex: "projects",
      key: "projects",
      render: (projects) => (
        <div>
          {projects.map((project, index) => (
            <div key={index} style={{ color: "#1677ff" }}>
              {project?.name}
            </div>
          ))}
          {projects.length > 3 && (
            <div style={{ color: "#1677ff" }}>+ {projects.length - 3} more</div>
          )}
        </div>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "CX Admin",
      dataIndex: "cxAdmin",
      key: "cxAdmin",
      render: (admin) => (
        <div>
          <div>{admin.firstName}</div>
          <div style={{ color: "#9e9e9e", fontSize: 12 }}>{admin.email}</div>
        </div>
      ),
    },
    {
      title: "Project Type",
      dataIndex: "projects",
      key: "projectType",
      render: (projects) => (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {projects.map((project, index) => (
            <span
              key={index}
              style={{
                padding: "4px 12px",
                borderRadius: "16px",
                background: getTypeColor(project.projectType).bg,
                color: getTypeColor(project.projectType).text,
              }}
            >
              {project.projectType}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (serviceTypes) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {serviceTypes?.map((type, index) => (
            <span
              key={index}
              style={{
                color: "#596780",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (record) => (
        <div style={{ display: "flex", gap: 16 }}>
          <Button
            icon={<GoPencil />}
            type="link"
            style={{ padding: 0, color: "#1677ff" }}
            onClick={() => {
              dispatch(CustomerActions.selectCustomer(record));
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={"Are you sure?"}
            okText={"Yes"}
            cancelText={"No"}
            onConfirm={() => {
              dispatch(CustomerActions.deleteCustomer(record._id));
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              type="link"
              style={{ padding: 0, color: "#1677ff" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      "Career Mapping": { bg: "#e8f5e9", text: "#2e7d32" },
      Assessment: { bg: "#ffebee", text: "#c62828" },
      "Succession Planning": { bg: "#fce4ec", text: "#c2185b" },
      Consulting: { bg: "#fff3e0", text: "#ef6c00" },
      Services: { bg: "#e8f5e9", text: "#2e7d32" },
      "Change Management": { bg: "#fff8e1", text: "#f9a825" },
    };
    return colors[type] || { bg: "#f5f5f5", text: "#757575" };
  };

  const onCustomerClick = (customer) => {
    dispatch(CustomerActions.setCurrentCustomer(customer));
    router.navigate(`/customers/${customer._id}/home`);
  };

  // const data = [
  //   {
  //     key: "1",
  //     customer: "Wipro",
  //     projects: [
  //       "Wipro Supernova",
  //       "West Bengal Data Center",
  //       "State Data Center",
  //     ],
  //     industry: "Technology",
  //     cxAdmin: { name: "Prathik Chaudhari", email: "prathik@wipro.com" },
  //     projectType: ["Career Mapping", "Assessment"],
  //   },
  //   // Add more data as needed
  // ];

  if (!customers?.length) {
    return (
      <BlankList
        title="Ready to build your client list?"
        description="You haven't added any client yet.\nStart by adding one now!"
        buttonText="Add Customer"
        onClick={handleAddCustomer}
      />
    );
  }

  return (
    <>
      <OverviewHeader onClick={handleAddCustomer} />
      <div className="nz-border nz-border-radius">
        <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
          <Tabs
            items={tabItems}
            defaultActiveKey="all"
            onChange={(key) => console.log(key)}
          />
          <Flex gap="middle" align="center" style={{ marginTop: 16 }}>
            <Select
              defaultValue="All"
              style={{ width: 200 }}
              options={[{ value: "All", label: "Project Type: All" }]}
            />
            <Select
              defaultValue="All"
              style={{ width: 200 }}
              options={[{ value: "All", label: "Filter: All" }]}
            />
            <Input
              placeholder="Search"
              suffix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <div style={{ marginLeft: "auto" }}>
              <Radio.Group
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="list">
                  <UnorderedListOutlined /> List
                </Radio.Button>
                <Radio.Button value="grid">
                  <AppstoreOutlined /> Grid
                </Radio.Button>
              </Radio.Group>
            </div>
          </Flex>
        </div>

        {viewType === "list" ? (
          <Table
            columns={columns}
            dataSource={customers}
            pagination={false}
            footer={() => <TableFooter />}
          />
        ) : (
          <div style={{ padding: 16 }}>
            <Row gutter={[16, 16]}>
              {customers?.map((customer, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <CustomerCard
                    customer={customer}
                    onEdit={() => {}}
                    onDelete={() => {
                      dispatch(CustomerActions.deleteCustomer(customer._id));
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerTable;
