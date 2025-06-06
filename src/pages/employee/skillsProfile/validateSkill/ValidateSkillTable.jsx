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
  Badge,
  Tooltip,
  Upload,
  Modal,
  Card,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  UploadOutlined,
  FileTextOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";

const { Title, Text, Link } = Typography;
const { Option } = Select;

const commonInputStyle = {
  borderRadius: "6px",
  borderColor: "#D0D5DD",
  height: "36px",
  transition: "all 0.2s ease",
};

const commonCellTextStyle = {
  color: "#475467",
  fontSize: "14px",
  fontWeight: 500,
};

// Enhanced button styles

const containerStyle = {
  backgroundColor: "#fff",
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
  const dataSource = useSelector(UserSelectors.getUserSkillProfiles);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedSkillForUpload, setSelectedSkillForUpload] = useState(null);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedSkillForActivity, setSelectedSkillForActivity] =
    useState(null);
  const handleAssessmentChange = (key, value) => {
    // TODO: Implement assessment update logic
  };

  // eslint-disable-next-line no-unused-vars
  const handleExpChange = (key, type, value) => {
    // TODO: Implement experience update logic
  };

  const handleUploadCertification = (record) => {
    setSelectedSkillForUpload(record);
    setUploadModalVisible(true);
  };

  const handleViewActivity = (record) => {
    setSelectedSkillForActivity(record);
    setActivityModalVisible(true);
  };

  const handleUploadSubmit = (info) => {
    // Handle file upload logic here
    console.log("Upload info:", info);
    setUploadModalVisible(false);
    setSelectedSkillForUpload(null);
  };

  const getCertificationCount = (record) => {
    return record.certifications?.length || 0;
  };

  const renderCertificationUpload = () => (
    <Upload
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      beforeUpload={() => false} // Prevent auto upload
      multiple
      style={{ width: "100%" }}
    >
      <Button
        type="dashed"
        icon={<UploadOutlined style={{ fontSize: "16px" }} />}
        style={{
          width: "100%",
          height: "80px",
          borderColor: "#7F56D9",
          color: "#7F56D9",
          backgroundColor: "#FAFAFA",
          borderRadius: "8px",
          borderWidth: "2px",
          borderStyle: "dashed",
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#F9F5FF";
          e.target.style.borderColor = "#6941C6";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 6px rgba(127, 86, 217, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#FAFAFA";
          e.target.style.borderColor = "#7F56D9";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 1px 2px rgba(16, 24, 40, 0.05)";
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 600 }}>
            Upload Files
          </span>
          <span style={{ fontSize: "12px", color: "#667085", fontWeight: 400 }}>
            Drag & drop or click to browse
          </span>
        </div>
      </Button>
    </Upload>
  );

  const columns = [
    {
      title: <Text>Sub-Skills</Text>,
      dataIndex: "subSkill",
      key: "subSkill",
      width: "25%",
      render: (text) => <Text style={commonCellTextStyle}>{text}</Text>,
    },
    {
      title: <Text>Self Assessment</Text>,
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
      title: <Text>Skills Experience</Text>,
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
      title: <Text>Certifications</Text>,
      dataIndex: "certifications",
      key: "certifications",
      width: "15%",
      align: "center",
      render: (text, record) => {
        const certCount = getCertificationCount(record);
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div style={{ position: "relative" }}>0</div>
            <Tooltip
              title="Upload certification documents"
              placement="top"
              overlayStyle={{ fontSize: "12px" }}
            >
              <Button
                type="link"
                icon={<UploadOutlined style={{ fontSize: "14px" }} />}
                size="small"
                onClick={() => handleUploadCertification(record)}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: <Text>Quick Access</Text>,
      key: "quickAccess",
      width: "20%",
      align: "center",
      render: (_, record) => (
        <Space size="medium">
          <Tooltip
            title="View skill activity and progress"
            placement="top"
            overlayStyle={{ fontSize: "12px" }}
          >
            <Button
              type="link"
              icon={<EyeOutlined style={{ fontSize: "14px" }} />}
              size="small"
              onClick={() => handleViewActivity(record)}
            >
              View
            </Button>
          </Tooltip>
          <Tooltip
            title="Edit skill details"
            placement="top"
            overlayStyle={{ fontSize: "12px" }}
          >
            <Button
              type="link"
              icon={<EditOutlined style={{ fontSize: "14px" }} />}
              size="small"
            >
              Edit
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={containerStyle}>
      <Row justify="space-between" align="middle" style={{ padding: "24px" }}>
        <Col>
          <Title
            level={4}
            style={{
              margin: 0,
              color: "#101828",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "30px",
            }}
          >
            Assigned Skills
          </Title>
        </Col>
        <Col>
          <Space size="medium">
            <Input
              placeholder="Search skills..."
              prefix={<SearchOutlined style={{ color: "#667085" }} />}
              style={{
                ...commonInputStyle,
                width: 280,
                backgroundColor: "#FFFFFF",
                borderColor: "#D0D5DD",
                fontSize: "14px",
              }}
            />
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#344054",
                borderColor: "#D0D5DD",
                fontWeight: 600,
                borderRadius: "8px",
                height: "40px",
                padding: "0 20px",
                fontSize: "14px",
                boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                transition: "all 0.2s ease",
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
                borderRadius: "8px",
                height: "40px",
                padding: "0 20px",
                fontSize: "14px",
                boxShadow: "0 1px 2px rgba(127, 86, 217, 0.1)",
                transition: "all 0.2s ease",
              }}
            >
              Save Changes
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
      />

      {/* Certification Upload Modal */}
      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "4px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#F9F5FF",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileTextOutlined
                style={{ color: "#7F56D9", fontSize: "16px" }}
              />
            </div>
            <div>
              <div
                style={{ fontSize: "18px", fontWeight: 600, color: "#101828" }}
              >
                Upload Certifications
              </div>
              <div
                style={{ fontSize: "14px", color: "#667085", marginTop: "2px" }}
              >
                {selectedSkillForUpload?.subSkill}
              </div>
            </div>
          </div>
        }
        open={uploadModalVisible}
        onCancel={() => {
          setUploadModalVisible(false);
          setSelectedSkillForUpload(null);
        }}
        style={{ top: "20px" }}
        bodyStyle={{
          padding: "32px",
          backgroundColor: "#FAFAFA",
          borderRadius: "8px",
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setUploadModalVisible(false);
              setSelectedSkillForUpload(null);
            }}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#344054",
              borderColor: "#D0D5DD",
              fontWeight: 500,
              borderRadius: "8px",
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
              transition: "all 0.2s ease",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={handleUploadSubmit}
            style={{
              backgroundColor: "#7F56D9",
              borderColor: "#7F56D9",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: "8px",
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              boxShadow: "0 1px 2px rgba(127, 86, 217, 0.1)",
              transition: "all 0.2s ease",
            }}
          >
            Upload & Save
          </Button>,
        ]}
        width={600}
      >
        <div style={{ padding: "20px 0" }}>
          <div
            style={{
              backgroundColor: "#F8F9FA",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #E9ECEF",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{
                color: "#475467",
                marginBottom: "16px",
                display: "block",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Upload certification documents for this skill. Supported formats:
              <strong> PDF, DOC, DOCX, JPG, PNG</strong>
            </Text>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "16px",
                borderRadius: "6px",
                border: "2px dashed #D0D5DD",
                textAlign: "center",
              }}
            >
              {renderCertificationUpload()}
            </div>
          </div>

          {/* Show existing certifications if any */}
          {selectedSkillForUpload?.certifications?.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <Text
                strong
                style={{
                  marginBottom: "16px",
                  display: "block",
                  fontSize: "16px",
                  color: "#101828",
                  fontWeight: 600,
                }}
              >
                Existing Certifications:
              </Text>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="medium"
              >
                {selectedSkillForUpload.certifications.map((cert, index) => (
                  <Card
                    key={index}
                    size="small"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EAECF0",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                    }}
                    bodyStyle={{ padding: "16px" }}
                    actions={[
                      <Tooltip title="Download certificate">
                        <Button
                          type="text"
                          icon={<DownloadOutlined />}
                          style={{
                            color: "#7F56D9",
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Tooltip>,
                      <Tooltip title="Delete certificate">
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          style={{
                            color: "#EF4444",
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <div
                          style={{
                            backgroundColor: "#F9F5FF",
                            padding: "8px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileTextOutlined
                            style={{ color: "#7F56D9", fontSize: "16px" }}
                          />
                        </div>
                      }
                      title={
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#101828",
                          }}
                        >
                          {cert.fileName}
                        </span>
                      }
                      description={
                        <span style={{ fontSize: "12px", color: "#667085" }}>
                          Uploaded:{" "}
                          {new Date(cert.uploadDate).toLocaleDateString()}
                        </span>
                      }
                    />
                  </Card>
                ))}
              </Space>
            </div>
          )}
        </div>
      </Modal>

      {/* Activity Modal */}
      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "4px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#F9F5FF",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EyeOutlined style={{ color: "#7F56D9", fontSize: "16px" }} />
            </div>
            <div>
              <div
                style={{ fontSize: "18px", fontWeight: 600, color: "#101828" }}
              >
                Skill Activity
              </div>
              <div
                style={{ fontSize: "14px", color: "#667085", marginTop: "2px" }}
              >
                {selectedSkillForActivity?.subSkill}
              </div>
            </div>
          </div>
        }
        open={activityModalVisible}
        onCancel={() => {
          setActivityModalVisible(false);
          setSelectedSkillForActivity(null);
        }}
        style={{ top: "20px" }}
        bodyStyle={{
          padding: "32px",
          backgroundColor: "#FAFAFA",
          borderRadius: "8px",
        }}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => {
              setActivityModalVisible(false);
              setSelectedSkillForActivity(null);
            }}
            style={{
              backgroundColor: "#7F56D9",
              borderColor: "#7F56D9",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: "8px",
              height: "40px",
              padding: "0 24px",
              fontSize: "14px",
              boxShadow: "0 1px 2px rgba(127, 86, 217, 0.1)",
              transition: "all 0.2s ease",
            }}
          >
            Close
          </Button>,
        ]}
        width={720}
      >
        <div style={{ padding: "20px 0" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Card
              title={
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#101828",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#EEF2FF",
                      padding: "4px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileTextOutlined
                      style={{ color: "#6366F1", fontSize: "14px" }}
                    />
                  </div>
                  Current Status
                </span>
              }
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <Row gutter={[24, 16]}>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Text
                      strong
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Self Assessment
                    </Text>
                    <Badge
                      status={
                        selectedSkillForActivity?.selfAssessment
                          ? "success"
                          : "default"
                      }
                      text={
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: selectedSkillForActivity?.selfAssessment
                              ? "#059669"
                              : "#6B7280",
                          }}
                        >
                          {selectedSkillForActivity?.selfAssessment ||
                            "Not set"}
                        </span>
                      }
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Text
                      strong
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Experience
                    </Text>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#101828",
                      }}
                    >
                      {selectedSkillForActivity?.skillsExperience?.years || 0}Y{" "}
                      {selectedSkillForActivity?.skillsExperience?.months || 0}M
                    </Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Text
                      strong
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Validation Status
                    </Text>
                    <Badge
                      status={
                        selectedSkillForActivity?.isValidated
                          ? "success"
                          : "warning"
                      }
                      text={
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: selectedSkillForActivity?.isValidated
                              ? "#059669"
                              : "#D97706",
                          }}
                        >
                          {selectedSkillForActivity?.isValidated
                            ? "Validated"
                            : "Pending"}
                        </span>
                      }
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>

            <Card
              title={
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#101828",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#FEF3C7",
                      padding: "4px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EyeOutlined
                      style={{ color: "#F59E0B", fontSize: "14px" }}
                    />
                  </div>
                  Recent Activities
                </span>
              }
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="medium"
              >
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Text
                    style={{
                      color: "#475569",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#10B981",
                        borderRadius: "50%",
                      }}
                    ></div>
                    Skill added to profile - {new Date().toLocaleDateString()}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Text
                    style={{
                      color: "#475569",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#3B82F6",
                        borderRadius: "50%",
                      }}
                    ></div>
                    Self assessment updated - {new Date().toLocaleDateString()}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Text
                    style={{
                      color: "#475569",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#8B5CF6",
                        borderRadius: "50%",
                      }}
                    ></div>
                    Certification uploaded - {new Date().toLocaleDateString()}
                  </Text>
                </div>
              </Space>
            </Card>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default ValidateSkillTable;
