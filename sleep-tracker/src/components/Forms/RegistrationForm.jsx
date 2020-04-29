import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const RegistrationForm = () => {
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("User Name is a required field.")
      .min(2, "minimum four characters")
      .max(20, "max twenty characters"),

    password: yup.string().required().min(6, "must be at least six characters"),
  });

  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    password: "",
  });

  //const [postRequestData, setPostRequestData] = useState([]);
  

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log(valid);
      setSubmitButtonDisabled(!valid);
    });
  }, [formState, formSchema]);

  const inputChange = (event) => {
    event.persist();
    const validateChangeState = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    validateChange(event);
    setFormState(validateChangeState);
  };

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setValidationErrors({
          ...validationErrors,
          [event.target.name]: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setValidationErrors({
          ...validationErrors,
          [event.target.name]: error.message,
        });
      });
  };

  const submitPostRequest = (event) => {
    event.preventDefault();
    console.log("submitted");
    // axios
    //   .post("https://reqres.in/api/users", formState)
    //   .then((response) => {
    //     setPostRequestData([...postRequestData, response.data]);
    //     console.log("success", response);
    //   })
    //   .catch((submissionError) => {
    //     console.log(submissionError.response);
    //   });
  };

  return (
    <div>
      <StyledForm onSubmit={submitPostRequest}>
        <label htmlFor="userNameBox"></label>
        <Input
          color="secondary"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          type="text"
          name="name"
          id="userNameBox"
          placeholder="Desired User Name"
          value={formState.name}
          onChange={inputChange}
        />
        {validationErrors.name.length > 0 ? (
          <p> {validationErrors.name}</p>
        ) : null}

        <label htmlFor="passwordBox"></label>
        <Input style={{marginTop: "3vh", marginBottom: "3vh"}}
          color="secondary"
          startAdornment={
            <InputAdornment position="start">
              <LockOpenIcon />
            </InputAdornment>
          }
          type="password"
          name="password"
          id="passwordBox"
          placeholder="Desired Password"
          value={formState.password}
          onChange={inputChange}
        />
        {validationErrors.password.length > 0 ? (
          <p> {validationErrors.password}</p>
        ) : null}

        {/* <pre>{JSON.stringify(postRequestData, null, 5)}</pre> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
      </StyledForm>
    </div>
  );
};

export default RegistrationForm;
