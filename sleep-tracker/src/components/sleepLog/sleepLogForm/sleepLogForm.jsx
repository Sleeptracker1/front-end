import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const SleepLogForm = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [logInputs, setLogInputs] = useState({
    startTime: "",
    endTime: "",
    rating: 0,
  });
  const startOnChange = (date) => {
    setStartTime(date);
    setLogInputs({
      ...logInputs,
      startTime: startTime,
    });
  };
  const endOnChange = (date) => {
    setEndTime(date);
    setLogInputs({
      ...logInputs,
      endTime: endTime,
    });
  };
  return (
    <div>
      <DateTimePicker onChange={startOnChange} value={startTime} />
      <DateTimePicker onChange={endOnChange} value={endTime} />
      {console.log(Date.now())}
    </div>
  );
};

export default SleepLogForm;
