import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { login } from './../actions/auth';
import { getAll } from './../actions/accounts';
import Form from "./../common/Form";

const Login = ({ history, location, login, getAll }) => {

  const fields = [
    {
      name: "email",
      type: "email",
      value: ""
    },
    {
      name: "password",
      type: "password",
      value: ""
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
    // getAll();

    console.log(`Congrats, you've successfully logged in!`, 'history ', history, ' location ', location, ' here are your accounts =====::: ');
    
    history.replace(from);
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

export default withRouter(connect(null, { login, getAll })(Login));
