import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./Form";

const UpdateAccount = ({ auth, history, register }) => {
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

  const fetchBeforeUpdate = ({ }) => {
    
  }
  
  const submitHandler = async formData => {
    let serverResponse = await axios.post(
      "http://localhost:2345/api/accounts/update",
      formData
    );
    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    console.log(`you've successfully UPDATED a new account :${serverResponse.data.title}`);
    
    history.push('/dashboard');
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

export default withRouter(connect()(UpdateAccount));
