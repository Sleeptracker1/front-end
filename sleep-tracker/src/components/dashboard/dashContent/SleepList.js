import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grommet, Button } from "grommet";
import { useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import moment from "moment";

import {
  deleteLog,
  startEditLog,
} from "../../../redux/actions/sleepLogActions";

const SleepList = ({ deleteLog, sleepData, startEditLog }) => {
  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleEdit = (logToEdit) => {
    startEditLog(logToEdit, () => {
      push("/add-sleep-routine");
    });
  };

  return (
    <div>
      {/* <Grommet>{isLoading ? <ClockLoader /> : null}</Grommet> */}
      <div className="list-container">
        {sleepData.map((d) => {
          const diff = moment(d.end_time).diff(moment(d.start_time));
          const diffDuration = moment.duration(diff);
          const time_slept = diffDuration.hours();
          return (
            <div key={d.sleep_record_id} className="sleep-entry">
              <div className="time-record">
                <h2> {moment(d.start_time).format("ddd, MMMM Do YYYY")} </h2>
                <h3> Hours slept: {time_slept}</h3>
              </div>
              <div className="note-record">
                <h3>Notes</h3>
                <p> {d.notes} </p>
              </div>
              <div className="cta-btn">
                <button onClick={() => deleteLog(d.sleep_record_id)}>
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button onClick={() => handleEdit(d)}>
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const actions = {
  deleteLog,
  startEditLog,
};
const mapState = (state) => ({
  sleepData: state.sleepLog.sleepLog,
});
export default connect(mapState, actions)(SleepList);
