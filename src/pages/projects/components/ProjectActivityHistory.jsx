import React, { useState } from "react";
import {
  Typography,
  Space,
  Tag,
  Avatar,
  Tabs,
  Flex,
  Descriptions,
  Input,
  Button,
} from "antd";
import { CopyOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatToMonthDayYear } from "@/utilities/time";

const { Text } = Typography;

const ActivityItem = ({ stage, date, description }) => (
  <div
    style={{
      padding: "16px",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "16px",
      border: "1px solid #f0f0f0",
    }}
  >
    <Flex vertical gap="small">
      <Flex justify="space-between">
        <Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>{stage}</Text>
        <Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>{date}</Text>
      </Flex>
      <Text>{description}</Text>
    </Flex>
  </div>
);

const ProjectActivityHistory = ({ project }) => {
  const [note, setNote] = useState("");
  const {
    name,
    organization,
    projectType,
    projectStage,
    dueDate,
    startDate,
    programManager,
    cxOwner,
    email,
  } = project;

  const activityHistory = [
    {
      stage: "Consulting",
      date: "1 Jul 2024 at 2:23 PM",
      description:
        "Project has successfully transitioned from the consulting to the design stage",
    },
    {
      stage: "Design",
      date: "1 Jul 2024 at 2:23 PM",
      description:
        "Project has successfully transitioned from the design to the delivered stage",
    },
  ];

  const items = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <Descriptions
          column={2}
          layout="vertical"
          style={{ width: "100%", fontWeight: 600, color: "#000" }}
          styles={{
            label: {
              color: "rgba(0, 0, 0, 0.45)",
              fontWeight: 500,
            },
            content: {
              textAlign: "right",
            },
          }}
        >
          <Descriptions.Item label="Organization">
            {organization}
          </Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {formatToMonthDayYear(dueDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Project Type">
            {projectType}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {formatToMonthDayYear(startDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Program Manager">
            <Flex vertical align="end">
              <Text>{programManager}</Text>
              <Text type="secondary">{email}</Text>
            </Flex>
          </Descriptions.Item>
          <Descriptions.Item label="CX Owner">
            <Flex vertical align="end">
              <Text>{cxOwner}</Text>
              <Text type="secondary">{email}</Text>
            </Flex>
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "activity",
      label: "Activity History",
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          {activityHistory.map((activity, index) => (
            <ActivityItem
              key={index}
              stage={activity.stage}
              date={activity.date}
              description={activity.description}
            />
          ))}
        </Space>
      ),
    },
    {
      key: "notes",
      label: "Notes",
      children: (
        <Space
          direction="vertical"
          style={{ width: "100%", maxHeight: "300px", overflow: "auto" }}
          size="large"
        >
          <Input.TextArea
            placeholder="Write a note here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              borderRadius: "8px",
              resize: "none",
              marginBottom: "16px",
            }}
            rows={4}
          />
          <Button
            onClick={() => {}}
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "4px",
              color: "rgba(0, 0, 0, 0.65)",
              fontWeight: "normal",
            }}
          >
            Create Notes
          </Button>

          <Space direction="vertical" style={{ width: "100%" }}>
            {[
              {
                text: "Project has successfully transitioned from the consulting to the design stage",
                date: "1 Jul 2024 at 2:23 PM",
              },
              {
                text: "Project has successfully transitioned from the consulting to the design stage",
                date: "1 Jul 2024 at 2:23 PM",
              },
            ].map((note, index) => (
              <div
                key={index}
                style={{
                  padding: "16px",
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0",
                }}
              >
                <Flex vertical gap="small">
                  <Text>{note.text}</Text>
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 0.45)",
                      fontSize: "12px",
                      textAlign: "right",
                    }}
                  >
                    {note.date}
                  </Text>
                </Flex>
              </div>
            ))}
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Flex gap="middle" align="center" style={{ marginBottom: "24px" }}>
        <Avatar
          size={64}
          style={{ backgroundColor: "#f5f5f5" }}
          icon={<CopyOutlined />}
        />
        <Flex vertical>
          <Text strong style={{ fontSize: "18px", marginBottom: "4px" }}>
            {name}
          </Text>
          <Text type="secondary">Technology</Text>
        </Flex>
        <Tag
          style={{
            marginLeft: "auto",
            background: "#f6ffed",
            color: "#52c41a",
            border: "none",
            borderRadius: "16px",
            padding: "4px 12px",
          }}
        >
          {projectStage}
        </Tag>
      </Flex>

      <Flex gap={8} style={{ marginBottom: "24px" }} justify="flex-end">
        <Avatar
          size="medium"
          style={{
            backgroundColor: "#2950DA1A",
            color: "#2950DA",
            cursor: "pointer",
            border: "1px solid #2950DA",
          }}
          icon={<CopyOutlined />}
        />
        <Avatar
          size="medium"
          style={{
            backgroundColor: "#2950DA1A",
            color: "#2950DA",
            cursor: "pointer",
            border: "1px solid #2950DA",
          }}
          icon={<EditOutlined />}
        />
        <Avatar
          size="medium"
          style={{
            backgroundColor: "#2950DA1A",
            color: "#2950DA",
            cursor: "pointer",
            border: "1px solid #2950DA",
          }}
          icon={<DeleteOutlined />}
        />
      </Flex>

      <Tabs
        defaultActiveKey="overview"
        items={items}
        style={{
          marginTop: "24px",
        }}
      />
    </div>
  );
};

export default ProjectActivityHistory;
