import React, { useEffect } from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import SkillTable from "./components/SkillTable";
import { useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch } from "react-redux";
import InventorySelectors from "@/redux/inventory/selectors";
import UserActions from "@/redux/user/actions";
import InventoryActions from "@/redux/inventory/actions";
import CustomerSelectors from "@/redux/customer/selectors";

const CXSkillArchitecture = () => {
  const dispatch = useDispatch();
  const users = useSelector(UserSelectors.getUsers);
  const inventories = useSelector(InventorySelectors.getInventories);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  useEffect(() => {
    if (!users && currentCustomer) {
      dispatch(
        UserActions.getUsers({
          customerId: currentCustomer?._id,
        })
      );
    }
    if (!inventories && currentCustomer) {
      dispatch(InventoryActions.getInventories());
    }
  }, [currentCustomer]);
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
