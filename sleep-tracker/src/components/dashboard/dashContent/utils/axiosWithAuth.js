import axios from "axios";

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  // const token = JSON.parse(localStorage.getItem("token"));
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE1ODgwODc4NTYsImV4cCI6MTU4ODY5MjY1Nn0.cjbGvusgGYGx85OPRORI9ZXvmPFQ3QZlhQ6bmVSaKMk";
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://bw-ft-sleep-tracker-1.herokuapp.com/",
  });
};
