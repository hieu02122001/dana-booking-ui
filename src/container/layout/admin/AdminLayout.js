import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebarWithHeader from "./AdminSidebarWithHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-[100vh] h-[100vh] w-[100%] flex flex-col">
      <div className="w-[100%] h-[100%] overflow-y-auto">
        <AdminSidebarWithHeader></AdminSidebarWithHeader>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
