const tools = require('../tools.js');

/**
 * Gets an array of mapped records.
 *
 * @instance
 * @memberof Store
 * @param {function} fn Mapping function.
 * @return {array}
 */
function map(fn) {
  tools.validateType('fn', 'function', fn);

  return this.records.map(fn);
}

module.exports = map;
