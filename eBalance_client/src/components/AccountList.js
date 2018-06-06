import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Button } from "semantic-ui-react";

import AccountItem from "./AccountItem";
import AccountForm from "./AccountForm";
import Modal from './../common/Modal';

import { getAll } from './../actions/accounts';

let createNewAccountBtnConfig = {
  color: "green",
  txt: "Create New"
};

const AccountList = ({ accounts = [], showControls }) => (
  <div className="l_dashboard_accounts">
    <h3>AccountList@</h3>
    <ul>
      { accounts.map(account => (
        <AccountItem
          showControls={ showControls }
          account={ account }
          key={ account.id }
        />
      ))} 
    </ul>

    <Modal 
      modalContent={ AccountForm }
      headerContent="Add New Account"
      triggerBtnConfig={ createNewAccountBtnConfig }
    />
  </div>
);

const mapStateToProps = ({ accounts }) => ({
  accounts
});

export default connect(mapStateToProps)(AccountList);
