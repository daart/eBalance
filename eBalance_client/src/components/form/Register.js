import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./Form";

const Register = ({ auth, history, register }) => {
  const fields = [
    {
      name: "email",
      type: "email"
    },
    {
      name: "login",
      type: "text"
    },
    {
      name: "password",
      type: "password"
    }
  ];

  const submitHandler = async formData => {
    let serverResponse = await axios.post(
      "http://localhost:2345/api/auth/register",
      formData
    );
    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    history.push("/login");
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} history={history}/>;
};

export default withRouter(connect()(Register));
