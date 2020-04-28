import React from "react";
import SleepGraph from "./SleepGraph";
import SleepList from "./SleepList";
import { Distribution, Grommet } from "grommet";
export default function sleepDisplay() {
  return (
    <>
      <SleepGraph />
      <SleepList />
    </>
  );
}
