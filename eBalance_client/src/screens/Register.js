import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Form from "./../common/Form";

const Register = ({ auth, history, register }) => {
  const fields = [
    {
      name: "email",
      type: "email",
      value: ""
    },
    {
      name: "login",
      type: "text",
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

export default withRouter(Register);
