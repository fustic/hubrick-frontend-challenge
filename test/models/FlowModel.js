import { expect } from 'chai';
import Flow from '../../src/models/FlowModel';

describe('Flow model', () => {

  let flow = new Flow(1, 'Flow 1');

  beforeEach(() => {
    flow = new Flow(1, 'Flow 1');
  });

  it(' - flow has empty rule after creation', () => {
    expect(flow.rules).to.have.length(1);
  });

  describe(' - check rules ', () => {
    beforeEach(() => {
      flow.addNewRule();
      flow.addNewRule();
      flow.addNewRule();
      flow.addNewRule();
    });

    it(' - flow rules length', () => {
      expect(flow.rules).to.have.length(5);
    });

    it(' - check rules id availability', () => {
      expect(flow.isRuleIDavailable(1)).to.be.false;
      expect(flow.isRuleIDavailable('1')).to.be.false;
      expect(flow.isRuleIDavailable(6)).to.be.true;
      expect(flow.isRuleIDavailable('6')).to.be.true;
    });

    it(' - flow rules cycle options', () => {
      expect(flow.getFlowCycleOptions(1)).to.have.length(4);
      expect(flow.getFlowCycleOptions(3)).to.have.length(3);

      flow.updateRuleNextFlow({
        type: 'trueRule',
        ruleId: 1,
        newValue: 2
      });
      expect(flow.getFlowCycleOptions(3)).to.have.length(2);
      flow.updateRuleNextFlow({
        type: 'falseRule',
        ruleId: 2,
        newValue: 3
      });
      expect(flow.getFlowCycleOptions(5)).to.have.length(1);
      expect(flow.getFlowCycleOptions(1)).to.have.length(2);
    });

    it(' - flow execution', () => {
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

      let ruleBodyChangePayload = {
        type: 'body',
        ruleId: 1,
        value: function (obj) {return obj.color === 'red' && obj.size === 12;}
      };
      flow.updateRuleAttrsFlow(ruleBodyChangePayload);
      flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
        ruleId: 2,
        value: function (obj) {return obj.color === 'blue'}
      }));
      flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
        ruleId: 3,
        value: function (obj) {return obj.color !== 'blue' && obj.size === 12;}
      }));
      flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
        ruleId: 4,
        value: function (obj) {return obj.size === 12;}
      }));
      flow.updateRuleAttrsFlow(Object.assign({}, ruleBodyChangePayload, {
        ruleId: 5,
        value: function (obj) {return obj.size;}
      }));

      let results = flow.executeObject({
        color: 'red',
        size: 12
      });
      expect(results).to.have.length(6);
      expect(results[results.length - 1].title).to.equal('End');
      expect(results[0].status).to.equal('passed');
      expect(results[1].status).to.equal('failed');
    });
  });

});