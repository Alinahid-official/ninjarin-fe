import React, { useEffect } from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import { Flex } from "antd";
import SkillTable from "./components/SkillTable";
import { useDispatch } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import SkillArchitectureActions from "@/redux/skillArchitecture/actions";
import { useSelector } from "react-redux";

const CXSkillArchitecture = () => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  console.log("currentCustomer", currentCustomer);
  useEffect(() => {
    if (currentCustomer) {
      dispatch(SkillArchitectureActions.getLabels(currentCustomer._id));
    }
  }, []);
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
