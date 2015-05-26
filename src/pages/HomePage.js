import React, { Component } from 'react';
import { connectToStores } from 'fluxible/addons';
import { Paper } from 'material-ui';
import ExecuteFlow from '../components/executeFlow';

class HomePage extends Component {

  render() {
    let flow = this.props.flows[0];
    return (
      <div className="Flow">
        <div className="Flow-rules">
          <h3>Execute Flow:</h3>
          <Paper zDepth={1} className="margin-top-10 paper-padding">
            <ExecuteFlow extraclass="Home-page Grid Grid--gutters Grid--full large-Grid--fit" flow={flow} autoExecute="true"></ExecuteFlow>
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
