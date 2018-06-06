import React from 'react';
import { Grid } from 'semantic-ui-react';

import AccountList from './../components/AccountList';

const Accounts = () => {
  return (
    <div className="l_accounts">
      <Grid>
        <Grid.Row>
          <Grid.Column width="4" stretched>
            Accounts!
            <AccountList showControls={true} />
          </Grid.Column>

          <Grid.Column width="12">
            @Account Stats!

          </Grid.Column>

        </Grid.Row>
      </Grid>

    </div>
  );
};

export default Accounts;
