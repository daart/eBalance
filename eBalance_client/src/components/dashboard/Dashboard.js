import React from "react";
import { Grid, Tab } from 'semantic-ui-react';

import CreateAccount from './../form/CreateAccount';
import UpdateAccount from './../form/UpdateAccount';

import SideBar from './../common/SideBar';

import AccountList from './../../components/accounts/AccountList';

const panes = [
  { menuItem: 'Income', render: () => (
      <Tab.Pane attached={false}>Income</Tab.Pane>
    ) 
  },
  { menuItem: 'Transfer', render: () => <Tab.Pane attached={false}>Transfer</Tab.Pane> },
  { menuItem: 'Expences', render: () => <Tab.Pane attached={false}>Expences</Tab.Pane> },
];

const Dashboard = () => {
  return (
    <div className="l_dashboard"> 
      <Grid>
        <Grid.Row>
          <Grid.Column width="4">
            Dashboard!
            <AccountList />
          </Grid.Column>

          <Grid.Column width="12">
            @Transactions!
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

          </Grid.Column>

        </Grid.Row>
      </Grid>

    </div>
  );
}

export default Dashboard;
