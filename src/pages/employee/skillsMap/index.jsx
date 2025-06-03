import { Layout } from "antd";
import EmployeeSidebar from "../layout/Sidebar";
import MainHeader from "@/components/common/Header";

const EmployeeSkillsMap = () => {
  return (
    <Layout>
      <EmployeeSidebar />
      <Layout>
        <MainHeader breadcrumbPath="Skills Map" />
        <div>Skills Map</div>
      </Layout>
    </Layout>
  );
};

export default EmployeeSkillsMap;
