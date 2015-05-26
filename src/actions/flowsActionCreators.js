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
  }

};

export default FlowsActionCreators;
