import React, { Component } from 'react';
import { Confirm, Button } from 'semantic-ui-react';

class Confirmation extends Component {
  state={
    open: false,
  }

  open = () => {
    this.setState({
      open: true
    })
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { accountId, removeAccount } = this.props;
    return (
      <div>
        <Button onClick={this.open}>Delete</Button>
        <Confirm open={this.state.open} onCancel={this.close} onConfirm={() => removeAccount(accountId)} />
      </div>
    )
  }
};

export default Confirmation;
