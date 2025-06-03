import React, { useState } from "react";
import {
  Table,
  Typography,
  Input,
  Button,
  Row,
  Col,
  Space,
  Select,
  InputNumber,
} from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;
const { Option } = Select;

const commonInputStyle = {
  borderRadius: "6px",
  borderColor: "#D0D5DD",
  height: "36px",
};

const commonHeaderTextStyle = {
  color: "#475467", //  Medium dark gray for header text
  fontWeight: 600,
  fontSize: "12px",
};

const commonCellTextStyle = {
  color: "#475467", //  Medium dark gray for cell text
  fontSize: "14px",
};

const proficiencyLevels = [
  { value: "not_applicable", label: "Not Applicable" },
  { value: "1_basic", label: "1 - Basic" },
  { value: "2_intermediate", label: "2 - Intermediate" },
  { value: "3_proficient", label: "3 - Proficient" },
  { value: "4_advanced", label: "4 - Advanced" },
  { value: "5_mastery", label: "5 - Mastery" },
];

const ValidateSkillTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      subSkill: "REST API",
      selfAssessment: "select",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "2",
      subSkill: "GraphQL",
      selfAssessment: "not_applicable",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "3",
      subSkill: "Docker",
      selfAssessment: "1_basic",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "4",
      subSkill: "Kubernetes",
      selfAssessment: "2_intermediate",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "5",
      subSkill: "Microservices",
      selfAssessment: "3_proficient",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "6",
      subSkill: "Agile Development",
      selfAssessment: "4_advanced",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "7",
      subSkill: "Version Control (Git)",
      selfAssessment: "5_mastery",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "8",
      subSkill: "Unit Testing",
      selfAssessment: "not_applicable",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "9",
      subSkill: "Continuous Integration/Continuous Deployment (CI/CD)",
      selfAssessment: "5_mastery",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "10",
      subSkill: "Cloud Computing (AWS, Azure, GCP)",
      selfAssessment: "1_basic",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "11",
      subSkill: "Frontend Frameworks (React, Angular, Vue)",
      selfAssessment: "4_advanced",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
    {
      key: "12",
      subSkill: "Backend Frameworks (Node.js, Django, Spring)",
      selfAssessment: "select",
      expYY: null,
      expMM: null,
      certifications: 1,
    },
  ]);

  const handleAssessmentChange = (key, value) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, selfAssessment: value } : item
      )
    );
  };

  const handleExpChange = (key, type, value) => {
    setDataSource((prev) =>
      prev.map((item) => (item.key === key ? { ...item, [type]: value } : item))
    );
  };

  const handleCertChange = (key, value) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, certifications: value } : item
      )
    );
  };

  const columns = [
    {
      title: <Text style={commonHeaderTextStyle}>Sub-Skills</Text>,
      dataIndex: "subSkill",
      key: "subSkill",
      width: "25%",
      render: (text) => <Text style={commonCellTextStyle}>{text}</Text>,
    },
    {
      title: <Text style={commonHeaderTextStyle}>Self Assessment</Text>,
      dataIndex: "selfAssessment",
      key: "selfAssessment",
      width: "20%",
      render: (text, record) => (
        <Select
          value={
            record.selfAssessment === "select"
              ? undefined
              : record.selfAssessment
          }
          placeholder="Select"
          style={{ width: "100%", ...commonInputStyle }}
          onChange={(value) => handleAssessmentChange(record.key, value)}
        >
          {record.selfAssessment === "select" && (
            <Option key="select_placeholder" value="select" disabled>
              Select
            </Option>
          )}
          {proficiencyLevels.map((level) => (
            <Option key={level.value} value={level.value}>
              {level.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: <Text style={commonHeaderTextStyle}>Skills Experience</Text>,
      key: "skillsExperience",
      width: "20%",
      render: (text, record) => (
        <Space>
          <InputNumber
            placeholder="YY"
            style={{ ...commonInputStyle, width: "70px" }}
            min={0}
            max={50}
            value={record.expYY}
            onChange={(value) => handleExpChange(record.key, "expYY", value)}
          />
          <InputNumber
            placeholder="MM"
            style={{ ...commonInputStyle, width: "70px" }}
            min={0}
            max={11}
            value={record.expMM}
            onChange={(value) => handleExpChange(record.key, "expMM", value)}
          />
        </Space>
      ),
    },
    {
      title: <Text style={commonHeaderTextStyle}>Certifications</Text>,
      dataIndex: "certifications",
      key: "certifications",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <InputNumber
          style={{ ...commonInputStyle, width: "60px", textAlign: "center" }}
          min={0}
          value={record.certifications}
          onChange={(value) => handleCertChange(record.key, value)}
        />
      ),
    },
    {
      title: <Text style={commonHeaderTextStyle}>Quick Access</Text>,
      key: "quickAccess",
      width: "20%",
      align: "center",
      render: () => (
        <Link
          href="#"
          style={{
            color: "#7F56D9",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EyeOutlined style={{ marginRight: "8px" }} />
          View all activity
        </Link>
      ),
    },
  ];

  return (
    <div
      style={{ padding: "24px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
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
              placeholder="Search"
              prefix={<SearchOutlined style={{ color: "#667085" }} />}
              style={{
                ...commonInputStyle,
                width: 280,
                backgroundColor: "#FFFFFF",
              }}
            />
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#344054",
                borderColor: "#D0D5DD",
                fontWeight: 600,
                borderRadius: "6px",
                height: "36px",
                padding: "0 16px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#7F56D9",
                borderColor: "#7F56D9",
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: "6px",
                height: "36px",
                padding: "0 16px",
              }}
            >
              Save
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
        rowKey="key"
        components={{
          header: {
            row: (props) => (
              <tr
                {...props}
                style={{ ...props.style, backgroundColor: "#F9FAFB" }}
              />
            ),
            cell: (props) => (
              <th
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: "transparent",
                  padding: "12px 16px",
                  borderBottom: "1px solid #EAECF0",
                  textAlign: props.align || "left",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  ...props.style,
                  padding: "16px",
                  borderBottom: "1px solid #EAECF0",
                  verticalAlign: "middle",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default ValidateSkillTable;
