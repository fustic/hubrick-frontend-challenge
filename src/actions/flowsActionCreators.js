import Actions from '../constants/actions';
import FlowsStore from '../stores/flowsStore';
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
  }

};

export default FlowsActionCreators;
