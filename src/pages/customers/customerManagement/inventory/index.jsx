import React from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import InventoryTable from "./components/InventoryTable";

const Inventory = () => {
  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management/Inventory" />
      <div style={{ padding: "24px" }}>
        <InventoryTable />
      </div>
    </CMLayout>
  );
};

export default Inventory;
