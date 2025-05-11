import React, { useState } from "react";
import { Table, Button, Typography, Flex, Card } from "antd";
import {
  SyncOutlined,
  PlusOutlined,
  MoreOutlined,
  ApartmentOutlined, // Import the icon
} from "@ant-design/icons";
import CommonDrawer from "@/components/common/Drawer";
import OrganizationDesignForm from "./OrganizationDesignForm";
import AddOrganizationDesignForm from "./AddOrganizationDesignForm"; // Ensure this is correctly imported
import { useSelector } from "react-redux";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";
import EditableInputField from "@/components/common/EditableInputField";
import EditableLabelField from "./EditableLabelField";

const { Title } = Typography;

const SkillTable = () => {
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const handleUpdateDesign = () => {
    setIsUpdateDrawerOpen(true);
  };

  const handleUpdateDrawerClose = () => {
    setIsUpdateDrawerOpen(false);
  };

  const handleUpdateDesignSubmit = (values) => {
    console.log("Update form values:", values);
    setIsUpdateDrawerOpen(false);
  };

  const handleOpenAddDesignDrawer = () => {
    // Renamed from handleAddDesign
    setIsAddDrawerOpen(true);
  };

  const handleAddDrawerClose = () => {
    setIsAddDrawerOpen(false);
  };

  const handleAddDesignSubmit = (values) => {
    console.log("Add form values:", values);
    // setIsAddDrawerOpen(false); // Decide if drawer should close on submit
  };
  const columns = [
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF", // Light blue background for the icon
              padding: "8px", // Padding around the icon
              borderRadius: "6px", // Rounded corners for the icon's background
              display: "inline-flex", // Ensures padding and background apply correctly
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Industry</div>
          </div>
        </Flex>
      ),
      dataIndex: "industry",
      key: "industry",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF", // Light blue background for the icon
              padding: "8px", // Padding around the icon
              borderRadius: "6px", // Rounded corners for the icon's background
              display: "inline-flex", // Ensures padding and background apply correctly
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Organization</div>
          </div>
        </Flex>
      ),
      dataIndex: "organization",
      key: "organization",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF", // Light blue background for the icon
              padding: "8px", // Padding around the icon
              borderRadius: "6px", // Rounded corners for the icon's background
              display: "inline-flex", // Ensures padding and background apply correctly
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Line of Business</div>
          </div>
        </Flex>
      ),
      dataIndex: "lineOfBusiness",
      key: "lineOfBusiness",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Bands</div>
          </div>
        </Flex>
      ),
      dataIndex: "bands",
      key: "bands",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Grades</div>
          </div>
        </Flex>
      ),
      dataIndex: "grades",
      key: "grades",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Roles</div>
          </div>
        </Flex>
      ),
      dataIndex: "roles",
      key: "roles",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Type of Role</div>
          </div>
        </Flex>
      ),
      dataIndex: "typeOfRole",
      key: "typeOfRole",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Skills</div>
          </div>
        </Flex>
      ),
      dataIndex: "skills",
      key: "skills",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Sub Skills</div>
          </div>
        </Flex>
      ),
      dataIndex: "subSkills",
      key: "subSkills",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span>{text}</span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Description</div>
          </div>
        </Flex>
      ),
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Flex justify="space-between" align="center">
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 150,
            }}
          >
            {text}
          </span>
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Flex>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <ApartmentOutlined
            style={{
              marginRight: 8,
              fontSize: "20px",
              color: "#6B7280",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}>
              Label
            </div>
            <div style={{ fontWeight: 600 }}>Assigned</div>
          </div>
        </Flex>
      ),
      key: "assigned",
      dataIndex: "assigned",
      render: () => (
        <Button
          type="primary"
          style={{
            background: "#EDE9FE",
            color: "#8C5BF2",
            borderColor: "#8C5BF2",
            width: "100%",
          }}
        >
          Assign Skill
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      industry: "IT Tech",
      organization: "Wipro",
      lineOfBusiness: "SaaS Development",
      function: "Technology (IT)",
      subFunctionVerticals: "Delivery",
      bands: "3-4",
      grades: "E-0",
      roles: "Delivery Head",
      typeOfRole: "-",
      skills: "Delivery Excellence",
      subSkills: "Project Management",
      description: "Has requisite project management knowledge...",
      assigned: "",
    },
    {
      key: "2",
      industry: "IT Tech",
      organization: "Wipro",
      lineOfBusiness: "SaaS Development",
      function: "Technology (IT)",
      subFunctionVerticals: "Delivery",
      bands: "3-4",
      grades: "E-0",
      roles: "Delivery Head",
      typeOfRole: "-",
      skills: "Delivery Excellence",
      subSkills: "Project Management",
      description: "Has requisite project management knowledge...",
      assigned: "",
    },
    {
      key: "3",
      industry: "IT Tech",
      organization: "Wipro",
      lineOfBusiness: "SaaS Development",
      function: "Technology (IT)",
      subFunctionVerticals: "Delivery",
      bands: "3-4",
      grades: "E-0",
      roles: "Delivery Head",
      typeOfRole: "-",
      skills: "Delivery Excellence",
      subSkills: "Project Management",
      description: "Has requisite project management knowledge...",
      assigned: "",
    },
  ];
  const getColumns = () => {
    if (!labels) {
      return columns; // Use default columns if labels is null
    }

    // Filter out unwanted keys and create columns dynamically
    const excludedKeys = ["_id", "customerId", "createdAt", "updatedAt", "__v"];
    return Object.entries(labels)
      .filter(([key, value]) => !excludedKeys.includes(key) && value !== null)
      .map(([key, value]) => {
        return {
          title: (
            <Flex
              align="center"
              style={{
                padding: "12px 16px",
                background: "#FFFFFF",
                borderRadius: "8px",
              }}
            >
              <ApartmentOutlined
                style={{
                  marginRight: 8,
                  fontSize: "20px",
                  color: "#6B7280",
                  background: "#EFF6FF",
                  padding: "8px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <div>
                <div
                  style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}
                >
                  Label
                </div>
                <div style={{ fontWeight: 600 }}>
                  <EditableLabelField
                    name={key}
                    value={value}
                    customerId={labels.customerId}
                    labelId={labels._id}
                  />
                </div>
              </div>
            </Flex>
          ),
          dataIndex: key,
          key: key,
          render: (text) => (
            <Flex justify="space-between" align="center">
              {key === "assigned" ? (
                <Button
                  type="primary"
                  style={{
                    background: "#EDE9FE",
                    color: "#8C5BF2",
                    borderColor: "#8C5BF2",
                    width: "100%",
                  }}
                >
                  Assign Skill
                </Button>
              ) : (
                <>
                  <span>{text}</span>
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </>
              )}
            </Flex>
          ),
        };
      });
  };
  // Add row component for the "add" buttons
  const AddRow = () => {
    // console.log("columns", getColumns());
    return (
      <tr>
        {getColumns().map((column) => {
          // console.log("col", column);
          return (
            <td key={column.key}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                style={{
                  color: "#8C5BF2",
                  background: "#EDE9FE",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {labels ? labels[column.key] : column.key}
              </Button>
            </td>
          );
        })}
      </tr>
    );
  };
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Ninjarin Skills Architecture
        </Title>
        <Flex gap={12}>
          <Button onClick={handleUpdateDesign} icon={<SyncOutlined />}>
            Update
          </Button>
          <Button
            onClick={handleOpenAddDesignDrawer}
            type="primary"
            style={{ background: "#8C5BF2" }}
          >
            Add Organization Design
          </Button>
        </Flex>
      </Flex>

      <Card
        bodyStyle={{ padding: 0 }}
        bordered={false}
        style={{ borderRadius: 8 }}
      >
        <Table
          bordered // Kept the bordered prop as per your recent change
          columns={getColumns()}
          dataSource={data}
          pagination={false}
          components={{
            body: {
              wrapper: (props) => (
                <tbody {...props}>
                  <AddRow /> {/* Moved AddRow to be rendered first */}
                  {props.children}
                </tbody>
              ),
            },
          }}
          style={{ borderRadius: 8 }}
        />
      </Card>

      <CommonDrawer
        title="Update Organization Design"
        open={isUpdateDrawerOpen}
        onClose={handleUpdateDrawerClose}
        width={520}
      >
        <OrganizationDesignForm
          onSubmit={handleUpdateDesignSubmit}
          onCancel={handleUpdateDrawerClose}
        />
      </CommonDrawer>

      {/* New Drawer for Adding Organization Design */}
      <CommonDrawer
        title="Add Organization Design"
        // subTitle="Fill in the details to add a new organization design." // Optional: Add a subtitle if needed
        open={isAddDrawerOpen}
        onClose={handleAddDrawerClose}
        width={520} // Or adjust width as needed, image looks like a standard drawer width
      >
        <AddOrganizationDesignForm
          onSubmit={handleAddDesignSubmit}
          onCancel={handleAddDrawerClose}
        />
      </CommonDrawer>
    </div>
  );
};

export default SkillTable;
