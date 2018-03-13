const tools = require('../tools.js');

/**
 * Gets an array of mapped records.
 *
 * @instance
 * @memberof Store
 * @param {function} func Mapping function.
 * @return {array}
 */
function map(func) {
  tools.validateType('func', 'function', func);

  return this.records.map(func);
}

module.exports = map;
