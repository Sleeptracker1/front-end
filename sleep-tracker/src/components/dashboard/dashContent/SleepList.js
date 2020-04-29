import React, { useState, useEffect } from "react";
import SleepGraph from "./SleepGraph";
import { Distribution, Grommet, Box, Button } from "grommet";
import ClockLoader from "react-spinners/ClockLoader";

export default function SleepList(props) {
  const [data, setData] = useState({ sleepData: [], mode: "view" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    //axiosWithAuth()
    //.get("")
    //.then((res) => {
    // console.log("res in sleep list,", res)
    // setData({sleepData: res.data, mode: 'view'})
    // setIsLoading(false)
    // })
  }, []);
  const Delete = (id) => {
    //axiosWithAuth()
    //  .delete(``)
    // .then((res) => {
    //   props.history.push("/sleep-routine")
    //   setData({sleepData: res.data, mode: 'view'})
    //setIsLoading(false)
    // })
  };

  const Edit = (id) => {
    //  props.history.push(``)
  };
  return (
    <Grommet>
      <Box
        direction="column"
        pad="small"
        animation="slideRight"
        background="dark-2"
      >
        {/* {isLoading ? <ClockLoader /> : null} */}
        {/*data.map((d => ( */}
        <>
          <Box direction="row" pad="small" background="dark-1" margin="small">
            {/*<h3>{d}</h3>*/}
            <h2>Sleepdata</h2>
          </Box>
          <Box direction="row" pad="small" background="dark-1" margin="small">
            <h2>Sleepdata</h2>
          </Box>
          <Box direction="row" pad="small" background="dark-1" margin="small">
            <h2>Sleepdata</h2>
          </Box>
          {/*<Button label="delete" onClick={Delete(data.id)}>X<Button>
        <Button label="edit" onClick={Edit(data.id)}>EDIT<Button>*/}

          {/* // ))) */}
        </>
      </Box>
    </Grommet>
  );
}
