import BaseModel from '../models/BaseModel'

/**
 * @class
 * @name Rule
 * @extends BaseModel
 * @classdesc Rule model
 */
class Rule extends BaseModel {
  /**
   * @constructs
   * @param {string} id
   * @param {string} title
   * @param {Flow} flow
   * @param {boolean} [isFlowStart]
   */
  constructor(id, title, flow, isFlowStart) {
    super(id, title);
    /**
     * @private
     * @type {Flow} - flow of the rule
     */
    this.flow = flow;
    /**
     * @property {function} body - body of the rule
     */
    this.body = function () {};
    /**
     * @property {Object} trueRule - next rule in case of successful body execution
     */
    this.trueRule = null;
    /**
     * @property {Object} falseRule - next rule in case of unsuccessful body execution
     */
    this.falseRule = null;
    /**
     * @private
     * @type {boolean} - is this rule a start point of the flow
     */
    this.isFlowStart = isFlowStart;
    /**
     * @type {boolean} - is this rule already in the flow cycle
     */
    this.isOccupied = false;
  }

}

export default Rule;
