import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Form, Grommet } from "grommet";
import moment from "moment";

const AddEditSleepForm = () => {
  const [formInputs, setFormInputs] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    score: 0,
  });
  const [logValues, setLogValues] = useState({
    startTime: "",
    endTime: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

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
  const AddDateTime = (e) => {
    e.preventDefault();
    const data = () => {
      setFormInputs({
        Date: formInputs.Date,
        StartTime: formInputs.StartTime,
        EndTime: formInputs.EndTime,
        Score: formInputs.Score,
      });

      return (
        difference(formInputs.StartTime, formInputs.EndTime), formInputs.Score
      );
    };
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
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
        <Form onSubmit={AddDateTime}>
          <label>
            Start
            <input type="date" name="startDate" onChange={onChange} />
            <input
              type="time"
              name="startTime"
              value={formInputs.StartTime}
              onChange={(e) => onChange(e)}
            />
          </label>

          <br />
          <label>
            end
            <input type="date" name="endDate" onChange={onChange} />
            <input
              type="time"
              name="endTime"
              value={formInputs.EndTime}
              onChange={onChange}
            />
          </label>
          <br />
          <select>
            <option id="4" value={formInputs.Score}>
              😃
            </option>
            <option id="3" value={formInputs.Score}>
              🙂
            </option>
            <option id="2" value={formInputs.Score}>
              😐
            </option>
            <option id="1" value={formInputs.Score}>
              😩
            </option>
          </select>
          <input type="submit" value="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

export default connect(null, null)(AddEditSleepForm);
