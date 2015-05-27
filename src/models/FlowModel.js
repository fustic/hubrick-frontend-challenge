import BaseModel from '../models/BaseModel';
import Rule from '../models/RuleModel';
/**
 * @class
 * @name Flow
 * @extends BaseModel
 * @classdesc Flow model
 */
class Flow extends BaseModel {
  /**
   * @constructs
   * @param {number} id
   * @param {string} title
   */
  constructor(id, title) {
    super(id, title);
    /**
     * @property {Rule[]} rules - flow rules
     */
    this.rules = [new Rule(1, 'Rule 1', this, true)];
  }
  isRuleIDavailable(id) {
    id = Number(id);
    return this.rules.filter((rule) => rule.id === id).length === 0;
  }
  addNewRule() {
    let rule = this.rules[this.rules.length - 1];
    let ruleId = rule.id + 1;
    while (!this.isRuleIDavailable(ruleId)) {
      ruleId = ruleId + 1;
    }
    this.rules.push(new Rule(ruleId, 'Rule ' + ruleId, this));
  }
  updateRuleNextFlow(payload) {
    let rule = this.rules.filter((r) => r.id === payload.ruleId)[0];
    if (rule) {
      if (payload.newValue) {
        rule[payload.type] = this.rules.filter((r) => r.id === payload.newValue)[0] || {};
        rule[payload.type].isOccupied = true;
      } else {
        rule[payload.type] = null;
      }
    }
    if (payload.prevValue) {
      payload.prevValue.isOccupied = false;
    }
  }
  updateRuleAttrsFlow(payload) {
    let rule = this.rules.filter((r) => r.id === payload.ruleId)[0];
    if (rule) {
      rule[payload.type] = payload.value;
    }
  }
  getFlowCycleOptions(id) {
    return this.rules
      .filter((rule) => !rule.isFlowStart && !rule.isOccupied && (id && rule.id !== id))
      .map((rule) => ({value: rule.id, label: rule.title}));
  }
  executeObject(obj) {

    let rule = this.rules[0];
    let results = [{
      title: rule.title,
      status: rule.body(obj) ? 'passed' : 'failed'
    }];
    let nextRule = rule.body(obj) ? rule.trueRule : rule.falseRule;
    while (nextRule) {
      results.push({
        title: nextRule.title,
        status: nextRule.body(obj) ? 'passed' : 'failed'
      });
      nextRule = nextRule.body(obj) ? nextRule.trueRule : nextRule.falseRule;
    }
    results.push({
      title: 'End'
    });
    return results;
  }
}

export default Flow;
