import React, { useState } from "react";
import moment from "moment";

const SleepLogForm = () => {
  const [logInputs, setLogInputs] = useState({
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    difference: "",
    rating: 0,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogInputs({
      ...logInputs,
      [name]: value,
    });
  };
  const convertDate = () => {
    let start = moment(`${logInputs.startDate}T${logInputs.startTime}`);
    let end = moment(`${logInputs.endDate}T${logInputs.endTime}`);
    let diff = end.diff(start);
    let diffDuration = moment.duration(diff);
    setLogInputs({
      ...logInputs,
      difference: diffDuration.hours(),
    });
  };
  return (
    <div>
      <label>start</label>
      <input name="startDate" type="date" onChange={handleChange}></input>
      <input name="startTime" type="time" onChange={handleChange}></input>
      <br />
      <label>end</label>
      <input name="endDate" type="date" onChange={handleChange}></input>
      <input name="endTime" type="time" onChange={handleChange}></input>

      <button onClick={convertDate}>convert time</button>
    </div>
  );
};

export default SleepLogForm;
