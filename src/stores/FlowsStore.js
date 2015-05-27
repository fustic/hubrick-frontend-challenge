import { BaseStore } from 'fluxible/addons';
import Flow from '../models/FlowModel';

/**
 * @class
 * @name FlowsStore
 * @extends BaseStore
 * @classdesc This is a Flows store. Holding the array of flows.
 * Flow object can be added using (`ADD_FLOW`) method
 */
class FlowsStore extends BaseStore {

  static storeName = 'FlowsStore';

  /**
   * @constructs
   * @param {dispatcher} dispatcher
   */
  constructor(dispatcher) {
    super(dispatcher);
    /**
     * @property
     * @type {Array} flows
     */
    this.flows = [];
    this.addTestFlow();
  }

  addEmptyFlow() {
    const lastFlow = this.flows[this.flows.length - 1];
    const flow = new Flow(lastFlow.id + 1, 'Flow ' + (lastFlow.id + 1));
    this.flows.push(flow);
    this.emitChange();
    return flow;
  }
  getFlow(id) {
    if (id) {
      return this.flows.filter((flow) => flow.id === Number(id))[0];
    }
    return null;
  }

  addFlowNewRule(id) {
    let flow = this.getFlow(id);
    if (flow) {
      flow.addNewRule();
      this.emitChange();
      return true;
    }
    return false;
  }

  updateFlowTitle(id, title) {
    let flow = this.getFlow(id);
    if (flow) {
      flow.title = title;
      this.emitChange();
      return true;
    }
    return false;
  }
  updateRuleNextFlow(payload) {
    let flow = this.getFlow(payload.id);
    if (flow) {
      flow.updateRuleNextFlow(payload);
      this.emitChange();
      return true;
    }
    return false;
  }
  updateRuleAttrsFlow(payload) {
    let flow = this.getFlow(payload.id);
    if (flow) {
      flow.updateRuleAttrsFlow(payload);
      this.emitChange();
      return true;
    }
    return false;
  }

  getFlows() {
    return this.flows;
  }

  dehydrate() {
    return {
      flows: this.flows
    };
  }

  rehydrate(state) {
    this.flows = state.flows;
  }

  /**
   * @this FlowsStore
   * @doc method
   * @private
   * @description create a initial flow for testing purpose
   */
  addTestFlow() {
    let flow = new Flow(1, 'Flow 1');

    flow.addNewRule();
    flow.addNewRule();
    flow.addNewRule();
    flow.addNewRule();

    let ruleBodyChangePayload = {
      type: 'body',
      ruleId: 1,
      value: function (obj) {return obj.color === 'red' && obj.size === 12; }
    };
    flow.updateRuleAttrsFlow(ruleBodyChangePayload);
    flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
      ruleId: 2,
      value: function (obj) {return obj.color === 'blue'; }
    }));
    flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
      ruleId: 3,
      value: function (obj) {return obj.color !== 'blue' && obj.size === 12; }
    }));
    flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
      ruleId: 4,
      value: function (obj) {return obj.size === 12; }
    }));
    flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
      ruleId: 5,
      value: function (obj) {return obj.size; }
    }));

    flow.updateRuleNextFlow({
      type: 'trueRule',
      ruleId: 1,
      newValue: 2
    });
    flow.updateRuleNextFlow({
      type: 'falseRule',
      ruleId: 2,
      newValue: 3
    });
    flow.updateRuleNextFlow({
      type: 'trueRule',
      ruleId: 3,
      newValue: 4
    });
    flow.updateRuleNextFlow({
      type: 'trueRule',
      ruleId: 4,
      newValue: 5
    });

    this.flows.push(flow);
  }
}

export default FlowsStore;
