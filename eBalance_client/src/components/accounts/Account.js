import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Account = ({ account, removeAccount, editAccount }) => {
  const { title, balance, id } = account;

  // console.log('title : ', title , ' id :: ', id);

  return (
    <li key={id}>
      <div className="account-login">{ title }</div>
      <div className="account-email">{ balance }</div>
      <div className="account-id">{ id }</div>
      <Button negative  onClick={() => removeAccount(id)}>remove</Button>
      <Button color='teal' onClick={() => editAccount(id)}>edit</Button>
    </li>
  );
};

export default Account;
