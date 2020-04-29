import axios from "axios";

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  // const token = JSON.parse(localStorage.getItem("token"));
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJpYXQiOjE1ODgxNzE1OTgsImV4cCI6MTU4ODc3NjM5OH0.HLXXBP1YKkvT8L4RsVKo3owQ9qGrK3cvE-erBZnKOkQ";
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://bw-ft-sleep-tracker-1.herokuapp.com/",
  });
};
