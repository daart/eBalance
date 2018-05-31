import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./Form";

const CreateAccount = ({ auth, history, register }) => {
  const fields = [
    {
      name: "title",
      type: "text"
    },
    {
      name: "balance",
      type: "text"
    }
  ];

  const submitHandler = async formData => {
    let serverResponse = await axios.post(
      "http://localhost:2345/api/accounts/create",
      formData
    );
    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    console.log(`you've successfully created a new account :${serverResponse.data.title}`);
    
    history.push('/dashboard');
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

export default withRouter(connect()(CreateAccount));
