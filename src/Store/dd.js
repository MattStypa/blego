const tools = require('../tools.js');

/**
 * Writes records to console and exits the process.
 *
 * @instance
 * @memberof Store
 */
function dd() {
  this.dump();
  process.exit(1);
}

module.exports = dd;
