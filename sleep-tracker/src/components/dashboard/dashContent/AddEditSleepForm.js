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
  const [loading, setLoading] = useState(false);
  // const apiURL = ""
  const AddDateTime = (e) => {
    e.preventDefault();
    const data = {
      Date: dateTime.Date,
      StartTime: dateTime.StartTime,
      EndTime: dateTime.EndTime,
      Score: dateTime.Score,
    };
    axiosWithAuth.post(apiURL, data).then((res) => {
      props.history.push("/sleep-routine");
   
  }
  );
  }
  const onChange = (e) => {
    setDateTime({
      ...dateTime,
      [e.target.name]: e.target.value,
    });
  };
  function difference(StartTime, EndTime) {
    var start = moment(StartTime, "HH:mm");
    console.log("difference", StartTime, EndTime);
    var end = moment(EndTime, "HH:mm");
    if (end.isBefore(start)) end.add(1, "day");
    var diff = moment.duration(end.diff(start));
    var res = moment(+diff).format("H:mm");
    return res;
  }

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
        <Form
          onSubmit={AddDateTime(e)
          }
        >
          <input
            type="date"
            name="Date"
            selected={dateTime.Date}
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
          <input
            type="submit"
            onClick={console.log(dateTime.StartTime, dateTime.EndTime)}
          />
        </Form>
      </Box>
    </Grommet>
  );
}
