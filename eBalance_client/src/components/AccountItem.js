import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { deleteOne, updateOne } from './../actions/accounts';

import Confirmation from './../common/Confirm';
import Modal from './../common/Modal';
import AccountForm from './AccountForm';

let editAccountBtnConfig = {
  color: "teal",
  txt: "Edit"
};

const AccountItem = ({ account, removeAccount, editAccount, showControls }) => {
  const { title, balance, id } = account;

  return (
    <li key={id}>
      <Link to={`/accounts/${id}`}>
        <div className="account-login">{ title }</div>
      </Link>            
      <div className="account-email">{ balance }</div>
      <div className="account-id">{ id }</div>
      
      {
        showControls && (
          <div>
            <Confirmation removeAccount={ removeAccount } accountId={ id } />     
            <Modal
              modalContent={ AccountForm }
              headerContent='Edit Account'
              triggerBtnConfig={ editAccountBtnConfig }
              accountId={ id }
            />
          </div>
        )
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeAccount(id) {
    dispatch(deleteOne(id))
  }
});

export default connect(null, mapDispatchToProps)(AccountItem);
