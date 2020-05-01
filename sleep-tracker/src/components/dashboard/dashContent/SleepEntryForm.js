import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
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
    rating: "4",
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
    const formatRating = formInputs.rating.split(" ");
    console.log(formatRating);
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
    <div className="form-container">
      <form className="form-wrapper" onSubmit={AddDateTime}>
        <label>
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
        </label>

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
  // userId: state.auth.currentUser.users_id,
  // editing: state.sleepLog.editing,
  // logToEdit: state.sleepLog.logToEdit,
});
export default connect(mapState, actions)(SleepEntryForm);
