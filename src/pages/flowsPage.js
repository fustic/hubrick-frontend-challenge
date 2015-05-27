import React, { Component } from 'react';
import { connectToStores } from 'fluxible/addons';
import { NavLink } from 'fluxible-router';
import FlowAddButton from '../components/FlowAddButtonComponent';

if (process.env.BROWSER) {
  require('../style/Flows.scss');
}

class FlowsPage extends Component {

  render() {
    const {flows} = this.props;
    return (
      <div className="Flows">
        <h3>List of existing Flows: <FlowAddButton /></h3>
        <ul>
          {
            flows.map((flow) =>
              <li>
                <NavLink key={flow.id} routeName="flow" navParams={{id: flow.id}}>{flow.title}</NavLink>
              </li>
            )
          }
        </ul>
      </div>
    );
  }

}

FlowsPage = connectToStores(FlowsPage, ['FlowsStore'], (stores) => {
  return {
    flows: stores.FlowsStore.getFlows()
  };
});

export default FlowsPage;
