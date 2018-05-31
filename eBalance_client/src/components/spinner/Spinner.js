import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => (
  <Segment>
    <Dimmer active>
      <Loader size="massive">Loading</Loader>
    </Dimmer>
  </Segment>  
);

export default Spinner;
