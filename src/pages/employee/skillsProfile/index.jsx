import AssignedSkillsTable from "./AssignedSkillsTable";
import Header from "@/components/common/Header";
import EmployeeSidebar from "../layout/Sidebar";
import { Layout } from "antd";

const EmployeeSkillsProfile = () => {
  return (
    <Layout>
      <EmployeeSidebar />
      <Layout>
        <Header breadcrumbPath="Skills Profile" />
        <AssignedSkillsTable />
      </Layout>
    </Layout>
  );
};

export default EmployeeSkillsProfile;
