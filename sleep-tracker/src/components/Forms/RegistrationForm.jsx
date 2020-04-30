import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import {StyledError, StyledForm, split} from './LoginForm'
import SplitText from 'react-pose-text';
import {NavLink} from 'react-router-dom'
import Logo from './Logo'

const RegistrationForm = ({ registerUser }) => {
  const { push } = useHistory();
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("User Name is a required field.")
      .min(2, "minimum two characters")
      .max(20, "max twenty characters"),

    password: yup.string().required().min(6, "must be at least six characters"),
  });

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
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
        setValidationErrors({
          ...validationErrors,
          [event.target.name]: error.message,
        });
      });
  };

  const submitPostRequest = (event) => {
    event.preventDefault();

    registerUser(formState, () => {
      push("/login");
    });
  };

  return (
    <div>
     <Logo/>
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
          name="username"
          id="userNameBox"
          placeholder="Desired User Name"
          value={formState.username}
          onChange={inputChange}
        />
        {validationErrors.username.length > 0 ? (
          <StyledError> {validationErrors.name}</StyledError>
        ) : null}

        <label htmlFor="passwordBox"></label>
        <Input
          style={{ marginTop: "3vh", marginBottom: "3vh" }}
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
          <StyledError> {validationErrors.password}</StyledError>
        ) : null}

        <Button style={{margin: '1vh'}}
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
        <p style={{fontFamily: 'Manrope, sans-serif',
fontSize: '1rem', margin: '1vh'}}>
  <SplitText initialPose="exit" pose="enter" charPoses={split}>Already a Member?</SplitText></p>
       <NavLink style={{textDecoration: "none"}} to="/"> <Button style={{margin: '1vh'}}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log In
        </Button>
        </NavLink> 
      
      </StyledForm>
    </div>
  );
};

const actions = {
  registerUser,
};
export default connect(null, actions)(RegistrationForm);
