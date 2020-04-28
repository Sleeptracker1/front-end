import React, { useState, useEffect } from "react";
import { Distribution, Box, Grommet, Chart } from "grommet";
import ClockLoader from "react-spinners/ClockLoader";
import axiosWithAuth from "./utils/axiosWithAuth";
export default function SleepGraph() {
  const [data, setData] = useState({ sleepData: [], mode: "view" });
  useEffect(() => {
    // setIsLoading(true);
    //axiosWithAuth()
    //.get("")
    //.then((res) => {
    // console.log("res in sleep list,", res)
    // setData({sleepData: res.data, mode: 'view'})
    // setIsLoading(false)
    // })
  }, []);
  return (
    <Grommet>
      {/* <Chart type="line" values={[
    data.map((d => {
      
    }))
  ]}> */}

      {/* </Chart> */}
      <Box
        direction="column"
        pad="small"
        animation="slideLeft"
        background="light-2"
      >
        <Chart
          type="point"
          bounds={[
            [0, 4],
            [0, 24],
          ]}
          values={[
            { value: [7, 5], label: "4/20" },
            { value: [6, 7], label: "4/21" },
            { value: [5, 8], label: "4/22" },
            { value: [4, 10], label: "4/23" },
          ]}
          aria-label="chart"
        />
        <Box direction="column"></Box>
      </Box>
    </Grommet>
  );
}
