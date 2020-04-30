import React, { useEffect } from "react";
import { connect } from "react-redux";
import DashSidebar from "./dashSidebar/dashSidebar";
import DashContent from "./dashContent/dashContent";

import { getLogs } from "../../redux/actions/sleepLogActions";
const DashContainer = ({ getLogs }) => {
  useEffect(() => {
    getLogs();
  },[]);
  return (
    <div className="dashboard-container">
      <DashSidebar />
      <DashContent />
    </div>
  );
};
const actions = {
  getLogs,
};
export default connect(null, actions)(DashContainer);
