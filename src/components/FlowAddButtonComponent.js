import React, { PropTypes, Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import { addFlow } from '../actions/FlowsActionCreators.js';

class FlowAddButton extends Component {

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  };

  onClickHandler() {
    this.context.executeAction(addFlow);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.onClickHandler.bind(this)}>+</FloatingActionButton>
    );
  }

}

export default FlowAddButton;
