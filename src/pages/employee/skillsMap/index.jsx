import { Layout } from "antd";
import EmployeeSidebar from "../layout/Sidebar";
import MainHeader from "@/components/common/Header";
import SkillTable from "@/pages/customers/customerManagement/CXSkillArchitecture/components/SkillTable";

const EmployeeSkillsMap = () => {
  return (
    <Layout>
      <EmployeeSidebar />
      <Layout>
        <MainHeader breadcrumbPath="Skills Map" />
        <div style={{ padding: "24px", backgroundColor: "#fff" }}>
          <SkillTable isEmployee />
        </div>
      </Layout>
    </Layout>
  );
};

export default EmployeeSkillsMap;
