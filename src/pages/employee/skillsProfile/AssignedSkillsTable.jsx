import React, { useState } from "react";
import {
  Table,
  Typography,
  Input,
  Button,
  Row,
  Col,
  Space,
  Tabs,
  Radio,
} from "antd";
import "./AssignedSkillsTable.css"; // We'll create this CSS file
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import UserProfileCard from "../dashboard/UserProfileCard"; // Adjusted path to dashboard directory

const { Title, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const AssignedSkillsTable = ({ isDashboard }) => {
  const allSkillsData = [
    {
      key: "1",
      skill: "Communication",
      proficiency: "NA",
      expected: "100%",
      status: "Not Validated",
      category: "Soft",
    },
    {
      key: "2",
      skill: "Teamwork",
      proficiency: "0",
      expected: "78%",
      status: "Skills Gap",
      category: "Soft",
    },
    {
      key: "3",
      skill: "Problem Solving",
      proficiency: "NA",
      expected: "60%",
      status: "Not Applicable",
      category: "Analytical",
    },
    {
      key: "4",
      skill: "Time Management",
      proficiency: "76%",
      expected: "76%",
      status: "Match",
      category: "Soft",
    },
    {
      key: "5",
      skill: "Adaptability",
      proficiency: "56%",
      expected: "64%",
      status: "Proficiency Gap",
      category: "Soft",
    },
    {
      key: "6",
      skill: "Creativity",
      proficiency: "56%",
      expected: "56%",
      status: "Match",
      category: "Soft",
    },
    {
      key: "7",
      skill: "Technical Proficiency",
      proficiency: "77%",
      expected: "87%",
      status: "Proficiency Gap",
      category: "Technical",
    },
    {
      key: "8",
      skill: "Critical Thinking",
      proficiency: "68%",
      expected: "68%",
      status: "Match",
      category: "Analytical",
    },
    {
      key: "9",
      skill: "Leadership",
      proficiency: "74%",
      expected: "NA",
      status: "Not Available",
      category: "Leadership",
    },
  ];

  const [skillsData, setSkillsData] = useState(allSkillsData);
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "1") {
      // All Skills
      setSkillsData(allSkillsData);
    } else if (key === "2") {
      // Technical
      setSkillsData(
        allSkillsData.filter((skill) => skill.category === "Technical")
      );
    } else if (key === "3") {
      // Soft
      setSkillsData(allSkillsData.filter((skill) => skill.category === "Soft"));
    } else if (key === "4") {
      // Analytical
      setSkillsData(
        allSkillsData.filter((skill) => skill.category === "Analytical")
      );
    } else if (key === "5") {
      // Leadership
      setSkillsData(
        allSkillsData.filter((skill) => skill.category === "Leadership")
      );
    }
  };

  const columns = [
    {
      title: "Skills",
      dataIndex: "skill",
      key: "skill",
      render: (text) => (
        <Text style={{ color: "#475467", fontSize: "14px" }}>{text}</Text>
      ),
    },
    {
      title: "My Proficiency",
      dataIndex: "proficiency",
      key: "proficiency",
      align: "left",
      render: (text) => (
        <Text style={{ fontWeight: 500, color: "#101828", fontSize: "14px" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Expected",
      dataIndex: "expected",
      key: "expected",
      align: "left",
      render: (text) => (
        <Text style={{ fontWeight: 500, color: "#101828", fontSize: "14px" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Skills Match Status",
      dataIndex: "status",
      key: "status",
      align: "left",
      render: (text) => (
        <Text style={{ color: "#475467", fontSize: "14px" }}>{text}</Text>
      ),
    },
  ];

  return (
    <div className="assigned-skills-container">
      {!isDashboard && (
        <>
          <UserProfileCard />

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "24px" }}
            className="analysis-header-row"
          >
            <Col>
              <Title
                level={5}
                style={{ margin: 0, color: "#101828", fontWeight: 600 }}
                className="analysis-title"
              >
                My skills vs Job role analysis
              </Title>
            </Col>
            <Col>
              <Radio.Group
                defaultValue="list"
                buttonStyle="solid"
                className="view-switcher"
              >
                <Radio.Button value="list" className="view-switcher-list">
                  <Space>
                    <UnorderedListOutlined />
                    List
                  </Space>
                </Radio.Button>
                <Radio.Button value="graph" className="view-switcher-graph">
                  <Space>
                    <AppstoreOutlined />
                    Skills Graph
                  </Space>
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </>
      )}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Col>
          <Title
            level={4}
            style={{ margin: 0, color: "#101828", fontWeight: 600 }}
          >
            Assigned Skills
          </Title>
        </Col>
        <Col>
          <Space>
            <Input
              className="nz-input-square"
              placeholder="Search"
              style={{ width: 200, marginLeft: "auto" }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="nz-no-shadow"
            />
            <Button
              style={{
                border: "1px solid #8C5BF2",
                color: "#8C5BF2",
                backgroundColor: "#F6F1FF",
              }}
            >
              Validate My Skills
            </Button>
          </Space>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="nz-pink-tab"
      >
        <TabPane tab="All Skills" key="1">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
        <TabPane tab="Technical" key="2">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
        <TabPane tab="Soft" key="3">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
        <TabPane tab="Analytical" key="4">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
        <TabPane tab="Leadership" key="5">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AssignedSkillsTable;
