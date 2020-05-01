import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Sleeper from "../../../assets/images/sleeping.svg";
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
        rating: logToEdit.score,
        notes: logToEdit.notes,
      });
      setSelectEnd(logToEdit.end_time);
      setSelectStart(logToEdit.start_time);
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
        <div className="img-container">
          <img src={Sleeper} alt="sleeping svg" />
        </div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className="material-wrapper">
            {/* start */}
            <div className="time-table">
              <KeyboardDatePicker
                disableToolbar
                className="date-"
                variant="inline"
                format="YYYY/MM/DD"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={selectStart}
                onChange={handleStart}
                minDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{ disableUnderline: true }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Start Time"
                value={selectStart}
                onChange={handleStart}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                InputProps={{ disableUnderline: true }}
              />
            </div>

            {/* end */}
            <div className="time-table">
              <KeyboardDatePicker
                className="date-"
                margin="normal"
                id="date-picker-dialog"
                label="End Date"
                format="YYYY/MM/DD"
                value={selectEnd}
                onChange={handleEnd}
                minDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{ disableUnderline: true }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="End Time"
                value={selectEnd}
                onChange={handleEnd}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                InputProps={{ disableUnderline: true }}
              />
            </div>

            <div className="default-inputs">
              <label>
                <p>Did you sleep well?</p>
                <select onChange={onChange} name="rating">
                  <option id="4">4 😀</option>
                  <option id="3">3 🙂</option>
                  <option id="2">2 😑</option>
                  <option id="1">1 😭</option>
                </select>
              </label>
              <textarea
                className="form-input"
                type="text"
                name="notes"
                rows="3"
                value={formInputs.notes}
                onChange={onChange}
                placeholder="notes"
              />

              <button className="form-submit">Submit</button>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
};
const actions = {
  createLog,
  completeEditLog,
};
const mapState = (state) => ({
  // userId: state.auth.currentUser.users_id,
  // editing: state.sleepLog.editing,
  // logToEdit: state.sleepLog.logToEdit,
});
export default connect(mapState, actions)(SleepEntryForm);
