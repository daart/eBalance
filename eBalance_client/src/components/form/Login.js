import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { login } from './../../actions/auth';
import Form from "./Form";

const Login = ({ history, login, location }) => {

  const fields = [
    {
      name: "email",
      type: "email"
    },
    {
      name: "password",
      type: "password"
    }
  ];

  const submitHandler = async formData => {
    let serverResponse = await axios.post(
      "http://localhost:2345/api/auth/login",
      formData
    );
    const { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    const { token } = serverResponse.data;
    const { from } = location.state || { from: { pathname: "/dashboard" } };

    login(token);

    console.log(`Congrats, you've successfully logged in!`, 'history ', history, ' location ', location);
    history.replace(from);
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

const mapDispatchToProps = (dispatch) => ({
  login(token) {
    dispatch(login(token))
  }
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
