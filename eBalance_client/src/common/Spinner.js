import React from 'react';
import { Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';

const Spinner = () => (
  <Grid>
    <Grid.Column stretched>
      <Segment>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>  
    </Grid.Column>
  </Grid>
);

export default Spinner;
