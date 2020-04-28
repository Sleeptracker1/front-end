import React, { useState, useEffect } from "react";
import { Box, FormField, Form, Grommet } from "grommet";
import moment from "moment";

//import axiosWithAuth

export default function SleepList(props) {
  const [dateTime, setDateTime] = useState({
    Date: "",
    StartTime: "",
    EndTime: "",
    Score: [],
  });
  function difference(StartTime, EndTime) {
    var start = moment(StartTime, "HH:mm");
    console.log("difference", StartTime, EndTime);
    var end = moment(EndTime, "HH:mm");
    if (end.isBefore(start)) end.add(1, "day");

    function diff(start, end) {
      var diff = moment.duration(end.diff(start));
      var res = moment(+diff).format("H:mm");
      return localStorage.setItem(res);
    }

    return diff(start, end);
  }
  const [loading, setLoading] = useState(false);
  // const apiURL = ""
  const AddDateTime = (e) => {
    // e.preventDefault();
    const data = () => {
      setDateTime({
        Date: dateTime.Date,
        StartTime: dateTime.StartTime,
        EndTime: dateTime.EndTime,
        Score: dateTime.Score,
      });
      return difference(dateTime.StartTime, dateTime.EndTime), dateTime.Score;
    };
    //   axiosWithAuth.post(apiURL, data).then((res) => {
    //     props.history.push("/sleep-routine");

    // }
    // );
  };
  const onChange = (e) => {
    setDateTime({
      ...dateTime,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grommet>
      <Box
        direction="column"
        pad="medium"
        animation="fadeIn"
        background="neutral-1"
        justify="center"
        height="medium"
        width="large"
        align="center"
      >
        <Form onSubmit={AddDateTime((e) => e)}>
          <input
            type="date"
            name="Date"
            placeholder="Date"
            onChange={(e) => onChange(e)}
          />
          <input
            type="time"
            name="StartTime"
            value={dateTime.StartTime}
            onChange={(e) => onChange(e)}
          />
          <input
            type="time"
            name="EndTime"
            value={dateTime.EndTime}
            onChange={(e) => onChange(e)}
          />
          <select>
            <option id="1" value={dateTime.Score}>
              😃
            </option>
            <option id="2" value={dateTime.Score}>
              🙂
            </option>
            <option id="3" value={dateTime.Score}>
              😐
            </option>
            <option id="4" value={dateTime.Score}>
              😩
            </option>
          </select>
          <input
            type="submit"
            onClick={console.log(dateTime.StartTime, dateTime.EndTime)}
          />
        </Form>
      </Box>
    </Grommet>
  );
}
