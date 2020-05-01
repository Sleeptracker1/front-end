import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import {
  createLog,
  completeEditLog,
} from "../../../redux/actions/sleepLogActions";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
const SleepEntryForm = ({
  createLog,
  userId,
  editing,
  logToEdit,
  completeEditLog,
}) => {
  const { push } = useHistory();
  const [formInputs, setFormInputs] = useState({
    // startDate: "",
    // startTime: "",
    // endDate: "",
    // endTime: "",
    rating: "4",
    notes: "",
  });

  // material ui
  const [selectStart, setSelectStart] = useState(new Date());
  const [selectEnd, setSelectEnd] = useState(new Date());

  const handleStart = (date) => {
    setSelectStart(date);
  };
  const handleEnd = (date) => {
    setSelectEnd(date);
  };

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
    const formatRating = formInputs.rating.split(" ");

    //testing material ui

    console.log(moment(selectStart).format());
    const diff = moment(selectEnd).diff(moment(selectStart));

    const diffDur = moment.duration(diff);
    console.log(diffDur.hours());

    const postValues = {
      start_time: selectStart,
      end_time: selectEnd,
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
    <div className="form-container">
      <form className="form-wrapper" onSubmit={AddDateTime}>
        {/* <label>
          Start Date and Time:
          <input
            type="date"
            name="startDate"
            className="form-input"
            onChange={onChange}
            value={formInputs.startDate}
          />
          <input
            type="time"
            name="startTime"
            className="form-input"
            value={formInputs.startTime}
            onChange={onChange}
          />
        </label>
        <label>
          End Date and Time:
          <input
            type="date"
            name="endDate"
            className="form-input"
            onChange={onChange}
            value={formInputs.endDate}
          />
          <input
            type="time"
            name="endTime"
            className="form-input"
            value={formInputs.endTime}
            onChange={onChange}
          />
        </label> */}

        {/* testing material ui */}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div>
            {/* start */}
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="YYYY/MM/DD"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectStart}
              onChange={handleStart}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectStart}
              onChange={handleStart}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
            {/* end */}
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="YYYY/MM/DD"
              value={selectEnd}
              onChange={handleEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectEnd}
              onChange={handleEnd}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </div>
        </MuiPickersUtilsProvider>

        <label>
          Did you sleep well?
          <select onChange={onChange} name="rating">
            <option id="4">4 😀</option>
            <option id="3">3 🙂</option>
            <option id="2">2 😑</option>
            <option id="1">1 😭</option>
          </select>
        </label>

        <input
          type="textarea"
          name="notes"
          value={formInputs.notes}
          onChange={onChange}
          placeholder="notes"
        />

        <button className="form-submit">Submit</button>
      </form>
    </div>
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
