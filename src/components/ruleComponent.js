import React, { PropTypes, Component } from 'react';
import Actions from '../constants/actions';
import { Paper, TextField } from 'material-ui';
import { flowRuleNextChange, flowRuleAttrsChange } from '../actions/flowsActionCreators';
import Select from 'react-select';

if (process.env.BROWSER) {
  require('../style/rule.scss');
  require('../style/select.scss');
}

class Rule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idErrorText: '',
      bodyErrorText: ''
    };
  }
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  };
  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  handleRuleTitleChange(event) {
    let value = event.target.value;
    if (value !== this.props.rule.title) {
      this.context.executeAction(flowRuleAttrsChange, {
        id: this.props.rule.flow.id,
        type: 'title',
        ruleId: this.props.rule.id,
        value: value
      });
    }
  }
  handleRuleChange(type, index, rule) {
    rule = rule[0];
    this.context.executeAction(flowRuleNextChange, {
      id: this.props.rule.flow.id,
      type: type,
      ruleId: this.props.rule.id,
      newValue: rule && rule.value,
      prevValue: this.props.rule[type]
    });
  }
  handleRuleBodyChange(event) {
    let value = event.target.value;
    if (value === this.props.rule.body.toString()) {
      return;
    }
    try {
      let fn = eval('(' + value + ')');
      if (fn && typeof fn === 'function') {
        this.context.executeAction(flowRuleAttrsChange, {
          id: this.props.rule.flow.id,
          type: 'body',
          ruleId: this.props.rule.id,
          value: fn
        });
        this.setState({
          bodyErrorText: ''
        });
      } else {
        this.setState({
          bodyErrorText: 'body should be a function'
        });
      }
    } catch (err) {
      this.setState({
        bodyErrorText: 'body should be a function: ' + err.message
      });
    }

  }
  handleRuleIdChange(event) {
    let value = event.target.value;
    if (!this.isNumber(value)) {
      return this.setState({
        idErrorText: 'id should be a number'
      });
    }
    value = Number(value);
    if (value === this.props.rule.id) {
      return;
    }
    if (this.props.rule.flow.isRuleIDavailable(value)) {
      this.context.executeAction(flowRuleAttrsChange, {
        id: this.props.rule.flow.id,
        type: 'id',
        ruleId: this.props.rule.id,
        value: value
      });
      this.setState({
        idErrorText: ''
      });
    } else {
      this.setState({
        idErrorText: 'this id has been already taken'
      });
    }
  }
  render() {
    let { rule, flowCycleOptions } = this.props;
    let trueValue = rule.trueRule ? {label: rule.trueRule.title, value: rule.trueRule.id} : undefined;
    let falseValue = rule.falseRule ? {label: rule.falseRule.title, value: rule.falseRule.id} : undefined;
    return (
      <Paper zDepth={1} className="Rule">

        <TextField
          hintText="Rule title"
          floatingLabelText="Rule title"
          onBlur={this.handleRuleTitleChange.bind(this)}
          defaultValue={rule.title}/>

        <TextField
          hintText="Rule id"
          floatingLabelText="Rule id"
          errorText={this.state.idErrorText}
          onBlur={this.handleRuleIdChange.bind(this)}
          defaultValue={rule.id}/>

        <TextField
          hintText="Rule Body"
          floatingLabelText="Rule Body"
          errorText={this.state.bodyErrorText}
          multiLine={true}
          onBlur={this.handleRuleBodyChange.bind(this)}
          defaultValue={rule.body}/>

        <div className="Grid Grid--gutters Grid--flexCells Grid--full large-Grid--fit margin-top-10">
          <div className="Grid-cell">
            <span className="vertical-center success">if rule passed:</span>
          </div>
          <div className="Grid-cell">
            <Select options={flowCycleOptions}
                    value={trueValue}
                    onChange={this.handleRuleChange.bind(this, 'trueRule')}
                    placeholder="if rule passed"
                    clearable="true"
                    clearValueText="clear"
                    disabled={!trueValue && flowCycleOptions.length === 0}/>
          </div>
        </div>

        <div className="Grid Grid--gutters Grid--flexCells Grid--full large-Grid--fit">
          <div className="Grid-cell">
            <span className="vertical-center fail">if rule failed:</span>
          </div>
          <div className="Grid-cell">
            <Select options={flowCycleOptions}
                    value={falseValue}
                    onChange={this.handleRuleChange.bind(this, 'falseRule')}
                    placeholder="if rule failed"
                    clearable="true"
                    clearValueText="clear"
                    disabled={!falseValue && flowCycleOptions.length === 0}/>
          </div>
        </div>

      </Paper>
    );
  }

}

export default Rule;
