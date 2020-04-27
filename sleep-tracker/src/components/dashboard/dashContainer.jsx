import React from "react";
import DashSidebar from "./dashSidebar/dashSidebar";
import DashContent from "./dashContent/dashContent";

const DashContainer = () => {
  return (
    <div className="dashboard-container">
      <DashSidebar />
      <DashContent />
    </div>
  );
};
export default DashContainer;
