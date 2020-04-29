import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Form, Grommet } from "grommet";
import moment from "moment";

import { createLog } from "../../../redux/actions/sleepLogActions";

const AddEditSleepForm = ({ createLog }) => {
  const [formInputs, setFormInputs] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const evalutateTime = () => {
    const start = moment(`${formInputs.startDate}T${formInputs.startTime}`);
    const end = moment(`${formInputs.endDate}T${formInputs.endTime}`);
    const diff = end.diff(start);
    // const diffDuration = moment.duration(diff);
    // console.log(diffDuration.hours())
    return { start, end };
  };
  const AddDateTime = (e) => {
    e.preventDefault();
    const { start, end } = evalutateTime();
    const postValues = {
      start_time: start._i,
      end_time: end._i,
      score: Number(formInputs.rating),
      users_id: 7,
      notes: "another test",
    };
    let json = JSON.stringify(postValues);
    console.log(json);
    createLog(postValues);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
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
              value={formInputs.startTime}
              onChange={onChange}
            />
          </label>

          <br />
          <label>
            end
            <input type="date" name="endDate" onChange={onChange} />
            <input
              type="time"
              name="endTime"
              value={formInputs.endTime}
              onChange={onChange}
            />
          </label>
          <br />
          <select onChange={onChange} name="rating">
            <option id="4">4</option>
            <option id="3">3</option>
            <option id="2">2</option>
            <option id="1">1</option>
          </select>
          <input type="submit" value="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};
const actions = {
  createLog,
};
export default connect(null, actions)(AddEditSleepForm);
