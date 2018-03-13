const tools = require('../tools.js');

/**
 * Calls function for every record.
 *
 * @instance
 * @memberof Store
 * @param {function} func Function to be called.
 */
function each(func) {
  tools.validateType('func', 'function', func);

  this.records.forEach(func);
}

module.exports = each;
