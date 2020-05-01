import React from "react";
import SleepList from "./SleepList";
import SleepGraph from "./SleepGraph";

const DashContent = () => {
  return (
    <div className="content-container">
      <SleepGraph />
      <SleepList />
    </div>
  );
};

export default DashContent;
