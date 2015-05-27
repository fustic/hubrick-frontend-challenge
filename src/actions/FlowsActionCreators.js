import FlowsStore from '../stores/FlowsStore';
import { navigateAction } from 'fluxible-router';

const FlowsActionCreators = {

  addFlow(context, payload, done) {
    let flow = context.getStore(FlowsStore).addEmptyFlow();
    context.executeAction(navigateAction, {
      method: 'get',
      url: '/flows/' + flow.id
    });
    done();
  },

  getFlow(context, payload, done) {
    let flow = context.getStore(FlowsStore).getFlow(payload.id);
    if (flow) {
      return done();
    }
    return done(new Error('No such flow exists'));
  },

  addNewRule(context, payload, done) {
    if (context.getStore(FlowsStore).addFlowNewRule(payload.id)) {
      return done();
    }
    return done(new Error('No such flow exists'));
  },

  flowChangeTitle(context, payload, done) {
    if (context.getStore(FlowsStore).updateFlowTitle(payload.id, payload.title)) {
      return done();
    }
    return done(new Error('No such flow exists'));
  },

  flowRuleNextChange(context, payload, done) {
    if (context.getStore(FlowsStore).updateRuleNextFlow(payload)) {
      return done();
    }
    return done(new Error('No such flow exists'));
  },

  flowRuleAttrsChange(context, payload, done) {
    if (context.getStore(FlowsStore).updateRuleAttrsFlow(payload)) {
      return done();
    }
    return done(new Error('No such flow exists'));
  }

};

export default FlowsActionCreators;
