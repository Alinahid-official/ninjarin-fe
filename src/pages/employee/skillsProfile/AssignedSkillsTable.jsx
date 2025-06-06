import React, { useEffect, useState, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch } from "react-redux";
import UserActions from "@/redux/user/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/error/FullAlertError";

const { Title, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
const selectError = makeSelectErrorModel();
const AssignedSkillsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) =>
    requestingSelector(state, [UserActions.GET_USER_SKILL_PROFILES])
  );
  const error = useSelector((state) =>
    selectError(state, [UserActions.GET_USER_SKILL_PROFILES_FINISHED])
  );
  const skillProfiles = useSelector(UserSelectors.getUserSkillProfiles);

  const [activeTab, setActiveTab] = useState("all");
  const [skillData, setSkillData] = useState({});
  const [skillTabs, setSkillTabs] = useState([]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const formatProficiency = useCallback((assessment) => {
    const proficiencyMap = {
      not_applicable: "Not Applicable",
      "1_basic": "Basic",
      "2_intermediate": "Intermediate",
      "3_proficient": "Proficient",
      "4_advanced": "Advanced",
      "5_mastery": "Mastery",
    };
    return proficiencyMap[assessment] || "Not Validated";
  }, []);

  const columns = [
    {
      title: "Sub Skills",
      dataIndex: "subSkill",
      key: "subSkill",
      render: (text) => (
        <Text style={{ color: "#475467", fontSize: "14px" }}>{text}</Text>
      ),
    },
    {
      title: "My Proficiency",
      dataIndex: "proficiency",
      key: "proficiency",
      align: "left",
      render: (text) => {
        const getStatusColor = (proficiency) => {
          if (proficiency === "Not Validated") return "#6B7280";
          if (proficiency === "Not Applicable") return "#6B7280";
          if (proficiency === "Basic") return "#F59E0B";
          if (proficiency === "Intermediate") return "#3B82F6";
          if (proficiency === "Proficient") return "#10B981";
          if (proficiency === "Advanced") return "#8B5CF6";
          if (proficiency === "Mastery") return "#EF4444";
          return "#6B7280";
        };

        return (
          <Text
            style={{
              fontWeight: 500,
              color: getStatusColor(text),
              fontSize: "14px",
            }}
          >
            {text}
          </Text>
        );
      },
    },
  ];

  // Get current tab data
  const getCurrentTabData = () => {
    return skillData[activeTab] || [];
  };

  useEffect(() => {
    if (skillProfiles && skillProfiles.length > 0) {
      const groupedSkills = {};
      const allSkills = [];

      skillProfiles.forEach((profile) => {
        const skillName = profile.skill;

        // Add to grouped skills
        if (!groupedSkills[skillName]) {
          groupedSkills[skillName] = [];
        }

        const processedProfile = {
          key: profile._id,
          subSkill: profile.subSkill,
          proficiency: formatProficiency(profile.selfAssessment),
          isValidated: profile.isValidated,
          certifications: profile.certifications?.length || 0,
          skillsExperience: profile.skillsExperience,
          rawAssessment: profile.selfAssessment,
        };

        groupedSkills[skillName].push(processedProfile);
        allSkills.push(processedProfile);
      });

      setSkillData({ all: allSkills, ...groupedSkills });
      setSkillTabs(Object.keys(groupedSkills));
    }
  }, [skillProfiles, formatProficiency]);
  useEffect(() => {
    dispatch(UserActions.getUserSkillProfiles());
  }, []);

  console.log("AssignedSkillsTable skillData", loading);
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
              onClick={() => navigate("/employee/skills-profile/validate")}
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
      {error && <FullAlertError error={error} />}
      <Tabs
        defaultActiveKey="all"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="nz-pink-tab"
      >
        <TabPane tab="All" key="all">
          <Table
            loading={loading}
            columns={columns}
            dataSource={getCurrentTabData()}
            pagination={false}
            className="assigned-skills-table"
            showHeader={true}
          />
        </TabPane>

        {skillTabs.map((skillName) => (
          <TabPane tab={skillName} key={skillName}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={skillData[skillName] || []}
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
