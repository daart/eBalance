import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from "./../common/Form";

import { createOne, updateOne } from './../actions/accounts';

const AccountForm = ({ history, hideModal, createOne, updateOne, accounts, accountId }) => {
  let fields = [
    {
      name: "title",
      type: "text",
      value: ""
    },
    {
      name: "balance",
      type: "text",
      value: ""
    }
  ];

  if (accountId) {
    let account = accounts.find(a => a.id === accountId);
    
    fields.map(a => a.value = account[a.name]);
  } 

  const submitHandler = async formData => {
    let serverResponse;
    
    if (accountId) {
      serverResponse = await axios.patch("http://localhost:2345/api/accounts/" + accountId, formData);
      let { account } = serverResponse.data;

      updateOne(account);
    } else {
      serverResponse = await axios.post("http://localhost:2345/api/accounts", formData);
      let { account } = serverResponse.data;

      createOne(account);
    }
    
    let { errors } = serverResponse.data;

    if (errors) {
      return errors;
    }

    hideModal();
    return null;
  };

  return <Form fields={fields} submitHandler={submitHandler} />;
};

const mapStateToProps = ({ accounts }) => ({
  accounts
});

export default withRouter(connect(mapStateToProps, { createOne, updateOne })(AccountForm));
