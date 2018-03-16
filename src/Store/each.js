const tools = require('../tools.js');

/**
 * Calls function for every record.
 *
 * @instance
 * @memberof Store
 * @param {function} fn Function to be called.
 */
function each(fn) {
  tools.validateType('fn', 'function', fn);

  this.records.forEach(fn);
}

module.exports = each;
