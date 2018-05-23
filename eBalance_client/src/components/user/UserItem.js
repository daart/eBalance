import React from 'react';

import { Button } from 'semantic-ui-react';

const UserItem = ({ user, removeItem }) => {
  const { id, login, email } = user;

  return (
    <li key={id}>
      <div className="user-login">{login}</div>
      <div className="user-email">{email}</div>
      <div className="user-id">{id}</div>
      <Button onClick={() => removeItem(id)}>remove</Button>
    </li>
  );
};

export default UserItem;
