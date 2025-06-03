import ValidateSkillTable from "./ValidateSkillTable";
import Header from "@/components/common/Header";
import EmployeeSidebar from "../../layout/Sidebar";
import { Layout } from "antd";

const ValidateSkill = () => {
  return (
    <Layout>
      <EmployeeSidebar />
      <Layout>
        <Header breadcrumbPath="Skills Profile/Validate Skill" />
        <ValidateSkillTable />
      </Layout>
    </Layout>
  );
};

export default ValidateSkill;
