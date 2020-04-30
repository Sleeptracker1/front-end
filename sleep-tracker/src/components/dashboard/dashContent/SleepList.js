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
      <Grommet>{isLoading ? <ClockLoader /> : null}</Grommet>
      <div className="list-container">
        {sleepData.map((d) => (
          <div key={d.sleep_record_id}>
            <h2> {moment(d.created_at).format("dddd, MMMM Do YYYY")} </h2>
            <h2>
              {" "}
              hours slept:{" "}
              {moment(d.end_time).hours() - moment(d.start_time).hours()}
            </h2>

            <button onClick={() => deleteLog(d.sleep_record_id)}>
              Delete X
            </button>
            <button onClick={() => handleEdit(d)}>EDIT</button>
          </div>
        ))}
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
