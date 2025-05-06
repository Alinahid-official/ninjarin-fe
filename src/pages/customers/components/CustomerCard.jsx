import React from "react";
import { Card, Button, Flex, Collapse, Popconfirm } from "antd";
import { GoPencil } from "react-icons/go";
import { DeleteOutlined } from "@ant-design/icons";

const CustomerCard = ({ customer, onEdit, onDelete }) => {
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

  const projectsPanel = [
    {
      key: "1",
      label: (
        <span style={{ color: "#1677ff" }}>
          Projects{" "}
          <span
            style={{
              background: "#f5f5f5",
              padding: "2px 8px",
              borderRadius: 12,
              marginLeft: 8,
            }}
          >
            {customer.projects.length}
          </span>
        </span>
      ),
      children: (
        <div>
          {customer.projects.map((project, index) => (
            <div key={index} style={{ color: "#1677ff", marginBottom: 4 }}>
              {project.name}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Card
      style={{
        width: "350px",
        borderRadius: 12,
        overflow: "hidden",
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          padding: 16,
        }}
      >
        <Flex align="center" gap={12}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {customer.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 500 }}>{customer.name}</div>
            <div style={{ color: "#757575" }}>{customer.industry}</div>
          </div>
        </Flex>
        <Flex gap={8}>
          <Button
            type="text"
            icon={<GoPencil />}
            onClick={() => onEdit(customer)}
            style={{ color: "#1677ff" }}
          />
          <Popconfirm
            title="Delete Customer"
            description="Are you sure you want to delete this customer?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(customer)}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "#1677ff" }}
            />
          </Popconfirm>
        </Flex>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Flex wrap="wrap" gap={8}>
          {customer.projects.slice(0, 3).map((project) => (
            <span
              key={project.projectType}
              style={{
                padding: "4px 12px",
                borderRadius: 16,
                ...getTypeColor(project.projectType),
              }}
            >
              {project.projectType}
            </span>
          ))}
        </Flex>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Collapse
          className="nz-border nz-border-horizontal"
          ghost
          items={projectsPanel}
          expandIconPosition="end"
        />
      </div>

      <div
        style={{
          padding: 16,
        }}
      >
        <div style={{ color: "#757575", marginBottom: 4 }}>CX Admin</div>
        <div style={{ fontWeight: 500 }}>{customer.cxAdmin}</div>
        <div style={{ color: "#757575", fontSize: 12 }}>
          {customer.adminEmail || "admin@gmail.com"}
        </div>
      </div>
    </Card>
  );
};

export default CustomerCard;
