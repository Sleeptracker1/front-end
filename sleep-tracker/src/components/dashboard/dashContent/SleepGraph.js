import React, { useState, useEffect } from "react";
import { Distribution, Box, Grommet, Chart } from "grommet";
import ClockLoader from "react-spinners/ClockLoader";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import moment from "moment";
export default function SleepGraph(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("api/sleep/")
      .then((res) => {
        console.log("res in sleep graph,", res);
        setData(res.data);
      });
    setIsLoading(false);
  }, []);

  const graphData = data.map((result) => {
    const diff2 = moment(result.end_time).diff(moment(result.start_time));
    const diffDuration = moment.duration(diff2);
    console.log("res in sleep graph map", result);
    const start_date = moment(result.start_time).format("MMM Do");
    const time_slept = diffDuration.hours();
    const dataFromGraphData = {
      start_date,
      time_slept,
    };
    return dataFromGraphData;
  });

  return (
    <Grommet>
      {isLoading ? <ClockLoader /> : null}
      {console.log("graphdata", graphData)}
      <Box
        direction="column"
        pad="small"
        animation="slideLeft"
        background="light-2"
      >
        <LineChart
          width={1200}
          height={600}
          data={graphData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="time_slept" stroke="red" />
          <CartesianGrid stroke="ccc" strokeDasharray="2 2" />
          <XAxis dataKey="start_date" interval={2} />
          <YAxis dataKey="time_slept" />
        </LineChart>

        <Box direction="column"></Box>
      </Box>
    </Grommet>
  );
}
