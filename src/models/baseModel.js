/**
 * @class
 * @name BaseModel
 */
class BaseModel {
  /**
   * @constructs
   * @param {string} id
   * @param {string} title
   */
  constructor(id, title) {
    /**
     * @property {string} id
     */
    this.id = id;
    /**
     * @property {string} title
     */
    this.title = title;
  }
}

export default BaseModel;
