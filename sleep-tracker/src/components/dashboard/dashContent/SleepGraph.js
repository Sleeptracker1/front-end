import React, { useState, useEffect } from "react";
import { Distribution, Box, Grommet, Chart } from "grommet";
import ClockLoader from "react-spinners/ClockLoader";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { axiosWithAuth } from "./utils/axiosWithAuth";
export default function SleepGraph(props) {
  const [data, setData] = useState([
    { score: "", start_time: "", end_time: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("https://bw-ft-sleep-tracker-1.herokuapp.com/api/sleep/1")
      .then((res) => {
        console.log("res in sleep graph,", res);
        setData({
          score: res.data[2],
          start_time: res.data[3],
          end_time: res.data[4],
        });
      });
    setIsLoading(false);
  }, []);
  return (
    <Grommet>
      {isLoading ? <ClockLoader /> : null}
      <Box
        direction="column"
        pad="small"
        animation="slideLeft"
        background="light-2"
      >
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
          <CartesianGrid stroke="ccc" strokeDasharray="2 2" />
          <XAxis dataKey="start_time" />
          <YAxis dataKey="end_time" />
        </LineChart>

        <Box direction="column"></Box>
      </Box>
    </Grommet>
  );
}
