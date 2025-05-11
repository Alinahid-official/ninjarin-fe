import React from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import { Flex } from "antd";
import SkillTable from "./components/SkillTable";

const CXSkillArchitecture = () => {
  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management/CX Skill Architecture" />
      <div style={{ padding: "24px" }}>
        <SkillTable />
      </div>
    </CMLayout>
  );
};

export default CXSkillArchitecture;
