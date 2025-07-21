import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Components/DashboardSidebar";
const index = () => {
  return (
    <div className="w-full overflow-hidden h-full flex">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default index;
