import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Form, Grommet } from "grommet";
import moment from "moment";
import "../../../sass/SleepEntryForm.scss";
import {
  createLog,
  completeEditLog,
} from "../../../redux/actions/sleepLogActions";

const SleepEntryForm = ({
  createLog,
  userId,
  editing,
  logToEdit,
  completeEditLog,
}) => {
  const { push } = useHistory();
  const [formInputs, setFormInputs] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    rating: "",
    notes: "",
  });

  useEffect(() => {
    if (editing) {
      setFormInputs({
        ...formInputs,
        startDate: moment(logToEdit.start_time).format("YYYY-MM-DD"),
        startTime: moment(logToEdit.start_time).format("hh:mm"),
        endDate: moment(logToEdit.end_time).format("YYYY-MM-DD"),
        endTime: moment(logToEdit.end_time).format("hh:mm"),
        rating: logToEdit.score,
        notes: logToEdit.notes,
      });
    }
  }, [editing]);

  const evalutateTime = () => {
    const start = moment(`${formInputs.startDate}T${formInputs.startTime}`);
    const end = moment(`${formInputs.endDate}T${formInputs.endTime}`);
    return { start, end };
  };
  const AddDateTime = (e) => {
    e.preventDefault();
    const { start, end } = evalutateTime();
    const formatRating = formInputs.rating.split(' ');
    const postValues = {
      start_time: start._i,
      end_time: end._i,
      score: formatRating[0],
      users_id: userId,
      notes: formInputs.notes,
    };
    if (editing) {
      const logId = { sleep_record_id: logToEdit.sleep_record_id };
      const editedValues = {
        ...postValues,
        created_at: logToEdit.created_at,
        updated_at: logToEdit.updated_at,
      };
      completeEditLog(editedValues, logId, () => {
        push("/user-dashboard");
      });
    } else {
      console.log(postValues);
      createLog(postValues, () => {
        push("/user-dashboard");
      });
    }
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
      <Box width="100vw" height="100vh" background="#C6EBBE">
        <Box
          direction="column"
          pad="medium"
          animation="fadeIn"
          className="smart-green"
          id="Box"
          background="#3626A7"
          justify="center"
          height="large"
          width="large"
          align="center"
        >
          <Form className="smart-green" onSubmit={AddDateTime}>
            <label>
              Start Date and Time:
              <input
                type="date"
                name="startDate"
                onChange={onChange}
                value={formInputs.startDate}
              />
              <input
                type="time"
                name="startTime"
                value={formInputs.startTime}
                onChange={onChange}
              />
            </label>

            <br />
            <label>
              End Date and Time:
              <input
                type="date"
                name="endDate"
                onChange={onChange}
                value={formInputs.endDate}
              />
              <input
                type="time"
                name="endTime"
                value={formInputs.endTime}
                onChange={onChange}
              />
            </label>
            <br />
            <label>
              How good was your sleep?
              <select onChange={onChange} name="rating">
                <option id="4">4 😀</option>
                <option id="3">3 🙂</option>
                <option id="2">2 😑</option>
                <option id="1">1 😭</option>
              </select>
            </label>
            <br />
            <input
              type="textarea"
              name="notes"
              value={formInputs.notes}
              onChange={onChange}
              placeholder="notes"
            />
            <br />

            <input type="submit" value="submit" className="button" />
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};
const actions = {
  createLog,
  completeEditLog,
};
const mapState = (state) => ({
  userId: state.auth.currentUser.users_id,
  editing: state.sleepLog.editing,
  logToEdit: state.sleepLog.logToEdit,
});
export default connect(mapState, actions)(SleepEntryForm);
