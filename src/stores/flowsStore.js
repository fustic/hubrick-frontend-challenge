import { BaseStore } from 'fluxible/addons';
import Actions from '../constants/actions';
import Flow from '../models/flowModel'

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
    this.flows = [new Flow(1, 'Flow 1')];
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
}

export default FlowsStore;
