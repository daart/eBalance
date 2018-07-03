import React, { Component } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

class ModalDimmer extends Component {
  state={
    isModalActive: false
  }

  showModal = () => {
    this.setState({
      isModalActive: true
    })
  }

  hideModal = () => {
    this.setState({
      isModalActive: false
    })
  }

  render() {
    const { modalContent: ModalContent, headerContent, triggerBtnConfig, type, itemId } = this.props;
    const { isModalActive } = this.state;
    const { color, txt, icon, basic } = triggerBtnConfig;

    return (
      <Modal
        size="small"
        onClose={ this.hideModal }
        open={ isModalActive }
        style={{
          marginTop: 0
        }}

        trigger={
          <Button
            basic={basic}
            icon={ icon && icon }
            onClick={ this.showModal }
            color={ color }
          >
            { txt }
          </Button>
        }
      >
        <Header content={ headerContent } />
        <Modal.Content>
          <p>Some Content</p>
          <ModalContent 
            type={type} 
            hideModal={ this.hideModal } 
            itemId={ itemId } 
          />
        </Modal.Content>
      </Modal>
    )
  }
};

export default ModalDimmer;
