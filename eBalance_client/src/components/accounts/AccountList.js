import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Header, Icon } from "semantic-ui-react";

import Account from "./Account";
import CreateAccount from "./../form/CreateAccount";

class AccountList extends Component {
  state = {
    accounts: []
  };

  removeAccount = async id => {
    const deletedUser = await axios.delete(
      "http://localhost:2345/api/accounts/" + id
    );

    console.log("delet res --> ", deletedUser);

    let filteredAccounts = this.state.accounts.filter(
      account => account.id !== id
    );

    this.setState({
      accounts: filteredAccounts
    });
  };

  editAccount = async id => {
    const updatedAccount = await axios.patch(
      "http://localhost:2345/api/accounts/" + id
    );

    let newAccounts = this.state.accounts.map(
      account => (account.id === id ? updatedAccount : account)
    );

    console.log(
      "delet res --> ",
      updatedAccount,
      " newAccounts -->==> ",
      newAccounts
    );

    // this.setState({
    //   accounts: newAccounts
    // });
  };

  async componentDidMount() {
    const apiResponse = await axios.get("http://localhost:2345/api/accounts");
    const { accounts } = apiResponse.data;

    if (accounts) {
      this.setState({
        accounts
      });
    }
  }

  render() {
    let { accounts } = this.state;

    return (
      <div className="l_dashboard_accounts">
        <h3>AccountList@</h3>
        <ul>
          {accounts.map(account => (
            <Account
              account={account}
              key={account.id}
              removeAccount={this.removeAccount}
              editAccount={this.editAccount}
            />
          ))}
        </ul>

        <Modal
          style={{
            margin: "0 auto "
          }}
          trigger={
            <Button positive >
              Add New
            </Button>
          }
        >
          <Header icon="archive" content="Add New Account" />
          <Modal.Content>
            <CreateAccount />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AccountList;


{/*          <Modal.Actions>
            <Button basic color="red" inverted>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>*/}