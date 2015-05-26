import React, { Component } from 'react';
import { connectToStores } from 'fluxible/addons';
import { Paper, DropDownMenu } from 'material-ui';
import ExecuteFlow from '../components/executeFlow';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flow: this.props.flows[0]
    };
  }

  handleFlowChange(event, selectedIndex, menuItem) {
    let flow = this.props.flows.find((flow) => flow.id === Number(menuItem.payload));
    if (flow) {
      this.setState({
        flow: flow
      });
    }
  }
  render() {
    let menuItems = this.props.flows.map((flow) => ({
      payload: flow.id,
      text: flow.title
    }));
    return (
      <div className="Flow">
        <div className="Flow-rules">
          <h3 className="vertical-center">Execute Flow: <DropDownMenu menuItems={menuItems} onChange={this.handleFlowChange.bind(this)}/></h3>
          <Paper zDepth={1} className="margin-top-10 paper-padding">
            <ExecuteFlow extraclass="Home-page Grid Grid--gutters Grid--full large-Grid--fit" flow={this.state.flow} autoExecute="true"></ExecuteFlow>
          </Paper>
        </div>
      </div>
    );
  }

}

HomePage = connectToStores(HomePage, ["FlowsStore"], (stores) => {
  return {
    flows: stores.FlowsStore.getFlows()
  };
});

export default HomePage;
