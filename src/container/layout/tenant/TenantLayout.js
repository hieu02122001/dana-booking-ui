import React from "react";
import { Outlet } from "react-router-dom";
import TenantHeader from "./TenantHeader";

const TenantLayout = () => {
  return (
    <div className="min-h-[100vh] h-[100vh] w-[100%] flex flex-col">
      <div className="w-[100%] h-[100%] overflow-y-auto">
        <TenantHeader></TenantHeader>
        <Outlet />
      </div>
    </div>
  );
};

export default TenantLayout;
