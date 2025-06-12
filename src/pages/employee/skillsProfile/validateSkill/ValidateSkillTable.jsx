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
  Form,
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
import EditableSkillField from "./EditableSkillField";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleEditClick = (record) => {
    setSelectedSkill(record);
    form.setFieldsValue({
      selfAssessment:
        record.selfAssessment !== "select" ? record.selfAssessment : undefined,
      years: record.skillsExperience?.years,
      months: record.skillsExperience?.months,
    });
    setFileList(record.certifications || []);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = (values) => {
    const updatedSkillData = {
      ...selectedSkill, // Preserve other skill data like _id
      ...values, // Form values: selfAssessment, years, months
      certifications: fileList, // Updated certifications
      // Reconstruct skillsExperience object if your backend expects it structured
      skillsExperience: {
        years: values.years,
        months: values.months,
      },
    };
    console.log("Updated Skill Data:", updatedSkillData);
    // TODO: Dispatch update action with updatedSkillData
    handleModalClose();
  };

  // eslint-disable-next-line no-unused-vars
  const handleExpChange = (key, type, value) => {
    // TODO: Implement experience update logic
  };

  const handleUploadCertification = (record) => {};

  const handleViewActivity = (record) => {};

  const getCertificationCount = (record) => {
    return record.certifications?.length || 0;
  };

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
        <EditableSkillField
          name={"selfAssessment"}
          value={text}
          placeholder="Select"
          skillId={record._id}
        />
      ),
    },
    {
      title: <Text>Skills Experience</Text>,
      key: "skillsExperience",
      width: "20%",
      render: (text, record) => (
        <Space>
          <EditableSkillField
            name={"skillsExperience.years"}
            value={record.skillsExperience?.years}
            placeholder="YY"
            skillId={record._id}
          />

          <EditableSkillField
            name={"skillsExperience.months"}
            value={record.skillsExperience?.months}
            placeholder="MM"
            skillId={record._id}
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
              onClick={() => handleEditClick(record)}
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
        rowKey="_id" // Assuming _id is the unique key for skills
      />
      <Modal
        title={selectedSkill ? selectedSkill.subSkill : "Edit Skill"}
        visible={isModalOpen}
        onCancel={handleModalClose}
        destroyOnClose
        width={450}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        {selectedSkill && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                // Initial values are now set via form.setFieldsValue in handleEditClick
              }
            }
          >
            <Form.Item
              label="Self Assessment"
              name="selfAssessment"
              rules={[
                { required: true, message: "Self Assessment is required" },
              ]}
            >
              <Select
                placeholder="Select proficiency level"
                style={{ width: "100%", ...commonInputStyle }}
                options={proficiencyLevels}
              />
            </Form.Item>

            <Form.Item label="Skills Experience">
              <Space align="baseline">
                <Form.Item
                  name="years"
                  rules={[
                    {
                      required: true,
                      message: "Years of experience is required",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber
                    placeholder="00"
                    style={{ ...commonInputStyle, width: "80px" }}
                    min={0}
                  />
                </Form.Item>
                <Text
                  style={{
                    margin: "0 8px",
                    fontSize: "14px",
                    color: "#475467",
                  }}
                >
                  /
                </Text>
                <Form.Item
                  name="months"
                  rules={[
                    {
                      required: true,
                      message: "Months of experience is required",
                    },
                    {
                      type: "number",
                      min: 0,
                      max: 11,
                      message: "Months must be between 0 and 11",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber
                    placeholder="00"
                    style={{ ...commonInputStyle, width: "80px" }}
                    min={0}
                    max={11}
                  />
                </Form.Item>
              </Space>
            </Form.Item>

            <Form.Item label="Certification">
              <Upload
                style={{ width: "100%" }}
                fileList={fileList}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                beforeUpload={(file) => {
                  return false; // Prevent antd's default upload behavior
                }}
                onRemove={(file) => {
                  setFileList((currentFileList) =>
                    currentFileList.filter((item) => item.uid !== file.uid)
                  );
                }}
                multiple
                listType="text"
              >
                <div
                  style={{
                    border: "2px dashed #D6BBFA",
                    backgroundColor: "#F9F5FF",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "8px",
                    width: "100%",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UploadOutlined style={{ fontSize: "18px", color: "#000" }} />
                  <Text
                    style={{
                      marginTop: "8px",
                      color: "#000",
                      fontWeight: 500,
                    }}
                  >
                    Upload
                  </Text>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ValidateSkillTable;
