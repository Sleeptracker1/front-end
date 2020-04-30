import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grommet, Box, Button } from "grommet";
import { useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import moment from "moment";

import { deleteLog } from "../../../redux/actions/sleepLogActions";

const SleepList = ({ deleteLog, sleepData }) => {
  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleEdit = (logToEdit) => {
    push("/add-sleep-routine");
  };

  return (
    <Grommet>
      <Box
        direction="column"
        pad="small"
        animation="slideRight"
        background="dark-2"
      >
        {isLoading ? <ClockLoader /> : null}
        <Box direction="column">
          {sleepData.map((d) => (
            <div key={d.sleep_record_id}>
              <Box background="dark-1" direction="row">
                <Box>
                  <h2> {moment(d.score).format("MMMM Do YYYY")} </h2>
                </Box>
                <Box>
                  <h2>
                    {" "}
                    hours slept:{" "}
                    {moment(d.end_time).hours() - moment(d.start_time).hours()}
                  </h2>
                </Box>
                <Button
                  id={d.sleep_record_id}
                  label="delete"
                  onClick={() => deleteLog(d.sleep_record_id)}
                >
                  X
                </Button>
                {console.log("d", d)}
                <Button label="edit" onClick={() => handleEdit(d)}>
                  EDIT
                </Button>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

const actions = {
  deleteLog,
};
const mapState = (state) => ({
  sleepData: state.sleepLog.sleepLog,
});
export default connect(mapState, actions)(SleepList);
