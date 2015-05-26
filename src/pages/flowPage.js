import React, { PropTypes, Component } from 'react';
import Actions from '../constants/actions';
import { addNewRule, flowChangeTitle } from '../actions/flowsActionCreators';
import { connectToStores } from 'fluxible/addons';
import Rule from '../components/ruleComponent';
import { Paper, RaisedButton, TextField } from 'material-ui';

if (process.env.BROWSER) {
  require('../style/flow.scss');
}

class FlowPage extends Component {

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  };

  handleAddNewRule() {
    this.context.executeAction(addNewRule, {id: this.props.flow.id});
  }
  handleFlowTitleChange(event) {
    if (event.target.value !== this.props.flow.title) {
      this.context.executeAction(flowChangeTitle, {id: this.props.flow.id, title: event.target.value});
    }
  }
  render() {
    let { flow } = this.props;
    return (
      <div className="Flow Grid Grid--gutters Grid--full large-Grid--fit">

        <div className="Grid-cell">
          <div className="Flow">
            <TextField
              hintText="Flow title"
              floatingLabelText="Flow title"
              onBlur={this.handleFlowTitleChange.bind(this)}
              defaultValue={flow.title}/>

            <div className="Flow-rules">
              <h3>List of rules:</h3>
              {
                flow.rules.map((rule) => <Rule key={rule.id} rule={rule} flowCycleOptions={flow.getFlowCycleOptions(rule.id)}/>)
              }

              <RaisedButton label="Add new rule" onClick={this.handleAddNewRule.bind(this)} primary={true} className="float-right"/>
            </div>

          </div>
        </div>
        <div className="Grid-cell">
          <Paper zDepth={1} className="Rule">

          </Paper>
        </div>

      </div>
    );
  }

}

FlowPage = connectToStores(FlowPage, ["FlowsStore"], (stores, props) => {
  return {
    flow: stores.FlowsStore.getFlow(props.id)
  };
});

export default FlowPage;
