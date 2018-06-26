import React, { Component, Fragment } from 'react';
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
    const { itemId, removeItem, btnConfig = {} } = this.props;
    const { basic, color, icon } = btnConfig;

    console.log("btnConfig >> ", btnConfig, ' props >>> ', this.props);
    return (
      <Fragment>
        <Button 
          basic={basic && basic} 
          icon={icon && icon} 
          onClick={this.open} 
          color={color} 
        />

        <Confirm 
          open={this.state.open} 
          onCancel={this.close} 
          onConfirm={() => removeItem(itemId)} 
        />
      </Fragment>
    );
  }
};

export default Confirmation;
