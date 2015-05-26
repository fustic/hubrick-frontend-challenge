import BaseModel from '../models/baseModel'
import Rule from '../models/ruleModel'
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
    let rule = this.rules.filter((rule) => rule.id === payload.ruleId)[0];
    if (rule) {
      rule[payload.type] = this.rules.filter((rule) => rule.id === payload.newValue)[0] || {};
      rule[payload.type].isOccupied = true;
    }
    if (payload.prevValue) {
      payload.prevValue.isOccupied = false;
    }
  }
  updateRuleAttrsFlow(payload) {
    let rule = this.rules.filter((rule) => rule.id === payload.ruleId)[0];
    if (rule) {
      rule[payload.type] = payload.value;
    }
  }
  getFlowCycleOptions(id) {
    return this.rules
      .filter((rule) => !rule.isFlowStart && !rule.isOccupied && (id && rule.id !== id))
      .map((rule) => ({value: rule.id, label: rule.title}));
  }
}

export default Flow;
