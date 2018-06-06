import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getOne } from './../actions/accounts';

const Account = ({ match, getAccount, accounts }) => {
  const account = accounts.find(account => account.id === match.params.id);

  return (
    <div className="">
      <h3>
        !Account Info
      </h3>

      <div>{account.title}</div>
      <div>{account.balance}</div>

    </div>
  );
}

const mapStateToProps = ({ accounts }) => ({
  accounts,
});

export default withRouter(connect(mapStateToProps)(Account));
