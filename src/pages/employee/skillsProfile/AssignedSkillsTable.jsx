import React, { useEffect, useState } from "react";
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

const AssignedSkillsTable = () => {
  const userDetails = localStorage.getItem("userDetails");
  const userDetailsData = userDetails ? JSON.parse(userDetails) : null;
  const records = userDetailsData.skillArchitectureRecords;
  const [skillMap, setSkillMap] = useState({});
  const [allSkillsData, setAllSkillsData] = useState(records);
  const [skillsData, setSkillsData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "all") {
      setSkillsData(allSkillsData);
    } else if (skillMap[key]) {
      const subSkillsForCategory = skillMap[key];
      if (subSkillsForCategory && Array.isArray(subSkillsForCategory)) {
        const filteredData = allSkillsData.filter((mainSkillItem) =>
          subSkillsForCategory.includes(mainSkillItem.skill)
        );
        setSkillsData(filteredData);
      } else {
        setSkillsData([]);
      }
    } else {
      setSkillsData([]);
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
    // {
    //   title: "Expected",
    //   dataIndex: "expected",
    //   key: "expected",
    //   align: "left",
    //   render: (text) => (
    //     <Text style={{ fontWeight: 500, color: "#101828", fontSize: "14px" }}>
    //       {text}
    //     </Text>
    //   ),
    // },
    // {
    //   title: "Skills Match Status",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "left",
    //   render: (text) => (
    //     <Text style={{ color: "#475467", fontSize: "14px" }}>{text}</Text>
    //   ),
    // },
  ];

  useEffect(() => {
    const skillMap = records.reduce((acc, record) => {
      const skill = record.skills;
      const subSkill = record.subSkills;

      if (skill && typeof subSkill === "string") {
        // Ensure skill and subSkill are valid
        if (!acc[skill]) {
          acc[skill] = [];
        }
        if (!acc[skill].includes(subSkill)) {
          acc[skill].push(subSkill);
        }
      }
      return acc;
    }, {});
    setSkillMap(skillMap);
    const allSkillsData = records.map((record) => record.skills);
    setAllSkillsData(allSkillsData);
  }, []);

  return (
    <div className="assigned-skills-container">
      {/* {!isDashboard && (
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
      )} */}
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
        defaultActiveKey="all"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="nz-pink-tab"
      >
        <TabPane tab="All Skills" key="all">
          <Table
            columns={columns}
            dataSource={skillsData}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>
        {Object.keys(skillMap).map((skillCategory) => (
          <TabPane tab={skillCategory} key={skillCategory}>
            <Table
              columns={columns}
              dataSource={skillsData.filter(
                (record) =>
                  record.skills === skillCategory ||
                  (skillMap[skillCategory] &&
                    skillMap[skillCategory].includes(record.subSkills))
              )}
              pagination={false}
              className="assigned-skills-table"
              showHeader={true}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default AssignedSkillsTable;
