import React from "react";
import { Switch } from "react-router-dom";
import SleepList from "./SleepList";
import SleepGraph from "./SleepGraph";

const DashContent = () => {
  return (
    <div className="content-container">
      <SleepGraph />
      <SleepList />
      <Switch></Switch>
    </div>
  );
};

export default DashContent;
