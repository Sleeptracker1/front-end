import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SleepGraph from "./SleepGraph";
import { Distribution, Grommet, Box, Button } from "grommet";
import { useParams, useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import moment from "moment";

import { deleteLog } from "../../../redux/actions/sleepLogActions";

const SleepList = ({ deleteLog, sleepData }) => {
  console.log(sleepData);
  const { push } = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // axiosWithAuth()
    //   .get(`api/sleep/`)
    //   .then((res) => {
    //     console.log("res in sleep list,", res);
    //     setData(res.data);
    //     setIsLoading(false);
    //   });
  }, []);

  const Edit = (props) => {
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
                <Button label="edit" onClick={() => Edit(data.user_id)}>
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
