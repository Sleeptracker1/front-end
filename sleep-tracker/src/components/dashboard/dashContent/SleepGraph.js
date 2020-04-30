import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Layer,
} from "grommet";

import ClockLoader from "react-spinners/ClockLoader";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import moment from "moment";

export default function SleepGraph(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState();
  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("api/sleep/")
      .then((res) => {
        setData(res.data);
      });
    setIsLoading(false);
  }, []);

  const graphData = data.map((result) => {
    const diff2 = moment(result.end_time).diff(moment(result.start_time));
    const diffDuration = moment.duration(diff2);
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
      <Box
        id="boxForGraphAndTable"
        direction="column"
        pad="small"
        animation="slideLeft"
        background="white"
      >
        <AreaChart
          width={800}
          height={400}
          data={graphData}
          margin={{
            top: 10,
            right: 35,
            left: 0,
            bottom: 0,
          }}
        >
          <Area
            type="monotone"
            dataKey="time_slept"
            stroke="navy"
            fill="blue"
          />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="start_date" interval={1} />
          <Tooltip />

          <YAxis dataKey="time_slept" />
        </AreaChart>
        {/* <Box>
          <Button
            label="show legend"
            alignSelf="start"
            size="small"
            onClick={() => setShow(true)}
          />
          {show && (
            <Layer
              onEsc={() => setShow(false)}
              onClickOutside={() => setShow(false)}
            >
              <Box>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell
                        scope="col"
                        border="bottom"
                        style={{ textAlign: "center" }}
                      >
                        Legend
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>X Axis:</strong>
                      </TableCell>
                      <TableCell> start Date</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>Y Axis:</strong>
                      </TableCell>
                      <TableCell>Time Slept</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>Data:</strong>
                      </TableCell>
                      <TableCell> Time Slept</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Button label="close" onClick={() => setShow(false)} />
            </Layer>
          )}
        </Box> */}

        <Box direction="column"></Box>
      </Box>
    </Grommet>
  );
}
