import { BaseStore } from 'fluxible/addons';
import Actions from '../constants/actions';


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
    this.flows = [{id: 1, title: 'Flow 1'}];
  }

  addEmptyFlow() {
    const lastFlow = this.flows[this.flows.length - 1];
    const flow = {
      id: lastFlow.id + 1,
      title: 'Flow ' + (lastFlow.id + 1)
    };
    this.flows.push(flow);
    this.emitChange();
    return flow;
  }
  getFlow(id) {
    if (id) {
      return this.flows.filter((flow) => flow.id === id);
    }
    return null;
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
