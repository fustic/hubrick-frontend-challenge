import React, { PropTypes, Component } from 'react';
import Actions from '../constants/actions';
import { RaisedButton, TextField } from 'material-ui';
import { flowRuleNextChange, flowRuleAttrsChange } from '../actions/flowsActionCreators';

if (process.env.BROWSER) {
  require('../style/flow.scss');
}

class ExecuteFlow extends Component {
  static propTypes = {
    flow: PropTypes.object.isRequired,
    autoExecute: PropTypes.bool,
    extraclass: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      objectErrorText: '',
      objectToPass: {
        color: 'red',
        size: 12
      },
      results: []
    };
  }
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  };
  componentDidMount() {
    if (this.props.autoExecute) {
      this.handleExecute();
    }
  }
  handleExecute() {
    this.setState({
      results: this.props.flow.executeObject(this.state.objectToPass)
    });
  }
  handleObjectChange(event) {
    try {
      let value = JSON.parse(event.target.value);
      this.setState({
        objectToPass: value,
        objectErrorText: ''
      });
    } catch(err) {
      this.setState({
        objectErrorText: err.message
      });
    }
  }
  render() {
    let { extraclass } = this.props;
    extraclass = extraclass || '';
    extraclass += ' Execute';
    return (
      <div className={extraclass}>

        <div className="Grid-cell">
          <TextField
            hintText="Object to pass to rule body function"
            floatingLabelText="Object to pass to rule body function"
            errorText={this.state.objectErrorText}
            multiLine={true}
            onBlur={this.handleObjectChange.bind(this)}
            defaultValue={JSON.stringify(this.state.objectToPass)}/>

          <div className="Execute-button">
            <RaisedButton label="Execute flow" onClick={this.handleExecute.bind(this)} primary={true}/>
          </div>
        </div>

        <div className="Grid-cell">
          <h2>Execution results:</h2>
          {
            this.state.results.map((result) => <div className="Execution-list">
              {result.title} <span className={result.status}>{result.status}</span>
            </div>)
          }
        </div>
      </div>
    );
  }

}

export default ExecuteFlow;
