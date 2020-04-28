import React, { useState } from "react";
import moment from "moment";

const SleepLogForm = () => {
  const [formInputs, setFormInputs] = useState({
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    rating: 0,
  });
  const [logValues, setLogValues] = useState({
    startTime: "",
    endTime: "",
    rating: 0,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };
  const convertDate = () => {
    let startTime = moment(`${formInputs.startDate}T${formInputs.startTime}`);
    let endTime = moment(`${formInputs.endDate}T${formInputs.endTime}`);
    let diff = endTime.diff(startTime);
    let diffDuration = moment.duration(diff);

    setLogValues({
      ...logValues,
      startTime: startTime._i,
      endTime: endTime._i,
  
      rating: Number(formInputs.rating),
    });
  };

  return (
    <div>
      <label>start</label>
      <input
        name="startDate"
        type="date"
        onChange={handleChange}
        min={moment(Date.now()).format("mm/dd/yyy")}
      />
      <input name="startTime" type="time" onChange={handleChange} />
      <br />
      <label>end</label>
      <input
        name="endDate"
        type="date"
        onChange={handleChange}
        min={moment(Date.now()).format("mm/dd/yyy")}
      />
      <input name="endTime" type="time" onChange={handleChange} />
      <input
        name="rating"
        value={formInputs.rating}
        onChange={handleChange}
        type="number"
        min="0"
        max="4"
      />
      <button onClick={convertDate}>convert time</button>
      <p>time difference {logValues.diff} hours</p>
      {console.log(logValues)}
    </div>
  );
};

export default SleepLogForm;
