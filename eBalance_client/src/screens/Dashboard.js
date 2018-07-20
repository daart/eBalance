import React, { Component } from "react";
import { Grid, Tab } from 'semantic-ui-react';

import AccountList from './../components/AccountList';
import TransactionForm from './../components/TransactionForm';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionType: 'expense'
    }

    this.panes = [
      {
        menuItem: "Income",
        render: () => (
          <Tab.Pane
            attached={false}
            content={<TransactionForm transactionType="income" />}
          />
        )
      },
      {
        menuItem: "Transfer",
        render: () => (
          <Tab.Pane
            attached={false}
            content={<TransactionForm transactionType="transfer" />}
          />
        )
      },
      {
        menuItem: "Expences",
        render: () => (
          <Tab.Pane
            attached={false}
            content={<TransactionForm transactionType="expense" />}
          />
        )
      }
    ];
  }

  render() {
    return (
      <div className="l_dashboard"> 
        <Grid>
          <Grid.Row>
            <Grid.Column width="4" stretched>
              Dashboard!
              <AccountList />
            </Grid.Column>

            <Grid.Column width="12">
              @Transactions!
              
              <TransactionForm />

              asd

            </Grid.Column>

          </Grid.Row>
        </Grid>

      </div>
    );
  } 
}

export default Dashboard;
