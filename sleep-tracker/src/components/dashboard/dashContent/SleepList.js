import React, { useState, useEffect } from "react";
import SleepGraph from "./SleepGraph";
import { Distribution, Grommet, Box, Button } from "grommet";
import { useParams, useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { axiosWithAuth } from "./utils/axiosWithAuth";
export default function SleepList(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect((user_id) => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`https://bw-ft-sleep-tracker-1.herokuapp.com/api/sleep/1`)
      .then((res) => {
        console.log("res in sleep list,", res);
        setData(res.data);
        setIsLoading(false);
      });
  }, []);
  const Delete = (id) => {
    axiosWithAuth()
      .delete(`https://bw-ft-sleep-tracker-1.herokuapp.com/api/sleep/${id}`)
      .then((res) => {
        props.history.push("/sleep-routine");
        setData(res.data);
        setIsLoading(false);
      });
  };
  const { push } = useHistory();
  const { id } = useParams();
  // const Edit = (props) => {
  //   push("/add-sleep-routine");
  // };
  return (
    <Grommet>
      <Box
        direction="column"
        pad="small"
        animation="slideRight"
        background="dark-2"
      >
        {isLoading ? <ClockLoader /> : null}
        <Box direction="row">
          {data.map((d) => (
            <>
              <Box>
                <h2>{d.score}</h2>
              </Box>
              <Box>
                <h2>{d.start_time}</h2>
              </Box>

              <Box>
                <h2>{d.end_time}</h2>
              </Box>

              <Button label="delete" onClick={Delete(data.user_id)}>
                X
              </Button>
              {/* <Button label="edit" onClick={Edit(data.user_id)}>
                EDIT
              </Button> */}
            </>
          ))}
        </Box>
      </Box>
    </Grommet>
  );
}
