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
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import SplitText from 'react-pose-text';
import Logo from './Logo'

//document.body.style = 'background: ';

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bolder;`

  export const StyledError = styled.p`
  font-family: 'Manrope', sans-serif;
  font-size: 1.5rem;
  color: red;`

  export const split = {
    exit: { opacity: 0, y: 20 },
    enter: {
      opacity: 1,
      y: 0,
      delay: ({ charIndex }) => charIndex * 30
    }
  };

  const LoginForm = ({ loginUser }) => {
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
    loginUser(formState, () => {
      push("/user-dashboard");
    });
  };

  return (
    <div>
      <Logo />
      <StyledForm onSubmit={submitPostRequest}>
        <label htmlFor="userNameBox"></label>
        <Input  style={{ fontSize: '2rem'}} 
          color="secondary"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle fontSize="large" />
            </InputAdornment>
          }
          type="text"
          name="username"
          id="userNameBox"
          placeholder="Your User Name"
          value={formState.username}
          onChange={inputChange}
        />
        {validationErrors.username.length > 0 ? (
          <StyledError> {validationErrors.username}</StyledError>
        ) : null}

        <label htmlFor="passwordBox"></label>
        <Input
          style={{ fontSize: "2rem", marginTop: "3vh", marginBottom: "2vh"}}
          color="secondary"
          startAdornment={
            <InputAdornment  position="start">
              <LockOpenIcon fontSize="large" />
            </InputAdornment>
          }
          type="password"
          name="password"
          id="passwordBox"
          placeholder="Password"
          value={formState.password}
          onChange={inputChange}
        />
        {validationErrors.password.length > 0 ? (
          <StyledError> {validationErrors.password}</StyledError>
        ) : null}

        <Button style={{margin: '1vh', fontSize: '1.5rem'}}
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
        <p style={{fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', margin: '1vh'}}>      <SplitText initialPose="exit" pose="enter" charPoses={split}>
Not registered yet? </SplitText> </p> 
      <NavLink style={{textDecoration: "none"}} to="/register">{" "} <Button style={{margin: '1vh', fontSize: '1.5rem'}}
         variant="contained"
         color="primary"
         type="submit"
       >
         Register
       </Button>
       </NavLink>  
      </StyledForm>
    </div>
  );
};
const actions = {
  loginUser,
};
export default connect(null, actions)(LoginForm);
